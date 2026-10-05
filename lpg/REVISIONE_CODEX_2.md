# Seconda revisione Codex — af4954b

Revisione eseguita il 2026-10-05 sul pacchetto chagpt `af4954b`, confrontato con Prove `4ed8a32ef71452ce66b1c67e4084bd84c242c356`. Letti istruzioni, memoria e tutti i documenti LPG. Prove è rimasto pulito; copia di lavoro e prove in `/workspace/lpg-review2`. Nessuna chiamata a servizi a pagamento. URL delle riprese sostituiti con segnaposto inerti nelle fixture, senza richieste alle fonti private.

## Esito dei sei problemi precedenti

| Problema | Esito |
|---|---|
| 1. prova.mp3 / riprova.mp3 | Risolto nella documentazione; verificato che correggi riscrive prova.mp3 e non genera riprova.mp3. |
| 2. copertura oltre fuori posto: 0 | Corretto per la trascrizione vuota normale, ma il nuovo controllo accetta un code.json troncato: problema A sotto. |
| 3. bootstrap | Versione fissata, installazione browser e prova avvio ora documentate. Installazione npm riuscita; browser/font bloccati dalla rete nella sessione Codex, quindi rendering non validato qui. |
| 4. directory, intermedi, batch, pose | Comandi campionati eseguibili in area separata. Intermedi, pose, batch e sed/scene verificati. Controllo banda incompleto: problema B. |
| 5. chiusure e durata | Distinzione prescrizione/script/registri e formula corretta recepite; silenzi 3/10 verificati. Chiusura 15 e variante 8.5 restano dichiaratamente non eseguite. |
| 6. controllo upload | Intercetta PUT 403 e accetta tutti 200 sul server locale. La pipeline nasconde l’exit status del processo: problema C. Conferma completed reale non verificata. |

**Conclusione:** correzioni sostanziali recepite, ma approvazione integrale sospesa sui controlli di integrità A–C. Il lavoro locale sui contenuti può proseguire con gli input dell’utente; il rendering richiede browser e font realmente disponibili, e la produzione completa richiede ancora i prerequisiti dichiarati.

## A. Copertura falsa con code.json troncato — priorità alta

PROCEDURA §5.2 usa zip(meta, code) senza verificare la lunghezza. Dopo una prova reale dello script con 46 confini, sostituendo nella sola fixture code.json con [] il comando documentato stampa `COPERTURA 46 / 46 | senza coda: nessuno` ed esce con 0. Una lista più corta interrompe zip e nasconde i confini restanti; una lista più lunga nasconde gli extra.

Richiedere meta non vuoto per una lezione che prevede confini, stessa cardinalità code/meta, tipi validi e coerenza dei riferimenti coi chunks; poi contare la copertura. Test negativi: [], lista corta/lunga, code vuote. Ripristinato il file originale dopo la prova. Il caso di trascrizione.txt vuota gestito da verifica.py produce correttamente 46 stringhe vuote e viene respinto dal nuovo controllo: non confondere i due casi.

## B. Banda falsa con durate mancanti — priorità alta

PROCEDURA §5.3 itera solo sugli elementi presenti in durate.json. Sostituendo nella fixture il file con {} stampa `BANDA 0 / 0 in 8-21 | fuori: nessuno` ed esce con 0. Una durata omessa può quindi sparire dalla verifica. È rilevante perché tagli.py applica continua dopo errori ffmpeg e scrive solo i blocchi riusciti.

Richiedere insieme degli ID attesi uguale a quello delle durate, lezione non vuota, ID unici, durate numeriche finite e positive; prima del batch verificare che tutti gli mp3 richiesti siano presenti, validi e del run attuale. Conservare test positivo 48/48 e negativi con {}, un ID mancante, durata zero/non valida. Non limitarsi a una percentuale sul sottoinsieme disponibile.

## C. Pipeline upload non preserva errori del processo — priorità media

PROCEDURA §7.3 usa python ... | tee carica.log senza pipefail o PIPESTATUS. Lo stato osservato è quello di tee; grep verifica solo una riga. Prova locale: un processo stampa `batch test | errori []` ed esce con 1; la pipeline e il grep documentati terminano con 0. Non è una riproduzione di un upload reale fallito: è un test della propagazione dell’errore nel wrapper.

Usare una gestione esplicita dell’esito della pipeline (non solo set -o pipefail senza verifica/uscita), mantenendo il controllo errori [] e completed di ogni item. Catturare stderr senza pubblicare log contenenti URL/header di upload. Testare un processo che esce con errore anche dopo una riga apparentemente riuscita. Il controllo PUT 403/200 richiesto funziona ed è stato ripetuto separatamente.

## Bootstrap e blocchi di ambiente

- Copiati gli script fuori da Prove. Primo npm i fallito per cache default /home/agent/.npm non scrivibile; riuscito impostando cache in `/workspace/lpg-review2/npm-cache`. Playwright 1.56.1 confermato.
- Tentato download Chromium con PLAYWRIGHT_BROWSERS_PATH sotto l’area di lavoro: HTTP 403 Domain forbidden sia per cdn.playwright.dev sia per playwright.download.prss.microsoft.com. Non tentata installazione di librerie di sistema con --with-deps: non risolve il diniego del download e richiede privilegi.
- Prova di avvio documentata eseguita: fallisce per eseguibile headless_shell build 1194 assente. È presente Chromium di sistema 151.0.7922.173, diverso dalla versione fissata: non usato per dichiarare equivalenza con la build 1194.
- fonts_embed.py fallisce con curl exit 56; controlli HTTPS sui due host Google Fonts restituiscono CONNECT 403. Nessun fonts_corso.css valido generato, nessun render sostitutivo con font di sistema.

Richiesti per ripetere il rendering: download browser e mirror consentiti o browser compatibile preinstallato completo (anche headless_shell richiesto dal launch standard), accesso fonts.googleapis.com e fonts.gstatic.com. Questi sono blocchi dell’ambiente attuale, non prova che i controlli storici di Claude siano falliti.

## Verifiche eseguite

I quattro blocchi Python inline di PROCEDURA sono stati estratti e lanciati senza cambiarne il contenuto; variabili/directory adattate all’area scrivibile di questa sessione.

- Intermedi 6.1: A 16 blocchi/1743 caratteri, B 32/3452, 50 scene previste.
- Audio sintetico con toni e silenzi proporzionati ai caratteri: allinea produce 46 confini. Non simula una voce o un riconoscitore reale.
- Trascrizione vuota: verifica.py exit 0; controllo copertura exit 1, 0/46. Trascrizione testuale simulata: copertura 46/46 e fuori posto 0 (47 pezzi, perché una coda contiene più frasi; il conteggio pezzi non è usato come prova).
- correggi: prova.mp3 riscritto; nessun riprova.mp3.
- applica senza pose: 48 blocchi, banda 48/48; con le pose ricostruite, 22/22 blocchi almeno alla durata richiesta con tolleranza 0,05 s. Totale sintetico 349,4 s: differisce dal fixture Claude, quindi non convalida il suo 354,4 s.
- Generati silenzi 3/10 con ffmpeg; clip sostituite da piccoli file fittizi per testare solo batch/upload, non codec o validità video. batch_in.json: 97 file, nomi e dimensioni dei file locali.
- Server PUT loopback temporaneo: due 403 su a_s05.mp3/v_c12.mp4 producono errori e carica.py exit 0; il controllo log esce con 1. Tutti 200: controllo log exit 0. Server fermato al termine.
- Comandi sed e scene.py di §8.1 eseguiti: 50 scene, silenzi del batch fittizio associati correttamente, tre riprese image. Nessuna richiesta ai loro URL.
- Test negativi A/B/C riprodotti; fixture ripristinate. Link Markdown locali LPG validi; SHA Prove confermato e checkout pulito.

## Etichette P / S / V

La definizione di [V] identifica correttamente prove storiche di Claude e distingue sintetico/reale; questa revisione non le trasforma in prove reali. Pin/build sono coerenti coi metadati Playwright installati. [S] su percorsi, nomi dei file, prefissi upload e scene corrisponde al sorgente. [P] sulla chiusura 15 s corrisponde a STANDARD; differenze 11,8/11,9 e 21,9 s sono risultati dei registri, non durata misurata direttamente da Codex sui video.

Da precisare:

- «verifica.py/carica.py esce sempre con 0» vale per i casi logici incompleti/PUT errati documentati, non per qualsiasi errore: eccezioni di lettura JSON o assertion terminano con errore. Scrivere la condizione esatta.
- [V] sul titolo §3 copre 47 PNG e solo tre clip nel testo: preservare questa distinzione, senza dichiarare verificato tutto il rendering animato.
- La scelta banda prima delle pose è correttamente dichiarata come scelta del pacchetto, non prescrizione originaria. La conclusione «chiusura 10 s misurata» va letta come inferenza compatibile con script/registri; la causa dello scarto resta ignota e non è una calibrazione universale del render.
- Assenza di nuove produzioni nei registri consultati non dimostra che tutti i video pubblicati corrispondano a quelle revisioni: resta richiesta conferma dell’utente.

## Lacune ancora aperte

Render/font/codifica non ripetuti per i blocchi sopra; voce e trascrizione reali, upload/completed e montaggio reali, ascolto/visione finale, chiusura 15 s e variante 8.5 non eseguiti. Restano input e scelte del secondo corso, parametri fini della voce, prompt originali, licenze/permessi, accessi account, MD originari 7–8 e versioni effettivamente pubblicate 1–5. Nessuna spesa autorizzata o avviata.

## Passaggio a Claude

Correggere A–C nella documentazione/controlli di chagpt, precisare le etichette indicate e ripetere positivi e negativi in area separata. Prove deve restare immutato. Pubblicare su main senza force push e restituire SHA, esiti e lacune a Codex. Non ripetere controlli che richiedono servizi a pagamento.
