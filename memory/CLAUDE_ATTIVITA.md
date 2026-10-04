# Attività svolte con Claude

Riepilogo delle sessioni Claude Code dell'utente, ricavato dai riassunti delle sessioni (non dalle trascrizioni complete) il 2026-10-04. Non include le normali chat su claude.ai né eventuali memorie interne di Claude, che da qui non sono accessibili. Gli stati indicati sono quelli dell'ultima risposta di ciascuna sessione: verificali sul repository prima di riprendere un lavoro.

## Repository

- `aki1806-droid/Prove`: repository di lavoro principale (corsi video, integrazioni, strumenti).
- `aki1806-droid/laparolagiusta`: sito web (ebook, lancio previsto a novembre).
- `aki1806-droid/VIDEO`: progetto Remotion per video promozionali.
- `aki1806-droid/chagpt`: memoria condivisa Codex/Claude (questo repository).

Ogni sessione lavora su un proprio branch `claude/...`; molte modifiche potrebbero non essere ancora unite al branch principale.

## Corsi e video (repo Prove)

| Data | Lavoro | Stato | Branch |
|---|---|---|---|
| 2026-09-05 | Video Accademia LPG: 8 moduli, 40 lezioni, circa 3 h 56 min, generati e pubblicati | completato; da rivedere foto 8.4, mix musicale 8.5, respiro 8.1 | `claude/heygen-video-creation-8gz057` |
| 2026-09-10 | Video corso infermieri | in corso: rifare le trascrizioni 10.8 e 11.1, poi voci, controlli, caricamento e render; chiudere i moduli 10 e 11 | `claude/new-session-zd79vq` |
| 2026-09-12 | Video corso OSS: configurazione centralizzata in `profilo.py`, MASTER ricostruito come specifica riutilizzabile, 8/8 test superati | completato | `claude/new-session-nnfb4e` |
| 2026-09-12 | Pipeline clip HeyGen + ffmpeg a partire dal master: loop del logo, sottotitoli ASS, sincronizzazione corretti | completato; pronta per il primo script | `claude/video-clip-creation-z32awy` |
| 2026-09-21 | Corso busta paga: animazioni verificate | bloccato: pulizia di un file da 437 MB dalla cronologia Git (filter-branch) in attesa di autorizzazione | `claude/blissful-einstein-d5w13n` |
| 2026-09-23 | Corso progressioni verticali (anticorruzione): 6 video, 61 illustrazioni, trascrizioni in italiano, costi per lezione in `REGISTRO.md` | completato | `claude/zealous-allen-3hlxnc` |
| 2026-09-23 | Esecuzione script di montaggio (`monta-scene.py`, `monta-locale.py`, `indice-capitoli.py`, `spezza-per-invio.py`) | bloccato: script non trovati nel repository | `claude/sweet-ritchie-bi4jm1` |

## Integrazioni e strumenti

| Data | Lavoro | Stato | Branch |
|---|---|---|---|
| 2026-09-06 | Connessione Skillplate (piattaforma corsi) | in attesa di una risposta dell'utente sul periodo dei dati | `claude/skillplate-connection-tmycgq` |
| 2026-09-07 | Skillplate: integrazione MCP e automazioni (sessione da terminale) | nessun riassunto disponibile | — |
| 2026-09-07 | Integrazione WhatsApp + Claude: procedura guidata, lettura `.env`, diagnostica di rete, 79 test superati | codice completato; l'utente deve creare l'app Meta, la chiave Anthropic e configurare il webhook | `claude/claude-whatsapp-integration-ppg6fx` |
| 2026-09-07 | Accesso HeyGen personale: problema dello spazio di lavoro diagnosticato | completato | `claude/heygen-personal-access-8kihsj` |
| 2026-09-09 | Pipeline libri Amazon KDP: `strumenti/kdp.py`, da Markdown a EPUB senza dipendenze, 25 test superati; manoscritti in `libri/<slug>/manoscritto/`, metadati in `libro.json` | completato; in attesa di un manoscritto | `claude/amazon-kdp-link-ft3diq` |
| 2026-09-13 | Collegamento a ChatGPT | in attesa: chiarire quale integrazione si vuole | `claude/chatgpr-connection-084xex` |
| 2026-09-15 | Nuovo repository ESPERIMENTI: struttura iniziale pronta | bloccato: creazione del repository su GitHub negata (403) | `claude/zealous-brown-79uz5k` |
| 2026-09-15/16 | Collegamento Picky Assist (WhatsApp) | in attesa: WhatsApp normale o Business sul numero da collegare | `claude/picky-assist-connection-1zummx` |
| 2026-09-23 | Memoria condivisa con ChatGPT/Codex: proposte tre strade (file nel repository, server MCP, Google Drive); consigliati i file nel repository | completato; realizzato poi in questo repository | `claude/elegant-bohr-3ks19r` |
| 2026-09-04 | Collegamento GitHub Pages, automazioni e strumenti disponibili (sessioni da terminale) | nessun riassunto disponibile | — |

## Sito laparolagiusta

| Data | Lavoro | Stato | Branch |
|---|---|---|---|
| 2026-09-04 | Controllo certificato e pacchetto del sito (6 file + `ISTRUZIONI.md`) | completato; verifica programmata il 1° novembre alle 8 prima della pubblicazione | `claude/lancio-novembre` |
| 2026-09-05 | Pulsanti degli ebook: merge su main, ebook 1 e 2 collegati | in attesa delle schede degli ebook dal 3 in poi | `claude/new-repository-2um8bx` |

## Progetto VIDEO (Remotion)

- 2026-02-02: video promozionale per un corso di comunicazione assertiva (`claude/remotion-promo-video-SU4EV`).
- 2026-06-09: `CLAUDE.md` con struttura del progetto, comandi e convenzioni delle animazioni (`claude/claude-md-docs-2j7903`).
- 2026-06-20: panoramica delle capacità di Claude Code.

## Altro

- 2026-09-22: confronto tra portatili da 13 pollici per l'AI. Consigliato ThinkPad X1 Carbon Gen 14 per un uso di 5 anni, T14s come alternativa economica. Manca il budget per decidere.

## Lavori in sospeso che richiedono l'utente

1. Corso busta paga: autorizzare la pulizia della cronologia Git.
2. Script di montaggio: fornire i quattro script mancanti.
3. Corso infermieri: completare i moduli 10 e 11.
4. ESPERIMENTI: creare il repository vuoto su GitHub.
5. Picky Assist: indicare se il numero usa WhatsApp normale o Business.
6. Skillplate: rispondere sul periodo dei dati.
7. WhatsApp + Claude: configurare l'app Meta e il webhook.
8. ChatGPT: scegliere il tipo di integrazione.
9. Sito: fornire le schede degli ebook dal 3 in poi; verifica il 1° novembre.
10. Accademia LPG: rivedere i tre punti segnalati.
