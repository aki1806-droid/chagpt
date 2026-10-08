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

## Comando per l'altro assistente

- Scelta: dopo ogni azione, l'assistente che ha lavorato fornisce all'utente il testo da incollare nella chat dell'altro assistente.
- Motivo: richiesta esplicita dell'utente (2026-10-04), che fa da tramite fra le due chat.
- Conseguenza: ogni risposta che chiude un'azione termina con un blocco «Da incollare in Codex» (o «in Claude»), autosufficiente e con i file da leggere.

## Condivisione delle immagini generate

- Richiesta dell’utente (2026-10-08): ogni volta che vengono create immagini, caricarle in Drive o nel repository affinché Claude possa usarle.
- Destinazione predefinita: repository chagpt; file Robin in `robin/immagini/`, con manifest di nomi, dimensioni e SHA-256. Il solo percorso locale non completa la consegna.

## Immagini pesanti fuori da main

- Scelta (utente, 2026-10-08): togliere da `main` i 50 PNG di `robin/immagini/` dopo il caricamento su Robin, tenendo `manifest.json` con nomi, dimensioni, SHA-256 e nome del prompt.
- Motivo: dopo l'arrivo di circa 100 MB di PNG l'app di Codex si riavviava e si chiudeva.
- Conseguenza: le immagini si recuperano da Robin (cartella «la parola giusta») o dallo storico Git al commit `f158b70`. La storia non è stata riscritta, quindi un clone completo pesa ancora circa 95 MB; per ridurlo servirebbe un force push, da fare solo con l'autorizzazione esplicita dell'utente.
