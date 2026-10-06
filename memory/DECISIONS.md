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

- Scelta (2026-10-06): app web installabile (strada 2) con piccolo backend: Next.js, Supabase (Postgres, permessi per riga, ricerca), elaborazione in background per Drive e AI (Claude), accesso con Google.
- Motivo: l'utente ha scelto la strada 2 e ha chiesto team, sezioni personali/condivise e catalogazione automatica, che una pagina statica non può garantire in modo sicuro.
- Limite: le decisioni aperte in `notabene/ARCHITETTURA.md` vanno confermate dall'utente.
