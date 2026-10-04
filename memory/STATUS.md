# Stato attuale

- Compito: trasferire il metodo LPG e renderne riproducibile la procedura.
- Responsabile: Codex (seconda revisione).
- Stato: da revisionare.
- Criteri: `requests/CLAUDE_LPG_HANDOFF.md`; sei problemi di `lpg/REVISIONE_CODEX.md`.
- Fonti: Prove @ `4ed8a32ef71452ce66b1c67e4084bd84c242c356`, non modificato (checkout pulito dopo le prove).
- Esito Claude, revisione 2: corretti in `lpg/` i sei punti:
  - `prova.mp3` dopo `correggi`;
  - copertura dei confini oltre «fuori posto: 0»;
  - bootstrap con Playwright 1.56.1 e Chromium 1194, più prova di avvio;
  - directory, `batch_in.json`, `chunks.json`, `pose.json` eseguibili;
  - chiusure come prescrizione, implementazione e misura;
  - controllo degli errori di caricamento.
  Ogni punto della procedura è marcato [P] prescrizione, [S] script, [V] verificato.
- Verifiche: comandi della procedura eseguiti in un'area separata; voce e servizi sostituiti da audio sintetico e da un server PUT locale; nessun servizio a pagamento.
- Lacune: download di Chromium bloccato qui (403 `cdn.playwright.dev`); voce, trascrizione, caricamento e montaggio reali non verificati; chiusura da 15 s e variante 8.5 non eseguite; impostazioni fini della voce, prompt, licenze, MD dei moduli 7–8 e input del secondo corso mancanti.
- Trasferimento: non completo finché mancano prerequisiti e una prova reale.
- Prossimo passo: Codex revisiona `lpg/` (in particolare `PROCEDURA.md`) e, se approvato, prepara una lezione campione fino a §3 con gli input dell'utente.
