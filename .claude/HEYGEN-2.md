<!-- Copia della regola tenuta nel repository aki1806-droid/Prove (metodo/HEYGEN-2.md), copiata il 17/11/2026 su richiesta di Achille. I percorsi progetti/... si riferiscono a quel repository. -->

# HeyGen 2: la regola del secondo account

Regola portatile, valida in qualunque progetto e ambiente. Data dal 15 novembre 2026 (Achille), aggiornata il 17/11 con
quello che si è imparato usandolo su «Lettere dal futuro» e sul video Welfare 350 euro.

## 1. Tre strade per HeyGen: si chiede sempre quale

Gli accessi a HeyGen sono tre:

| strada | strumenti | account |
|---|---|---|
| **connettore HeyGen** | `mcp__Heygen__*` (o `mcp__HEYGEN__*`) | account 1 |
| **chiave API** | `progetti/strumenti/heygen_api.py`, proxy su `api.heygen.com` | account 1 (portafoglio a parte) |
| **«Heygen 2»** | `mcp__Heygen_2__*` | **account 2, diverso** |

**Prima di ogni video si chiede ad Achille quale dei tre usare**, insieme alle altre domande fisse: strumento per la voce,
destinatari (provinciale o solo AOUP), quando programmare su Robin. Se si usa Heygen 2 con un avatar, si chiede anche quale
dei suoi avatar.

## 2. Che account è Heygen 2

- Account separato: verificato il 15/11, piano Pro con 2.000 crediti premium (rinnovo al 30 di ogni mese) più crediti
  aggiuntivi (335 al 15/11). Il saldo si legge con `mcp__Heygen_2__get_current_user`.
- **Non ha l'avatar «Aki with a lapel microphone»** (`e6d73d660d354b94b0a50c9692b7c34e` risponde «avatar look not found»).
  Ha i suoi avatar privati («Achille Digital», «AKI 2», «Sindacalista CISL FP» e altri).
- **Asset, video e voci di un account non si vedono dall'altro.** Un audio caricato sull'account 1 non serve per un avatar
  dell'account 2: va ricaricato su Heygen 2.
- `heygen_api.py` lavora solo con l'account 1: con Heygen 2 si usano solo gli strumenti `mcp__Heygen_2__*`.

## 3. Gli avatar da usare

Indicati da Achille il 15/11, verificati: pronti, stesso gruppo `077af0c52e344e008baf027e8100f676`.

| look ID | com'è | formato |
|---|---|---|
| `29605ba211d24a55bccc96c39cb2d8b4` | maglione color crema, sfondo chiaro neutro | verticale 608×1080 |
| `d9da868060f946c7a5b04dd81fc99938` | giacca e cravatta blu, alla scrivania, grattacieli dietro | orizzontale 1920×1080 |
| `ded19f7e23e74c14b6cd70a483ea9943` | cardigan beige su maglietta bianca, mani giunte | verticale 608×1080 |
| `690f805f4f5b4963af6b680cc3f71bc9` | maglione nero, alla scrivania, finestre della città dietro | verticale 1536×2752 |
| `c5076ef10dd44a2b8ef08a90392e9f9d` | cardigan beige al microfono da podcast, libreria e lampada | orizzontale 2752×1536 |

Sono **avatar foto** (photo_avatar), ma si usano **esattamente come sull'altro account**, compreso il webm senza sfondo:
`create_video_from_avatar` con l'audio caricato come asset di Heygen 2, formato webm, 1080p.

**Come metterli nel video** (deciso il 16-17/11 dopo due correzioni di Achille):
- **mai una cornice**: Achille l'ha rifiutata («non voglio una cornice, voglio l'avatar integrato»);
- l'avatar va **scontornato a testa e spalle**, con il taglio fuori dal quadro in basso, così le braccia non risultano
  tagliate dai bordi della foto;
- scala massima che non tocchi i contatti né il motto; con i vestiti scuri (maglione nero) un leggero alone chiaro;
- tutto questo è automatico in `progetti/strumenti/oggetti/os.py` (`taglio_avatar`).

## 4. Come si lavora con Heygen 2

**Caricare un file** (audio per l'avatar, immagine da animare):
1. `mcp__Heygen_2__create_asset_upload` con nome e tipo del file;
2. PUT dei byte all'`upload_url` con le intestazioni restituite
   (`progetti/strumenti/heygen2_put.py nome=percorso ...` le legge da sé dalla trascrizione della sessione);
3. `mcp__Heygen_2__complete_asset_upload` → `asset_id`.

**Avatar che parla**: `mcp__Heygen_2__create_video_from_avatar` (look ID, asset audio, webm, 16:9 o 9:16 secondo il look,
1080p), poi `mcp__Heygen_2__get_video` finché è `completed`.

**Clip animate** da un'immagine: `mcp__Heygen_2__image_to_video` (5-8 s, senza audio), poi `mcp__Heygen_2__get_model_video`.
La clip esce spesso in 4:7 (1080×1890): si porta a 1080×1920 con `scale=1098:1920,crop=1080:1920`.

**Scaricare**: gli URL `resource2.heygen.ai/...` restituiti da `get_video`/`get_model_video` si scaricano con curl.

**Copia d'archivio**: l'asset definitivo del video finito si carica sull'account 1 (`heygen_api.py asset`), come per tutti
gli altri video, così il link `https://resource2.heygen.ai/video/<asset_id>/original.mp4` resta in un posto solo.

## 5. Regole che valgono anche qui

- Voce: solo **eleven_v4** (ElevenLabs diretto o HeyGen passante). Mai il TTS proprio di HeyGen (heygen_voice, starfish,
  orca) né il Video Agent per la voce, su nessuno dei due account.
- Nel parlato «OSS» si dice sempre «operatori socio sanitari».
- Nessuna chiave o segreto nei file del repository (è pubblico).
