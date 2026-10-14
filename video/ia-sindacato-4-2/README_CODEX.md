# Video lezione 4.2 — passaggio a Codex

Corso «L'IA per chi fa sindacato» · CISL FP Padova Rovigo · Lezione 4.2 «Dare esempi: il testo che ti piace come modello».

Pacchetto fornito dall'utente il 2026-10-14 (ZIP `IA_Sindacato_4-2_dare-esempi-il-testo-che-ti-piace-come-m.zip`) e trasferito da Claude senza modifiche ai contenuti. **Claude non ha creato né montato il video**: il compito è di Codex, in un'attività separata e breve.

## Dove sono i file

| cosa | dove |
|---|---|
| istruzioni originali del pacchetto | [`00_LEGGIMI.txt`](00_LEGGIMI.txt): da leggere per primo |
| parlato per scena (45 blocchi) | [`01_script_per_scena.txt`](01_script_per_scena.txt) |
| parlato continuo | [`02_script_continuo.txt`](02_script_continuo.txt) |
| scaletta (scena, inizio, durata, tipo, testo a schermo, file, parlato; separatore `;`) | [`03_scaletta.csv`](03_scaletta.csv) |
| 5 prompt per b-roll (scene 02, 06, 23, 37, 44) | [`04_prompt_broll.txt`](04_prompt_broll.txt) |
| 7 registrazioni schermo (scene 13, 15, 17, 19, 27, 33, 42) | [`05_copione_registrazione_schermo.txt`](05_copione_registrazione_schermo.txt) |
| dispensa | [`Dispensa_4.2.pdf`](Dispensa_4.2.pdf) |
| impronte di tutti i 54 file | [`manifest.json`](manifest.json) (`su_main: false` = file in `scene/`) |
| **scene/** (45 PNG 1920×1080 + 2 MP4 + 2 anteprime PNG, circa 20 MB) | **non su `main`**: branch `claude/stoic-dijkstra-fkoox8`, commit `e032156` |

Recupero delle scene, dalla radice del repository aggiornato a `main`:

```bash
git fetch origin claude/stoic-dijkstra-fkoox8
git checkout e0321563a6e15990e61d2f91f104de019cc511c2 -- video/ia-sindacato-4-2/scene/
git restore --staged video/ia-sindacato-4-2/scene/   # restano locali, non vanno in commit su main
```

Verificato da Claude in un clone nuovo `--depth 1`: 54/54 file con impronta corretta, `git status` pulito (le scene sono escluse da `.gitignore`).

Poi si verificano le impronte:

```bash
cd video/ia-sindacato-4-2 && python3 - <<'EOF'
import json, hashlib
m = json.load(open('manifest.json')); bad = [x['file'] for x in m
       if hashlib.sha256(open(x['file'], 'rb').read()).hexdigest() != x['sha256']]
print('file verificati', len(m) - len(bad), '/', len(m), '| diversi o mancanti:', bad or 'nessuno')
EOF
```

## Dati verificati da Claude (2026-10-14)

- 45 blocchi di parlato, 45 righe di scaletta, 45 file di scena citati, tutti presenti. In più ci sono le anteprime statiche `07_animazione.png` e `11_animazione.png`.
- Tutti i PNG sono 1920×1080. Le due animazioni MP4 sono 1920×1080, 30 fps, 18,4 s.
- Parlato: 12.272 caratteri; durata stimata 12:35 a 1,12× (ultima scena all'inizio 12:19, 16 s).
- Nessuna chiave, password o URL nei testi. Le registrazioni schermo usano solo dati finti («caso Valcorta») e segnaposto.

## Compito per Codex

Seguire `00_LEGGIMI.txt`. In sintesi:

1. Video 16:9, 1920×1080, **senza avatar**, una scena per file, nell'ordine di `03_scaletta.csv`. Per le scene 07 e 11 si usa l'MP4, non l'anteprima PNG.
2. Parlato: blocco con lo stesso numero di `01_script_per_scena.txt`. Voce **«Achille nuovo 1 v4»**, velocità **1,12×**.
3. Sottotitoli in italiano; dissolvenza breve fra le scene; musica almeno 20 dB sotto la voce, abbassata nelle registrazioni schermo.
4. **B-roll** (scene 02, 06, 23, 37, 44): sostituire la grafica d'attesa con clip o immagini generate dai prompt di `04_prompt_broll.txt`. Se non si generano, la grafica d'attesa può restare.
5. **Registrazioni schermo** (7 scene con fascia rossa SEGNAPOSTO): vanno registrate seguendo `05_copione_registrazione_schermo.txt`, a 1080p, con il cursore evidenziato e **solo dati finti**. Se non si possono registrare, il video resta con i segnaposto e va detto.

Questa lezione segue le istruzioni del suo pacchetto, **non** il metodo LPG di `lpg/` (voce, palette e strumenti sono diversi).

## Limiti e autorizzazioni

- **A pagamento, solo con l'autorizzazione esplicita dell'utente:** il montaggio e il render su HeyGen, la generazione della voce e del b-roll (HeyGen, Higgsfield o altri). Prima di spendere si indicano i crediti stimati.
- **Accessi necessari:** account HeyGen dell'utente con la voce «Achille nuovo 1 v4»; servizio per il b-roll; un modo per registrare lo schermo di ChatGPT, Claude e Gemini. Se mancano, ci si ferma e si chiede.
- **File pesanti:** le scene, le clip generate e il video finale **non vanno in commit su `main`** (`AGENTS.md`, «Immagini condivise»). Il video finale resta sul servizio (HeyGen) o va dove indica l'utente. Nel repository si registrano solo identificativo, durata e link.
- **Attività separata e breve**, per non appesantire la chat di lavoro (vedi `memory/HANDOFF.md`).

## Da riportare a fine lavoro

In `memory/HANDOFF.md`:
- `video_id` e link;
- durata reale contro la stima di 12:35;
- scene con b-roll sostituito o lasciato;
- registrazioni fatte o rimaste segnaposto;
- crediti spesi;
- cosa resta da verificare (ascolto, sottotitoli).
