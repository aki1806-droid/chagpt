# Installare Notabene (circa 15 minuti)

Notabene gira su Google Apps Script, gratis, con i vostri account Gmail. I file dell'app sono in `notabene/app/`.

## Cartelle già create nel Drive di aki1806@gmail.com

| Cartella | A cosa serve | ID |
|---|---|---|
| Notabene Personale | note visibili solo a te (contiene la sottocartella `Plaud`) | `1YncLk0BhdL8x7abia_lJu3zxoTV3QBf3` |
| Notabene Condivise | note visibili a entrambi | `1ftFYAyeAeXgesIb81stFxU2ts6dACHrz` |

La cartella personale del collega viene creata da sola nel suo Drive al primo accesso. Tu non puoi vederla.

## 1. Condividi la cartella del team

In Drive, tasto destro su **Notabene Condivise** → Condividi → aggiungi l'email del collega come **Editor**.

## 2. Crea il progetto

1. Vai su <https://script.google.com> → **Nuovo progetto**. Rinominalo `Notabene`.
2. Ingranaggio **Impostazioni progetto** → spunta **Mostra il file manifest "appsscript.json"**.
3. Torna all'**Editor** e copia il contenuto dei file di `notabene/app/`:
   - `appsscript.json` → sostituisci tutto il contenuto del file omonimo.
   - `Code.gs` → sostituisci il contenuto di `Codice.gs` (o `Code.gs`).
   - `Index.html` → **+** → HTML → nome `Index`.
   - `Styles.html` → **+** → HTML → nome `Styles`.
4. Salva (icona disco).

## 3. Imposta le proprietà

**Impostazioni progetto** → **Proprietà script** → aggiungi:

| Proprietà | Valore |
|---|---|
| `ALLOWED_EMAILS` | `aki1806@gmail.com,email-del-collega@gmail.com` |
| `SHARED_FOLDER_ID` | `1ftFYAyeAeXgesIb81stFxU2ts6dACHrz` |
| `AI_PROVIDER` | `gemini` oppure `claude` (vedi sotto). Vuota = niente AI |
| `GEMINI_API_KEY` o `ANTHROPIC_API_KEY` | la chiave del servizio scelto |

### Quale AI scegliere

- **Gemini (gratis)**: chiave da <https://aistudio.google.com/apikey> con il tuo Gmail. Sa anche ascoltare file audio. Limiti: un numero massimo di richieste al giorno e, nel piano gratuito, Google può usare i contenuti per migliorare i suoi prodotti. Da evitare per note riservate.
- **Claude (a pagamento)**: chiave da <https://console.anthropic.com>, ricarica minima con carta. I contenuti inviati tramite API non vengono usati per addestrare i modelli. Il modello predefinito è `claude-opus-5-5`; ogni nota costa indicativamente qualche centesimo. Se vuoi spendere meno, aggiungi la proprietà `CLAUDE_MODEL` con un modello più economico (per esempio `claude-haiku-4-5`). Non trascrive l'audio: per le registrazioni usa le trascrizioni di Plaud.

## 4. Pubblica l'app

1. **Esegui il deployment** → **Nuovo deployment** → tipo **App web**.
2. *Esegui come*: **Utente che accede all'app web**.
3. *Chi ha accesso*: **Chiunque abbia un Account Google** (entrano comunque solo le email in `ALLOWED_EMAILS`).
4. **Esegui il deployment** → autorizza → copia l'**URL dell'app web**.

## 5. Primo accesso (tu e il collega)

1. Apri l'URL. Google mostra "Google non ha verificato questa app": è normale per un'app privata. Clicca **Avanzate** → **Vai a Notabene** → **Consenti**.
2. Premi **Attiva aggiornamento ogni ora**: l'app controllerà da sola le cartelle.
3. Premi **Aggiorna** per catalogare subito i file già presenti.
4. Sul telefono: apri l'URL nel browser → **Aggiungi a schermata Home**. L'accesso resta memorizzato finché resti collegato a Google.

## Plaud

Le registrazioni vengono importate da Claude (connettore Plaud) come Google Doc in `Notabene Personale/Plaud`, con titolo che inizia con `[Plaud]`. L'app le riconosce e le mostra con il tipo "Plaud". Per condividerne una, aprila nell'app e premi **Condividi con il team**.

Le registrazioni senza trascrizione e riassunto in Plaud vengono saltate: prima vanno elaborate nell'app Plaud.

## Aggiornare l'app

Dopo aver modificato i file: **Esegui il deployment** → **Gestisci deployment** → matita → Versione **Nuova versione** → **Esegui il deployment**. L'URL resta lo stesso.
