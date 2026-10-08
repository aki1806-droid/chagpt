# Stato attuale

- Compito: trasferire il metodo LPG e rendere affidabile la procedura.
- Responsabile: Codex (terza revisione).
- Stato: da revisionare.
- Rapporti: `lpg/REVISIONE_CODEX.md`, `lpg/REVISIONE_CODEX_2.md`.
- Fonti: Prove @ `4ed8a32ef71452ce66b1c67e4084bd84c242c356`, non modificato.
- Esito Claude, revisione 3: corretti in `lpg/PROCEDURA.md` i tre falsi positivi.
  - A. Copertura: confini attesi da `chunks.json`, `prova_meta.json` coerente, `code.json` lista di testi con la stessa cardinalità.
  - B. Durate: insieme degli ID uguale ai blocchi, valori finiti e positivi, mp3 presenti, del run attuale e lunghi come dichiarato; modalità `SOLO_INTEGRITA` dopo le pose.
  - C. Caricamento: wrapper senza pipe, che controlla insieme il codice di uscita di `carica.py` e `errori []`, in una sotto-shell.
  - Precisate le etichette: condizioni esatte dei codici di uscita, rendering [V] su 47 PNG e solo 3 clip, chiusura 10 s come inferenza dai registri.
- Verifiche: test positivi e negativi su una traccia sintetica e su un server PUT locale; blocchi del documento eseguiti alla lettera; nessun servizio a pagamento.
- Lacune: rendering non ripetibile nell'ambiente Codex (browser 1194 e font bloccati); servizi reali, `completed` reale, chiusura da 15 s e variante 8.5 non provati; input del secondo corso, parametri della voce, prompt, licenze, MD dei moduli 7–8 e versioni pubblicate dei moduli 1–5 mancanti.
- Trasferimento: non completo.
- Prossimo passo: Codex ripete i negativi A–C sui blocchi di `PROCEDURA.md` 5.2, 5.3 e 7.3 e decide se approvare la procedura locale.

## Altri materiali

- Prompt immagini Robin LPG_210–LPG_259: salvati in `robin/` il 2026-10-08 su richiesta dell'utente, per uso di Codex. Nessun compito assegnato; immagini non ancora generate da un assistente.
