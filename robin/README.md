# Immagini per la libreria Robin — La Parola Giusta

| file | contenuto |
|---|---|
| [`prompt-immagini-LPG-210-259.md`](prompt-immagini-LPG-210-259.md) | 50 prompt (LPG_210 → LPG_259) per generare con ChatGPT le immagini dei post, raggruppati per tema, con istruzioni su formato, scarti, nomi dei file e caricamento |

Fornito dall'utente il 2026-10-08 e salvato senza modifiche.

## Come si usa

- Le immagini si generano **una per volta** con ChatGPT, in verticale 2:3.
- Il nome del file deve essere **esattamente** quello del titolo del prompt (es. `LPG_210_Silenzio_e_pause.png`): l'abbinamento ai post si fa leggendo il tema nel nome.
- Si caricano nella cartella «la parola giusta» di Robin; sopra gli 8 MB vanno salvate in JPG.
- Ritmo prudente con ChatGPT Plus: 10–15 immagini al giorno.

## Numerazione: 210–259 diventa 270–319

Nella cartella «la parola giusta» di Robin i numeri da LPG_201 a LPG_269 erano già usati da altre immagini, con altri temi. Su decisione dell'utente (2026-10-08) le 50 immagini sono state **rinumerate di +60**: il prompt `LPG_210_Silenzio_e_pause` corrisponde al file `LPG_270_Silenzio_e_pause.png`, e così via fino a `LPG_259_Fiducia` → `LPG_319_Fiducia.png`. Il tema nel nome non cambia. La corrispondenza è nel campo `nome_prompt` del [manifest](immagini/manifest.json). Il file dei prompt resta com'era, con i numeri originali.

Prossimo numero libero su Robin: **LPG_320**.

## Stato

- Prompt: pronti (50 su 50, conteggi per tema coerenti).
- Immagini generate da Codex il 2026-10-08: **50 su 50**, PNG verticali 1024×1536 sotto gli 8 MB, in [`immagini/`](immagini/) con [manifest](immagini/manifest.json) (nomi, dimensioni, SHA-256).
- Revisione di Claude (2026-10-08): **50 approvate, nessuna da rifare**. Controllati a vista tutti i file e ingranditi i casi a rischio: nessuna scritta leggibile (226 grafici senza numeri, 223/234/250 scrittura illeggibile, 255 firme sfocate, 257 bussola senza lettere), nessun volto riconoscibile (237 pubblico di spalle, 217 di spalle), mani corrette (216, 234, 241, 258, 259), palette blu notte, oro e avorio rispettata. Nota: 237 mostra persone sedute di spalle, il prompt chiedeva solo sedie in fila; accettata.
- Caricamento su Robin (Claude, 2026-10-08): **50 su 50** nella cartella «la parola giusta», nomi `LPG_270_…` → `LPG_319_…` senza estensione. Ogni nome compare una sola volta; tutte risultano non usate in post. Caricate dagli URL pubblici del commit `a33b0c6` di questo repository.
- Regola di Robin da rispettare: mai la stessa immagine in due post, nemmeno su piattaforme diverse; scegliere solo immagini non ancora assegnate e tenere il registro di utilizzo.
