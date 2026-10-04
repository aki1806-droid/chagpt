# Ultimo passaggio di consegne

## Obiettivo

Correggere il pacchetto LPG sui sei problemi della revisione Codex (`lpg/REVISIONE_CODEX.md`).

## Modifiche di Claude (solo documentazione e memoria)

- `lpg/PROCEDURA.md` riscritta:
  - variabili `$PROVE`, `$WS`, `$LEZ` e directory corrente per ogni script;
  - bootstrap in un'area di lavoro fuori da Prove, con `playwright@1.56.1`, Chromium build 1194 (download o browser preinstallato) e prova di avvio;
  - controllo degli intermedi (`chunks.json` come liste di ID);
  - comandi di slide e clip con `mkdir`;
  - ciclo dei tagli su `prova.mp3`;
  - controllo di copertura che esce con 1;
  - banda misurata prima delle pose;
  - `pose.json` valido;
  - silenzi del proprio account;
  - generatore di `batch_in.json`;
  - controllo degli errori su `carica.log` e item `completed`;
  - sostituzione degli ID in una copia di `scene.py`;
  - chiusure 10/15/20 s come prescrizione, implementazione e misura;
  - variante `copioni/8-5-scene85.py`;
  - formula della durata con le durate reali.
- Aggiornati `QUALITA.md`, `CONFIGURAZIONE.md`, `MASTER-E-ISTRUZIONI.md` (anche come si contano i diagrammi: la 6.1 ne ha tre, sotto la soglia di sei), `PROVENIENZA.md` (difetti delle fonti), `campione/README.md` (`pose.json` ricostruito dal registro, verifiche), `README.md`.

## Verifiche (2026-10-04, senza servizi a pagamento)

- Bootstrap: `playwright@1.56.1` installato. `npx playwright install chromium` **fallito** (403 `cdn.playwright.dev`). Avvio riuscito con il Chromium 141.0.7390.37 preinstallato.
- 6.1: 47 PNG; clip `c01`, `c33`, `c99` codificate (h264, 1920×1080, 25 fps, 3 s).
- Traccia sintetica della 6.1:
  - 46 confini;
  - copertura 46/46 e «fuori posto: 0» con la trascrizione simulata;
  - con la trascrizione vuota, `verifica.py` esce con 0 e il controllo di copertura con 1;
  - `correggi` riscrive `prova.mp3` e non crea `riprova.mp3`;
  - banda 48/48 e pose 22/22.
- Server PUT locale:
  - con due 403, `carica.py` esce con 0 e scrive 97 id, mentre il controllo ferma la procedura;
  - con tutti 200, `errori []`.
- `scene.py` con i silenzi sostituiti: 50 scene.
- I quattro blocchi Python di `PROCEDURA.md` eseguiti alla lettera: tutti riusciti.
- Link locali verificati; Prove senza modifiche.

## Problemi aperti

- In un ambiente nuovo serve `cdn.playwright.dev` raggiungibile, oppure un Chromium 1194 già installato.
- Mai provati: voce, scribe, upload e montaggio reali; chiusura da 15 s; variante 8.5. La causa dello scarto di circa 1,2 s fra durata attesa e render non è documentata.
- La durata delle chiusure di modulo va decisa con l'utente: 15 s prescritti contro 10 s misurati.
- Restano: impostazioni fini della voce, prompt, licenze, MD dei moduli 7–8, input del secondo corso, versioni pubblicate dei moduli 1–5.

## Prossima azione per Codex

Revisionare la revisione 2 di `lpg/`, ripetendo a campione i comandi di `PROCEDURA.md` su Prove @ `4ed8a32`. Se approvata, preparare una lezione campione del secondo corso fino a §3 con gli input dell'utente. Nessun servizio a pagamento senza autorizzazione.
