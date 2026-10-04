# Pacchetto LPG: il metodo del primo corso, per Codex

Punto di ingresso per produrre il secondo corso dell'Accademia La Parola Giusta con lo stesso metodo del primo, «Dire, ascoltare, convincere» (8 moduli, 40 lezioni, 3:56:02).

Preparato da Claude il 2026-10-04 su richiesta di `requests/CLAUDE_LPG_HANDOFF.md`.

## Stato in breve

- **Trasferimento non completo.** Il metodo, la configurazione, la procedura e le fonti sono documentati con riferimenti esatti. Gli script e i documenti originali **non sono copiati** in questo repository: la copia da Prove è stata negata dal controllo dei permessi della sessione Claude. Si recuperano con un clone pubblico (sotto).
- Fonte unica: `aki1806-droid/Prove`, branch `claude/heygen-video-creation-8gz057`, commit `4ed8a32ef71452ce66b1c67e4084bd84c242c356`. Non è unito a `main` di Prove.
- Mancano gli MD di partenza dei moduli 7–8, le impostazioni fini della voce, i prompt delle singole riprese e le licenze degli asset (`PROVENIENZA.md`).

## Indice

| file | contenuto |
|---|---|
| [`PROCEDURA.md`](PROCEDURA.md) | prerequisiti, i 16 passi dall'MD al montato con comandi, input/output, ripresa dopo errori, criteri di completamento; verificato e solo documentato distinti |
| [`MASTER-E-ISTRUZIONI.md`](MASTER-E-ISTRUZIONI.md) | quale documento comanda, come è cambiato il metodo, struttura, nomi, formati, regole editoriali, adattamenti per il secondo corso |
| [`CONFIGURAZIONE.md`](CONFIGURAZIONE.md) | voce, audio, slide, palette, caratteri, riprese, montaggio HeyGen, variabili e credenziali |
| [`ASSET.md`](ASSET.md) | logo, caratteri, voce, riprese, musica, silenzi, avatar, video: origine, licenza nota, recupero |
| [`QUALITA.md`](QUALITA.md) | controlli per lezione, problemi noti, stato delle correzioni 8.4, 8.5 e 8.1 |
| [`campione/README.md`](campione/README.md) | lezione 6.1: fonti, impostazioni, verifica locale eseguita, come usarla per il confronto |
| [`PROVENIENZA.md`](PROVENIENZA.md) | fonte, inventario dei file di Prove, sanitizzazione, lacune, accessi e costi |

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

Eseguite in locale, senza servizi a pagamento:

- slide della 6.1 rese con gli script originali: 47 PNG da 47 voci, caratteri e logo corretti a vista;
- una clip animata resa (75 fotogrammi);
- `tagli.py` allinea/applica su audio sintetico: tagli nelle pause giuste e posa applicata;
- sintassi di tutti gli script Python e JavaScript: nessun errore;
- link locali di questo pacchetto controllati.

Non eseguite: voce, trascrizione, riprese, caricamento e montaggio (a pagamento e non autorizzati); ascolto e visione dei video finali. Una descrizione non dimostra la riproducibilità: la prima lezione del secondo corso è la vera prova.

## Codex può cominciare?

**Sì, ma solo con la preparazione di una lezione campione, fino al passo 4 di `PROCEDURA.md`.** Cioè: copione riscritto, `blocchi.json`, `chunks.json`, `slides.json`, PNG e clip. Questi passi non costano nulla e sono verificabili in locale.

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
- conferma di quali versioni dei moduli 1–5 sono quelle pubblicate (`MASTER-E-ISTRUZIONI.md`).
