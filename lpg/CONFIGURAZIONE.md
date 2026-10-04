# Configurazione del corso LPG

Valori della fase finale (moduli 6–8), con la fonte. «Mancante» vuol dire che le fonti non lo registrano: non va inventato. Percorsi relativi a `produzione/` nel commit `4ed8a32ef71452ce66b1c67e4084bd84c242c356` di `aki1806-droid/Prove`.

## Voce e audio

| impostazione | valore | fonte |
|---|---|---|
| servizio | ElevenLabs; mai il TTS di HeyGen né il Video Agent | STANDARD §1 |
| voce | Luca Ward, `tVdVcJPudubxmTmAw4tE` | STANDARD §1, MASTER §7.1 |
| modello | `eleven_v3` | MASTER §2.1 e §7.1 |
| `generations_count` | 1 (il default 4 costa quattro volte) | MASTER §2.1 |
| limite per generazione | 5.000 caratteri; lezione in due tracce A e B, stacco su un cambio di capitolo | MASTER §2.1, STANDARD §1 |
| tag di intenzione | 5–6 per lezione, in inglese, in testa al blocco; niente `<break>`, niente `[pausa]` | MASTER §3 passo 1, STANDARD §1 |
| stability, similarity, style, seed | **mancanti** | — |
| pronuncia | nessun dizionario registrato; le vocali accentate si scrivono con l'apostrofo nel testo parlato | MASTER §3 passo 1 |
| filtro (in `tagli.py`) | `silenceremove=start_periods=1:start_silence=0.03:start_threshold=-45dB:stop_periods=-1:stop_duration=0.20:stop_silence=0.14:stop_threshold=-45dB,atempo=1.12` | `script/tagli.py`, costante `FILTRO` |
| velocità | 1,12×, solo in post; nessuna eccezione | MASTER §0.2 |
| profilo dei blocchi | mp3 128 kbps, 44,1 kHz, mono | `script/tagli.py` (`applica`), STANDARD §6 |
| pose | blocchi sotto 3,5 s allungati con `apad` a 4–6 s; nel modulo 6–8 molte pose fra 6,8 e 10,5 s | MASTER §1.4, registri |
| trascrizione di verifica | `eleven_scribe_v1`, finestre di 1,6 s prima di ogni taglio, separate da 2,5 s di silenzio | STANDARD §1, `tagli.py` |
| musica | solo dove serve una scena senza voce (2.3, 8.5): `eleven_music_v2`, riportata a 128 kbps / 44,1 kHz / mono; strumentale verificata con trascrizione vuota | `registri/corso-8-5.md`, STANDARD §6 |
| volume della musica | **non verificato** (aperto sulla 8.5) | `registri/corso.md` |

## Slide

| impostazione | valore | fonte |
|---|---|---|
| palette | avorio `#F7F3EA` (fondo), blu `#12294A` (testo), oro `#C39A4E` (accento), oro tenue `#E2D2B0` (tema `sand`), blu profondo `#0B1B33` (tema `deep`), grigio `#69748A`, inchiostro su sand `#1C2B3F` | `script/slide_corso.mjs`, righe delle costanti |
| temi | `ivory` (default), `sand` (errori), `deep` (memo, testo in oro, logo negativo) | `script/slide_corso.mjs` |
| caratteri | Cormorant Garamond 400/600/400 corsivo per le frasi; Jost 300/400/600 per etichette, elenchi e numeri | `script/fonts_embed.py` |
| incorporamento | woff2 come data URI in `fonts_corso.css` generato da `fonts_embed.py` (Chromium non raggiunge Google Fonts e non dà errore) | STANDARD §6 |
| logo | monogramma in alto a sinistra su ogni slide, stessa coordinata; negativo su fondo scuro; logo esteso solo su copertina e chiusura | STANDARD §3 e §6 |
| layout | `cover`, `closing`, `statement`, `quote`, `list`, `memo`, `number`, `cards`, `table`, `chart`, `swap`, `figure`; 15 diagrammi; 4 infografiche | intestazione di `script/slide_corso.mjs` |
| risoluzione delle slide | 1920×1080, `deviceScaleFactor` 1 | `script/cards_corso.mjs` |
| clip animate | 25 fps, 3 s per slide (argomento facoltativo), o `ciclo: N` secondi per le cicliche | `script/clips_corso.mjs` |
| codifica delle clip | `ffmpeg -framerate 25 -i frames/cNN/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 19 cNN.mp4` | `registri/corso-2-1-luca-ward.md` |

## Riprese generate

| impostazione | valore | fonte |
|---|---|---|
| servizi | Higgsfield (per esempio 1.1 e modulo 6, fino all'esaurimento dei crediti a metà del modulo 7), Artlist (moduli 7–8) | `registri/corso-1-1.md`, `corso-6-1.md`, `modulo-7.md`, `modulo-8.md` |
| modelli Artlist | `generate_video` Kling 2.6 Pro 5 s 16:9 senza audio; `generate_image` Nano Banana 2, 2K | METODO §3 passo 5, STANDARD §4 |
| modelli Higgsfield | **mancanti** (i registri citano solo il servizio e i costi) | — |
| suffisso di stile | «fotografia documentaristica editoriale, luce naturale morbida, palette desaturata, poca profondità di campo, nessun volto riconoscibile, niente testo in sovrimpressione» | MASTER §3 passo 5 |
| mondo visivo | cinque righe per modulo (luogo, luce, ottica, colore, persone), riportate per intero in ogni prompt; quelli dei moduli 7 e 8 sono nel campo `mondo` di `copioni/7-riprese.json` e `8-riprese.json` | MASTER passo 5 |
| prompt delle singole riprese | **mancanti**; resta la descrizione («cosa») in `copioni/*-media.json` e nei registri | — |

## Montaggio HeyGen

| impostazione | valore | fonte |
|---|---|---|
| chiamata | `create_video_from_studio`, una sola per lezione | STANDARD §5 |
| formato | `aspectRatio: "16:9"`, `resolution: "1080p"` | METODO §3 passo 7 |
| sottotitoli | `caption: {file_format: "srt", style: "default"}` | STANDARD §5 |
| scene | massimo 50 | MASTER §1.2 |
| slide | scena `video` dalla clip, `playback: {mode: "freeze", mute: true}`, con l'mp3 del blocco come `audio_asset_id` | `script/scene.py` |
| slide ciclica | come sopra con `mode: "loop"` | `script/scene.py` |
| ripresa video | scena `video` da URL, `mode: "loop"`, muta | `script/scene.py` |
| ripresa foto | scena `image` da URL con l'audio del blocco | `script/scene.py` |
| copertina e chiusura | clip mute ancorate a tracce di silenzio da 3 s e 10 s; gli id degli asset di silenzio sono costanti in `scene.py` e valgono solo nell'account HeyGen dell'utente | `script/scene.py` |
| caricamento | `create_asset_upload_batch` → PUT con gli header restituiti → `complete_asset_batch` → `get_asset_batch` fino a `completed`; dimensione dichiarata esatta | MASTER passo 6, `script/carica.py` |
| frame rate e codec finali | **non impostati**: li decide HeyGen | — |

## Variabili e credenziali

Le fonti non usano variabili d'ambiente: i servizi sono stati usati tramite i connettori MCP della sessione Claude (ElevenLabs, HeyGen, Artlist, Higgsfield) collegati all'account dell'utente. Per Codex servono accessi equivalenti, configurati fuori dal repository:

| servizio | cosa serve | come configurarlo |
|---|---|---|
| ElevenLabs | voce, trascrizione, eventuale musica | connettore o chiave nell'ambiente di Codex, per esempio `ELEVENLABS_API_KEY` |
| HeyGen | asset e montaggio | connettore o `HEYGEN_API_KEY` nell'ambiente |
| Artlist / Higgsfield | riprese | connettore dell'account dell'utente |

Questi nomi di variabile sono una proposta, non un'impostazione usata nel primo corso. I valori non vanno mai scritti nel repository: il `.gitignore` di Prove esclude già `.env`. Gli script non leggono nessuna chiave: lavorano su file locali e sulle risposte delle chiamate salvate su disco.
