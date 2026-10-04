# Procedura: dall'MD alla lezione montata

Sequenza della fase finale (moduli 6–8). Dove una riga dice **verificato qui**, il passaggio è stato eseguito il 2026-10-04 in questa sessione, senza servizi a pagamento. Il resto è **solo documentato** dalle fonti di Prove.

## Prerequisiti

| cosa | versione provata qui | note |
|---|---|---|
| sorgenti | Prove `4ed8a32ef71452ce66b1c67e4084bd84c242c356`, cartella `produzione/script` | vedi `PROVENIENZA.md` |
| Node.js | 22.22 | moduli ES (`.mjs`) |
| Playwright + Chromium | 1.56.1 | `npm i playwright` nella cartella degli script, o un link a un'installazione esistente; la versione usata in produzione non è registrata |
| Python | 3.11 | solo libreria standard, tranne `logo_negativo.py` (Pillow) |
| ffmpeg | di sistema | le fonti suggeriscono anche `pip install imageio-ffmpeg` |
| curl | qualsiasi | `fonts_embed.py` scarica i caratteri con curl |
| rete | Google Fonts raggiungibile da curl | — |
| account | ElevenLabs, HeyGen, Artlist o Higgsfield dell'utente | solo per i passi a pagamento |

Preparazione, verificata qui:

```bash
git clone --filter=blob:none https://github.com/aki1806-droid/Prove prove-lpg
cd prove-lpg && git checkout 4ed8a32ef71452ce66b1c67e4084bd84c242c356
cd produzione/script
npm i playwright            # oppure un link a node_modules esistente
python3 fonts_embed.py      # scrive fonts_corso.css e fonts_canale.css
```

Ogni lezione lavora in una cartella propria, per esempio `lavoro/<m>-<l>/`, con `blocchi.json`, `chunks.json`, `slides.json`, `media.json`.

## Passi

| # | passo | comando o chiamata | input → output | stato |
|---|---|---|---|---|
| 0 | scheda parametri | MASTER §0: titolo, etichetta, durata, palette | MD della lezione → parametri | documentato |
| 1 | riscrivere a `CARATTERI` e spezzare in blocchi | a mano (o con l'assistente), regole in `MASTER-E-ISTRUZIONI.md` | MD → `blocchi.json`, `chunks.json` (A/B sotto 5.000 caratteri) | documentato |
| 2 | progettare le slide | a mano | blocchi → `slides.json` (`c01` copertina, `cNN` per blocco, `c99` chiusura) | documentato |
| 3 | rendere i PNG fermi e guardarli | `node cards_corso.mjs <dir>/slides.json <dir>/png` | `slides.json` → `png/cNN.png` | **verificato qui** sulla 6.1: 47 slide da 47 voci |
| 4 | rendere le clip | `node clips_corso.mjs <dir>/slides.json <dir>/frames 3.0`, poi per ogni slide `ffmpeg -framerate 25 -i frames/cNN/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 19 clip/cNN.mp4` | → `frames/cNN/f0000.png…`, `clip/cNN.mp4` | **verificato qui** il render dei fotogrammi su una slide (75 fotogrammi = 3 s); la codifica è documentata |
| 5 | generare la voce | ElevenLabs `eleven_v3`, voce Luca Ward, `generations_count: 1`, una chiamata per A e una per B | `chunks` → `unico_A_raw.mp3`, `unico_B_raw.mp3` | **a pagamento**, documentato |
| 6 | allineare i tagli | `python3 tagli.py allinea <dir>` | → `tagli.json`, `prova.mp3`, `prova_meta.json` | **verificato qui** su audio sintetico: tutti gli 8 tagli dentro la pausa giusta |
| 7 | trascrivere la prova | ElevenLabs `scribe` su `prova.mp3` | → testo | **a pagamento**, documentato |
| 8 | appaiare le code | `python3 verifica.py <dir> <trascrizione.txt>` | → `code.json`, elenco dei «fuori posto» | documentato (sintassi verificata) |
| 9 | correggere | `python3 tagli.py correggi <dir>`, poi trascrivere il nuovo `riprova.mp3` e rifare il passo 8, finché `verifica.py` stampa «fuori posto: 0» | `code.json` → `tagli.json`, `riprova.mp3` | documentato |
| 10 | applicare tagli e pose | `python3 tagli.py applica <dir> '{"s07": 8.5, ...}'` (il dizionario delle pose; nei moduli 7–8 sta in `pose.json`) | → `mp3u/sNN.mp3`, `durate.json` | **verificato qui** su audio sintetico, posa compresa |
| 11 | controllare la banda | caratteri/secondo per blocco da `durate.json`, banda 8–21 (8,5–21 nel MASTER §5); togliere i tag prima di contarli | → elenco dei blocchi sospetti | documentato |
| 12 | riprese | scrivere il mondo visivo del modulo, poi generare circa 3 riprese per lezione | → `media.json` con `tipo`, `cosa`, `url` | **a pagamento**, documentato |
| 13 | caricare su HeyGen | `create_asset_upload_batch` con `batch_in.json`, poi `python3 carica.py <risposta.json>`, poi `complete_asset_batch` e `get_asset_batch` | clip e mp3 → `assets.json` | **a pagamento**, documentato |
| 14 | lista delle scene | `python3 scene.py 2 49` (per i casi speciali, la variante `scene85.py`) | `assets.json`, `media.json`, `slides.json` → `scene.json` | documentato (sintassi verificata) |
| 15 | montare | `create_video_from_studio` con `scene.json`, 16:9, 1080p, sottotitoli SRT | → `video_id` | **a pagamento**, documentato |
| 16 | registro | `registri/corso-<m>-<l>.md` con video_id, durata, riscrittura, grafiche, riprese, tagli, pose, «da verificare» | → registro | documentato |

Note sui passi:

- Prima di impegnare il render completo con riprese prese da URL, le fonti chiedono un **montaggio di prova da due scene** (STANDARD §1, Higgsfield).
- I nomi dei file in `batch_in.json` seguono `a_sNN.mp3`, `v_cNN.mp4`, `m_*`: `carica.py` usa il prefisso per trovare il file locale.
- La durata del render va confrontata con la somma di `durate.json` + 3 + 10 s (STANDARD §1: un errore 5:42 contro 5:51 è stato trovato così).

## Ripresa dopo un errore

| situazione | cosa fare | fonte |
|---|---|---|
| HeyGen rifiuta un mp3 (`application/octet-stream`) | riconvertire a 128 kbps, 44,1 kHz, mono | STANDARD §6 |
| PUT con 403 | la dimensione dichiarata nel batch non è esatta | MASTER passo 6 |
| batch caricato a metà | `carica.py` unisce gli id in `assets.json`: si ricarica solo la parte rifatta | `script/carica.py` |
| scena muta che dura un secondo | ancorarla a una traccia di silenzio della durata voluta | STANDARD §1 |
| `correggi` torna due volte sullo stesso confine | guardare a mano `silencedetect` a `d=0.10` | MASTER passo 3 |
| tagli sfasati di uno | ricostruire sul tempo di parlato netto fra due confini certi | MASTER passo 3 |
| `Avatar not found` | non si applica alla fase finale (niente avatar) | STANDARD §2 |
| URL firmati scaduti | usare asset permanenti, non `audio_url` | STANDARD §6 |
| crediti esauriti per le riprese | fermarsi e chiedere all'utente; non cambiare servizio senza autorizzazione | `registri/modulo-7.md` |

## Criteri di completamento di una lezione

Da MASTER §5:

- `verifica.py` dice «fuori posto: 0»;
- nessun blocco fuori dalla banda dei caratteri al secondo (o eccezione annotata);
- tutte le slide guardate da ferme, le grafiche complesse due volte;
- musica verificata strumentale, se c'è;
- scene ≤ 50;
- durata entro dieci secondi dall'obiettivo, misurata sul render;
- registro scritto con «da verificare».

Quello che l'assistente non può verificare (audio ascoltato, montato guardato) va sempre lasciato all'utente.
