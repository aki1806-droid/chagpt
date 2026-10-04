# Flusso di lavoro

## 1. Ripresa

Leggi le istruzioni e la memoria. Controlla `git status --short --branch` e verifica che i file descritti nel passaggio di consegne siano presenti. In copie separate, assicurati di lavorare sulla revisione condivisa concordata prima di iniziare.

## 2. Assegnazione

Scrivi in `memory/STATUS.md` il compito, il responsabile (Codex o Claude), lo stato e i criteri di completamento. Se manca un obiettivo concreto, chiedilo all'utente: non inventare un progetto.

Stati: `da assegnare`, `in corso`, `da revisionare`, `bloccato`, `completato`.

## 3. Esecuzione

Il responsabile modifica i file necessari ed esegue verifiche proporzionate al compito. Annota i problemi reali e le verifiche non eseguibili. Evita modifiche estranee al compito.

## 4. Passaggio di consegne

Aggiorna `memory/HANDOFF.md` con obiettivo, modifiche, verifiche, problemi aperti e prossima azione. Imposta lo stato su `da revisionare` e assegna la revisione all'altro assistente. Il trasferimento richiede che l'utente avvii o istruisca l'altro assistente; non avviene automaticamente.

Richiesta suggerita:

> Leggi le istruzioni condivise e memory/HANDOFF.md. Revisiona le modifiche rispetto ai criteri in memory/STATUS.md. Riporta problemi concreti e verifiche mancanti. Aggiorna il passaggio di consegne e lo stato; non modificare l'implementazione salvo autorizzazione.

## 5. Chiusura

Dopo la revisione, risolvi eventuali problemi, registra le decisioni durature e aggiorna lo stato. Prima di commit o pubblicazione controlla il diff e l'assenza di credenziali. La pubblicazione richiede l'autorizzazione dell'utente.

## Memoria

`memory/USER_CONTEXT.md` contiene il contesto disponibile dell’utente e i suoi limiti; `memory/PROJECT.md` contiene il contesto stabile; `memory/STATUS.md` la situazione attuale; `memory/DECISIONS.md` le scelte motivate; `memory/HANDOFF.md` l'ultimo passaggio di consegne. Sostituisci informazioni obsolete invece di accumulare copie dello stesso stato. La cronologia Git conserva le versioni precedenti una volta create le revisioni.
