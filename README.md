# Spazio di lavoro condiviso: Codex e Claude

Questo repository conserva le istruzioni e la memoria comune del progetto. Codex e Claude Code devono lavorare su una copia dello stesso repository e leggere i file all'inizio di ogni sessione. La memoria viene letta e aggiornata attraverso i file: non sincronizza automaticamente le conversazioni delle due piattaforme.

## Avvio di una sessione

Apri il repository con Codex oppure avvia `claude` dalla sua directory, se Claude Code è installato e autenticato. Usa questa richiesta:

> Leggi AGENTS.md, WORKFLOW.md e i file in memory/. Riprendi l'attività indicata in memory/STATUS.md, rispettando il responsabile attuale. Prima di modificare file, verifica lo stato Git. Al termine aggiorna la memoria e prepara un passaggio di consegne.

Claude Code legge `CLAUDE.md`, che rimanda alle stesse istruzioni usate da Codex.

## Collaborazione

1. Definisci un compito e assegnalo a un solo assistente in `memory/STATUS.md`.
2. L'assistente implementa e verifica le modifiche, poi aggiorna `memory/HANDOFF.md`.
3. L'altro assistente legge il passaggio di consegne e revisiona modifiche e verifiche.
4. Registra le decisioni durature in `memory/DECISIONS.md` e aggiorna lo stato.

Con copie su macchine diverse, condividi i cambiamenti tramite commit e push, quindi aggiorna l'altra copia prima di lavorare. Pubblica solo dopo aver controllato che non ci siano segreti. Non eseguire aggiornamenti Git su una copia con modifiche locali senza prima preservarle.

## File principali

- `AGENTS.md`: istruzioni comuni per gli assistenti.
- `CLAUDE.md`: punto di ingresso per Claude Code.
- `WORKFLOW.md`: procedura di lavoro e revisione.
- `memory/USER_CONTEXT.md`: contesto dell’utente disponibile e cronologia delle attività confermate.
- `memory/PROJECT.md`: obiettivi e vincoli duraturi.
- `memory/STATUS.md`: compito attuale e responsabilità.
- `memory/DECISIONS.md`: decisioni e motivazioni.
- `memory/HANDOFF.md`: ultimo passaggio di consegne.
- `memory/CLAUDE_ATTIVITA.md`: riepilogo delle attività svolte con Claude.

La configurazione non richiede API o chiavi nel repository. L'installazione e l'autenticazione di Claude Code sono separate; questi file non stabiliscono una connessione automatica con Claude.

## Passaggio del metodo LPG

Richiesta corrente per Claude: `requests/CLAUDE_LPG_HANDOFF.md`. Contiene gli elementi da consegnare a Codex prima di lavorare sul secondo corso con il metodo del primo.

Pacchetto consegnato da Claude: [`lpg/README.md`](lpg/README.md). È l'indice del metodo, della configurazione, della procedura e delle fonti, con le lacune ancora aperte.

## Immagini per Robin

Prompt delle immagini LPG_210–LPG_259 per i post: [`robin/README.md`](robin/README.md).
