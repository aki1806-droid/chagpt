# Notabene: archivio note del team

Proposta del 2026-10-06. Stato: app Apps Script scritta (`app/`), non ancora installata né provata su Google. Prototipo grafico in `prototipo/`.

## Requisiti dell'utente

- App web raggiungibile da qualsiasi luogo, bella e intuitiva.
- Collegata a una cartella Google Drive dove finiscono le note.
- Tipi di file: testo, Google Docs, PDF, foto e scansioni (anche scritte a mano), audio.
- Registrazioni Plaud incluse.
- L'AI cataloga tutto: riassunto, categoria ed etichette.
- Oggi centinaia di file, in futuro migliaia.
- Condivisa con il team: ogni persona ha la propria dashboard e un accesso che resta memorizzato. C'è una sezione personale e una condivisa.

## Scelta finale (2026-10-06): solo strumenti Google gratuiti + Claude

Due persone con Gmail normale; richiesta "fare con quello che abbiamo". Niente server né database a pagamento.

```
Telefono / PC ──► Web app Google Apps Script (eseguita come l'utente che accede)
                    │  accesso Google ricordato; solo email in ALLOWED_EMAILS
                    ├─ "Notabene Personale" nel Drive di ciascuno  → privata davvero
                    ├─ "Notabene Condivise" (Drive di aki, condivisa) → team
                    │     in ogni cartella: foglio "_Notabene Indice"
                    ├─ estrazione testo: Docs, testo, OCR di Drive per PDF/foto/Word
                    └─ AI: Claude via API (scelta dell'utente); Gemini resta disponibile come alternativa
Plaud ──► routine Claude giornaliera (connettori Plaud + Drive) ──► Google Doc "[Plaud] …" con riassunto e trascrizione completa
```

- **Privacy**: ogni sezione personale sta nel Drive del proprietario; l'app esegue come chi accede, quindi Drive stesso impedisce di vedere le note altrui. Risolve il problema della versione precedente.
- **Sincronizzazione**: pulsante "Aggiorna" e attivatore orario per utente; massimo 4,5 minuti per esecuzione (limite Apps Script 6 minuti), il resto alla volta successiva.
- **Ricerca**: metadati filtrati nel browser all'istante; testo completo cercato sul foglio indice.
- **Chat** (`askArchive`): agente Claude con strumenti `cerca_note` (indice), `cerca_drive` (ricerca a testo pieno di Drive dentro i file, limitata alle cartelle Notabene o, su richiesta, a tutto il Drive dell'utente) e `leggi_file` (testo a blocchi da 15.000 caratteri, con OCR, Fogli e Presentazioni). Massimo 8 passaggi e 4,5 minuti; ultimo passaggio con `tool_choice: none`; cache dei prompt attiva. Risponde citando [n].
- **Gestione file**: elimina (cestino di Drive, solo il proprietario del file), modifica del testo per Google Doc e file di testo (il Doc diventa testo semplice), sostituzione del contenuto per gli altri file, rinomina su Drive quando cambia il titolo, selezione multipla per spostare o eliminare.
- **Caricamento massivo**: più file caricati uno alla volta (`uploadRaw`), poi catalogati con cicli di `syncNow`.
- **Limiti noti**: file caricati dall'app fino a 20 MB; testo indicizzato fino a 45.000 caratteri per nota; con migliaia di note la ricerca sul foglio rallenta (valutare in seguito un indice dedicato).

- **Personalizzazione**: tema, colore principale, caratteri, sfondo, angoli, spaziatura, dimensione testo, sezioni della pagina iniziale, vista, ordine, colori delle categorie; per nota titolo, categoria, etichette, colore e stella. Le impostazioni sono salvate per utente (UserProperties).

File: `app/` (codice), `INSTALLAZIONE.md` (guida), `COSTI.md` (stime), `prototipo/` (demo generata da `app/` con `prototipo/build.py` e dati di `prototipo/demo.js`).

## Fasi

1. Prototipo grafico (fatto).
2. App Apps Script con sezioni, ricerca, caricamento, AI (scritta; da installare e provare).
3. Importazione automatica Plaud tramite Claude (prova manuale riuscita su una registrazione; routine giornaliera da attivare).
4. Ricerca per significato e domande in linguaggio naturale sulle note.

## Decisioni prese il 2026-10-06

- AI: Claude. Catalogazione con `claude-haiku-4-5` (senza effort né fallback, non supportati), chat-agente con `claude-sonnet-5-5` (effort medium, fallback lato server). Modelli cambiabili con `CLAUDE_MODEL_CATALOGO` e `CLAUDE_MODEL_CHAT`.
- Collega autorizzata: giovanna.vullo87@gmail.com.
- Plaud (regola A, 6/10): registrazioni dal 1° ottobre 2026 complete (max 3 al giorno), arretrato solo riassunto (max 15 al giorno).

## Aperto

- La routine Plaud gira dentro la conversazione Claude che ha creato Notabene, dove i connettori sono attivi.
- Condivisione della cartella con Giovanna: la fa l'utente (ha rifiutato che la facesse Claude).
