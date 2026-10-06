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

## Notabene: architettura

- Scelta (2026-10-06): Google Apps Script eseguito come l'utente che accede; note in Drive (personale nel Drive di ciascuno, condivisa nel Drive di aki); indice in un foglio Google per cartella; AI Claude via API (scelta dell'utente, Gemini resta alternativa); Plaud importato da Claude con i connettori.
- Motivo: due utenti Gmail, richiesta di usare ciò che già hanno, nessun costo fisso; la privacy delle sezioni personali è garantita da Drive.
- Sostituisce la proposta precedente con Next.js e Supabase.
