# Stato attuale

## Notabene (app archivio note) — 2026-10-06

- Compito: web app per catalogare e cercare note su Google Drive, con AI, Plaud, sezione personale e condivisa, due utenti Gmail (aki1806, giovanna.vullo87).
- Responsabile: Claude.
- Stato: in corso. App Apps Script in `notabene/app/` con grafica personalizzabile; guida `notabene/INSTALLAZIONE.md`; costi `notabene/COSTI.md`. AI scelta: Claude. Routine "Notabene Plaud" (trig_01LDZxvtUM75egEvXHCrEo27) ogni giorno alle 6:46. Prova manuale del 6/10 fallita: connettori Plaud e Drive non abilitati nella routine (nessun file toccato).
- Verifiche: sintassi di Code.gs, Index.html, manifest; prototipo renderizzato con Chromium a 1360 e 400 px (nessun errore, nessuno scorrimento orizzontale). App non ancora installata su Google.
- Configurazione ora nel codice (`CONFIG` in Code.gs); la chiave Claude si inserisce dall'app (solo l'amministratore). Installazione impossibile da Claude: il connettore Drive non crea progetti Apps Script e non c'è accesso all'account Google.
- Azioni dell'utente: abilitare Plaud e Drive nella routine, condividere la cartella con Giovanna, installare l'app (10 minuti), creare la chiave API.

## Trasferimento LPG

- Compito: trasferire il metodo LPG e rendere affidabile la procedura.
- Responsabile: Claude (correzioni dopo seconda revisione Codex).
- Stato: da assegnare alla sessione Claude; seconda revisione completata con problemi aperti.
- Pacchetto revisionato: chagpt af4954b; fonti Prove 4ed8a32ef71452ce66b1c67e4084bd84c242c356, checkout pulito.
- Rapporto: `lpg/REVISIONE_CODEX_2.md`; precedente `lpg/REVISIONE_CODEX.md` conservato come storico.
- Esito sei punti: prova.mp3, working directory/batch/pose e distinzione chiusure corretti; bootstrap documentato ma bloccato qui; copertura/banda/upload richiedono integrità aggiuntiva.
- Correzioni richieste: code/meta con stessa cardinalità, durate complete/valide, esito pipeline upload preservato. Precisare etichette P/S/V e affermazioni sui codici di uscita.
- Verifiche riuscite: intermedi, audio sintetico 46 confini, copertura vuota respinta, banda 48/48, pose 22/22, batch 97 file, PUT locale 403/200, scene 50.
- Blocchi ambiente: Chromium build 1194 e font non recuperabili (HTTP 403); Chromium sistema 151 non usato come equivalente. Playwright 1.56.1 installato con cache scrivibile.
- Lacune: nessuna verifica dei servizi reali, render/font qui non ripetuti, chiusura 15/variante 8.5 non eseguite; input secondo corso, accessi, parametri voce, prompt e licenze restano.
- Pubblicazione: utente autorizza rapporto e memoria su main, senza force push. Nessun servizio a pagamento autorizzato.
- Prossimo passo: Claude corregge i controlli e ripete test positivi/negativi, poi restituisce a Codex; nessuna approvazione completa della produzione.
