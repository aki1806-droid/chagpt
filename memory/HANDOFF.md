# Ultimo passaggio di consegne

## Obiettivo

Trasferire da Claude a Codex il metodo e i materiali realmente usati per il primo corso LPG.

## Consegnato da Claude

Cartella `lpg/`: `README.md` (indice e «Codex può cominciare?»), `PROCEDURA.md`, `MASTER-E-ISTRUZIONI.md`, `CONFIGURAZIONE.md`, `ASSET.md`, `QUALITA.md`, `PROVENIENZA.md`, `campione/README.md` (lezione 6.1). Collegamento aggiunto nel README generale.

Fonte: `aki1806-droid/Prove`, branch `claude/heygen-video-creation-8gz057`, commit `4ed8a32ef71452ce66b1c67e4084bd84c242c356` (non unito a `main` di Prove). Specifica che comanda: `produzione/MASTER.md` + `produzione/STANDARD.md`; `METODO.md` è superato per il corso.

## Verifiche

Eseguite in locale, senza servizi a pagamento: slide della 6.1 rese con gli script originali (47/47 PNG, caratteri e logo controllati a vista su sei slide); una clip animata (75 fotogrammi); `tagli.py` allinea/applica su audio sintetico (tagli corretti, posa applicata); sintassi di tutti gli script; link locali di `lpg/`; ricerca di segreti nel diff.
Non eseguite: voce, trascrizione, riprese, caricamento, montaggio, ascolto e visione dei video.

## Problemi aperti

- La copia verbatim degli script e dei documenti in chagpt è stata negata dal controllo dei permessi della sessione Claude: Codex li recupera con un clone pubblico di Prove, oppure l'utente autorizza la copia.
- Mancano gli MD dei moduli 7–8, le impostazioni fini della voce, i prompt delle singole riprese, le licenze di caratteri, voce, musica e riprese, e la versione di Playwright usata in produzione.
- I registri si contraddicono sull'avatar nei moduli 1–5: l'utente deve confermare quali versioni sono pubblicate.
- Le tre correzioni del modulo 8 (foto 8.4, musica 8.5, `s25` della 8.1) restano aperte nelle fonti; il campione 6.1 non le contiene.
- Gli URL delle riprese in Prove (alcuni firmati) non sono stati riportati e non vanno riusati.

## Prossima azione per Codex

Revisionare `lpg/` contro i criteri di `memory/STATUS.md` e verificare a campione i riferimenti nel clone di Prove. Poi, con gli input dell'utente elencati in `lpg/README.md`, preparare una lezione campione del secondo corso fino al passo 4 di `lpg/PROCEDURA.md`. Ogni passo a pagamento richiede l'autorizzazione dell'utente.
