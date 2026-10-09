# Ultimo passaggio di consegne

## Notabene: pagina bloccata su "Caricamento" (Claude, 2026-10-09)

Sintomo sull'app reale: SyntaxError "Unexpected identifier 'Registrazione'" alla riga del template literal della registrazione vocale; nessuna chiamata getBootstrap nel registro. Prima ipotesi (scriptlet dentro lo script) non risolutiva: l'errore è rimasto. Causa trovata: Apps Script toglie i commenti dagli script con un analizzatore che non riconosce i template literal; `accept="audio/*"` dentro un template veniva preso per l'inizio di un commento e il codice fino al successivo `*/` (riga 570) veniva cancellato. Correzione: `&#42;` al posto di `*` negli attributi, niente `//` in indirizzi e regex, regex `**` riscritta; `prototipo/build.py` ora blocca la generazione se nel codice di Index.html compaiono `/*`, `*/` o `//` fuori dai commenti. L'email resta in `data-me` sul body. Da confermare sull'app reale.


## Notabene: le 4 funzioni proposte (Claude, 2026-10-09)

Aggiunte in `Code.gs`: importGmail_/importGmailNow (servizio avanzato Gmail, scope gmail.modify, dentro syncAll), extractActions (Haiku, schema JSON), weeklyDigest/sendDigestNow (trigger del lunedì alle 7, installato da installSync), saveVoiceNote; tipi `vocale` ed `email`; prefs `riepilogo` e `gmail`. In `Index.html`: schede Registra e Foto in Nuova nota, riquadro "Scadenze e impegni" nella nota, Automatismi in Personalizza, voce di menu "Importa ora da Gmail". Indice invariato (nessuna colonna nuova). Rischi sul reale: microfono dentro l'iframe di Apps Script (c'è il ripiego col registratore del telefono), riconoscimento vocale non disponibile su Firefox, consenso per gmail.modify.

## Notabene versione 2 (Claude, 2026-10-09)

Richiesta: più formati e video, Gmail con allegati, trascrizioni e audio da Plaud, app più veloce, anteprime, Google Calendar (eventi, allegati, programmazione), grafica più accattivante, 4 proposte di funzioni.
Modifiche in `notabene/app/`: `Code.gs` (typeFor_, conversione Excel/PowerPoint, immagini per Claude, getThumbs, getUploadTarget/finishUpload, sendEmail, listEvents/createEvent/attachToEvent/attachToDay, processPlaudQueue/runPlaudQueue, colonne `media` e `eventi`, CHAT_EXCERPT), `appsscript.json` (Calendar v3, scope calendar e script.send_mail), `Index.html` e `Styles.html` (schede con anteprime, pannello con anteprima/email/calendario, calendario mensile, cache nel browser, paginazione, nuovi colori e logo). Guida `INSTALLAZIONE.md` (sezione "Aggiornare alla versione 2"), `COSTI.md`, `ARCHITETTURA.md`. Routine Plaud aggiornata (prompt in claude.ai).
Verifiche: vedi STATUS. Rischi da controllare sul reale: CORS del caricamento resumable da googleusercontent; thumbnailLink con token (c'è il ripiego `getThumbnail`); iframe di anteprima Drive su Safari (c'è "Apri in Drive"); consenso per i nuovi scope.
Prossima azione: l'utente aggiorna l'app; revisione Codex di `Code.gs` (coda Plaud e sicurezza dei link) e del prompt della routine.


## Notabene, importazione Plaud dall'app (Claude, 2026-10-06)

Pulsante "Importa ora" (solo amministratore) che chiama l'API trigger delle routine (`POST https://api.anthropic.com/v1/claude_code/routines/{id}/fire`, header beta `experimental-cc-routine-2026-04-01`, fonte: code.claude.com/docs/en/routines.md) per trig_01JadYR5ovSYPuzcvBgdHzLw; token salvato come PLAUD_ROUTINE_TOKEN da Personalizza. Il token va generato dall'utente in claude.ai/code/routines. Provato solo nel prototipo; chiamata reale non verificata.

## Notabene, modelli separati (Claude, 2026-10-06)

`claudeRequest_` sceglie il modello per uso (`CLAUDE_MODEL_CATALOGO` = Haiku 4.5, `CLAUDE_MODEL_CHAT` = Sonnet 5.5, in CONFIG) e toglie effort/fallback per i modelli che non li accettano. Test Node: passati (richiesta di catalogazione senza effort né fallback, chat con effort medium e fallback; ciclo dell'agente invariato). `COSTI.md` riscritto. Non verificato con API reali.

## Notabene, chat-agente su Drive e Plaud regola A (Claude, 2026-10-06)

La chat ora è un agente Claude con strumenti cerca_note, cerca_drive (testo pieno di Drive, cartelle Notabene o tutto il Drive su scelta) e leggi_file (OCR, Fogli, Presentazioni); ciclo manuale via HTTP, max 8 passaggi, cache dei prompt. Aggiunto lo scope presentations.readonly. Test Node del ciclo con Claude simulato: passato (conserva i blocchi di thinking, chiude con tool_choice none). Non verificato con API reali. Routine Plaud aggiornata alla regola A. Costi chat stimati 5–15 centesimi a domanda (COSTI.md). L'utente ha chiesto se con Gemini sarebbe tutto gratis: risposto (gratis con limiti, ma nel piano gratuito i dati possono essere usati da Google; chat-agente oggi solo con Claude).

## Notabene, gestione file, chat e caricamento massivo (Claude, 2026-10-06)

Aggiunti in `notabene/app/`: eliminazione (cestino Drive), modifica testo (Doc/testo), sostituzione file, rinomina su Drive, selezione multipla (sposta/elimina), caricamento di più file con catalogazione a cicli, chat "Chiedi all'archivio" (`askArchive`: espansione della domanda con Claude, ordinamento per pertinenza, risposta con fonti [n]). Verifiche: sintassi; test Node delle funzioni di ordinamento (passato); prova del prototipo con Chromium (chat, selezione, eliminazione, modifica: nessun errore, nessuno scorrimento orizzontale a 400 px). Non verificato su Google: chiamate reali a Drive e Claude. Costi chat in `notabene/COSTI.md`. Plaud: 1 registrazione completa importata; scelta dell'utente sull'arretrato (A/B/C) in sospeso.

## Notabene, grafica personalizzabile e Plaud (Claude, 2026-10-06)

Riscritti `notabene/app/Index.html` e `Styles.html` (benvenuto, statistiche, in evidenza, viste griglia/compatta/lista, ordinamento, pannello Personalizza, nota rapida scritta); `Code.gs` ora salva preferenze per utente, stella e colore per nota. Prototipo generato con `notabene/prototipo/build.py` e ripubblicato. Creati `notabene/COSTI.md` e la routine giornaliera Plaud (senza connettori: va completata dall'utente). La condivisione della cartella con Giovanna è stata rifiutata dall'utente, che la farà personalmente. Revisione Codex utile su Code.gs e sul prompt della routine (salvato in claude.ai, non nel repository).

## Trasferimento LPG

## Seconda revisione Codex (2026-10-05)

Aggiornato chagpt ad af4954b. Confrontati tutti i documenti LPG con Prove al commit 4ed8a32ef71452ce66b1c67e4084bd84c242c356, senza modificarlo. Rapporto completo: `lpg/REVISIONE_CODEX_2.md`.

Le correzioni precedenti sono sostanzialmente recepite, ma restano tre falsi positivi riprodotti:

1. code.json=[] con 46 confini passa come COPERTURA 46/46: manca controllo cardinalità prima di zip.
2. durate.json={} passa come BANDA 0/0: mancano completezza e validità delle durate rispetto ai blocchi.
3. Processo che stampa errori [] e termina con 1 viene accettato dalla pipeline tee/grep senza controllo dell’esito del processo.

## Verifiche riuscite

Playwright 1.56.1 installato con cache nell’area scrivibile; intermedi 6.1; allinea/correggi su toni e silenzi, 46 confini; trascrizione vuota respinta dal controllo normale; copertura piena con testo simulato; banda 48/48 e pose 22/22; batch 97 file; server PUT locale con due 403 respinto e con tutti 200 accettato; sed/scene.py producono 50 scene. I test negativi sono descritti nel rapporto. Server locale fermato.

## Blocchi e verifiche mancanti

Chromium 1194 non scaricabile (403 su CDN e mirror); prova avvio fallita. Google Fonts bloccato con CONNECT 403. Nessuna replica PNG/clip con browser/font diversi. Servizi reali, ascolto e montato, chiusura 15 s e variante 8.5 non provati. Restano le lacune originali e gli input del secondo corso.

## Prossima azione per Claude

Correggere i tre controlli in chagpt e le precisazioni P/S/V del rapporto; ripetere test positivi e negativi senza modificare Prove o usare servizi a pagamento. Pubblicare su main senza force push, dare SHA e lacune, riassegnare la revisione a Codex. Non dichiarare il trasferimento o il workflow completi.
