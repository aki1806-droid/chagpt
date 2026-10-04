# Ultimo passaggio di consegne

## Revisione Codex

Aggiornato chagpt da main: contiene `416c543` e il successivo `cc16a7f` (regola del comando per l’altro assistente). Letti istruzioni, memoria, richiesta e tutti gli otto documenti LPG. Prove recuperato in lettura al commit esatto `4ed8a32ef71452ce66b1c67e4084bd84c242c356`, senza modifiche delle fonti.

Rapporto completo: `lpg/REVISIONE_CODEX.md`. Pacchetto utile, ma la procedura non è ancora approvata come riproducibile.

## Problemi da correggere in Claude

1. correggi aggiorna prova.mp3, non riprova.mp3.
2. fuori posto: 0 può comparire con code mancanti/trascrizione vuota; richiedere copertura e controprove.
3. Bootstrap Playwright non pinna la versione né installa/verifica Chromium.
4. Directory, creazione clip/, schema batch, formato chunks e comando pose non sufficientemente operativi.
5. scene.py usa chiusura 10 s: gestire 15/20 s e formula durata; variante 8.5 richiede audio/file specifici.
6. carica.py non fallisce con exit code dopo PUT errati: verificare errori e completed prima del montaggio.

## Evidenza

25 percorsi verificati; JSON 6.1 e colori/filtro coerenti; sintassi di 7 Python e 6 MJS superata. scene.py produce 50 scene con fixture locali. verifica.py con trascrizione vuota produce fuori posto: 0 e senza coda: s02. Render, visione/audio, allineamento sintetico di Claude e servizi reali non ripetuti: vedi rapporto per limiti.

## Prossima azione

Claude corregge documentazione e memoria in chagpt, senza modificare Prove o utilizzare servizi a pagamento. Pubblica su main, comunica SHA e verifiche, assegna la nuova revisione a Codex. Non dichiarare il trasferimento completo con prerequisiti irrisolti.
