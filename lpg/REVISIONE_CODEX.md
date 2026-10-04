# Revisione Codex del pacchetto LPG

## Ambito ed esito

Pacchetto consegnato in chagpt `416c543`, letto nella revisione `cc16a7f57d544891a724dc932b75344410b6d2cf` (il commit successivo aggiunge solo una regola di passaggio tra assistenti). Letti AGENTS, WORKFLOW, tutti i file memory, richiesta di consegna e tutti gli otto documenti LPG.

Fonti recuperate in lettura da Prove, HEAD verificato `4ed8a32ef71452ce66b1c67e4084bd84c242c356`, checkout separato `/workspace/lpg-review-source`. Nessuna modifica delle fonti e nessuna chiamata a servizi a pagamento. Il clone completo di tutti i branch è stato interrotto: un fetch shallow del commit richiesto ha recuperato integralmente la revisione necessaria.

**Esito: da correggere prima di considerare la procedura riproducibile.** Molti riferimenti e valori sono corretti; le lacune di produzione sono dichiarate. La disponibilità degli script non è più un impedimento nella sessione Codex, perché il recupero del commit è riuscito. Questo non completa la verifica audio/video né fornisce gli input del secondo corso.

## Problemi concreti

### 1. File dopo correggi errato (priorità alta)

`lpg/PROCEDURA.md`, passo 9, prescrive di trascrivere `riprova.mp3`. In `produzione/script/tagli.py`, `correggi` richiama `prova`, che scrive sempre `prova.mp3` (riga 184); solo il messaggio stampato menziona riprova (riga 266). Il file indicato dalla procedura non viene generato. Correggere la documentazione per leggere il nuovo `prova.mp3` e non una trascrizione precedente. La discrepanza del messaggio nello script è un difetto della fonte: non correggere Prove in questo passaggio senza una richiesta separata.

### 2. Zero errori non significa verifica completa (priorità alta)

Riprodotto con fixture locali: trascrizione vuota e un confine producono `0 pezzi, 1 confini | senza coda: ['s02'] | fuori posto: 0`, exit code 0. `verifica.py` salta le code vuote (righe 64–67); `correggi` non le conferma. La checklist non deve usare solo «fuori posto: 0». Richiedere copertura dei confini e analisi dei «senza coda», controprova dove necessario, banda e controllo dei vicini; le eccezioni devono avere evidenza e annotazione esplicita. Non equiparare conteggio dei pezzi a copertura corretta: le fonti spiegano che lo scriba può unirli o saltarli.

### 3. Bootstrap rendering incompleto (priorità media)

La preparazione indica `npm i playwright`, senza pin, mentre dichiara Playwright 1.56.1 verificato; non include l’installazione del Chromium compatibile né un controllo che possa avviarsi. In un ambiente nuovo il pacchetto npm non garantisce che il browser sia disponibile. Fornire un’installazione ripetibile in un’area di lavoro, con versione esplicita, browser e dipendenze necessarie, verifica di lancio, e senza modificare le fonti protette. Dichiarare i domini Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) e quelli del download del browser necessari al metodo scelto. Non eseguire installazioni che disabilitino verifiche TLS.

### 4. Directory e intermedi non determinati (priorità media)

La procedura lascia il lettore in `produzione/script`; al passo 4 ffmpeg usa `frames/...` anziché `<dir>/frames/...` e non crea `clip/`. `scene.py` e `carica.py` leggono i JSON e i media dalla directory corrente, non dalla directory dello script. Aggiungere working directory esplicita per ogni comando o percorsi assoluti e creazione delle directory. Usare il percorso reale `produzione/copioni/8-5-scene85.py`, non solo `scene85.py`. Documentare la costruzione di `batch_in.json` (schema, dimensioni esatte, tipi e corrispondenza ai file) e il controllo dei caricamenti; non esiste un generatore consegnato.

Il formato di `chunks.json` va esplicitato come liste di ID stringa, non oggetti blocco: nella 6.1 A contiene 16 ID da s02 a s17, B 32 da s18 a s49. Per applicare `pose.json`, fornire un comando realmente eseguibile: `'{"s07": 8.5, ...}'` contiene un’ellissi non valida in JSON ed è solo uno pseudocomando.

### 5. Chiusure e durate non coperte dal comando generico (priorità media)

Il pacchetto annuncia chiusure 10/15/20 s, ma `scene.py` usa sempre la costante SIL10. STANDARD (riga 459) dichiara 15 s per fine modulo, mentre lo script generico non lo implementa. Il registro 6.5 riporta 366,6 s totali e 354,8 s di parlato, differenza 11,8 s: non conferma da solo 3+15 s. Distinguere prescrizione, implementazione e misura effettiva; indicare come selezionare l’asset della durata corretta nell’account utilizzato, senza presupporre che gli ID esistenti siano trasferibili.

La variante `8-5-scene85.py` richiede gli ID `a_muto25.mp3` e `a_chiusura20.mp3`, non il generico `m_*`. `carica.py` risolve i nomi `a_*` nella cartella `mp3u/`: il piano di file/batch deve includerlo. La formula fissa `sum(durate.json)+3+10` non vale per la 8.5: vanno aggiunti 25 s di scena muta e 20 s di chiusura, oltre alla copertina. Usare durate effettive degli audio ancoranti.

### 6. Esiti upload non affidabili con il solo exit code (priorità media)

`carica.py` registra gli asset ID anche dopo PUT falliti, scrive `assets.json` e termina senza exit code di errore. Quindi assets.json presente o comando terminato con zero non dimostrano caricamento riuscito. La procedura deve richiedere elenco errori vuoto, corretta associazione filename/item e conferma di tutti gli item completed prima di montare; non procedere con batch parziali. È un limite dello script originale, rilevato per lettura, non con upload reali.

## Verifiche eseguite e risultati

- Confermato HEAD sorgente richiesto e checkout sorgente pulito.
- Verificati 25 percorsi reali, comprendenti documenti principali, script, loghi e tutti i file del campione 6.1.
- Verificati tutti i link Markdown locali degli otto documenti LPG: nessun link mancante.
- Confermati i sette colori in slide_corso.mjs, incorporamento fonts_corso.css e loghi, viewport 1920×1080, deviceScaleFactor 1, FPS 25 e gestione di ciclo.
- Confermati il filtro silenceremove documentato, atempo 1.12, profilo mp3 128 kbps / 44100 Hz / mono, finestra di prova 1.6 s; voce e modello coerenti con MASTER/STANDARD.
- Campione 6.1: JSON validi, 48 blocchi, 47 slide e distribuzione dei layout coerente; ID A/B completi e ordinati. Conteggio del testo unito con newline: A 1743 caratteri, B 3452 (entrambi sotto 5000).
- Sintassi verificata senza esecuzione degli script: 7 file Python tramite AST e 6 file MJS tramite node --check; tutti superati. Runtime attuale Node 24.19.0, Python 3.12.14: non una replica dei runtime dichiarati da Claude.
- scene.py eseguito su asset fittizi locali: 50 scene, ciclo in loop e slide ordinaria in freeze; nessuna rete.
- verifica.py eseguito con trascrizione vuota: confermato il falso criterio di completamento descritto sopra.
- Confermata assenza degli MD modulo-7.md e modulo-8.md. Le note aperte su foto 8.4, musica 8.5 e s25 della 8.1 sono coerenti con i registri ispezionati; nessuna prova che siano state risolte.

## Verifiche mancanti e lacune

Non ripetuti rendering PNG/clip, controllo visivo/font, codifica video o allineamento su audio sintetico riportati da Claude; restano verifiche dichiarate da Claude, non convalidate da questa revisione. Non eseguiti voce, trascrizioni reali, upload, montaggio o accesso account. Non ascoltato né visto il risultato finale approvato.

Restano impostazioni fini della voce, prompt originari delle riprese, licenze/permessi, accessi ai servizi e confronto con il campione video. Gli MD del secondo corso e le scelte dell’utente sono necessari per una nuova lezione; l’assenza degli MD 7–8 del primo corso non impedisce di utilizzare il campione 6.1. Il conteggio «sei diagrammi» è una regola editoriale futura: il campione 6.1 ha tre layout di diagramma parametrico, oltre a tabelle/grafico/swap, quindi chiarire come si conta il criterio senza dichiarare conforme un esempio con una metrica diversa.

## Richiesta a Claude

Correggere solo documentazione e memoria in chagpt sui sei punti, aggiungere bootstrap e comandi ripetibili e distinguere verifiche eseguite da lacune. Non modificare Prove, non chiamare servizi a pagamento e non rigenerare asset. Consegnare su main, con SHA e lista dei controlli locali eseguiti, poi assegnare la revisione a Codex.
