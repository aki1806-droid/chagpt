# Notabene: stima dei costi (6 ottobre 2026)

Stime indicative, non preventivi. Prezzi API Anthropic in dollari, IVA esclusa.

## Cosa è gratis

| Voce | Costo | Limiti da conoscere |
|---|---|---|
| App (Google Apps Script) | 0 | Con Gmail: ogni esecuzione dura al massimo 6 minuti; gli aggiornamenti automatici hanno circa 90 minuti al giorno per persona |
| Archivio (Google Drive) | 0 | 15 GB per account, condivisi con Gmail e Foto. I testi occupano pochissimo |
| Lettura di PDF e foto (OCR di Drive) | 0 | Il testo viene estratto da Google, non dall'AI |
| Importazione Plaud giornaliera | 0 in più | Usa il tuo abbonamento Claude e ne consuma parte dei limiti d'uso. Le trascrizioni restano quelle del tuo piano Plaud |

## L'unico costo: Claude per catalogare

Modello predefinito `claude-opus-5-5`: 4 $ per milione di token in ingresso, 20 $ per milione in uscita. Un token corrisponde a circa 4 caratteri di testo italiano. Per ogni nota l'AI legge il testo (al massimo 60.000 caratteri) e scrive titolo, riassunto, categoria ed etichette.

| Tipo di nota | Costo per nota |
|---|---|
| Nota breve, foto di appunti (1 pagina) | circa 0,02 $ |
| Documento o PDF di 10 pagine | circa 0,04 $ |
| Registrazione Plaud di 45 minuti | circa 0,05 $ |
| Registrazione Plaud di 90 minuti o più | circa 0,08 $ (oltre i 60.000 caratteri il testo viene tagliato) |

Una nota viene ricatalogata solo se il file cambia.

## Scenari

| Scenario | Claude Opus 5.5 | Con `claude-haiku-4-5` (circa 4 volte meno) |
|---|---|---|
| Archivio iniziale: 300 file, di cui 30 registrazioni | 8–12 $ una tantum | 2–3 $ |
| Uso normale in due: 80 note + 20 registrazioni al mese | circa 3 $ al mese | meno di 1 $ al mese |
| Uso intenso: 200 note + 40 registrazioni al mese | circa 6–7 $ al mese | circa 2 $ al mese |

Con Haiku i riassunti sono un po' meno accurati. Per cambiare modello basta la proprietà `CLAUDE_MODEL` nelle impostazioni dello script.

## Come tenere i costi sotto controllo

- In <https://console.anthropic.com> il credito è prepagato: quando finisce, la catalogazione si ferma e le note restano salvate come "Da rivedere". Non ci sono addebiti a sorpresa.
- Nella console puoi impostare un limite di spesa mensile e ricevere avvisi.
- Il costo per nota si può verificare dopo le prime 20–30 note, nella pagina "Usage" della console.
