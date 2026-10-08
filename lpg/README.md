# Pacchetto LPG: il metodo del primo corso, per Codex

Punto di ingresso per produrre il secondo corso dell'Accademia La Parola Giusta con lo stesso metodo del primo, «Dire, ascoltare, convincere» (8 moduli, 40 lezioni, 3:56:02).

Preparato da Claude il 2026-10-04 su richiesta di `requests/CLAUDE_LPG_HANDOFF.md`. Revisione 2: correzioni sui sei problemi di [`REVISIONE_CODEX.md`](REVISIONE_CODEX.md). Revisione 3: controlli di integrità per copertura, durate e caricamento, dopo [`REVISIONE_CODEX_2.md`](REVISIONE_CODEX_2.md).

## Stato in breve

- **Trasferimento non completo.** Il metodo, la configurazione, la procedura e le fonti sono documentati con riferimenti esatti. Gli script e i documenti originali **non sono copiati** in questo repository: la copia da Prove è stata negata dal controllo dei permessi della sessione Claude. Si recuperano con un clone pubblico (sotto).
- Fonte unica: `aki1806-droid/Prove`, branch `claude/heygen-video-creation-8gz057`, commit `4ed8a32ef71452ce66b1c67e4084bd84c242c356`. Non è unito a `main` di Prove.
- Mancano gli MD di partenza dei moduli 7–8, le impostazioni fini della voce, i prompt delle singole riprese e le licenze degli asset (`PROVENIENZA.md`).
- Quattro difetti degli script di Prove (messaggio «riprova.mp3», codici di uscita di `verifica.py` e `carica.py`, chiusura fissa a 10 s in `scene.py`) non sono corretti alla fonte: `PROCEDURA.md` li aggira con controlli espliciti.

## Indice

| file | contenuto |
|---|---|
| [`PROCEDURA.md`](PROCEDURA.md) | variabili e directory, bootstrap con Playwright fissato, comandi eseguibili dall'MD al montato, controlli di copertura, banda e caricamento, chiusure, ripresa dopo errori, criteri di completamento; ogni punto marcato [P] prescrizione, [S] script, [V] verificato |
| [`MASTER-E-ISTRUZIONI.md`](MASTER-E-ISTRUZIONI.md) | quale documento comanda, come è cambiato il metodo, struttura, nomi, formati, regole editoriali, adattamenti per il secondo corso |
| [`CONFIGURAZIONE.md`](CONFIGURAZIONE.md) | voce, audio, slide, palette, caratteri, riprese, montaggio HeyGen, variabili e credenziali |
| [`ASSET.md`](ASSET.md) | logo, caratteri, voce, riprese, musica, silenzi, avatar, video: origine, licenza nota, recupero |
| [`QUALITA.md`](QUALITA.md) | controlli per lezione, problemi noti, stato delle correzioni 8.4, 8.5 e 8.1 |
| [`campione/README.md`](campione/README.md) | lezione 6.1: fonti, impostazioni, verifica locale eseguita, come usarla per il confronto |
| [`PROVENIENZA.md`](PROVENIENZA.md) | fonte, inventario dei file di Prove, sanitizzazione, difetti delle fonti, lacune, accessi e costi |
| [`REVISIONE_CODEX.md`](REVISIONE_CODEX.md) | rapporto di revisione di Codex sulla prima consegna |
| [`REVISIONE_CODEX_2.md`](REVISIONE_CODEX_2.md) | seconda revisione di Codex (falsi positivi A–C) |

## Recuperare le fonti

```bash
git clone --filter=blob:none https://github.com/aki1806-droid/Prove prove-lpg
cd prove-lpg
git checkout 4ed8a32ef71452ce66b1c67e4084bd84c242c356
# documenti: produzione/MASTER.md, produzione/STANDARD.md
# script:    produzione/script/
# esempi:    produzione/copioni/, produzione/registri/
```

Ordine di lettura: questo file → `MASTER-E-ISTRUZIONI.md` → `produzione/MASTER.md` e `produzione/STANDARD.md` in Prove → `PROCEDURA.md` → `campione/README.md`.

## Verifiche eseguite per questo passaggio

Eseguite in locale, senza servizi a pagamento, con i comandi di `PROCEDURA.md` in un'area di lavoro separata (Prove senza modifiche). Dettagli ed esiti in `campione/README.md`:

- bootstrap: Playwright 1.56.1 e avvio di Chromium 141 dal browser preinstallato; download del browser **fallito** (403 su `cdn.playwright.dev`);
- slide della 6.1: 47 PNG da 47 voci, guardati a campione; clip codificate (h264, 1080p, 25 fps);
- tagli su traccia sintetica:
  - copertura 46/46 con la trascrizione simulata;
  - con la trascrizione vuota `verifica.py` dà «fuori posto: 0», mentre il controllo di copertura fallisce come deve;
  - `correggi` riscrive `prova.mp3`;
  - banda 48/48 e pose 22/22;
- caricamento simulato con un server PUT locale: gli errori sono stati intercettati dal controllo su `carica.log`, mentre `carica.py` usciva con 0;
- `scene.py` con i silenzi sostituiti nella copia di lavoro: 50 scene;
- link locali di questo pacchetto controllati.

Non eseguite: voce, trascrizione, riprese, caricamento e montaggio reali (a pagamento e non autorizzati), chiusura da 15 s, variante 8.5; ascolto e visione dei video finali. Una descrizione non dimostra la riproducibilità: la prima lezione del secondo corso è la vera prova.

## Codex può cominciare?

**Sì, ma solo con la preparazione di una lezione campione, fino a §3 di `PROCEDURA.md`.** Cioè: bootstrap, copione riscritto, `blocchi.json`, `chunks.json`, `slides.json`, `pose.json`, controllo degli intermedi, PNG e clip. Prima serve un Chromium 1194 avviabile (§1.2). Questi passi non costano nulla e sono verificabili in locale.

Input da ricevere dall'utente:

1. l'MD della lezione (o del modulo) del secondo corso;
2. titolo del corso, del modulo e della lezione, cioè l'etichetta di copertina;
3. conferma o modifica di palette, caratteri, logo e testo della chiusura;
4. conferma della voce (Luca Ward, `eleven_v3`) e della durata (6:00);
5. il mondo visivo del modulo, o il permesso di proporlo.

Prerequisiti che restano per i passi successivi:

- accesso ElevenLabs, HeyGen e Artlist o Higgsfield all'account dell'utente, configurato fuori dal repository;
- autorizzazione esplicita dell'utente per ogni spesa (voce, trascrizione, riprese, montaggio);
- copie verbatim degli script, se si vogliono in chagpt: le deve autorizzare l'utente;
- conferma di quali versioni dei moduli 1–5 sono quelle pubblicate (`MASTER-E-ISTRUZIONI.md`);
- decisione sulla durata delle chiusure di modulo: 15 s come prescritto, o 10 s come risulta misurato nel primo corso (`PROCEDURA.md` 8.2).
