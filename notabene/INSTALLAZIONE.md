# Installare Notabene (circa 15 minuti)

Notabene gira su Google Apps Script, gratis, con i vostri account Gmail. I file dell'app sono in `notabene/app/`.

## Cartelle già create nel Drive di aki1806@gmail.com

| Cartella | A cosa serve | ID |
|---|---|---|
| Notabene Personale | note visibili solo a te (contiene la sottocartella `Plaud`) | `1YncLk0BhdL8x7abia_lJu3zxoTV3QBf3` |
| Notabene Condivise | note visibili a entrambi | `1ftFYAyeAeXgesIb81stFxU2ts6dACHrz` |

La cartella personale di Giovanna viene creata da sola nel suo Drive al primo accesso. Tu non puoi vederla, lei non vede la tua.

## 1. Condividi la cartella del team

In Drive, tasto destro su **Notabene Condivise** → Condividi → aggiungi `giovanna.vullo87@gmail.com` come **Editor**.

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
| `ALLOWED_EMAILS` | `aki1806@gmail.com,giovanna.vullo87@gmail.com` |
| `SHARED_FOLDER_ID` | `1ftFYAyeAeXgesIb81stFxU2ts6dACHrz` |
| `AI_PROVIDER` | `claude` |
| `ANTHROPIC_API_KEY` | la chiave creata su <https://console.anthropic.com> → API Keys (ricarica prima un piccolo credito) |

### AI scelta: Claude

Modello predefinito `claude-opus-5-5`. Costi stimati in `COSTI.md`: circa 3 $ al mese per un uso normale in due. Per spendere meno aggiungi la proprietà `CLAUDE_MODEL` = `claude-haiku-4-5`. Gli audio caricati a mano non vengono trascritti: usa le registrazioni Plaud, che arrivano già trascritte.

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

La routine "Notabene Plaud" gira ogni mattina alle 6:46 e importa fino a 6 registrazioni al giorno, con riassunto e trascrizione completa, come Google Doc in `Notabene Personale/Plaud`. I titoli iniziano con `[Plaud]`. Le registrazioni già presenti in Plaud arrivano un po' alla volta, a partire dalle più recenti.

**Da fare una volta:** la routine è stata creata senza connettori. Apri claude.ai → Routine → "Notabene Plaud" → aggiungi i connettori **Plaud** e **Google Drive** → salva. Senza questo passaggio la routine parte ma non può leggere Plaud né scrivere su Drive.

L'app riconosce le registrazioni importate e le mostra con il tipo "Plaud". Per condividerne una, aprila nell'app e premi **Condividi con il team**.

Le registrazioni senza trascrizione e riassunto in Plaud vengono saltate: prima vanno elaborate nell'app Plaud.

## Aggiornare l'app

Dopo aver modificato i file: **Esegui il deployment** → **Gestisci deployment** → matita → Versione **Nuova versione** → **Esegui il deployment**. L'URL resta lo stesso.
