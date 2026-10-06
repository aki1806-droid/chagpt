/**
 * Notabene — archivio note su Google Drive con catalogazione AI.
 *
 * Web app Google Apps Script eseguita come "utente che accede":
 * ogni persona vede solo ciò che Drive le permette di vedere.
 *  - Sezione personale: cartella "Notabene Personale" nel Drive di ciascuno.
 *  - Sezione condivisa: cartella indicata in SHARED_FOLDER_ID, condivisa tra i membri.
 * In ogni cartella c'è un foglio "_Notabene Indice" con metadati, riassunti ed etichette.
 *
 * Configurazione: i valori in CONFIG valgono se la proprietà dello script omonima è vuota.
 * La chiave di Claude si inserisce dall'app (solo l'amministratore) oppure in
 * Impostazioni progetto → Proprietà script:
 *  ANTHROPIC_API_KEY  chiave per Claude
 *  CLAUDE_MODEL       facoltativa, predefinito claude-opus-5-5
 *  GEMINI_API_KEY     chiave per Gemini (Google AI Studio)
 *  GEMINI_MODEL       facoltativa, predefinito gemini-2.5-flash
 */

const CONFIG = {
  ADMIN_EMAIL: 'aki1806@gmail.com',
  ALLOWED_EMAILS: 'aki1806@gmail.com,giovanna.vullo87@gmail.com',
  SHARED_FOLDER_ID: '1ftFYAyeAeXgesIb81stFxU2ts6dACHrz',
  AI_PROVIDER: 'claude'
};

const PERSONAL_FOLDER_NAME = 'Notabene Personale';
const INDEX_NAME = '_Notabene Indice';
const HEADERS = ['id', 'titolo', 'tipo', 'mime', 'data', 'modificato', 'categoria', 'etichette',
  'riassunto', 'testo', 'stato', 'url', 'autore', 'percorso', 'preferita', 'colore'];
const MAX_TEXT = 45000;          // limite prudente per una cella di Fogli (50.000)
const MAX_AI_CHARS = 60000;      // testo massimo inviato all'AI per nota
const RUN_BUDGET_MS = 4.5 * 60 * 1000; // Apps Script si ferma a 6 minuti
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

// ---------- Pagina ----------

function doGet() {
  const user = currentUser_();
  if (!user.allowed) {
    return HtmlService.createHtmlOutput(
      '<p style="font-family:sans-serif;padding:24px">L\'account ' + escapeHtml_(user.email || 'sconosciuto') +
      ' non è autorizzato. Chiedi all\'amministratore di aggiungerlo.</p>').setTitle('Notabene');
  }
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('Notabene')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

function currentUser_() {
  const email = (Session.getActiveUser().getEmail() || '').toLowerCase();
  const allowed = prop_('ALLOWED_EMAILS').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
  return { email, allowed: !!email && allowed.indexOf(email) !== -1 };
}

function requireUser_() {
  const u = currentUser_();
  if (!u.allowed) throw new Error('Account non autorizzato.');
  return u;
}

function prop_(key, def) {
  const v = PropertiesService.getScriptProperties().getProperty(key);
  if (v != null && v !== '') return v;
  return def != null ? def : (CONFIG[key] || '');
}

function isAdmin_(email) {
  return email === prop_('ADMIN_EMAIL').toLowerCase();
}

function aiReady_() {
  const p = prop_('AI_PROVIDER').toLowerCase();
  return (p === 'claude' && !!prop_('ANTHROPIC_API_KEY')) || (p === 'gemini' && !!prop_('GEMINI_API_KEY'));
}

/** L'amministratore salva la chiave di Claude dall'app. La chiave non torna mai al browser. */
function setApiKey(key) {
  const u = requireUser_();
  if (!isAdmin_(u.email)) throw new Error('Solo l\'amministratore può impostare la chiave.');
  key = String(key || '').trim();
  if (!/^sk-ant-/.test(key)) throw new Error('La chiave di Claude inizia con "sk-ant-". Controlla di averla copiata tutta.');
  PropertiesService.getScriptProperties().setProperty('ANTHROPIC_API_KEY', key);
  return true;
}

// ---------- Cartelle e indice ----------

function folderFor_(scope) {
  if (scope === 'team') {
    const id = prop_('SHARED_FOLDER_ID');
    if (!id) throw new Error('Manca SHARED_FOLDER_ID nelle proprietà dello script.');
    return DriveApp.getFolderById(id);
  }
  const it = DriveApp.getRootFolder().getFoldersByName(PERSONAL_FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.getRootFolder().createFolder(PERSONAL_FOLDER_NAME);
}

function indexSheet_(folder) {
  const it = folder.getFilesByName(INDEX_NAME);
  let ss;
  if (it.hasNext()) {
    ss = SpreadsheetApp.open(it.next());
  } else {
    ss = SpreadsheetApp.create(INDEX_NAME);
    DriveApp.getFileById(ss.getId()).moveTo(folder);
    const sh = ss.getSheets()[0];
    sh.setName('note');
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return ss.getSheetByName('note');
}

function readIndex_(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return [];
  const rows = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  return rows.map((r, i) => {
    const o = { _row: i + 2 };
    HEADERS.forEach((h, k) => o[h] = r[k]);
    return o;
  });
}

function toRow_(o) {
  return HEADERS.map(h => o[h] == null ? '' : o[h]);
}

// ---------- API per la pagina ----------

function getBootstrap() {
  const u = requireUser_();
  return {
    email: u.email,
    aiEnabled: aiReady_(),
    isAdmin: isAdmin_(u.email),
    prefs: getPrefs(),
    syncInstalled: ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === 'syncAll'),
    personal: listNotes('mie'),
    team: listNotes('team')
  };
}

function listNotes(scope) {
  requireUser_();
  const sheet = indexSheet_(folderFor_(scope));
  return readIndex_(sheet).map(o => ({
    id: o.id, titolo: o.titolo, tipo: o.tipo, data: dateStr_(o.data), categoria: o.categoria,
    etichette: String(o.etichette || '').split(',').map(s => s.trim()).filter(Boolean),
    riassunto: o.riassunto, stato: o.stato, url: o.url, autore: o.autore, percorso: o.percorso,
    preferita: o.preferita === true || o.preferita === 'TRUE', colore: o.colore === '' ? '' : Number(o.colore),
    sezione: scope
  }));
}

/** Ricerca nel testo completo di entrambe le sezioni. Restituisce id e un estratto. */
function searchText(q) {
  requireUser_();
  const words = String(q || '').toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const out = [];
  ['mie', 'team'].forEach(scope => {
    readIndex_(indexSheet_(folderFor_(scope))).forEach(o => {
      const text = String(o.testo || '');
      const low = text.toLowerCase();
      if (words.every(w => low.indexOf(w) !== -1)) {
        const p = Math.max(0, low.indexOf(words[0]) - 80);
        out.push({ id: o.id, estratto: (p ? '…' : '') + text.substr(p, 240) + '…' });
      }
    });
  });
  return out;
}

function getNoteText(id) {
  requireUser_();
  const found = findNote_(id);
  return found ? String(found.note.testo || '') : '';
}

function updateNote(id, changes) {
  requireUser_();
  const found = findNote_(id);
  if (!found) throw new Error('Nota non trovata.');
  const n = found.note;
  if (changes.etichette) n.etichette = changes.etichette.map(s => String(s).trim().toLowerCase()).filter(Boolean).join(', ');
  if (changes.categoria != null) n.categoria = String(changes.categoria).trim();
  if (changes.titolo != null) n.titolo = String(changes.titolo).trim();
  if (changes.conferma) n.stato = 'confermata';
  if (changes.preferita != null) n.preferita = !!changes.preferita;
  if (changes.colore != null) n.colore = changes.colore === '' ? '' : Math.max(0, Math.min(9, Number(changes.colore)));
  found.sheet.getRange(n._row, 1, 1, HEADERS.length).setValues([toRow_(n)]);
  return true;
}

/** Sposta una nota tra sezione personale e condivisa (file su Drive e riga dell'indice). */
function moveNote(id, toScope) {
  requireUser_();
  const found = findNote_(id);
  if (!found) throw new Error('Nota non trovata.');
  if (found.scope === toScope) return true;
  const target = folderFor_(toScope);
  DriveApp.getFileById(id).moveTo(target);
  const n = found.note;
  n.percorso = target.getName() + '/' + n.titolo;
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    indexSheet_(target).appendRow(toRow_(n));
    found.sheet.deleteRow(n._row);
  } finally { lock.releaseLock(); }
  return true;
}

/** Caricamento dal browser: crea il file nella sezione scelta e lo cataloga subito. */
function uploadNote(name, mimeType, base64, scope) {
  requireUser_();
  const bytes = Utilities.base64Decode(base64);
  if (bytes.length > MAX_UPLOAD_BYTES) throw new Error('File troppo grande (massimo 20 MB).');
  const folder = folderFor_(scope);
  const file = folder.createFile(Utilities.newBlob(bytes, mimeType || 'application/octet-stream', name));
  const sheet = indexSheet_(folder);
  const note = processFile_(file, folder.getName());
  sheet.appendRow(toRow_(note));
  return Object.assign({}, note, {
    etichette: String(note.etichette).split(',').map(s => s.trim()).filter(Boolean),
    data: dateStr_(note.data), testo: undefined, modificato: undefined, preferita: false, colore: '', sezione: scope
  });
}

/** Avvia subito una sincronizzazione delle due sezioni (pulsante "Aggiorna"). */
function syncNow() {
  requireUser_();
  return syncAll();
}

/** Attiva la sincronizzazione automatica ogni ora per l'utente corrente. */
function installSync() {
  requireUser_();
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === 'syncAll').forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('syncAll').timeBased().everyHours(1).create();
  return true;
}

/** Impostazioni grafiche personali, salvate nell'account Google di chi usa l'app. */
function getPrefs() {
  requireUser_();
  const raw = PropertiesService.getUserProperties().getProperty('prefs');
  return raw ? JSON.parse(raw) : null;
}

function savePrefs(prefs) {
  requireUser_();
  const json = JSON.stringify(prefs || {});
  if (json.length > 8000) throw new Error('Impostazioni troppo grandi.');
  PropertiesService.getUserProperties().setProperty('prefs', json);
  return true;
}

function findNote_(id) {
  for (const scope of ['mie', 'team']) {
    const sheet = indexSheet_(folderFor_(scope));
    const note = readIndex_(sheet).find(o => o.id === id);
    if (note) return { scope, sheet, note };
  }
  return null;
}

// ---------- Sincronizzazione ----------

/** Cerca file nuovi o modificati nelle due sezioni e li cataloga. Rispetta il limite di tempo. */
function syncAll() {
  const start = Date.now();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return { fatti: 0, restanti: -1, messaggio: 'Sincronizzazione già in corso.' };
  let done = 0, pending = 0;
  try {
    for (const scope of ['mie', 'team']) {
      const folder = folderFor_(scope);
      const sheet = indexSheet_(folder);
      const known = {};
      readIndex_(sheet).forEach(o => known[o.id] = o);
      const seen = {};
      const files = [];
      collectFiles_(folder, folder.getName(), files);
      for (const f of files) {
        const id = f.file.getId();
        seen[id] = true;
        const old = known[id];
        const mod = f.file.getLastUpdated().getTime();
        if (old && new Date(old.modificato).getTime() >= mod) continue;
        if (Date.now() - start > RUN_BUDGET_MS) { pending++; continue; }
        const note = processFile_(f.file, f.path, old);
        if (old) sheet.getRange(old._row, 1, 1, HEADERS.length).setValues([toRow_(note)]);
        else sheet.appendRow(toRow_(note));
        done++;
      }
      // Rimuove dall'indice i file eliminati o spostati altrove (dal basso per non sfalsare le righe).
      Object.keys(known).map(k => known[k]).filter(o => !seen[o.id])
        .sort((a, b) => b._row - a._row).forEach(o => sheet.deleteRow(o._row));
    }
  } finally { lock.releaseLock(); }
  return { fatti: done, restanti: pending };
}

function collectFiles_(folder, path, out) {
  const files = folder.getFiles();
  while (files.hasNext()) {
    const f = files.next();
    if (f.getName() === INDEX_NAME || f.isTrashed()) continue;
    if (f.getMimeType() === MimeType.FOLDER) continue;
    out.push({ file: f, path: path + '/' + f.getName() });
  }
  const sub = folder.getFolders();
  while (sub.hasNext()) {
    const s = sub.next();
    collectFiles_(s, path + '/' + s.getName(), out);
  }
}

// ---------- Estrazione del testo ----------

function typeOf_(file) {
  const name = file.getName();
  const mime = file.getMimeType();
  if (/^\[Plaud\]/i.test(name)) return 'plaud';
  if (mime === MimeType.GOOGLE_DOCS) return 'doc';
  if (mime === MimeType.PDF) return 'pdf';
  if (mime.indexOf('image/') === 0) return 'img';
  if (mime.indexOf('audio/') === 0) return 'audio';
  if (mime.indexOf('text/') === 0) return 'txt';
  if (mime.indexOf('officedocument') !== -1 || mime === MimeType.MICROSOFT_WORD) return 'doc';
  return 'altro';
}

function extractText_(file, type) {
  const mime = file.getMimeType();
  try {
    if (mime === MimeType.GOOGLE_DOCS) return DocumentApp.openById(file.getId()).getBody().getText();
    if (type === 'txt') return file.getBlob().getDataAsString('UTF-8');
    if (type === 'pdf' || type === 'img' || type === 'doc') return convertWithOcr_(file);
  } catch (e) {
    console.warn('Estrazione non riuscita per ' + file.getName() + ': ' + e);
  }
  return '';
}

/** Converte PDF, immagini e Word in un Google Doc temporaneo (con OCR) per leggerne il testo. */
function convertWithOcr_(file) {
  const tmp = Drive.Files.create(
    { name: 'tmp-ocr-' + file.getId(), mimeType: MimeType.GOOGLE_DOCS },
    file.getBlob(),
    { ocrLanguage: 'it' });
  try {
    return DocumentApp.openById(tmp.id).getBody().getText();
  } finally {
    Drive.Files.remove(tmp.id);
  }
}

// ---------- Catalogazione con AI ----------

const AI_SCHEMA = {
  type: 'object',
  properties: {
    titolo: { type: 'string' },
    riassunto: { type: 'string' },
    categoria: { type: 'string' },
    etichette: { type: 'array', items: { type: 'string' } },
    sicura: { type: 'boolean' }
  },
  required: ['titolo', 'riassunto', 'categoria', 'etichette', 'sicura'],
  additionalProperties: false
};

function aiPrompt_(name, type, text, categories) {
  return 'Cataloga questa nota per un archivio personale e di team. Scrivi in italiano.\n' +
    '- titolo: breve e descrittivo (massimo 80 caratteri).\n' +
    '- riassunto: 2-4 frasi con i fatti utili per ritrovarla (decisioni, scadenze, persone, numeri).\n' +
    '- categoria: una sola. Riusa una di queste se adatta: ' + (categories.join(', ') || 'nessuna ancora') + '.\n' +
    '- etichette: da 3 a 6, minuscole, specifiche.\n' +
    '- sicura: false se il testo è scarso, illeggibile o ambiguo.\n\n' +
    'Nome file: ' + name + '\nTipo: ' + type + '\n\nContenuto:\n' + text;
}

function classify_(name, type, text, file) {
  const provider = prop_('AI_PROVIDER').toLowerCase();
  if (!provider || !aiReady_()) return null;
  const cats = knownCategories_();
  const body = String(text || '').substr(0, MAX_AI_CHARS);
  if (provider === 'claude') {
    if (!body.trim()) return null; // Claude non riceve audio: serve prima una trascrizione
    return callClaude_(aiPrompt_(name, type, body, cats));
  }
  if (provider === 'gemini') {
    // Gemini può ascoltare direttamente l'audio se manca il testo.
    const media = !body.trim() && type === 'audio' && file.getSize() < MAX_UPLOAD_BYTES ? file.getBlob() : null;
    if (!body.trim() && !media) return null;
    return callGemini_(aiPrompt_(name, type, media ? '(audio allegato: trascrivi e cataloga)' : body, cats), media);
  }
  throw new Error('AI_PROVIDER non valido: usa "claude" oppure "gemini".');
}

function callClaude_(prompt) {
  const res = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    headers: {
      'x-api-key': prop_('ANTHROPIC_API_KEY'),
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'server-side-fallback-2026-07-01'
    },
    payload: JSON.stringify({
      model: prop_('CLAUDE_MODEL', 'claude-opus-5-5'),
      max_tokens: 4000,
      output_config: { effort: 'low', format: { type: 'json_schema', schema: AI_SCHEMA } },
      fallbacks: 'default',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const code = res.getResponseCode();
  const data = JSON.parse(res.getContentText());
  if (code !== 200) throw new Error('Claude ' + code + ': ' + (data.error && data.error.message));
  if (data.stop_reason === 'refusal' || data.stop_reason === 'max_tokens') return null;
  const block = (data.content || []).find(b => b.type === 'text');
  return block ? JSON.parse(block.text) : null;
}

function callGemini_(prompt, mediaBlob) {
  const parts = [{ text: prompt }];
  if (mediaBlob) parts.push({ inline_data: { mime_type: mediaBlob.getContentType(), data: Utilities.base64Encode(mediaBlob.getBytes()) } });
  const geminiSchema = JSON.parse(JSON.stringify(AI_SCHEMA));
  delete geminiSchema.additionalProperties;
  const model = prop_('GEMINI_MODEL', 'gemini-2.5-flash');
  const res = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    headers: { 'x-goog-api-key': prop_('GEMINI_API_KEY') },
    payload: JSON.stringify({
      contents: [{ role: 'user', parts }],
      generationConfig: { responseMimeType: 'application/json', responseSchema: geminiSchema }
    })
  });
  const code = res.getResponseCode();
  const data = JSON.parse(res.getContentText());
  if (code !== 200) throw new Error('Gemini ' + code + ': ' + (data.error && data.error.message));
  const text = data.candidates && data.candidates[0] && data.candidates[0].content &&
    data.candidates[0].content.parts.map(p => p.text || '').join('');
  return text ? JSON.parse(text) : null;
}

function knownCategories_() {
  const cache = CacheService.getUserCache();
  const hit = cache.get('cats');
  if (hit) return JSON.parse(hit);
  const set = {};
  ['mie', 'team'].forEach(s => readIndex_(indexSheet_(folderFor_(s))).forEach(o => { if (o.categoria) set[o.categoria] = 1; }));
  const list = Object.keys(set).slice(0, 40);
  cache.put('cats', JSON.stringify(list), 600);
  return list;
}

/** Estrae il testo, chiede la catalogazione all'AI e restituisce la riga dell'indice. */
function processFile_(file, path, old) {
  const type = typeOf_(file);
  const text = extractText_(file, type);
  let ai = null, error = '';
  try { ai = classify_(file.getName(), type, text, file); } catch (e) { error = String(e.message || e); console.warn(error); }
  const confirmed = old && old.stato === 'confermata';
  return {
    id: file.getId(),
    titolo: (ai && ai.titolo) || (old && old.titolo) || file.getName().replace(/\.[^.]+$/, '').replace(/^\[Plaud\]\s*/i, ''),
    tipo: type,
    mime: file.getMimeType(),
    data: file.getDateCreated(),
    modificato: file.getLastUpdated(),
    categoria: (confirmed && old.categoria) || (ai && ai.categoria) || (old && old.categoria) || 'Da classificare',
    etichette: (confirmed && old.etichette) || (ai && ai.etichette.map(s => s.toLowerCase()).join(', ')) || (old && old.etichette) || '',
    riassunto: (ai && ai.riassunto) || (error ? 'Catalogazione AI non riuscita: ' + error : (text ? text.substr(0, 300) : 'Nessun testo estratto.')),
    testo: String(text || '').substr(0, MAX_TEXT),
    stato: confirmed ? 'confermata' : (ai && ai.sicura ? 'ai' : 'da rivedere'),
    url: file.getUrl(),
    autore: ownerEmail_(file),
    percorso: path,
    preferita: old ? old.preferita : false,
    colore: old ? old.colore : ''
  };
}

function ownerEmail_(file) {
  try { return file.getOwner() ? file.getOwner().getEmail() : ''; } catch (e) { return ''; }
}

function dateStr_(d) {
  if (!d) return '';
  const date = d instanceof Date ? d : new Date(d);
  return isNaN(date) ? '' : Utilities.formatDate(date, 'Europe/Rome', 'yyyy-MM-dd');
}

function escapeHtml_(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
