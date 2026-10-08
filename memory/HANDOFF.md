# Ultimo passaggio di consegne

## Obiettivo

Correggere i tre falsi positivi della seconda revisione Codex (`lpg/REVISIONE_CODEX_2.md`) e precisare le etichette P/S/V.

## Modifiche di Claude (solo documentazione e memoria)

`lpg/PROCEDURA.md`:

- **5.2 Copertura.** Il controllo respinge, prima di contare, i casi in cui `prova_meta.json` non corrisponde ai confini attesi (A[:-1] + B[:-1] di `chunks.json`), oppure `code.json` non è una lista di testi con la stessa cardinalità.
- **5.3 Durate e banda.** Il controllo verifica che `durate.json` abbia esattamente gli ID dei blocchi, con valori numerici finiti e maggiori di zero. Verifica anche che ogni `mp3u/sNN.mp3` esista, non sia più vecchio di `tagli.json` e abbia la durata dichiarata (±0,1 s, con `ffprobe`). Solo dopo calcola la banda su tutti i blocchi. Con `SOLO_INTEGRITA=1` (in una sotto-shell) controlla solo l'integrità, dopo le pose e prima del batch.
- **7.3 Caricamento.** Wrapper senza pipe, in una sotto-shell: esito di `carica.py` **e** riga `errori []`. Annotato che `carica.log` non contiene URL né header.
- **Precisazioni.**
  - `verifica.py` e `carica.py` escono con 0 nei casi logici (code mancanti, PUT falliti) e con errore solo per eccezioni.
  - Il rendering [V] copre 47 PNG e solo 3 clip.
  - La chiusura da 10 s a fine modulo è un'inferenza da script e registri, e lo scarto di 1,2 s non è una calibrazione.
  - Le versioni pubblicate le deve confermare l'utente.
  - Aggiunta la nota sulla cache npm.

Aggiornati anche `QUALITA.md`, `README.md` e `campione/README.md`.

## Verifiche (2026-10-08, traccia sintetica 6.1, server PUT locale, nessun servizio a pagamento)

- **Copertura.** Positivo: 46/46, uscita 0. Respinti con uscita 1: `[]`, 43 voci, 47 voci, una coda vuota, una voce `null`, trascrizione vuota via `verifica.py`, `prova_meta.json` senza un confine.
- **Durate e banda.** Positivo: 48/48, uscita 0. Respinti con uscita 1: `{}`, `s20` mancante, a zero o come testo; mp3 assente, più vecchio di `tagli.json`, o sostituito. `SOLO_INTEGRITA` dopo le pose: 48/48 con uscita 0; con un ID mancante: uscita 1.
- **Caricamento.** Respinti con uscita 1: processo che stampa `errori []` ed esce con 1, eccezione dopo `errori []`, due PUT a 403, item mancante. Tutti 200: uscita 0.
- **Blocchi del documento.** Copertura, banda, solo integrità e caricamento estratti da `PROCEDURA.md` ed eseguiti alla lettera: esiti come sopra.
- Link locali verificati; Prove senza modifiche.

## Problemi aperti

- Il rendering resta da ripetere in un ambiente con Chromium 1194 e Google Fonts raggiungibili.
- Mai provati: servizi reali, `completed` reale (lo schema della risposta di `get_asset_batch` non è nelle fonti), chiusura da 15 s, variante 8.5.
- Restano le lacune di input e di fonti.

## Prossima azione per Codex

Terza revisione: ripetere i negativi A–C sui blocchi di `PROCEDURA.md` 5.2, 5.3 e 7.3 e controllare le precisazioni sulle etichette. Non modificare Prove e non usare servizi a pagamento.

## Nota aggiuntiva (Claude, 2026-10-08)

Salvato in `robin/prompt-immagini-LPG-210-259.md` il file dei 50 prompt immagini fornito dall'utente, senza modifiche, con indice in `robin/README.md` e collegamento nel README generale. Non modifica il compito LPG qui sopra, che resta assegnato a Claude.
