# Lezione campione: 6.1 «L'obiezione è un'informazione»

Scelta perché è l'unica lezione della fase finale (moduli 6–8) di cui esiste anche l'MD di partenza: i moduli 7 e 8 non hanno l'MD in Prove. È un campione di **formato e di procedura**. Non è un modello per la soglia dei diagrammi: ne ha tre, la regola ne chiede sei (vedi `../MASTER-E-ISTRUZIONI.md`).

## File di riferimento

Tutti in `aki1806-droid/Prove`, commit `4ed8a32ef71452ce66b1c67e4084bd84c242c356`. Non sono copiati qui (vedi `../PROVENIENZA.md`).

| ruolo | percorso | note |
|---|---|---|
| MD originale | `produzione/copioni/modulo-6.md`, sezione «SCRIPT HEYGEN — 6.1» | scritto per la vecchia forma (scene con avatar, split, `<break>`, «velocità 0,95×»): va **reinterpretato** secondo la fase finale, non eseguito alla lettera |
| blocchi (testo riscritto) | `produzione/copioni/6-1-blocchi.json` | 48 blocchi `s02`–`s49`, 5.149 caratteri |
| tracce A/B | `produzione/copioni/6-1-chunks.json` | liste di ID: A = 16 (`s02`–`s17`, 1.743 caratteri uniti con a capo), B = 32 (`s18`–`s49`, 3.452); lo stacco cade su una ripresa (`s18`) |
| slide | `produzione/copioni/6-1-slides.json` | 47 voci: 22 `statement`, 7 `list`, 4 `memo`, 3 `quote`, 3 `swap`, 2 `table`, 1 ciascuno di `strati`, `pila`, `chart`, `flusso`, più `cover` e `closing` |
| riprese | `produzione/copioni/6-1-media.json` | tre foto Higgsfield (`s18`, `s25`, `s40`); gli URL **non vanno riusati** |
| registro | `produzione/registri/corso-6-1.md` | riscrittura, grafiche, tagli, pose, durate per blocco, «da verificare» |
| registro del modulo | `produzione/registri/modulo-6.md` | — |

## Cosa dice il registro [P]

- `video_id` `e1250707f24c7fb59585d8deed9c59b0` (prima versione `64b988f30a7f835213f781bc10a77c7b`); si apre solo dall'account HeyGen dell'utente;
- 50 scene, 16:9, 1080p; durata 359,2 s, parlato 347,4 s, pari alla somma delle durate dei blocchi della tabella. Differenza 11,8 s, contro i 13 nominali di copertina + chiusura;
- copione da 3.122 a 5.149 caratteri; nessun aneddoto;
- tagli: 46 confini, 2 fuori posto al primo giro, 1 al secondo, poi 0; `s19` ricostruito sul tempo di parlato netto. Il registro non dice se i confini senza coda fossero zero;
- 22 pose fra 8 e 10,5 s; «zero blocchi fuori dalla banda»;
- la trascrizione completa del parlato **non è registrata**: il testo di riferimento è `blocchi.json`.

## `pose.json` ricostruito

Per la 6.1 Prove non ha un `pose.json`, a differenza dei moduli 7–8. Questo è ricostruito dalla sezione «Ventidue pose» del registro. Le 22 durate coincidono con quelle della tabella dei blocchi:

```json
{"s07": 8.5, "s10": 9.0, "s11": 8.0, "s12": 8.0, "s13": 9.0, "s15": 8.5, "s16": 9.0, "s19": 10.5, "s21": 8.0, "s27": 8.0, "s29": 8.5, "s30": 8.5, "s32": 8.5, "s33": 8.0, "s34": 8.0, "s36": 8.5, "s37": 8.5, "s39": 8.5, "s43": 9.0, "s45": 8.5, "s47": 9.0, "s48": 8.5}
```

## Riproduzione locale (senza servizi a pagamento)

Dopo il bootstrap di `../PROCEDURA.md` §0–1:

```bash
for t in blocchi chunks slides media; do
  cp "$PROVE/produzione/copioni/6-1-$t.json" "$LEZ/$t.json"
done
# salvare il JSON qui sopra in "$LEZ/pose.json", poi:
# PROCEDURA §2 (controllo degli intermedi) e §3 (slide e clip)
```

I passi da §4 in poi richiedono voce, trascrizione e caricamento reali. Senza autorizzazione ci si ferma qui.

## Verifiche eseguite il 2026-10-04 [V]

Prima consegna:

- 47 PNG da 47 voci. Guardati a vista: copertina, `c19`, `c21`, `c24`, `c33`, chiusura. Caratteri Cormorant e Jost, logo in alto a sinistra, palette del corso.

Revisione 2, con i comandi esatti di `../PROCEDURA.md` in un'area di lavoro separata (Prove rimasto senza modifiche):

- bootstrap: `playwright@1.56.1` installato; avvio di Chromium 141.0.7390.37 dal browser preinstallato; download da `cdn.playwright.dev` **fallito (403)**;
- `fonts_embed.py`: 12 facce per il corso;
- controllo degli intermedi: A 16 blocchi / 1.743 caratteri, B 32 / 3.452, 50 scene previste;
- slide: 47 PNG; clip `c01`, `c33`, `c99` codificate (h264, 1920×1080, yuv420p, 25 fps, 3,000 s);
- tagli su una **traccia sintetica** (toni e silenzi proporzionati ai caratteri della 6.1, non voce):
  - `allinea`: 46 confini;
  - trascrizione simulata con le ultime quattro parole di ogni blocco: `46 pezzi, 46 confini | senza coda: nessuno | fuori posto: 0`, copertura 46/46;
  - trascrizione vuota: `fuori posto: 0` con 46 confini senza coda e codice di uscita 0, mentre il controllo di copertura esce con 1;
  - `correggi`: `prova.mp3` riscritto, nessun `riprova.mp3`;
  - banda prima delle pose: 48/48;
  - pose: 22/22 applicate;
- caricamento simulato con un server PUT locale (nessun HeyGen):
  - `batch_in.json` da 97 file;
  - con due PUT a 403: `carica.py` ha stampato gli errori, ha scritto `assets.json` con 97 id ed è uscito con 0; il controllo su `carica.log` ha fermato la procedura;
  - con tutti i PUT a 200: `errori []`;
- `scene.py` con gli ID dei silenzi sostituiti nella copia di lavoro: 50 scene, copertina e chiusura sui silenzi caricati, 3 riprese da URL.

Revisione 3 (2026-10-08), stessa area di lavoro e traccia sintetica: i controlli rinforzati di `../PROCEDURA.md` 5.2, 5.3 e 7.3, eseguiti come sono scritti nel documento, accettano i casi buoni e respingono `code.json` vuoto, corto, lungo o con voci non testuali; `durate.json` vuoto, con un blocco mancante, a zero o non numerico; un mp3 assente, vecchio o sbagliato; un caricamento che esce con 1 dopo `errori []`. Tabelle complete in `../PROCEDURA.md`.

Non eseguiti: voce reale, trascrizione reale, riprese, caricamento e montaggio reali, chiusura da 15 s, variante 8.5. Il confronto con il montato approvato richiede l'account HeyGen dell'utente.

## Come usarlo per il confronto

1. Riprodurre la 6.1 fino a §3 di `../PROCEDURA.md` e guardare i PNG.
2. Per una lezione del secondo corso, produrre gli stessi file: `blocchi.json`, `chunks.json`, `slides.json`, `media.json`, `pose.json`.
3. Confrontare con la 6.1:
   - numero di blocchi e scene;
   - lunghezza dei blocchi;
   - caratteri di A e di B;
   - posizione dello stacco;
   - numero di pose;
   - **diagrammi parametrici: almeno sei**, più della 6.1.
4. Fermarsi prima dei passi a pagamento e chiedere l'autorizzazione all'utente.
