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

## Notabene: modelli Claude

- Scelta (2026-10-06): `claude-haiku-4-5` per catalogare, `claude-sonnet-5-5` per la chat-agente.
- Motivo: richiesta dell'utente per contenere i costi; Gemini gratuito scartato per la privacy dei contenuti (riunioni sindacali e del personale).

## Notabene: Plaud completo tramite coda

- Scelta (2026-10-09): la routine crea il Doc con il riassunto e un JSON in `Plaud/_coda` con i link temporanei (1 ora) di audio e trascrizione; l'app (trigger ogni 10 minuti dell'amministratore) scarica audio e trascrizione. Sostituisce la regola A (arretrato solo riassunto).
- Motivo: l'utente vuole trascrizioni e registrazioni; copiarle attraverso la chat era troppo pesante, mentre `get_file` di Plaud fornisce link scaricabili. L'app accetta solo link `*.amazonaws.com` con "plaud" nell'host.

## Notabene: Gmail e Calendar

- Scelta (2026-10-09): invio con MailApp (scope `script.send_mail`, non l'accesso completo a Gmail); Calendar con il servizio avanzato v3 per poter allegare file di Drive agli eventi.
- Motivo: richiesta dell'utente; permessi minimi necessari.

## Notabene: niente scriptlet dentro gli script

- Scelta (2026-10-09): i dati del server vanno nella pagina come attributi HTML (`<?= … ?>`), mai dentro `<script>`.
- Motivo: uno scriptlet dentro lo script ha rotto la pagina reale (template literal non riconosciuti da Apps Script), mentre prototipo e test passavano.
