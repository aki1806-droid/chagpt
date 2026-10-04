# Richiesta a Claude: trasferire il metodo LPG a Codex

## Obiettivo e autorizzazione

L’utente vuole che Codex possa produrre il secondo corso LPG dagli MD con lo stesso metodo del primo. Ha chiesto a Claude di fornire gli elementi necessari e inserirli nel branch `main` di `aki1806-droid/chagpt`. Questa autorizzazione riguarda il pacchetto documentale e i materiali riutilizzabili di questo passaggio, non nuovi render a pagamento, pubblicazioni dei corsi o modifiche ai repository sorgente.

Leggi `AGENTS.md`, `WORKFLOW.md` e la memoria. Il solo riepilogo delle sessioni non basta: raccogli le fonti reali disponibili e segnala ciò che manca. Non ricostruire impostazioni sconosciute come se fossero state utilizzate.

## Dove cercare

Parti da `aki1806-droid/Prove`, branch `claude/heygen-video-creation-8gz057`, indicato nel riepilogo per il primo corso Accademia LPG. Verifica se il materiale finale si trova invece su main o in un’altra revisione. Per ogni fonte annota repository, branch, SHA completo e percorso. Se non hai accesso, completa le parti indipendenti e indica esattamente il materiale da recuperare.

## Pacchetto richiesto

Crea `lpg/README.md` come indice e punto di ingresso per Codex. Organizza sotto `lpg/` i seguenti elementi, usando nomi coerenti e collegamenti reali:

1. **Procedura completa:** sequenza dall’MD al risultato finale, comandi con directory di lavoro, prerequisiti, versioni, dipendenze, input/output, passaggi manuali, ripresa dopo errori e criteri di completamento. Distingui quanto è già verificato da quanto è solo documentato.
2. **MASTER e istruzioni:** specifica effettivamente usata, prompt, struttura di moduli e lezioni, convenzioni dei nomi, regole editoriali e adattamenti necessari per il secondo corso. Non confondere il metodo LPG con quello di altri corsi.
3. **Configurazione:** impostazioni reali di voce, pronuncia, avatar, HeyGen, immagini, logo, palette, font, musica, volumi, pause, sottotitoli, risoluzione, frame rate, codec e formato finale, dove pertinenti. Se un valore non è recuperabile, indicarlo come mancante. Includi i nomi delle variabili richieste e il modo sicuro per configurarle, mai i valori segreti.
4. **Script riutilizzabili:** copia le versioni effettive necessarie e le dipendenze, se condivisibili e prive di segreti. Non limitarti a nominare script che Codex non può recuperare. Quando non puoi copiarli, fornisci il riferimento esatto e istruzioni di recupero con autorizzazioni necessarie. Non inserire file `.env`, credenziali, URL firmati o sessioni.
5. **Asset:** inventario di immagini, logo, musica, avatar e font con origine, percorso, licenza o permesso noto e modalità di recupero. Non presumere che una risorsa privata o un identificativo di servizio sia accessibile da Codex. Per materiali grandi o non pubblicabili usa un riferimento sicuro e segnala il requisito di accesso; non caricare video o archivi pesanti nel Git pubblico.
6. **Lezione campione:** MD originale condivisibile, testi intermedi, trascrizione, descrizione delle scene, comandi e impostazioni usate, più riferimento accessibile al risultato approvato. Deve permettere un confronto concreto, senza lanciare nuove produzioni a pagamento per questa raccolta.
7. **Controlli qualità:** verifiche su testi, pronuncia, sincronizzazione, sottotitoli, audio, immagini e output; problemi già incontrati e soluzioni. Recupera lo stato reale delle correzioni citate nel riepilogo (foto 8.4, mix musicale 8.5, respiro 8.1) e indica se il campione le include.
8. **Provenienza e lacune:** inventario dei file consegnati, riferimenti alle fonti, elementi mancanti, credenziali o accessi necessari, costi e operazioni che richiedono una futura autorizzazione.

Il repository è descritto nella memoria come pubblico: condividi solo materiale adatto alla pubblicazione. Se una fonte contiene informazioni private, crea una versione sanitizzata e documenta cosa è stato omesso senza rivelarlo.

## Verifica del passaggio

- Controlla che i link locali puntino a file presenti e che script e istruzioni corrispondano alle fonti indicate.
- Esegui solo controlli locali non distruttivi disponibili, senza avviare servizi a pagamento o caricare nuovi contenuti.
- Riporta separatamente controlli eseguiti, esiti, verifiche non eseguite e impedimenti. Una descrizione non dimostra la riproducibilità.
- In `lpg/README.md` indica se Codex può procedere con una lezione campione del secondo corso, quali input deve ricevere e quali prerequisiti restano.

## Memoria e pubblicazione su main

Aggiorna `memory/HANDOFF.md` e `memory/STATUS.md` con i file consegnati, le verifiche e le lacune. Assegna poi a Codex la revisione (`da revisionare`). Aggiungi nel README generale un collegamento a `lpg/README.md` solo dopo averlo creato.

Prima di iniziare controlla lo stato Git e il remoto; preserva le modifiche esistenti. Prima della pubblicazione recupera la versione corrente di `main`, integra gli eventuali aggiornamenti e risolvi i conflitti conservando i contributi di entrambi. Controlla il diff per segreti e file estranei. Crea un commit mirato e pubblicalo su `main` con un normale push, senza force push. Se il branch è protetto, prepara una PR verso `main` e segnala che la pubblicazione diretta non è avvenuta; non aggirare la protezione.

Alla fine comunica SHA del commit, file principale, esito del push o URL della PR e impedimenti residui. Non dichiarare il trasferimento completo se mancano fonti indispensabili.
