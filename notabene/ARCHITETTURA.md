# Notabene: archivio note del team

Proposta del 2026-10-06. Stato: prototipo grafico con dati simulati (`prototipo/index.html`). Nessun servizio reale collegato.

## Requisiti dell'utente

- App web raggiungibile da qualsiasi luogo, bella e intuitiva.
- Collegata a una cartella Google Drive dove finiscono le note.
- Tipi di file: testo, Google Docs, PDF, foto e scansioni (anche scritte a mano), audio.
- Registrazioni Plaud incluse.
- L'AI cataloga tutto: riassunto, categoria ed etichette.
- Oggi centinaia di file, in futuro migliaia.
- Condivisa con il team: ogni persona ha la propria dashboard e un accesso che resta memorizzato. C'è una sezione personale e una condivisa.

## Perché serve un piccolo backend

La "strada 2" (app web + Drive) resta la base. Però team, sezioni private e AI automatica richiedono un servizio sul server. Una pagina statica non può:

- impedire davvero a un utente di vedere le note personali di un altro;
- custodire la chiave dell'AI;
- elaborare i file appena arrivano, anche quando nessuno ha l'app aperta;
- cercare velocemente fra migliaia di testi estratti.

## Architettura proposta

```
Telefono / PC (app web installabile)
        │  accesso con Google, sessione ricordata
        ▼
Frontend (Next.js) ── API ──► Database Postgres (Supabase)
                               · note, etichette, categorie, permessi
                               · ricerca testuale + ricerca per significato
        ▲                        ▲
        │                        │
Elaborazione in background ──────┘
  · controlla la cartella Drive (notifiche di modifica)
  · estrae il testo: documenti, PDF, OCR per foto, trascrizione per audio
  · AI (Claude): riassunto, categoria, etichette
        │
        ▼
Google Drive: cartella "Notabene"
  ├─ Condivise/            ← visibili a tutto il team
  └─ Personali/<persona>/  ← visibili in app solo al proprietario
```

- **Accesso**: Google, con sessione ricordata per 30 giorni. Nessuna password da gestire. Solo gli indirizzi autorizzati dall'amministratore possono entrare.
- **Permessi**: applicati nel database (Row Level Security). Una nota personale è restituita solo al suo proprietario.
- **Ricerca**: testo completo in italiano, filtri per tipo, data, categoria ed etichetta. In seguito, ricerca per significato (embedding con pgvector).
- **Plaud**: è il punto da verificare. Va scelto come arrivano le registrazioni nella cartella Drive: esportazione automatica (se disponibile sull'account Plaud), esportazione manuale, oppure trascrizione dell'audio fatta dall'app.
- **AI**: ogni file elaborato una volta; si rielabora solo quando cambia. Le etichette proposte restano "da rivedere" finché qualcuno non le conferma o finché la confidenza è alta.

## Costi indicativi (da confermare al momento della scelta)

- Hosting e database: piani gratuiti sufficienti per centinaia di file e un piccolo team; piani a pagamento quando si cresce.
- AI: costo per file elaborato, contenuto per testi brevi. Trascrizione audio e OCR hanno un costo a parte.

## Privacy

Se la cartella "Notabene" sta nel Drive dell'amministratore, l'amministratore può aprire da Drive anche le sottocartelle personali. L'app nasconde le note altrui, ma Drive no. Alternative: un Drive condiviso del team (Google Workspace), oppure note personali conservate nel Drive di ciascun membro. Scelta da fare con l'utente.

## Fasi

1. Prototipo grafico cliccabile (fatto, dati simulati).
2. Accesso Google, team, sezioni personale/condivisa, lettura cartella Drive, ricerca.
3. Elaborazione AI: riassunti, categorie, etichette, OCR.
4. Plaud e trascrizioni audio.
5. Ricerca per significato e domande in linguaggio naturale sulle note.

## Decisioni aperte

- Account Google normali o Google Workspace per il team? Quante persone?
- Dove stanno le note personali (vedi Privacy)?
- Come esportare le registrazioni Plaud verso Drive?
- Nome e dominio dell'app (`Notabene` è provvisorio).
- Budget mensile accettabile per AI e hosting.
