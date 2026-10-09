# Notabene: stima dei costi (aggiornata il 9 ottobre 2026)

Stime indicative, non preventivi. Prezzi API Anthropic in dollari, IVA esclusa.

## Cosa è gratis

| Voce | Costo | Limiti da conoscere |
|---|---|---|
| App (Google Apps Script) | 0 | Con Gmail: ogni esecuzione dura al massimo 6 minuti; gli aggiornamenti automatici hanno circa 90 minuti al giorno per persona |
| Archivio (Google Drive) | 0 | 15 GB per account, condivisi con Gmail e Foto. I testi occupano pochissimo |
| Lettura di PDF e foto (OCR di Drive) | 0 | Il testo viene estratto da Google, non dall'AI |
| Importazione Plaud giornaliera | 0 in più | Usa il tuo abbonamento Claude e ne consuma parte dei limiti d'uso |
| Audio e trascrizioni Plaud copiati su Drive | 0 | Spazio su Drive: circa 15–30 MB per ora di registrazione |
| Email con Gmail dall'app | 0 | Circa 100 destinatari al giorno; allegati fino a 24 MB, oltre si invia il collegamento |
| Google Calendar | 0 | Al massimo 25 allegati per evento |
| Video e file grandi | 0 | Lo spazio è quello del tuo Drive (15 GB gratuiti) |

## Claude: due modelli

| Uso | Modello | Prezzo per milione di token (ingresso / uscita) |
|---|---|---|
| Catalogare (titolo, riassunto, categoria, etichette) | `claude-haiku-4-5` | 1 $ / 5 $ |
| Chat "Chiedi all'archivio" | `claude-sonnet-5-5` | 2 $ / 10 $ |

Un token corrisponde a circa 4 caratteri di testo italiano. Per cambiare modello: proprietà dello script `CLAUDE_MODEL_CATALOGO` o `CLAUDE_MODEL_CHAT` (per esempio `claude-opus-5-5` per la massima qualità, al doppio del prezzo di Sonnet).

### Catalogazione con Haiku

| Tipo di nota | Costo per nota |
|---|---|
| Nota breve, foto di appunti (1 pagina) | circa 0,3 centesimi |
| Documento o PDF di 10 pagine | circa 0,8 centesimi |
| Registrazione Plaud di 45 minuti | circa 1,2 centesimi |
| Registrazione Plaud di 90 minuti o più | circa 2 centesimi (oltre i 60.000 caratteri il testo viene tagliato) |
| Foto (l'AI guarda l'immagine) | circa 0,3 centesimi |
| Video (l'AI guarda un fotogramma scelto da Drive) | circa 0,3 centesimi |

| Scadenze e impegni (su richiesta, per nota) | circa 1–2 centesimi (legge tutta la nota, anche la trascrizione) |
| Riepilogo del lunedì | circa 0,5 centesimi a settimana per persona |
| Email importata da Gmail e nota vocale | come una nota breve: circa 0,3 centesimi |

La trascrizione delle note vocali la fa il browser, gratis. Con la versione 2 le registrazioni Plaud già importate vengono ricatalogate una volta, quando arriva la trascrizione completa: per circa 60 registrazioni, circa 1 $ una tantum.

Una nota viene ricatalogata solo se il file cambia.

### Chat con Sonnet

Per ogni domanda l'agente fa da 2 a 8 passaggi (cerca nell'indice, cerca su Drive, legge i file, risponde). La parte di conversazione già inviata viene riletta dalla cache a un decimo del prezzo. Costo indicativo: **3–8 centesimi per domanda**, di più se legge molti file lunghi.

## Scenari

| Scenario | Costo |
|---|---|
| Archivio iniziale: 300 file, di cui 30 registrazioni | 1–2 $ una tantum |
| Catalogazione, uso normale in due: 80 note + 20 registrazioni al mese | meno di 1 $ al mese |
| Chat: 10 domande al giorno in due | circa 10–20 $ al mese |
| Chat: 3 domande al giorno in due | circa 3–6 $ al mese |

## Come tenere i costi sotto controllo

- In <https://console.anthropic.com> il credito è prepagato: quando finisce, catalogazione e chat si fermano e le note restano salvate. Non ci sono addebiti a sorpresa.
- Nella console puoi impostare un limite di spesa mensile e ricevere avvisi.
- Il costo reale si vede dopo i primi giorni, nella pagina "Usage" della console.
