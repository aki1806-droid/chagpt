# Lezione campione: 6.1 «L'obiezione è un'informazione»

Scelta perché è l'unica lezione della fase finale (moduli 6–8) di cui esiste anche l'MD di partenza: i moduli 7 e 8 non hanno l'MD in Prove.

## File di riferimento

Tutti in `aki1806-droid/Prove`, commit `4ed8a32ef71452ce66b1c67e4084bd84c242c356`. Non sono copiati qui (vedi `../PROVENIENZA.md`).

| ruolo | percorso | note |
|---|---|---|
| MD originale | `produzione/copioni/modulo-6.md`, sezione «SCRIPT HEYGEN — 6.1» | scritto per la vecchia forma (scene con avatar, split, `<break>`, «velocità 0,95×»): va **reinterpretato** secondo la fase finale, non eseguito alla lettera |
| blocchi (testo riscritto) | `produzione/copioni/6-1-blocchi.json` | 48 blocchi `s02`–`s49` |
| tracce A/B | `produzione/copioni/6-1-chunks.json` | A = `s02`–`s17`, B = `s18`–`s49`; lo stacco cade su una ripresa (`s18`) |
| slide | `produzione/copioni/6-1-slides.json` | 47 voci: 22 `statement`, 7 `list`, 4 `memo`, 3 `quote`, 3 `swap`, 2 `table`, 1 ciascuno di `strati`, `pila`, `chart`, `flusso`, più `cover` e `closing` |
| riprese | `produzione/copioni/6-1-media.json` | tre foto Higgsfield (`s18`, `s25`, `s40`); gli URL **non vanno riusati** |
| registro | `produzione/registri/corso-6-1.md` | riscrittura, grafiche, tagli, pose, durate per blocco, «da verificare» |
| registro del modulo | `produzione/registri/modulo-6.md` | — |

## Cosa dice il registro

- `video_id` `e1250707f24c7fb59585d8deed9c59b0` (una prima versione: `64b988f30a7f835213f781bc10a77c7b`); si apre solo dall'account HeyGen dell'utente;
- 50 scene, 16:9, 1080p, 359,2 s di cui 347,4 s di parlato;
- copione da 3.122 a 5.149 caratteri; nessun aneddoto;
- tagli: 46 confini, 2 fuori posto al primo giro, 1 al secondo, poi 0; un confine (`s19`) ricostruito sul tempo di parlato netto;
- 22 pose fra 8 e 10,5 s; nessun blocco fuori banda;
- la trascrizione completa del parlato **non è registrata**: il testo di riferimento è `blocchi.json`.

## Impostazioni usate

Quelle della fase finale in `../CONFIGURAZIONE.md`. Le pose della 6.1 sono elencate nel registro (sezione «Ventidue pose»); per la 6.1 non esiste un `pose.json` come per i moduli 7–8. Il dizionario va ricostruito dal registro.

## Verifica locale eseguita (2026-10-04, senza servizi a pagamento)

- `fonts_embed.py`: 12 facce per il corso e 8 per il canale scaricate e incorporate;
- `node cards_corso.mjs 6-1-slides.json png`: **47 PNG da 47 voci**, 1920×1080. Ho guardato la copertina, `c19` (memo), `c21` (strati), `c24` (pila), `c33` (flusso) e la chiusura: caratteri corretti (Cormorant e Jost, non quelli di sistema), logo in alto a sinistra, palette del corso, testo leggibile;
- `node clips_corso.mjs` su `c33`: 75 fotogrammi (3 s a 25 fps), senza errori;
- `tagli.py allinea` e `applica` su una traccia sintetica (toni e silenzi, 10 blocchi in due tracce): tutti gli 8 tagli dentro la pausa di fine blocco, la posa di 9 s applicata (8,98 s misurati);
- compilazione di tutti gli script Python e controllo della sintassi di tutti gli `.mjs`: nessun errore.

Non eseguiti: generazione della voce, trascrizione, caricamento e montaggio, perché a pagamento e non autorizzati. Il confronto con il montato approvato richiede l'account HeyGen dell'utente.

## Come usarlo per il confronto

1. Clonare Prove al commit indicato e rendere i PNG della 6.1 (passo 3 di `../PROCEDURA.md`).
2. Prendere una lezione del secondo corso e produrre gli stessi quattro file: `blocchi.json`, `chunks.json`, `slides.json`, `media.json`.
3. Confrontare con la 6.1: numero di blocchi, lunghezza dei blocchi, quota di diagrammi, posizione dello stacco A/B, numero di pose.
4. Fermarsi prima dei passi a pagamento e chiedere l'autorizzazione all'utente.
