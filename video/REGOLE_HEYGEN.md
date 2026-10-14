# Regole per creare video con HeyGen

Documento operativo per Claude e Codex. Prima di generare qualsiasi video HeyGen si legge questo file, si raccolgono **tutte** le variabili della sezione 2 e si chiede conferma all'utente. Valori e limiti degli strumenti sono quelli del connettore HeyGen verificati il 2026-10-14: se il connettore cambia, vale lo schema attuale dello strumento.

Le scelte già fatte nei progetti dell'utente sono indicate come **predefinito dell'utente**: si propongono, ma si confermano a ogni nuovo video.

---

## 1. Regole generali (sempre)

1. **Niente spese senza autorizzazione.** Render, voce, b-roll, avatar e traduzioni consumano crediti. Prima di lanciare si dice cosa si genera, quante chiamate e la stima dei crediti, e si aspetta il «sì» esplicito dell'utente. Un'autorizzazione vale per quel video, non per i successivi.
2. **Mai inventare ID.** Avatar, look, voce, template, brand kit, glossario e cartella si ricavano dagli strumenti (`list_avatar_groups` → `list_avatar_looks`, `list_voices`, `list_templates`, `list_brand_kits`, `list_brand_glossaries`) o li fornisce l'utente. Se ci sono più candidati si chiede quale.
3. **Il copione non si tocca.** Il testo dell'utente si usa parola per parola, salvo richiesta esplicita di riscriverlo.
4. **Una sola richiesta di creazione per video.** Per sapere a che punto è si interroga lo stato (`get_video`, `get_model_video`, `get_video_agent_session`), mai una nuova creazione. Attesa tra due controlli: quella indicata dal server, altrimenti 30 secondi. Dopo 5 minuti si comunicano stato e link e si riprende dopo.
5. **Errore o esito incerto:** prima si controlla lo stato; non si ripete in automatico una generazione fallita (costerebbe due volte). Su `failed` o `cancelled` ci si ferma e si spiega.
6. **Crediti esauriti:** ci si ferma e si chiede.
7. **File pesanti fuori da `main`.** Video, clip, audio e scene non vanno in commit su `main` (vedi `AGENTS.md`, massimo circa 20 MB per commit). Nel repository si registrano solo `video_id`, durata, link e manifest.
8. **Niente segreti** (chiavi API, URL firmati, header di upload) nei file o nei log versionati.
9. **Dati finti** nelle registrazioni schermo e negli esempi: mai dati personali reali.
10. **Registro finale** per ogni video (sezione 7).

---

## 2. Questionario: le variabili da chiedere

Si chiedono in blocco, in un solo messaggio, segnando i valori predefiniti proposti. Le voci con ★ sono **bloccanti**: senza risposta non si parte.

### 2.1 Obiettivo e destinazione

| # | Variabile | Opzioni / esempio | Predefinito |
|---|---|---|---|
| 1 ★ | **Titolo** del video (anche come titolo in HeyGen) | «IA per chi fa sindacato · 4.2 Dare esempi» | — |
| 2 ★ | **Progetto / corso**, modulo, lezione | LPG, IA sindacato, OSS, infermieri… | — |
| 3 ★ | **Tipo di video** (sezione 3) | avatar, solo voce + scene, foto parlante, Video Agent, clip AI, template, traduzione | — |
| 4 | **Pubblico** e **tono** | colleghi, iscritti, pubblico social; formale, caldo, ironico | seconda persona singolare, tono caldo |
| 5 ★ | **Dove andrà pubblicato** | Skillplate, YouTube, Instagram/TikTok, sito, WhatsApp | — |
| 6 ★ | **Formato** (`aspectRatio`) | `16:9`, `9:16`, `1:1`, `4:5`, `5:4`, `auto` | `16:9` per i corsi; `9:16` per reel/short |
| 7 | **Risoluzione** | `720p`, `1080p`, `4k` (solo Avatar III digital twin e studio avatar) | `1080p` |
| 8 ★ | **Durata obiettivo** | es. 6:00 a lezione; 30–60 s per i social | 6:00 per lezione LPG |
| 9 | **Cartella HeyGen** di destinazione (`folderId`) | esistente o da creare | radice dello spazio di lavoro |

### 2.2 Testo

| # | Variabile | Note | Predefinito |
|---|---|---|---|
| 10 ★ | **Copione** o fonte (MD, PDF, scaletta) | da usare alla lettera, o da scrivere/riscrivere? | alla lettera |
| 11 | **Lingua** | italiano, inglese… | italiano |
| 12 | **Divisione in scene/blocchi** | un concetto per blocco, 100–150 caratteri | come metodo LPG |
| 13 | **Parole difficili / sigle** | servono un glossario di pronuncia (`brandGlossaryId`)? | nessuno |
| 14 | **Testi di copertina e chiusura** | titolo, sito, call to action | copertina 3 s, chiusura 10 s (15 s fine modulo, 20 s fine corso) |

### 2.3 Voce

| # | Variabile | Opzioni | Predefinito dell'utente |
|---|---|---|---|
| 15 ★ | **Voce** (nome; l'ID si cerca) | voce HeyGen, clone, voce ElevenLabs esterna | «Achille nuovo 1 v4» (HeyGen, IA sindacato); Luca Ward ElevenLabs `eleven_v3` (LPG) |
| 16 ★ | **Motore** | TTS di HeyGen (`script` + `voice_id`) **oppure** audio già pronto (`audio_asset_id` / `audio_url`) | LPG: audio ElevenLabs caricato; mai TTS HeyGen né Video Agent |
| 17 | **Velocità** | `voiceSettings.speed` 0,5–1,5 (in `create_speech` 0,5–2,0) | **1,12×** (LPG: applicata in post con `atempo`, non nel TTS) |
| 18 | Tono, pitch, volume | `pitch` −50…+50; `volume` 0–1 | 0 / 1 |
| 19 | Impostazioni ElevenLabs (se voce ElevenLabs) | `model`, `stability`, `similarity_boost`, `style`, `use_speaker_boost` | modello `eleven_v3`; gli altri valori non sono registrati: chiedere |
| 20 | **Locale / accento** | `it-IT`… | — |

### 2.4 Immagine

| # | Variabile | Opzioni | Predefinito |
|---|---|---|---|
| 21 ★ | **Avatar sì/no** | con avatar, solo voce, foto parlante | **senza avatar** (corsi recenti) |
| 22 | Se avatar: **gruppo e look** | da `list_avatar_groups` + `list_avatar_looks` | da far scegliere |
| 23 | Se avatar: **motore** | `avatar_iv` (predefinito), `avatar_v` (qualità più alta), `avatar_iii` (4K per digital twin) | controllare `supported_api_engines` del look |
| 24 | Se avatar: sfondo, rimozione sfondo, `fit`, `expressiveness`, `motionPrompt` | colore hex / immagine / video; `contain`/`cover`; `low`/`medium`/`high` | sfondo del brand |
| 25 ★ | **Materiale visivo delle scene** | slide PNG 1920×1080, clip MP4, foto, b-roll generato, registrazioni schermo | — |
| 26 | **Palette, caratteri, logo** / brand kit (`brandKitId`) | come LPG o nuovi | LPG: avorio `#F7F3EA`, blu `#12294A`, oro `#C39A4E`; Cormorant Garamond + Jost |
| 27 | **B-roll generato**: servizio, quante clip, stile | HeyGen Video 1, Artlist (Kling 2.6 Pro 5 s), Higgsfield | circa 3 per lezione; suffisso di stile LPG; nessun volto riconoscibile, niente testo |
| 28 | **Registrazioni schermo** | quali strumenti, chi le registra | solo dati finti |

### 2.5 Audio, sottotitoli, montaggio

| # | Variabile | Opzioni | Predefinito |
|---|---|---|---|
| 29 | **Sottotitoli** | nessuno; solo file SRT; impressi nel video (`caption.style: "default"`) | `caption: {file_format: "srt", style: "default"}` |
| 30 | **Musica di sottofondo** | sì/no, quale, volume | almeno 20 dB sotto la voce, abbassata nelle registrazioni schermo |
| 31 | **Transizioni** | stacco netto, dissolvenza breve | dissolvenza breve |
| 32 | **Comportamento delle clip** (`playback.mode`) | `freeze`, `loop`, `fit_to_scene`; `mute` | slide `freeze` mute; riprese `loop` mute |

### 2.6 Budget e consegna

| # | Variabile | Note |
|---|---|---|
| 33 ★ | **Budget crediti** massimo | per render, voce, b-roll |
| 34 | **Prova prima del render completo?** | montaggio di prova da 2 scene (consigliato quando ci sono riprese da URL) |
| 35 | **Consegna** | link HeyGen, download MP4, caricamento su Skillplate/Robin/Drive |
| 36 | **Scadenza** | data di pubblicazione |

---

## 3. Scegliere il tipo di video e lo strumento

| Caso | Strumento HeyGen | Note |
|---|---|---|
| Avatar che dice un copione esatto | `create_video_from_avatar` | serve il look confermato; `script`+`voiceId` **oppure** `audioAssetId`/`audioUrl` |
| Lezione a scene (slide/clip/foto + voce), con o senza avatar | `create_video_from_studio` | **1–50 scene**, una chiamata per video; metodo dei corsi |
| Foto qualsiasi che parla | `create_video_from_image` | |
| Video aperto/creativo da un prompt | `create_video_agent` | `mode: "chat"` predefinito (si rivedono le scelte); `"generate"` solo se l'utente non vuole revisioni; `orientation: "portrait"` per verticale; condividere `https://app.heygen.com/video-agent/{session_id}` |
| Clip AI di b-roll (5–15 s) | `text_to_video`, `image_to_video`, `reference_to_video` | modello HeyGen Video 1; risoluzione 480p/768p/1080p/2k (1080p e 2k solo 16:9 o 9:16); stato con `get_model_video` |
| Video da un template | `generate_from_template` | riempire **tutte** le variabili di testo, altrimenti resta `{{nome}}` nel video; `fps` 25/30/60 |
| Traduzione di un video esistente | `create_video_translation` | `outputLanguages` da `list_video_translation_languages`; `mode` `speed` o `precision` |
| Solo audio | `create_speech` | massimo 5.000 caratteri per chiamata |

Se il tipo non è chiaro si chiede: «Vuoi un video con avatar che legge il tuo copione, oppure un video generato con l'IA (HeyGen Video 1)?»

---

## 4. Regole tecniche

### 4.1 Asset da caricare

- Caricamento: `create_asset_upload_batch` → PUT con gli header restituiti → `complete_asset_batch` → `get_asset_batch` finché ogni item è `completed`. Massimo 100 file per batch.
- `size_bytes` deve essere **esatto**: un byte di differenza dà 403.
- Audio: mp3 **128 kbps, 44,1 kHz, mono** (se HeyGen rifiuta un mp3, riconvertirlo così).
- Slide e immagini: **1920×1080** per il 16:9 (1080×1920 per il 9:16).
- Clip: h264, yuv420p; LPG 25 fps.
- Nomi nel batch: `a_sNN.mp3` audio, `v_cNN.mp4` clip, `m_*` musica.
- Non montare finché ci sono errori di caricamento o item non `completed`.

### 4.2 Montaggio a scene (`create_video_from_studio`)

- Massimo **50 scene**: copertina + blocchi + chiusura.
- Ogni scena con voce prende la durata dall'audio. Scena muta: immagine con `duration` (≤ 300 s) oppure clip ancorata a una traccia di silenzio.
- Slide: scena `video` dalla clip, `playback: {mode: "freeze", mute: true}`, audio del blocco in `audio_asset_id`.
- Ripresa video: `mode: "loop"`, muta. Ripresa foto: scena `image` con l'audio del blocco.
- Le tracce di silenzio (3 s, 10 s…) vanno create e caricate **nell'account in uso**: gli ID del primo corso non valgono altrove.
- Le scene vengono ritagliate al centro sul formato scelto: controllare che nulla di importante stia ai bordi.

### 4.3 Voce

- Copione con vocali accentate scritte con l'apostrofo nel testo parlato quando si usa ElevenLabs (`perche'`); le accentate restano a schermo.
- ElevenLabs: limite 5.000 caratteri per generazione; `generations_count: 1`.
- Velocità media attesa: circa 18 caratteri al secondo sul montato finito a 1,12×.
- Il TTS di HeyGen non applica il glossario all'audio caricato: per l'audio esterno la pronuncia si corregge prima.

### 4.4 Avatar

- Look confermato dall'utente; mai sostituire il presentatore in silenzio.
- Digital twin: serve il video di addestramento e il consenso (`create_avatar_consent`).
- `webm` con sfondo trasparente solo con avatar addestrati con matting.

---

## 5. Flusso di lavoro

1. **Questionario** (sezione 2): risposte alle voci ★, conferma dei predefiniti.
2. **Ricognizione account**: `get_current_user`, voci, avatar, template, brand kit disponibili. Riportare i nomi, non gli ID.
3. **Preparazione locale**: copione diviso in blocchi, scaletta (`03_scaletta.csv` o `chunks.json`), slide, audio, clip. Controlli di coerenza: numero di scene = numero di blocchi = numero di file.
4. **Preventivo**: elenco delle chiamate a pagamento e stima crediti. **Attendere l'autorizzazione.**
5. **Prova** su 2 scene quando ci sono riprese da URL o un formato nuovo.
6. **Caricamento** asset (sezione 4.1) e verifica `completed`.
7. **Creazione** del video (una chiamata) e controllo dello stato.
8. **Verifica del risultato** (sezione 6).
9. **Registro** (sezione 7) e consegna del link.

---

## 6. Controlli prima della consegna

- [ ] Stato `completed`, `video_url` disponibile.
- [ ] Durata coerente: somma delle durate dei blocchi + copertina + chiusura (il render risulta di solito circa 1,2 s più corto). Uno scarto di parecchi secondi segnala una scena collassata.
- [ ] Durata entro 10 s dall'obiettivo.
- [ ] Numero di scene ≤ 50, nessuna scena da 1 secondo (manca l'audio d'ancoraggio).
- [ ] Sottotitoli presenti e allineati (scaricare l'SRT da `subtitle_url`).
- [ ] Nessun testo `{{variabile}}` rimasto (template).
- [ ] Nessun dato personale reale a schermo.
- [ ] Ascolto e visione finali: **li fa l'utente**; si dichiara cosa non è stato verificato.

---

## 7. Registro del video

Per ogni video si annota (nel repository, senza file pesanti):

```
Titolo:
Progetto / modulo / lezione:
Tipo e strumento HeyGen:
video_id:            link:
Formato e risoluzione:
Voce e velocità:
Avatar (nome look) / nessuno:
Scene: N   Durata attesa:   Durata reale:
Asset: n. audio, n. clip, n. immagini (ID batch)
Crediti spesi (stima / reali):
Sottotitoli: sì/no, impressi/solo SRT
Da verificare (ascolto, sottotitoli, ecc.):
```

---

## 8. Messaggio tipo per raccogliere le variabili

> Per creare il video mi servono queste informazioni (tra parentesi la proposta predefinita):
> 1. Titolo e progetto/lezione
> 2. Tipo: avatar, solo voce con scene, foto parlante, Video Agent, clip AI, template o traduzione
> 3. Dove lo pubblichi e formato (16:9, 1080p)
> 4. Durata obiettivo
> 5. Copione: lo uso alla lettera o lo scrivo/riscrivo io?
> 6. Voce (Achille nuovo 1 v4, velocità 1,12×) e lingua (italiano)
> 7. Avatar sì/no (no); se sì, quale look
> 8. Materiale per le scene: slide, clip, foto, b-roll da generare, registrazioni schermo
> 9. Palette/logo/brand kit
> 10. Sottotitoli (SRT impressi), musica (−20 dB), transizioni (dissolvenza breve)
> 11. Budget massimo di crediti e se vuoi una prova su 2 scene prima del render completo
> 12. Consegna (link HeyGen, MP4, Skillplate…) e scadenza

---

## Fonti

- Schemi degli strumenti del connettore HeyGen (2026-10-14).
- `lpg/CONFIGURAZIONE.md`, `lpg/MASTER-E-ISTRUZIONI.md`, `lpg/PROCEDURA.md` (metodo LPG).
- `video/ia-sindacato-4-2/README_CODEX.md` (lezione 4.2).
- `AGENTS.md` (spese, file pesanti, segreti).
