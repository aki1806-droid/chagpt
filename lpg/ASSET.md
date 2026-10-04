# Inventario degli asset

Nessun asset binario è copiato in chagpt (vedi `PROVENIENZA.md`). Percorsi relativi a `produzione/` nel commit `4ed8a32ef71452ce66b1c67e4084bd84c242c356` di `aki1806-droid/Prove`.

| asset | dove | origine | licenza o permesso noto | recupero |
|---|---|---|---|---|
| monogramma LPG (fondi chiari) | `script/logo_lpg.png`, 104 KB | marchio dell'utente | proprietà dell'utente; non documentata altrove | clone di Prove |
| logo esteso (copertine e chiusure) | `script/logo_lpg_esteso.png`, 103 KB | marchio dell'utente | come sopra | clone di Prove |
| monogramma negativo (fondi scuri) | `script/logo_lpg_negativo.png`, 80 KB | generato da `script/logo_negativo.py` | come sopra | clone di Prove, o rigenerarlo con Pillow |
| caratteri Cormorant Garamond e Jost | non versionati; `fonts_corso.css` si genera con `script/fonts_embed.py` da Google Fonts | Google Fonts | **non registrata nelle fonti**; da verificare sul sito di Google Fonts prima di un uso commerciale | `python3 fonts_embed.py` |
| voce Luca Ward | ElevenLabs, voce `tVdVcJPudubxmTmAw4tE` | libreria voci dell'account ElevenLabs dell'utente | **non registrata**: condizioni d'uso della voce da verificare sull'account | solo con l'account dell'utente |
| tracce e blocchi audio del primo corso | asset HeyGen dell'account dell'utente; file locali non versionati | ElevenLabs | come la voce | `assets.json` non è versionato; gli id restano nei registri solo in parte |
| clip e PNG delle slide | non versionati | rendering locale | prodotti dall'utente | si rigenerano con gli script da `copioni/*-slides.json` |
| riprese generate (foto e video) | CDN di Higgsfield e Artlist; URL in `copioni/*-media.json` e `*-riprese.json` | generate con l'account dell'utente | **non registrata**; termini dei servizi da verificare | gli URL non vanno riusati (alcuni sono firmati); per riaverle serve l'account o il montato |
| musica (2.3, 8.5) | non versionata; in Prove resta solo il riferimento `musica/muto25.mp3`, `musica/chiusura20.mp3` in `copioni/8-riprese-piano.json` | `eleven_music_v2` | **non registrata** | solo dall'account o dai file locali dell'utente |
| tracce di silenzio da 3 s e 10 s | asset HeyGen, id costanti in `script/scene.py` | generate con `ffmpeg -f lavfi -i anullsrc` | nessun vincolo | in un altro account si rigenerano e si caricano: gli id del primo corso valgono solo nell'account dell'utente |
| avatar | non usato nella fase finale; look `89cf01e0c22547169c460186be0c67a8`, gruppo `2ecf65e58df54cd7bda384da43c27f2d` | HeyGen, account dell'utente | — | solo se il secondo corso torna all'avatar |
| video finali | HeyGen, `video_id` nei registri (per esempio 6.1 `e1250707f24c7fb59585d8deed9c59b0`) | montaggio HeyGen | dell'utente | si aprono solo dall'account HeyGen dell'utente |

## Cosa non presumere

- Gli identificativi di HeyGen, ElevenLabs, Artlist e Higgsfield funzionano solo con gli account dell'utente.
- Le anteprime HeyGen e i CDN di Artlist e Higgsfield erano bloccati dal proxy delle sessioni Claude: molte riprese non sono state viste da chi le ha montate (STANDARD §6, registri).
- Il sito `laparolagiusta.it` compare nella chiusura delle slide. Era bloccato dal proxy delle sessioni Claude.
