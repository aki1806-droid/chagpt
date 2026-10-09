# Installare Notabene (circa 10 minuti)

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
3. Torna all'**Editor** e copia il contenuto dei file di `notabene/app/`. Per copiarli apri i link (accesso a GitHub richiesto), premi l'icona **Copia** in alto a destra del file e incolla:
   [appsscript.json](https://github.com/aki1806-droid/chagpt/blob/claude/eloquent-keller-0irnal/notabene/app/appsscript.json) · [Code.gs](https://github.com/aki1806-droid/chagpt/blob/claude/eloquent-keller-0irnal/notabene/app/Code.gs) · [Index.html](https://github.com/aki1806-droid/chagpt/blob/claude/eloquent-keller-0irnal/notabene/app/Index.html) · [Styles.html](https://github.com/aki1806-droid/chagpt/blob/claude/eloquent-keller-0irnal/notabene/app/Styles.html)
   - `appsscript.json` → sostituisci tutto il contenuto del file omonimo.
   - `Code.gs` → sostituisci il contenuto di `Codice.gs` (o `Code.gs`).
   - `Index.html` → **+** → HTML → nome `Index`.
   - `Styles.html` → **+** → HTML → nome `Styles`.
4. Salva (icona disco).

## 3. Prepara la chiave di Claude

1. Vai su <https://console.anthropic.com> e accedi.
2. **Billing**: carica un piccolo credito (bastano pochi dollari, vedi `COSTI.md`). Se vuoi, imposta un limite di spesa mensile.
3. **API Keys** → **Create Key** → nome `Notabene` → copia la chiave (inizia con `sk-ant-`). La incollerai nell'app al punto 5.

Email autorizzate, cartella condivisa e modelli di Claude (Haiku per catalogare, Sonnet per la chat) sono già scritti nel codice (`CONFIG` in `Code.gs`): non devi impostare altro.

## 4. Pubblica l'app

1. **Esegui il deployment** → **Nuovo deployment** → tipo **App web**.
2. *Esegui come*: **Utente che accede all'app web**.
3. *Chi ha accesso*: **Chiunque abbia un Account Google** (entrano comunque solo le email in `ALLOWED_EMAILS`).
4. **Esegui il deployment** → autorizza → copia l'**URL dell'app web**.

## 5. Primo accesso (tu e Giovanna)

1. Apri l'URL. Google mostra "Google non ha verificato questa app": è normale per un'app privata. Clicca **Avanzate** → **Vai a Notabene** → **Consenti**.
2. Solo tu: nel riquadro in alto incolla la chiave di Claude e premi **Salva chiave**. L'app la verifica con Anthropic prima di salvarla; resta sul server e non viene mostrata a nessuno. Per cambiarla in seguito: **Personalizza** → **Chiave di Claude**, oppure Impostazioni progetto → Proprietà script → `ANTHROPIC_API_KEY`.
3. Premi **Attiva l'aggiornamento ogni ora**: l'app controllerà da sola le cartelle.
4. Premi **Aggiorna** (frecce circolari in alto) per catalogare subito i file già presenti.
5. Sul telefono: apri l'URL nel browser → **Aggiungi a schermata Home**. L'accesso resta memorizzato finché resti collegato a Google.

## Plaud

La routine "Notabene Plaud" gira ogni mattina alle 6:46. Per ogni registrazione crea un Google Doc in `Notabene Personale/Plaud` con il riassunto (titolo che inizia con `[Plaud]`) e lascia all'app una richiesta nella cartella `Plaud/_coda`. L'app, ogni 10 minuti, copia l'**audio** in `Plaud/Audio Plaud`, aggiunge la **trascrizione completa** al documento e poi lo ricataloga. Nella nota si ascolta la registrazione con **Ascolta la registrazione**.

Serve l'aggiornamento automatico attivo sull'account dell'amministratore (vedi "Aggiornare alla versione 2"). Ogni giorno arrivano fino a 20 documenti nuovi e 20 registrazioni completate, a partire dalle più recenti; anche le note Plaud già importate con il solo riassunto vengono completate un po' alla volta.

### Importare da Plaud quando vuoi, dall'app

Oltre all'importazione delle 6:46 puoi avviarla tu con il pulsante **Importa ora** (riquadro "Registrazioni Plaud") o dal menu del tuo profilo. Serve una volta sola un token:

1. Apri <https://claude.ai/code/routines> → **Notabene Plaud (in questa chat)** → **Modifica**.
2. Aggiungi un trigger **API** → **Genera token** → copia il token (si vede una sola volta).
3. Nell'app: **Personalizza** → **Token della routine Plaud** → incolla → **Salva**.

Dopo aver premuto **Importa ora**, i nuovi documenti arrivano su Drive in qualche minuto; l'app preme da sola **Aggiorna** dopo 6 minuti. Solo l'amministratore vede il pulsante. Limite: 30 avvii all'ora.

L'app riconosce le registrazioni importate e le mostra con il tipo "Plaud". Per condividerne una, aprila nell'app e premi **Condividi con il team**.

Le registrazioni senza trascrizione e senza riassunto in Plaud vengono saltate: prima vanno elaborate nell'app Plaud. Le registrazioni oltre circa 50 MB di audio (più di 3–4 ore) arrivano con la sola trascrizione: l'audio resta nell'app Plaud.

Per scaricare subito audio e trascrizioni in attesa, senza aspettare i 10 minuti: menu del profilo → **Scarica ora audio e trascrizioni Plaud**.

## Aggiornare l'app

Dopo aver modificato i file: **Esegui il deployment** → **Gestisci deployment** → matita → Versione **Nuova versione** → **Esegui il deployment**. L'URL resta lo stesso. Note, catalogo, chiave e preferenze restano: sono su Drive e nelle proprietà del progetto, non nel codice.

### Aggiornare alla versione 2 (video, anteprime, Gmail, Calendar, audio Plaud)

1. Nello **stesso progetto** sostituisci il contenuto di tutti e quattro i file (`appsscript.json`, `Code.gs`, `Index.html`, `Styles.html`) con quelli nuovi dei link al punto 2. Non creare un progetto nuovo.
2. Salva, poi pubblica una **Nuova versione** come sopra.
3. Apri l'app: Google chiede di nuovo il consenso perché ci sono permessi nuovi (**inviare email a tuo nome** e **gestire Google Calendar**). Premi **Avanzate** → **Vai a Notabene** → **Consenti**. Lo stesso farà Giovanna al suo primo accesso.
4. Solo tu (amministratore): nel riquadro in alto premi **Attiva**. Così l'app aggiorna le cartelle ogni ora e scarica audio e trascrizioni Plaud ogni 10 minuti.
5. Premi **Aggiorna**: l'indice riceve due colonne nuove (`media`, `eventi`) senza toccare le righe già catalogate.

Cosa c'è di nuovo:
- **Tutti i formati**: video, Fogli ed Excel, Presentazioni e PowerPoint, CSV, JSON, archivi ZIP. Video e file oltre 20 MB vanno direttamente su Drive (fino a qualche GB, compatibilmente con lo spazio).
- **Anteprime** di foto, video, PDF e presentazioni nelle schede; nel pannello della nota **Guarda il video** / **Ascolta**.
- **L'AI guarda foto e video** (un fotogramma) per scrivere il riassunto. Un video appena caricato si cataloga quando Drive ha preparato l'anteprima, di solito al primo aggiornamento successivo.
- **Invia per email** dal pannello della nota o da più note selezionate: parte dal tuo Gmail con i file allegati (Documenti come PDF).
- **Calendario**: vista del mese con i tuoi eventi, **Nuovo evento** con ora, durata, luogo, promemoria e invitati, **Allega al calendario** per mettere una nota in un evento o in un giorno. Nel riquadro di benvenuto compaiono gli impegni di oggi e domani.
- **Più veloce**: all'apertura le note compaiono subito (salvate nel browser) e poi si aggiornano; le schede si caricano man mano che scorri.
