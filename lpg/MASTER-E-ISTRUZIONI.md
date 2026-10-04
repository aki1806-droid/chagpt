# MASTER e istruzioni del corso LPG

Corso: «Dire, ascoltare, convincere» (Accademia La Parola Giusta). Otto moduli, quaranta lezioni, 3:56:02 di montato (`produzione/registri/corso.md`).

## Quale documento comanda

1. `produzione/MASTER.md` è la specifica effettivamente usata a fine corso. Il suo profilo §7.1 è quello del corso.
2. `produzione/STANDARD.md` aggiunge le trappole e le soluzioni. Dove è più preciso del MASTER (soglie dei tagli, profilo audio, caratteri), vale lo STANDARD.
3. `produzione/METODO.md` **non** descrive il metodo finale del corso. Lo si consulta solo per la storia.

Il CLAUDE.md di Prove chiede di applicare questi documenti come modalità predefinita, senza ridiscuterli a ogni video.

## Il metodo è cambiato per strada

I registri non sono coerenti fra loro su questo punto:

- `registri/corso.md` dice che l'avatar è caduto dal modulo 6 e che chi guarda vede un cambio di forma fra la 5.5 e la 6.1;
- i registri dei moduli 1, 3 e 5 (`modulo-1.md`, `modulo-3.md`, `modulo-5.md`) e delle lezioni (per esempio `corso-1-1.md`, `corso-2-2.md`) dicono invece «nessun avatar, voce unica di Luca Ward tagliata a blocchi». Il modulo 1 risulta **rifatto da capo** con questo trattamento; le versioni con l'avatar e la voce «Achille nuovo 1» restano solo come id in fondo ai registri.

Cosa è certo dai registri delle lezioni:

| fase | dove | voce | forma |
|---|---|---|---|
| prima versione | 1.x originali, 2.1 originale | «Achille nuovo 1», `eleven_multilingual_v2` | avatar + slide, b-roll Artlist |
| intermedia | moduli 2–5 | Luca Ward, traccia unica tagliata | senza avatar; 40 scene nella 2.2 |
| finale | moduli 6–8 | Luca Ward, `eleven_v3`, due generazioni tagliate con `tagli.py` | senza avatar, 50 scene, diagrammi parametrici, infografiche, pose |

Quali versioni siano quelle pubblicate per i moduli 1–5 va confermato dall'utente sui `video_id`. **Per il secondo corso si usa la fase finale** (moduli 6–8), salvo una diversa decisione dell'utente.

## Divergenze da non confondere

| tema | METODO (vecchio) | MASTER/STANDARD (fase C) |
|---|---|---|
| voce | Achille, `eleven_multilingual_v2` | Luca Ward `tVdVcJPudubxmTmAw4tE`, `eleven_v3` |
| generazione | una chiamata per blocco | due tracce lunghe (< 5.000 caratteri ciascuna), stacco su un cambio di capitolo |
| pause | `stop_silence=0.30` | `stop_silence=0.14`, `stop_duration=0.20`, soglia −45 dB |
| tag | `<break>` nel testo | 5–6 tag di intenzione in inglese (`[serious]`, `[curious]`, `[warm]`, `[thoughtful]`, `[emphatic]`), niente `<break>`, niente `[pausa]` |
| avatar | circa un terzo del minutaggio | assente |
| clip delle riprese | `fit_to_scene` | slide in `freeze`; riprese video in `loop`; `ciclo: N` solo dove il movimento è il contenuto |
| caratteri al secondo | 14,5 grezzo | 18 sul montato finito (MASTER §1.1); 16,5 sul grezzo in `tagli.py` |

## Struttura del corso e delle lezioni

- Un modulo = cinque lezioni. Ogni lezione dura circa 6:00 (fra 5:59 e 6:39 nel modulo 8).
- Una lezione = copertina (3 s) + 47–48 blocchi + chiusura = **50 scene**, che è il limite di HeyGen. La chiusura è prescritta a 10 s, 15 s per la fine di un modulo e 20 s per la fine del corso. Lo script generico implementa solo 10 s, e le misure dei registri mostrano 10 s anche a fine modulo (vedi `PROCEDURA.md` 8.2).
- Un blocco = una scena = una slide o una ripresa = un mp3. 100–150 caratteri, un concetto.
- Circa tre riprese generate per lezione.
- **Diagrammi:** MASTER passo 4 chiede «dai sei diagrammi in su» per una lezione da 48 blocchi. Il conteggio, come lo fanno i registri, riguarda i diagrammi parametrici di `figure_corso.mjs` (curva, flusso, strati, pila…) e le infografiche, non tabelle, grafici `chart`, `swap` o elenchi. La 6.1 ne ha **tre** (`strati`, `pila`, `flusso`: «Tre slide di sola scrittura sono diventate disegni»), la 6.5 sei. Quindi la 6.1 **non** rispetta la soglia: è un campione di formato e di procedura, non un modello per questa metrica. La soglia è stata scritta dopo, a partire dal modulo 7 (STANDARD §3).

## Convenzioni dei nomi

| oggetto | forma | esempio |
|---|---|---|
| blocco | `sNN`, da `s02` | `s19` |
| slide | `cNN`, uguale al blocco; `c01` copertina, `c99` chiusura | `c19` |
| file intermedi | `copioni/<modulo>-<lezione>-<tipo>.json` | `6-1-blocchi.json` |
| registro | `registri/corso-<modulo>-<lezione>.md`, `registri/modulo-<N>.md` | `corso-6-1.md` |
| nomi nel batch HeyGen | `a_sNN.mp3` audio, `v_cNN.mp4` clip, `m_*` musica | `a_s19.mp3` |
| tracce di lavoro | `unico_A_raw.mp3`, `unico_B_raw.mp3`, `mp3u/sNN.mp3`, `durate.json` | — |

## Formati degli intermedi (dal campione 6.1)

- `blocchi.json`: lista di `{"id": "sNN", "text": "..."}`. Il testo parlato **non usa vocali accentate**: si scrive con l'apostrofo (`perche'`). Le accentate restano nelle slide.
- `chunks.json`: `{"A": ["s02", …], "B": [… , "s49"]}`, cioè liste di **ID stringa** (non oggetti blocco), che concatenate danno tutti i blocchi in ordine. Nella 6.1 A ha 16 ID (`s02`–`s17`, 1.743 caratteri), B 32 (`s18`–`s49`, 3.452). Controllo in `PROCEDURA.md` 2.
- `slides.json`: lista di slide con `file` (`cNN`), `layout` e i campi del layout. Facoltativi `theme` e `ciclo`.
- `media.json`: `{"sNN": {"tipo": "foto"|"video", "cosa": "...", "url": "..."}}` per i blocchi che sono riprese.
- `pose.json` (moduli 7–8): `{"sNN": secondi}`, JSON valido, cioè i blocchi da allungare con `apad`; si passa con `tagli.py applica "$LEZ" "$(cat "$LEZ/pose.json")"`.

## Regole editoriali

- Lo script di partenza va **riscritto** alla lunghezza calcolata, non allungato. Si aggiunge il «come»: test, criterio di scelta, perché funziona, il contrario, come si recupera, quando non si applica, il risultato vero (MASTER §6). Nella 6.1 il testo è passato da 3.122 a 5.149 caratteri.
- Gli aneddoti si inventano, in prima persona, senza dettagli verificabili, e si annotano nel registro (METODO §1.3; decisione confermata dall'utente originale).
- Seconda persona singolare.
- Le frasi-modello vanno a schermo fra caporali «».
- Nei titoli in Cormorant i numeri si scrivono a parole; in Jost le cifre vanno bene.
- Ogni ragionamento con una forma (sequenza, confronto, accumulo, proporzione) diventa un diagramma. Il layout `list` resta per gli elenchi senza forma.

## Adattamenti per il secondo corso

Da decidere con l'utente prima di iniziare. Le fonti non dicono niente sul secondo corso.

1. **Titolo, moduli e MD di partenza**: bloccanti.
2. **Palette e caratteri**: stessi del primo corso o nuovi? I colori stanno in una riga in testa a `slide_corso.mjs`.
3. **Voce**: Luca Ward come nella fase C, o un'altra?
4. **Testi di copertina e chiusura**: in `slides.json` (`cover` e `closing`). Il sito `laparolagiusta.it` è nella chiusura.
5. **Durata obiettivo** per lezione: default 6:00.
6. **Budget per le riprese** e il servizio da usare (Artlist o Higgsfield).
7. **Mondo visivo** di ogni modulo: cinque righe da scrivere prima di generare le riprese.
