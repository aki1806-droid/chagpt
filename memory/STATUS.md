# Stato attuale

## Notabene (app archivio note) — 2026-10-09

- Compito: web app per catalogare e cercare note su Google Drive, con AI, Plaud, sezione personale e condivisa, due utenti Gmail (aki1806, giovanna.vullo87).
- Responsabile: Claude.
- Stato: da revisionare (versione 2 più le 4 funzioni proposte: archivio da Gmail con etichetta "Notabene", scadenze e impegni dall'AI con aggiunta al calendario, riepilogo del lunedì via email, note vocali con trascrizione del browser e foto dalla fotocamera). Novità: video e altri formati, anteprime, AI che guarda foto/video, caricamento diretto dei file grandi, email con Gmail, Google Calendar (eventi, allegati a eventi e giorni, agenda), note salvate nel browser e schede a pagine, audio e trascrizioni Plaud tramite `Plaud/_coda`. Corretto un bug: mancava la costante `CHAT_EXCERPT` (la ricerca nell'indice della chat falliva).
- Routine Plaud trig_01JadYR5ovSYPuzcvBgdHzLw (6:46, legata alla sessione session_01G4MBAHofPJo5ZufnrbHWCS) aggiornata alla versione 2: max 20 documenti e 20 richieste in coda al giorno; non crea richieste se in `_coda` ci sono file più vecchi di 2 ore (app non attiva). Cartella `_coda`: 1uvWp8-WgWFCWo7cW0WW-MbqV9RsElkFB.
- Importati finora circa 46 documenti Plaud con il solo riassunto (arretrato fino al 23/02/2026): verranno completati dalla coda.
- Verifiche: sintassi; 9 test Node per Gmail e riepilogo (simulati); prototipo con microfono simulato (nota vocale, scadenze, foto, riepilogo: nessun errore); 19 test Node della logica server con servizi Google simulati (coda Plaud, formato reale della trascrizione Plaud verificato su un file vero, tipi, date con ora legale, email); prototipo con Chromium a 1360 e 400 px (anteprime, email, calendario, allegati: nessun errore, nessuno scorrimento orizzontale). Non verificato su Google: chiamate reali a Drive, Calendar, MailApp, caricamento resumable dal browser, anteprime via thumbnailLink.
- Azioni dell'utente: aggiornare i 4 file nello stesso progetto, nuova versione, nuovo consenso, premere "Attiva" (amministratore).
- Criteri di completamento: app aggiornata e provata sull'account reale; prima coda Plaud elaborata.

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
