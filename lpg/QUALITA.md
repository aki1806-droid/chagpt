# Controlli di qualità

## Lista per ogni lezione

| area | controllo | come | fonte |
|---|---|---|---|
| testo | lunghezza | caratteri ≈ secondi di parlato × 18; 47–48 blocchi da 100–150 caratteri; ≤ 50 scene | MASTER §1 |
| testo | riscrittura | si aggiunge il «come» (test, criterio, meccanismo, contrario, recupero, eccezione, risultato), mai riempitivo | MASTER §6 |
| testo | parlato | niente vocali accentate (apostrofo), 5–6 tag di intenzione, niente `<break>` | MASTER passo 1 |
| pronuncia | parole quasi omofone | se la trascrizione non separa due parole («inspirazione» / «espirazioni»), si decide sulla banda e sui vicini, non sulla trascrizione | `registri/corso.md` |
| tagli | copertura | controllo di `PROCEDURA.md` 5.2: prima l'integrità (confini attesi da `chunks.json`, `prova_meta.json` coerente, `code.json` lista di testi con la stessa cardinalità), poi ogni confine con una coda. Esce con 1 in tutti i casi falliti. I confini senza coda si chiudono con controprova o con un'eccezione annotata. `verifica.py` da solo non basta: esce con 0 anche senza code e conta «fuori posto» solo sui confini con coda | PROCEDURA 5.2; `script/verifica.py` |
| tagli | prova trascritta | `verifica.py` → «fuori posto: 0» sulla trascrizione del `prova.mp3` **corrente** (dopo `correggi` è lo stesso file, riscritto); prima di leggere gli scarti si contano i pezzi | MASTER passo 3, STANDARD §1, `script/tagli.py` |
| tagli | durate e banda | controllo di PROCEDURA 5.3: `durate.json` con esattamente gli ID dei blocchi, valori finiti e positivi, mp3 presenti, del run attuale e lunghi come dichiarato; poi caratteri/secondo fra 8 e 21 su tutti i blocchi, **prima** delle pose; dopo le pose solo l'integrità. Due blocchi vicini a 5 e 55 = confine spostato; i tag si tolgono prima di contare | STANDARD §1, PROCEDURA 5.3 |
| tagli | controprova | 3–5 s a cavallo dei confini sospetti, concatenati e trascritti una volta | STANDARD §1 |
| tagli | code uguali | due blocchi vicini che finiscono con le stesse parole ingannano `correggi` | STANDARD §1 (6.4) |
| sincronizzazione | durata | durata del render contro somma di `durate.json` + durata reale degli audio di copertina, chiusura ed eventuali scene mute; nei registri il render è circa 1,2 s più corto di questa somma | STANDARD §1, PROCEDURA 9 |
| caricamento | esito | wrapper di PROCEDURA 7.3: codice di uscita di `carica.py` a 0 **e** riga `errori []`, poi ogni item `completed`. `carica.py` esce con 0 e scrive gli id anche dopo PUT falliti; esce con errore solo per eccezioni | PROCEDURA 7.3, `script/carica.py` |
| audio | profilo | ogni mp3 a 128 kbps, 44,1 kHz, mono prima del caricamento | STANDARD §6 |
| audio | musica | strumentale: la trascrizione deve tornare vuota; volume e sfumatura vanno ascoltati da una persona | MASTER §5, `corso-8-5.md` |
| sottotitoli | presenza | `caption` SRT nel montaggio; HeyGen trascrive anche l'audio esterno | STANDARD §5 |
| slide | PNG guardati | tutte da ferme una volta; diagrammi e tabelle due volte (etichette che si toccano) | MASTER §5 |
| slide | caratteri | Cormorant e Jost incorporati, non quelli di sistema | STANDARD §6 |
| slide | numeri | nei titoli in Cormorant a parole | STANDARD §3 |
| slide | didascalie | `figure` su una riga (circa 50 caratteri); etichetta del `ponte` su una riga (circa 30) | STANDARD §1 e §3 |
| slide | cicliche | primo e ultimo fotogramma diversi solo per la fase: differenza confrontata con quella fra due fotogrammi consecutivi | MASTER passo 4 |
| immagini | coerenza | mondo visivo del modulo in ogni prompt; nessun volto riconoscibile; nessun testo | MASTER passo 5 |
| immagini | filtro dei contenuti | Higgsfield rifiuta «people» generiche e «bed»: descrivere vestiti e inquadratura, cambiare l'oggetto | STANDARD §1 |
| output | formato | 16:9, 1080p, 50 scene al massimo, una sola chiamata di montaggio | STANDARD §5 |
| registro | «da verificare» | compilato con tutto quello che non si è potuto ascoltare o guardare | MASTER passo 8 |

## Problemi già incontrati

Le sei trappole del generatore (testo SVG che non va a capo, `fill-mode` azzerato, `nth-of-type`, opacità sovrascritta, backtick nei commenti, etichetta del ponte), le scene mute che collassano, gli mp3 rifiutati, i look dell'avatar spariti, Chromium senza Google Fonts, il Video Agent inaffidabile e i CDN bloccati sono descritti con la soluzione in `produzione/STANDARD.md` §1, §3 e §6.

## Stato delle tre correzioni aperte

Verificato sul commit finale `4ed8a32ef71452ce66b1c67e4084bd84c242c356`, l'ultimo del branch: **nessuna delle tre risulta risolta**. Non ci sono commit successivi, e i registri le danno ancora aperte.

| punto | stato nelle fonti | fonte |
|---|---|---|
| foto della 8.4 (`s42` pavimento del leggio, `s45` sedia scostata) | aperto: montate senza essere viste, perché il generatore non le ha restituite e il proxy bloccava il CDN | `registri/corso-8-4.md`, «Da verificare»; `copioni/8-riprese.json`, campo `viste` |
| mix della musica della 8.5 | aperto: tracce misurate e verificate strumentali, volume e sfumatura della chiusura mai ascoltati | `registri/corso-8-5.md` |
| respiro `s25` della 8.1 | aperto per scelta: il confine resta dov'è perché la banda è pulita e i vicini sono a posto; da ascoltare | `registri/corso.md`, `registri/modulo-8.md` |

La lezione campione (6.1) **non** contiene nessuno di questi tre punti: appartengono al modulo 8. Il suo registro lascia aperte solo le tre riprese Higgsfield, non viste da chi le ha montate.
