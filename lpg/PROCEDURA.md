# Procedura: dall'MD alla lezione montata

Sequenza della fase finale (moduli 6–8) del primo corso LPG. Ogni affermazione è marcata con una di tre etichette:

- **[P] prescrizione**: lo dicono `MASTER.md`, `STANDARD.md` o i registri di Prove;
- **[S] script**: è quello che fa il codice di Prove al commit indicato, letto riga per riga;
- **[V] verificato**: eseguito in locale il 2026-10-04 (sessione Claude, revisione 2), senza servizi a pagamento. Dove serviva un servizio esterno, è stato simulato e la riga lo dice.

Fonte: `aki1806-droid/Prove` @ `4ed8a32ef71452ce66b1c67e4084bd84c242c356`. Prove non si modifica: si lavora su una copia degli script in un'area di lavoro separata.

## 0. Variabili e directory

Tutti i comandi usano queste variabili. Vanno impostate in ogni nuova shell.

```bash
export PROVE="$HOME/prove-lpg"                    # clone in sola lettura
export WS="$HOME/lpg-lavoro"                      # area di lavoro, fuori da Prove
export LEZ="$WS/lezioni/6-1"                      # una cartella per lezione: <modulo>-<lezione>
```

| directory | contenuto | chi la scrive |
|---|---|---|
| `$PROVE` | sorgenti al commit fissato | nessuno, dopo il checkout |
| `$WS/script` | copia degli script, `node_modules`, `fonts_corso.css` | bootstrap |
| `$LEZ` | intermedi, audio, slide, clip, file del batch, `scene.json` | i passi sotto |

**Directory corrente [S]:** `tagli.py` e `verifica.py` ricevono la cartella come argomento. `carica.py` e `scene.py` leggono e scrivono **nella directory corrente**: vanno lanciati con `cd "$LEZ"`. Gli script Node risolvono `playwright` e leggono loghi e caratteri **dalla propria cartella**, cioè `$WS/script`.

## 1. Bootstrap

### 1.1 Sorgenti [V]

```bash
git clone --filter=blob:none https://github.com/aki1806-droid/Prove "$PROVE"
git -C "$PROVE" checkout 4ed8a32ef71452ce66b1c67e4084bd84c242c356
git -C "$PROVE" rev-parse HEAD    # deve stampare 4ed8a32ef71452ce66b1c67e4084bd84c242c356
```

### 1.2 Area di lavoro e Playwright con la versione fissata [V]

```bash
mkdir -p "$WS" "$LEZ"
cp -r "$PROVE/produzione/script" "$WS/script"
cd "$WS/script"
npm init -y >/dev/null
npm i --no-fund --no-audit playwright@1.56.1   # se la cache npm predefinita non è scrivibile: npm_config_cache="$WS/npm-cache" npm i ...
npx playwright --version          # Version 1.56.1
```

Playwright 1.56.1 vuole **Chromium build 1194** (141.0.7390.37). Le strade sono due:

- **A. Scaricarlo.** `npx playwright install --with-deps chromium`, dentro `$WS/script`. Serve accesso HTTPS a `cdn.playwright.dev` (e ai mirror che Playwright usa in caso di errore). `--with-deps` installa anche le librerie di sistema e richiede i permessi di amministratore. **[V] negativo:** in questa sessione il download è fallito con `403 ... no rule or allowlist entry allows host "cdn.playwright.dev"`. Va aperto quel dominio nella rete dell'ambiente, senza disattivare TLS.
- **B. Usare un Chromium già installato** della stessa build: `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, o il percorso dove si trova. **[V]** Funziona con `chromium-1194` già presente nell'ambiente cloud di questa sessione.

Prova di avvio, obbligatoria prima di rendere [V]:

```bash
cd "$WS/script"
cat > prova-avvio.mjs <<'EOF'
import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage();
await p.setContent('<p>ok</p>'); console.log('chromium', b.version(), await p.textContent('p'));
await b.close();
EOF
node prova-avvio.mjs              # atteso: chromium 141.0.7390.37 ok
```

### 1.3 Caratteri [V]

```bash
cd "$WS/script" && python3 fonts_embed.py
# atteso: fonts_corso.css: 12 facce su 24 (latin e latin-ext)
```

Servono `fonts.googleapis.com` e `fonts.gstatic.com` raggiungibili da curl **[S]**. Chromium non li raggiunge e non lo segnala **[P]**: senza `fonts_corso.css` lo script si ferma, perché `slide_corso.mjs` legge il file all'avvio **[S]**.

### 1.4 Altri prerequisiti

`python3` 3.11 (solo libreria standard), `ffmpeg` con `libx264` e `libmp3lame`, `curl`. Versioni provate qui: Node 22.22, Python 3.11.15, ffmpeg di sistema. Le versioni usate in produzione non sono registrate.

## 2. Intermedi della lezione

Formati **[S]**, verificati sulla 6.1 **[V]**:

| file | formato |
|---|---|
| `blocchi.json` | lista di `{"id": "sNN", "text": "..."}`, da `s02` in poi |
| `chunks.json` | `{"A": ["s02", …], "B": [… , "s49"]}`: **liste di ID stringa**, non oggetti. A+B nell'ordine devono dare tutti i blocchi. Nella 6.1: A = 16 ID (`s02`–`s17`), B = 32 ID (`s18`–`s49`) |
| `slides.json` | lista di `{"file": "cNN", "layout": "...", ...}`; `c01` copertina, `c99` chiusura |
| `media.json` | `{"sNN": {"tipo": "foto"|"video", "cosa": "...", "url": "..."}}` per i blocchi che sono riprese |
| `pose.json` | `{"sNN": secondi}`, JSON valido senza ellissi |

Controllo prima di generare la voce [V]:

```bash
cd "$LEZ" && python3 - <<'EOF'
import json, re
B = json.load(open('blocchi.json')); C = json.load(open('chunks.json'))
ids = [b['id'] for b in B]; T = {b['id']: b['text'] for b in B}
assert set(C) == {'A', 'B'}, 'chunks: servono le chiavi A e B'
assert all(isinstance(i, str) for i in C['A'] + C['B']), 'chunks: liste di ID stringa'
assert C['A'] + C['B'] == ids, 'chunks: A+B deve dare tutti i blocchi, in ordine'
for k in 'AB':
    n = len('\n'.join(T[i] for i in C[k]))
    print(k, len(C[k]), 'blocchi', n, 'caratteri'); assert n < 5000, f'{k} oltre 5000 caratteri'
print('scene previste', len(ids) + 2); assert len(ids) + 2 <= 50
EOF
```

Sulla 6.1 stampa `A 16 blocchi 1743 caratteri`, `B 32 blocchi 3452 caratteri`.

## 3. Slide [V]

```bash
cd "$WS/script"
node cards_corso.mjs "$LEZ/slides.json" "$LEZ/png"          # PNG fermi, da guardare
node clips_corso.mjs "$LEZ/slides.json" "$LEZ/frames" 3.0   # fotogrammi a 25 fps
mkdir -p "$LEZ/clip"
for f in "$LEZ"/frames/c*/; do
  c=$(basename "$f")
  ffmpeg -loglevel error -y -framerate 25 -i "$f/f%04d.png" \
    -c:v libx264 -pix_fmt yuv420p -crf 19 "$LEZ/clip/$c.mp4"
done
```

[V] sulla 6.1, nella sessione Claude: `cards_corso.mjs` su tutte le 47 voci (47 PNG); `clips_corso.mjs` e la codifica **solo su tre slide** (`c01`, `c33`, `c99`: h264, 1920×1080, yuv420p, 25 fps, 3,000 s). Il ciclo completo delle 47 clip non è stato eseguito. Codex non ha potuto ripetere il rendering: browser 1194 e Google Fonts erano bloccati nel suo ambiente (`REVISIONE_CODEX_2.md`). Le slide `ciclo: N` durano N secondi **[S]**. I blocchi che sono riprese non hanno clip: `scene.py` prende l'URL da `media.json` **[S]**.

## 4. Voce (a pagamento) [P]

Due chiamate ElevenLabs, `eleven_v3`, voce `tVdVcJPudubxmTmAw4tE`, `generations_count: 1`. Il testo di A e il testo di B sono i blocchi uniti nell'ordine di `chunks.json`. File attesi: `$LEZ/unico_A_raw.mp3` e `$LEZ/unico_B_raw.mp3`.

## 5. Tagli

### 5.1 Ciclo allinea → trascrivi → verifica → correggi

```bash
python3 "$WS/script/tagli.py" allinea "$LEZ"     # scrive tagli.json, prova_meta.json, prova.mp3
# trascrivere $LEZ/prova.mp3 con ElevenLabs scribe (a pagamento) → $LEZ/trascrizione.txt
python3 "$WS/script/verifica.py" "$LEZ" "$LEZ/trascrizione.txt"   # scrive code.json
python3 "$WS/script/tagli.py" correggi "$LEZ"    # riscrive tagli.json E prova.mp3
# trascrivere di nuovo $LEZ/prova.mp3 e ripetere verifica/correggi
```

- **[S]** `correggi` termina chiamando la stessa funzione `prova()` di `allinea`, che scrive sempre **`prova.mp3`**. Il messaggio finale «riprova.mp3 aggiornato» è sbagliato: quel file non esiste. **[V]** Dopo `correggi`, `prova.mp3` risulta riscritto e `riprova.mp3` non esiste. Va trascritto ogni volta il `prova.mp3` nuovo, mai una trascrizione precedente.
- **[S]** `verifica.py` conta «fuori posto» **solo sui confini con una coda**. I confini senza coda restano stringhe vuote in `code.json`, e `correggi` li salta. Esce con 0 anche quando le code mancano tutte o in parte; esce con errore solo per un'eccezione (file assente, JSON non valido).

### 5.2 Criterio di uscita: copertura + fuori posto + banda

«fuori posto: 0» **non basta**. [V] Con una trascrizione vuota, `verifica.py` stampa `0 pezzi, 46 confini | senza coda: [... 46 confini ...] | fuori posto: 0` ed esce con 0.

Il controllo di copertura verifica prima l'**integrità** dei file, poi conta:

- i confini attesi sono, nell'ordine, tutti i blocchi di A tranne l'ultimo e tutti quelli di B tranne l'ultimo (46 nella 6.1) **[S]**, come li scrive `allinea` in `prova_meta.json`;
- `prova_meta.json` deve elencare esattamente quei confini, altrimenti va rifatto `allinea`;
- `code.json` deve essere una lista di **testi**, con tante voci quanti sono i confini. Una lista troncata o allungata viene respinta prima del conteggio;
- solo allora si contano le code vuote.

Controllo di copertura, da eseguire dopo ogni `verifica.py` [V]:

```bash
cd "$LEZ" && python3 - <<'EOF'
import json, sys
def stop(msg): print('COPERTURA NON VALIDA:', msg); sys.exit(1)
C = json.load(open('chunks.json')); meta = json.load(open('prova_meta.json')); code = json.load(open('code.json'))
attesi = C['A'][:-1] + C['B'][:-1]                      # un confine dopo ogni blocco, tranne l'ultimo di A e di B
if not attesi: stop('nessun confine atteso: chunks.json vuoto?')
if not isinstance(meta, list) or [m.get('fine_di') for m in meta] != attesi:
    stop(f'prova_meta.json non corrisponde a chunks.json ({len(meta)} voci, attese {len(attesi)}): rifare allinea')
if not isinstance(code, list) or len(code) != len(meta):
    stop(f'code.json ha {len(code) if isinstance(code, list) else "?"} voci, i confini sono {len(meta)}: rifare verifica.py')
if not all(isinstance(c, str) for c in code): stop('code.json contiene voci che non sono testo')
vuoti = [m['fine_di'] for m, c in zip(meta, code) if not c.strip()]
print('COPERTURA', len(meta) - len(vuoti), '/', len(meta), '| senza coda:', vuoti or 'nessuno')
sys.exit(1 if vuoti else 0)
EOF
```

[V] Esiti sulla traccia sintetica della 6.1 (revisione 3 di Claude):

| caso | esito | uscita |
|---|---|---|
| trascrizione simulata delle code | `COPERTURA 46 / 46` | 0 |
| `code.json` = `[]` | `code.json ha 0 voci, i confini sono 46` | 1 |
| `code.json` con 43 voci / con 47 voci | respinto per cardinalità | 1 |
| una coda vuota | `COPERTURA 45 / 46 \| senza coda: ['s07']` | 1 |
| una voce `null` | `contiene voci che non sono testo` | 1 |
| trascrizione vuota passata da `verifica.py` | `COPERTURA 0 / 46` | 1 |
| `prova_meta.json` senza il primo confine | `non corrisponde a chunks.json` | 1 |

Un confine senza coda si chiude solo in uno di questi modi, annotati nel registro **[P]**:

1. **controprova**: 3–5 s prima del confine, trascritti da soli o concatenati con altri confini; la finestra deve leggere esattamente la coda del blocco;
2. **code consecutive mancanti con i blocchi in banda**: è punteggiatura dello scriba, non un confine sbagliato, ma va scritto nel registro con i valori di banda;
3. **nessuna pausa fra due blocchi** (il secondo non inizia con una frase nuova): taglio sui caratteri, accettato e annotato.

Anche con copertura piena, il conteggio dei pezzi non prova l'allineamento: lo scriba può saltare una coda e aggiungerne un'altra **[P]**. Per questo serve la banda (5.3).

**[S]** `tagli.py applica` **continua** dopo un errore di ffmpeg: stampa `ERRORE sNN` e scrive in `durate.json` solo i blocchi riusciti. Una durata mancante non deve sparire dalla verifica: per questo il controllo 5.3 parte dall'elenco completo dei blocchi.

### 5.3 Integrità delle durate e banda caratteri/secondo, prima delle pose [V]

```bash
python3 "$WS/script/tagli.py" applica "$LEZ"     # senza pose: durate nette
cd "$LEZ" && python3 - <<'EOF'
import json, math, os, re, subprocess, sys
def stop(msg): print('BANDA NON VALIDA:', msg); sys.exit(1)
blocchi = json.load(open('blocchi.json')); ids = [b['id'] for b in blocchi]
if not ids: stop('blocchi.json vuoto')
if len(set(ids)) != len(ids): stop('ID duplicati in blocchi.json')
D = json.load(open('durate.json'))
if not isinstance(D, dict): stop('durate.json non è un oggetto')
mancano = [i for i in ids if i not in D]; extra = [k for k in D if k not in ids]
if mancano or extra: stop(f'durate mancanti {mancano or "-"}, estranee {extra or "-"}: rifare applica e leggere gli ERRORE')
bad = [k for k, v in D.items() if not isinstance(v, (int, float)) or isinstance(v, bool) or not math.isfinite(v) or v <= 0]
if bad: stop(f'durate non valide: {bad}')
rif = os.path.getmtime('tagli.json'); prob = []
for i in ids:
    p = f'mp3u/{i}.mp3'
    if not os.path.isfile(p): prob.append(f'{i}: file assente'); continue
    if os.path.getmtime(p) < rif: prob.append(f'{i}: più vecchio di tagli.json'); continue
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True)
    try: d = float(r.stdout.strip())
    except ValueError: prob.append(f'{i}: illeggibile'); continue
    if abs(d - D[i]) > 0.1: prob.append(f'{i}: file {d:.2f} s, durate.json {D[i]} s')
if prob: stop('; '.join(prob))
if os.environ.get('SOLO_INTEGRITA'):
    print('INTEGRITA', len(ids), '/', len(ids), 'blocchi con durata valida e mp3 del run attuale'); sys.exit(0)
T = {b['id']: re.sub(r'\[[a-z ]+\]', '', b['text']).strip() for b in blocchi}
fuori = [(i, round(len(T[i]) / D[i], 1)) for i in ids if not 8 <= len(T[i]) / D[i] <= 21]
print('BANDA', len(ids) - len(fuori), '/', len(ids), 'in 8-21 | fuori:', fuori or 'nessuno')
sys.exit(1 if fuori else 0)
EOF
```

Cosa controlla, nell'ordine:

1. `blocchi.json` non vuoto, senza ID duplicati;
2. `durate.json` con **esattamente** gli ID dei blocchi, né mancanti né estranei;
3. ogni durata numerica, finita e maggiore di zero;
4. per ogni blocco, `mp3u/sNN.mp3` presente, **non più vecchio di `tagli.json`** (cioè del run attuale), leggibile con `ffprobe` e lungo come in `durate.json` (±0,1 s);
5. solo allora la banda 8–21 su **tutti** i blocchi.

Con la variabile `SOLO_INTEGRITA=1` esportata ci si ferma ai punti 1–4: si esegue lo stesso blocco come `( export SOLO_INTEGRITA=1; cd "$LEZ" && python3 - <<'EOF' … EOF )`, cioè dentro una sotto-shell. Serve dopo le pose (5.4), prima del batch.

- Il controllo toglie i tag di intenzione prima di contare, perché non si sentono **[P]**.
- La banda va misurata **prima** delle pose, perché un blocco allungato con `apad` può scendere sotto 8 per effetto della posa e non del taglio. Questo ordine non è scritto nelle fonti, che dicono solo «dopo `applica`»: è una scelta di questo pacchetto.
- La banda di MASTER §5 è 8,5–21, quella di STANDARD 8–21. Un blocco fuori banda con i confini confermati per contenuto e i vicini in banda si annota e si lascia **[P]**.

[V] Esiti sulla traccia sintetica della 6.1 (revisione 3):

| caso | esito | uscita |
|---|---|---|
| positivo, senza pose | `BANDA 48 / 48` | 0 |
| `durate.json` = `{}` | durate mancanti: tutti i 48 blocchi | 1 |
| `s20` mancante / a zero / come testo | respinto | 1 |
| `mp3u/s21.mp3` assente | `s21: file assente` | 1 |
| `mp3u/s22.mp3` più vecchio di `tagli.json` | `s22: più vecchio di tagli.json` | 1 |
| `mp3u/s23.mp3` sostituito da un altro blocco | `s23: file 6.03 s, durate.json 5.72 s` | 1 |
| `SOLO_INTEGRITA=1` dopo le pose | `INTEGRITA 48 / 48` | 0 |
| `SOLO_INTEGRITA=1` con `s30` mancante | respinto | 1 |

### 5.4 Pose [V]

```bash
python3 -m json.tool "$LEZ/pose.json" >/dev/null     # JSON valido
python3 "$WS/script/tagli.py" applica "$LEZ" "$(cat "$LEZ/pose.json")"
# poi il controllo 5.3 in una sotto-shell con export SOLO_INTEGRITA=1, prima di preparare il batch
```

[V] Con le 22 pose della 6.1, ricostruite dal registro (vedi `campione/README.md`): 22/22 blocchi alla durata chiesta, totale 354,4 s sulla traccia sintetica.

## 6. Riprese (a pagamento) [P]

Mondo visivo del modulo + soggetto + suffisso di stile; circa tre per lezione. Si registrano in `media.json`. Prima del montaggio completo si fa un montaggio di prova da due scene, perché le riprese da URL non si possono guardare in anticipo.

## 7. Caricamento su HeyGen

### 7.1 Tracce di silenzio [S]

`scene.py` ancora copertina e chiusura a due asset di silenzio, i cui ID sono **scritti nel codice** (`SIL3`, `SIL10`) e valgono solo nell'account HeyGen del primo corso. In un altro account vanno creati e caricati con il resto:

```bash
cd "$LEZ" && mkdir -p mp3u
for s in 3 10; do
  ffmpeg -loglevel error -y -f lavfi -t $s -i anullsrc=r=44100:cl=mono \
    -c:a libmp3lame -b:a 128k -ar 44100 -ac 1 mp3u/muto$s.mp3
done
```

Vanno in `mp3u/`, perché `carica.py` cerca lì ogni file `a_*` **[S]**.

### 7.2 `batch_in.json` [V]

Non esiste un generatore in Prove. `carica.py` richiede che `batch_in.json` elenchi i file **nello stesso ordine** degli item della risposta, e ricava il percorso locale dal prefisso: `a_X.mp3` → `mp3u/X.mp3`, `v_X.mp4` → `clip/X.mp4`, `m_*` → `musica.mp3` **[S]**.

```bash
cd "$LEZ" && python3 - <<'EOF'
import json, os, glob
files = [{'filename': 'a_' + os.path.basename(p), 'content_type': 'audio/mpeg', 'size_bytes': os.path.getsize(p)}
         for p in sorted(glob.glob('mp3u/*.mp3'))]
files += [{'filename': 'v_' + os.path.basename(p), 'content_type': 'video/mp4', 'size_bytes': os.path.getsize(p)}
          for p in sorted(glob.glob('clip/*.mp4'))]
assert len(files) <= 100, f'{len(files)} file: massimo 100 per batch'
json.dump(files, open('batch_in.json', 'w'), indent=1); print(len(files), 'file')
EOF
```

`size_bytes` deve essere esatto: è firmato nell'URL, e un byte di differenza dà 403 **[P]**. Si passa lo stesso elenco a `create_asset_upload_batch` e si salva la risposta in `$LEZ/risposta_batch.json`. [V] Sulla 6.1, con clip di prova al posto di quelle vere: 97 file (48 blocchi + 2 silenzi + 47 clip), sotto il limite.

### 7.3 PUT e controllo degli errori

Il blocco gira in una sotto-shell, così un `exit` non chiude il terminale:

```bash
(
cd "$LEZ"
python3 "$WS/script/carica.py" risposta_batch.json > carica.log 2>&1
rc=$?
cat carica.log
if [ "$rc" -ne 0 ]; then echo "CARICAMENTO FALLITO: carica.py uscito con $rc"; exit 1; fi
if ! grep -q "| errori \[\]$" carica.log; then echo "CARICAMENTO FALLITO: errori nei PUT"; exit 1; fi
echo "PUT OK: ora complete_asset_batch e get_asset_batch fino a completed per ogni item"
)
```

- **[S]** `carica.py` registra l'`asset_id` in `assets.json` **anche quando il PUT fallisce** ed esce con 0 anche con errori di PUT. Esce con errore solo per un'eccezione: file assente, JSON non valido, numero di item della risposta diverso da `batch_in.json`. Né il codice di uscita da solo né la presenza di `assets.json` dimostrano il caricamento.
- Il wrapper non usa pipe: il codice di uscita è quello di `carica.py`, non quello di `tee`. Poi si legge la riga `errori []`. **Servono entrambe le condizioni.**
- `carica.log` contiene nomi di file e codici HTTP, non gli URL firmati né gli header (curl è chiamato con l'output catturato). Va comunque tenuto fuori dal repository.

[V] Esiti (server PUT locale, nessun HeyGen):

| caso | esito | uscita |
|---|---|---|
| processo finto che stampa `errori []` ed esce con 1 | `carica.py uscito con 1` | 1 |
| processo finto con eccezione dopo `errori []` | `carica.py uscito con 1` | 1 |
| `carica.py` reale, due PUT a 403 | `errori nei PUT` | 1 |
| `carica.py` reale, tutti 200 | `PUT OK` | 0 |
| risposta con un item in meno | `carica.py uscito con 1` (assert) | 1 |

Dopo i PUT: `complete_asset_batch`, poi `get_asset_batch` finché **ogni** item è `completed` **[P]**. Lo schema della risposta di `get_asset_batch` non è registrato nelle fonti: il controllo si fa sulla risposta reale, item per item, confrontando gli `asset_id` con `assets.json`. Un batch parziale non si monta. Per rifare solo i file falliti si prepara un batch con quelli: `carica.py` unisce gli id a quelli già presenti **[S]**.

## 8. Lista delle scene

### 8.1 Lezione ordinaria [V]

Prima si mettono nella **copia di lavoro** di `scene.py` gli ID dei silenzi del proprio account. Mai in Prove.

```bash
cd "$LEZ"
S3=$(python3 -c "import json;print(json.load(open('assets.json'))['ids']['a_muto3.mp3'])")
S10=$(python3 -c "import json;print(json.load(open('assets.json'))['ids']['a_muto10.mp3'])")
sed -i "s/^SIL3 = '[0-9a-f]*'/SIL3 = '$S3'/; s/^SIL10 = '[0-9a-f]*'/SIL10 = '$S10'/" "$WS/script/scene.py"
python3 "$WS/script/scene.py" 2 49               # scrive scene.json
```

[V] Con gli asset del server finto: 50 scene; la prima ancorata a `a_muto3.mp3` e l'ultima a `a_muto10.mp3`; slide in `freeze`, 3 riprese da URL (`image`).

### 8.2 Chiusure di modulo e di corso

| | prescrizione [P] | implementazione [S] | misura nei registri |
|---|---|---|---|
| lezione ordinaria | 10 s | `SIL10` | durata − somma dei blocchi = **11,8 s** (6.1, 8.1) |
| fine modulo | **15 s** (STANDARD §3) | nessuna: `scene.py` usa sempre `SIL10` | **11,8 s** anche in 6.5 e 7.5, 11,9 in 5.5. Inferenza: con lo script e questi numeri, la chiusura da 15 s non risulta applicata nei moduli 5–7. Non è una misura diretta dei video |
| fine corso (8.5) | 20 s | `copioni/8-5-scene85.py` con `a_chiusura20.mp3` | 389,0 − 367,1 = 21,9 s = 3 + 20 − 1,1 |

Nella fase finale la differenza riportata dai registri è sempre circa **1,2 s meno** di copertina + chiusura nominali. La causa non è documentata. Non va usata come calibrazione universale del render. Che i video pubblicati siano proprio quelle versioni lo deve confermare l'utente.

Per una chiusura di modulo da 15 s, se l'utente la vuole davvero: creare `mp3u/muto15.mp3` come in 7.1, caricarlo, e mettere il suo ID al posto di `SIL10` nella copia di lavoro prima di lanciare `scene.py`. [V] non eseguito con 15 s; è la stessa sostituzione verificata per 10 s.

### 8.3 Lezione con scena muta e chiusura lunga (8.5) [S]

Si usa `"$PROVE/produzione/copioni/8-5-scene85.py"`, copiato in `$WS/script/scene85.py` e modificato nella copia (`SIL3`), dalla directory `$LEZ`. Richiede in `assets.json`:

- `a_muto25.mp3`: la musica della scena muta `s22`, 25 s;
- `a_chiusura20.mp3`: la musica della chiusura, 20 s;
- entrambi in `mp3u/` prima del batch, riportati a 128 kbps, 44,1 kHz, mono **[P]**.

Non usa il prefisso `m_*`. Il ciclo dei blocchi va da `s02` a `s49` ed è scritto nel codice.

## 9. Montaggio (a pagamento) [P]

`create_video_from_studio` con le scene di `scene.json`, `aspectRatio: "16:9"`, `resolution: "1080p"`, `caption: {file_format: "srt", style: "default"}`.

Controllo della durata dopo il render:

```
attesa = somma(durate.json) + durata reale dell'audio di copertina + durata reale dell'audio di chiusura
         (+ le scene mute, se ci sono)
```

Le durate reali si misurano sui file con `ffprobe -v error -show_entries format=duration -of csv=p=0 FILE`. Dai registri ci si aspetta un render circa 1,2 s più corto dell'attesa. Uno scarto di parecchi secondi segnala una scena collassata **[P]**. La durata finale deve stare entro 10 s dall'obiettivo **[P]**.

## 10. Registro [P]

`video_id`, durata e parlato, riscrittura, grafiche, riprese, giri di tagli e confini senza coda con la loro chiusura (5.2), pose, «da verificare».

## Ripresa dopo un errore

| situazione | cosa fare | tipo |
|---|---|---|
| `carica.py` stampa errori | rifare il batch solo con i file falliti; non montare prima di `errori []` e di tutti gli item `completed` | [S]+[P] |
| PUT con 403 | `size_bytes` non esatto: rigenerare `batch_in.json` dai file attuali | [P] |
| HeyGen rifiuta un mp3 | riportarlo a 128 kbps, 44,1 kHz, mono | [P] |
| copertura incompleta | controprova sui confini senza coda (5.2) | [P] |
| `correggi` torna due volte sullo stesso confine | `silencedetect` a `d=0.10` e scelta manuale | [P] |
| catena sfasata di uno | ricostruire sul tempo di parlato netto fra due confini certi | [P] |
| scena che dura un secondo | manca l'audio d'ancoraggio: controllare l'ID del silenzio | [P] |
| `node` non trova `playwright` | lanciare gli script da `$WS/script` dopo il bootstrap 1.2 | [S] |
| slide con caratteri di sistema | manca o è vuoto `fonts_corso.css`: rifare 1.3 | [P] |
| crediti esauriti | fermarsi e chiedere all'utente | [P] |

## Criteri di completamento di una lezione

1. controllo di copertura (5.2) superato: file integri, copertura piena, oppure ogni confine senza coda chiuso secondo 5.2 e annotato;
2. `verifica.py`: «fuori posto: 0» sull'ultima trascrizione del `prova.mp3` corrente;
3. controllo 5.3 superato prima delle pose (integrità + banda 8–21 su tutti i blocchi, o eccezione annotata con l'evidenza) e, dopo le pose, con `SOLO_INTEGRITA=1`;
4. PNG guardati tutti una volta, diagrammi e tabelle due;
5. wrapper 7.3 uscito con 0 (`carica.py` a 0 **e** `errori []`), poi tutti gli item del batch `completed`;
6. scene ≤ 50, con la chiusura della durata decisa;
7. durata del render coerente con l'attesa (sezione 9) ed entro 10 s dall'obiettivo;
8. registro scritto, con «da verificare» compilato.

L'ascolto dell'audio e la visione del montato restano all'utente.
