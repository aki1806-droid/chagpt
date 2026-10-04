# Decisioni

## Memoria nel repository

- Scelta: conservare contesto e passaggi di consegne in file Markdown condivisi.
- Motivo: l'utente ha scelto il repository come mezzo di collaborazione con Claude.
- Conseguenza: ogni assistente deve leggere e aggiornare i file; le conversazioni non vengono sincronizzate automaticamente.

## Istruzioni comuni

- Scelta: mantenere le regole in `AGENTS.md` e usare `CLAUDE.md` come rimando.
- Motivo: ridurre le divergenze tra i due assistenti.

## Scrittura sequenziale

- Scelta: assegnare ogni compito a un responsabile e passarlo all'altro per revisione.
- Motivo: evitare modifiche concorrenti sugli stessi file.
- Limite: il file di stato non impedisce tecnicamente l'accesso simultaneo.
