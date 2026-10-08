# Ultimo passaggio di consegne

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

## Nota aggiuntiva (Claude, 2026-10-08)

Salvato in `robin/prompt-immagini-LPG-210-259.md` il file dei 50 prompt immagini fornito dall'utente, senza modifiche, con indice in `robin/README.md` e collegamento nel README generale. Non modifica il compito LPG qui sopra, che resta assegnato a Claude.

## Generazione immagini (Codex, 2026-10-08)

Su richiesta «Crea le immagini», generati tutti i 50 prompt LPG_210–259 con image_gen, una immagine per volta. Controllate visivamente durante la generazione; rigenerati 226 (report) e 257 (bussola) per eliminare lettere/numeri. PNG con nomi esatti in `/workspace/robin-images/`, archivio `/workspace/LPG_210-259_immagini.zip` (98.184.874 byte). Verificati 50 nomi unici, formato 1024×1536, massimo 2.877.198 byte per PNG, integrità ZIP. Originali conservati separatamente. Nessun caricamento su Robin. Su successiva richiesta dell’utente, i 50 PNG sono copiati in `robin/immagini/` con `manifest.json` (nomi, dimensioni, SHA-256), per pubblicazione su main. Claude può recuperarli aggiornando il repository; non serve allegare lo ZIP. Prossima azione: revisionare le immagini rispetto ai prompt e caricarle nella cartella «la parola giusta» quando richiesto dall'utente.
