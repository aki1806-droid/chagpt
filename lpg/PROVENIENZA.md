# Provenienza, inventario e lacune

## Fonte unica

| campo | valore |
|---|---|
| repository | `aki1806-droid/Prove` (pubblico, letto il 2026-10-04 con clone anonimo) |
| branch | `claude/heygen-video-creation-8gz057` |
| commit | `4ed8a32ef71452ce66b1c67e4084bd84c242c356` (2026-09-27, «Modulo 8 — Parlare in pubblico senza recitare, e la chiusura del corso») |
| stato rispetto a `main` | **non unito**: `main` di Prove è fermo a `102c57b30ddb16114b379ff8fede59ca68de924e` («Inizializza la repository») e non contiene materiale LPG |
| storia | 85 commit sul branch; nessun commit dopo il modulo 8 |
| dimensione | circa 1,7 MB di file versionati; audio, PNG e clip sono esclusi dal `.gitignore` e non sono nel repository |

Tutti i percorsi citati nel pacchetto sono relativi alla radice di quel commit. Recupero:

```bash
git clone --filter=blob:none https://github.com/aki1806-droid/Prove prove-lpg
cd prove-lpg
git checkout 4ed8a32ef71452ce66b1c67e4084bd84c242c356
```

Il clone in lettura non richiede credenziali. Le scritture su Prove non sono autorizzate da questo passaggio.

## Perché i file non sono copiati qui

La richiesta prevedeva di copiare in `lpg/` gli script e i documenti originali. In questa sessione la copia da Prove a chagpt è stata **negata dal controllo dei permessi** della sessione Claude. Il pacchetto contiene quindi documentazione originale con riferimenti esatti, non copie. Le copie verbatim richiedono che l'utente autorizzi l'operazione, oppure che Codex le prenda direttamente con il comando sopra.

## Inventario delle fonti (tutte in `produzione/`)

| percorso | cosa contiene | uso per il secondo corso |
|---|---|---|
| `MASTER.md` | metodo madre parametrico: scheda parametri, aritmetica, pipeline in 8 passi, controlli, profilo §7.1 del corso | **documento principale** |
| `STANDARD.md` | diario delle trappole con le soluzioni, voce, avatar, slide, diagrammi, riprese, output | obbligatorio, insieme al MASTER |
| `METODO.md` | versione operativa più vecchia (canale + moduli 1–5) | solo come storia: diverge dal metodo finale (vedi `MASTER-E-ISTRUZIONI.md`) |
| `script/slide_corso.mjs` | layout delle slide del corso, palette, caratteri, logo | rendering |
| `script/figure_corso.mjs` | 15 diagrammi parametrici | rendering |
| `script/info_corso.mjs` | 4 infografiche | rendering |
| `script/cards_corso.mjs` | PNG fermi delle slide | rendering e controllo |
| `script/clips_corso.mjs` | fotogrammi animati a 25 fps | rendering |
| `script/fonts_embed.py` | incorpora i caratteri Google come data URI (`fonts_corso.css`, non versionato) | prerequisito del rendering |
| `script/logo_negativo.py` | genera il logo negativo (richiede Pillow) | solo se si rifà il logo |
| `script/logo_lpg.png`, `logo_lpg_esteso.png`, `logo_lpg_negativo.png` | marchio LPG | asset del rendering |
| `script/tagli.py` | allinea, corregge e applica i tagli della traccia unica | audio |
| `script/verifica.py` | appaia la trascrizione della prova ai confini | audio |
| `script/carica.py` | PUT dei file sugli URL del batch HeyGen, scrive `assets.json` | caricamento |
| `script/scene.py` | lista delle scene per `create_video_from_studio` | montaggio |
| `copioni/8-5-scene85.py` | variante del montaggio per la 8.5 (scena muta e chiusura da 20 s); richiede `a_muto25.mp3` e `a_chiusura20.mp3` in `mp3u/` | montaggio, casi speciali (`PROCEDURA.md` 8.3) |
| `script/cards.mjs` | slide del **canale**, non del corso | non usare per LPG |
| `copioni/modulo-1.md` … `modulo-6.md` | MD di partenza dei moduli 1–6 | esempio di input |
| `copioni/<m>-<l>-blocchi.json`, `-chunks.json`, `-slides.json`, `-media.json`, `-pose.json` | intermedi di ogni lezione (39 lezioni hanno blocchi e slide) | esempi di formato |
| `copioni/7-riprese*.json`, `8-riprese*.json` | piano e URL delle riprese dei moduli 7–8 | il campo `mondo` è riutilizzabile; gli URL no |
| `registri/corso.md`, `modulo-N.md`, `corso-<m>-<l>.md` | registro del corso, dei moduli e di ogni lezione | durate, video_id, decisioni, cose da verificare |

## Materiale sanitizzato o da non riusare

- `copioni/*-media.json` e `copioni/*-riprese.json` contengono URL di CDN di servizi terzi: alcuni sono **firmati e a lunga scadenza**, altri includono un identificativo di account. Non vanno copiati nel repository pubblico chagpt e non vanno riusati: in questo pacchetto si citano solo il tipo e la descrizione della ripresa.
- Nessun file `.env`, chiave o token è presente nelle fonti lette (ricerca di `api_key`, `token`, `secret`, `password`, `bearer`, `authorization`: nessun risultato a parte gli URL firmati).

## Lacune

| elemento | stato |
|---|---|
| MD di partenza dei moduli 7 e 8 | **mancanti** in Prove (ci sono solo i moduli 1–6) |
| audio grezzo, blocchi mp3, PNG, clip, musica | non versionati; esistono solo come asset HeyGen o file locali di sessioni chiuse |
| impostazioni della voce oltre a voce e modello (stability, similarity, style, seed) | **non registrate** in nessun file: non si possono ricostruire |
| prompt esatti di ogni ripresa | non registrati: restano il «mondo visivo» del modulo, il suffisso di stile e la descrizione della ripresa |
| licenza dei caratteri, della musica e delle riprese generate | non documentata nelle fonti (vedi `ASSET.md`) |
| versione di Playwright/Chromium usata in produzione | non registrata. Il pacchetto fissa Playwright 1.56.1 + Chromium build 1194, verificati qui con Node 22, Python 3.11 e ffmpeg di sistema. Il download del browser da `cdn.playwright.dev` è bloccato in questa sessione: provato solo con il Chromium preinstallato |
| difetti delle fonti, non corretti in Prove | `tagli.py correggi` annuncia «riprova.mp3» ma scrive `prova.mp3`; `verifica.py` esce con 0 anche senza code; `carica.py` esce con 0 e scrive gli id dopo PUT falliti; `scene.py` implementa solo la chiusura da 10 s. Aggirati con i controlli in `PROCEDURA.md` |
| video finali | solo come `video_id` HeyGen nei registri; servono l'account HeyGen dell'utente per aprirli |

## Accessi e costi per produrre davvero

Nessuno di questi accessi è stato usato o concesso in questo passaggio. Ogni uso richiede l'autorizzazione dell'utente.

- **ElevenLabs** (voce `eleven_v3`, trascrizione `scribe`, eventuale musica): a pagamento, crediti dell'utente.
- **HeyGen** (caricamento asset e montaggio `create_video_from_studio`): a pagamento, circa 10 crediti per minuto di video finito secondo il registro della 2.1.
- **Artlist** o **Higgsfield** (riprese): a pagamento. Dai registri: Artlist ~750 crediti per 5 s di video (modulo 7), Higgsfield 32,5 crediti per 5 s di video e 2 per una foto, ma con crediti esauriti a metà del modulo 7.
- Costo reale per lezione: non registrato in modo uniforme per il corso LPG.
