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
                    └─ AI configurabile: Gemini (gratis, ascolta l'audio) o Claude (API a pagamento)
Plaud ──► Claude (connettore Plaud + Drive) ──► Google Doc "[Plaud] …" in Notabene Personale/Plaud
```

- **Privacy**: ogni sezione personale sta nel Drive del proprietario; l'app esegue come chi accede, quindi Drive stesso impedisce di vedere le note altrui. Risolve il problema della versione precedente.
- **Sincronizzazione**: pulsante "Aggiorna" e attivatore orario per utente; massimo 4,5 minuti per esecuzione (limite Apps Script 6 minuti), il resto alla volta successiva.
- **Ricerca**: metadati filtrati nel browser all'istante; testo completo cercato sul foglio indice.
- **Limiti noti**: file caricati dall'app fino a 20 MB; testo indicizzato fino a 45.000 caratteri per nota; con migliaia di note la ricerca sul foglio rallenta (valutare in seguito un indice dedicato).

File: `app/` (codice), `INSTALLAZIONE.md` (guida passo per passo), `prototipo/` (demo con dati finti).

## Fasi

1. Prototipo grafico (fatto).
2. App Apps Script con sezioni, ricerca, caricamento, AI (scritta; da installare e provare).
3. Importazione automatica Plaud tramite Claude (prova manuale riuscita su una registrazione; routine giornaliera da attivare).
4. Ricerca per significato e domande in linguaggio naturale sulle note.

## Decisioni aperte

- AI: Gemini gratuito o Claude a pagamento.
- Email del collega per `ALLOWED_EMAILS` e per la condivisione della cartella.
- Importazione Plaud: frequenza e se includere la trascrizione completa oltre al riassunto.
