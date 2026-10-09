/* Dati di esempio per il prototipo: simula le funzioni di Code.gs senza Google. */
(function(){
  const d = n => new Date(Date.now() - n*864e5).toISOString().slice(0,10);
  const N = [
    ["Riunione: regolamento incentivi e criticità di distribuzione","plaud","mie","Riunioni",["incentivi","regolamento","dec","sindacati"],d(19),"Estensione degli incentivi agli appalti di concessione, nuova funzione per i flussi informativi, proposta di percentuali graduali e di un gruppo di controllo interno. Liquidazioni di servizi e forniture ferme al 2022.","ai",true,""],
    ["Riunione: lavoro agile, part-time e progressioni economiche","plaud","mie","Riunioni",["lavoro agile","part-time","progressioni"],d(28),"Criteri per il lavoro agile, richieste di part-time in sospeso e calendario delle progressioni economiche orizzontali.","ai",false,""],
    ["Idee per il lancio dell'ebook di novembre","doc","mie","Idee",["laparolagiusta","marketing","ebook"],d(8),"Canali per il lancio: newsletter, post programmati, sconto per i primi 7 giorni. Verificare il certificato del sito prima del 1° novembre.","confermata",true,1],
    ["Appunti a mano: struttura corso busta paga","img","mie","Corsi",["busta paga","struttura"],d(16),"Testo riconosciuto dalla foto: 6 lezioni, dalla lettura del cedolino alle trattenute fiscali. Due righe a margine poco leggibili.","da rivedere",false,""],
    ["Contratto fornitore video","pdf","mie","Amministrazione",["contratti","rinnovo"],d(21),"Abbonamento annuale con rinnovo automatico, disdetta con 30 giorni di preavviso. Clausola sui diritti dei video a pagina 4.","ai",false,""],
    ["Promemoria fiscale ottobre","txt","mie","Amministrazione",["scadenze","fisco"],d(5),"Versamento IVA del 16 ottobre. Fatture fornitori da registrare entro fine mese.","ai",false,""],
    ["Call: calendario contenuti social","plaud","team","Riunioni",["social","calendario","marketing"],d(6),"Tre post a settimana fino al lancio. Grafiche pronte il venerdì, revisione ogni lunedì.","ai",false,""],
    ["Checklist qualità video corso","doc","team","Procedure",["video","qualità","checklist"],d(10),"Volume voce, sottotitoli sincronizzati, logo finale di 15 secondi, nessun refuso nei titoli.","confermata",true,""],
    ["Brief grafico copertine ebook","pdf","team","Progetti",["ebook","grafica"],d(14),"Palette, font e formato per le copertine degli ebook 3–6. Formato 1600×2560 per Amazon KDP.","ai",false,""],
    ["Lavagna riunione: obiettivi del trimestre","img","team","Riunioni",["obiettivi","pianificazione"],d(18),"Tre obiettivi: lancio ebook, chiusura corso infermieri, 500 iscritti sulla piattaforma corsi.","da rivedere",false,""],
    ["Procedura caricamento corsi","doc","team","Procedure",["corsi","procedura"],d(28),"Creare il corso, caricare i video, impostare prezzo e certificato. Errori più comuni in fondo.","ai",false,""],
    ["Nota vocale: idee corso anticorruzione","audio","mie","Idee",["anticorruzione","corsi"],d(2),"Modulo extra con casi pratici anonimizzati e un quiz finale di dieci domande.","ai",false,""],
    ["Video: presentazione del corso infermieri","video","team","Corsi",["video","corso infermieri","promozione"],d(3),"Video di 4 minuti: la docente presenta i moduli del corso e le date d'esame. Fotogramma con la slide del programma.","ai",true,""],
    ["Foto evento: assemblea di marzo","img","team","Riunioni",["assemblea","foto"],d(4),"Sala piena durante l'assemblea; sullo schermo la slide con i punti all'ordine del giorno.","ai",false,""],
    ["Budget corsi 2027","foglio","mie","Amministrazione",["budget","corsi","2027"],d(9),"Foglio con costi e ricavi stimati per corso: totale previsto 18.400 euro, margine più alto sul corso busta paga.","ai",false,""],
    ["Slide: lancio piattaforma corsi","slide","team","Progetti",["presentazione","lancio","piattaforma"],d(12),"12 diapositive: obiettivi, calendario dei lanci, prezzi e canali di vendita.","ai",false,""]
  ];
  let id = 0;
  const MIME = {doc:"application/vnd.google-apps.document", plaud:"application/vnd.google-apps.document", txt:"text/plain", pdf:"application/pdf", img:"image/jpeg", audio:"audio/mp4",
    video:"video/mp4", foglio:"application/vnd.google-apps.spreadsheet", slide:"application/vnd.google-apps.presentation"};
  const notes = N.map(r => ({ id:"demo"+(++id), mime:MIME[r[1]], media:r[1]==="plaud"?"audio"+id:"", eventi:[], titolo:r[0], tipo:r[1], sezione:r[2], categoria:r[3], etichette:r[4], data:r[5], riassunto:r[6], stato:r[7], preferita:r[8], colore:r[9],
    url:"https://drive.google.com/", autore:r[2]==="team"&&id%2?"collega@gmail.com":"tu@gmail.com",
    percorso:(r[2]==="team"?"Notabene Condivise/":"Notabene Personale/")+(r[1]==="plaud"?"Plaud/":"")+r[0] }));
  let prefs = null;
  // Anteprime finte: piccoli disegni SVG al posto delle immagini di Drive.
  const PAL = [["#1d5c6b","#5fb3c4"],["#c2513a","#f2c879"],["#3d55c4","#a7b4ff"],["#2f7d4f","#cfe8a9"],["#8a3d7e","#f0a6d8"]];
  const thumb = (i, t) => { const [a,b] = PAL[i % PAL.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="480" height="270" fill="url(#g)"/>` +
      (t==="pdf"||t==="slide" ? `<rect x="120" y="40" width="240" height="190" rx="6" fill="#fff" opacity=".92"/><rect x="145" y="70" width="150" height="12" rx="3" fill="${a}"/><rect x="145" y="100" width="190" height="8" rx="3" fill="#bbb"/><rect x="145" y="118" width="170" height="8" rx="3" fill="#bbb"/><rect x="145" y="136" width="180" height="8" rx="3" fill="#bbb"/>`
       : `<circle cx="360" cy="80" r="34" fill="#fff" opacity=".7"/><path d="M0 270 L150 130 L260 220 L340 160 L480 270Z" fill="#000" opacity=".22"/>`) + `</svg>`;
    return "data:image/svg+xml;base64," + btoa(svg); };
  const today = new Date(); const day = n => { const x = new Date(today); x.setDate(x.getDate()+n); return x.toISOString().slice(0,10); };
  const at = (n, h, m) => { const x = new Date(today); x.setDate(x.getDate()+n); x.setHours(h, m, 0, 0); return x.toISOString(); };
  let events = [
    { id:"ev1", titolo:"Riunione RSU sul piano ferie", inizio:at(0,10,0), fine:at(0,11,30), giorno:false, luogo:"Sala riunioni 2", descrizione:"", link:"https://calendar.google.com/", allegati:[{titolo:"Riunione: lavoro agile, part-time e progressioni economiche", id:"demo2", url:"https://drive.google.com/"}] },
    { id:"ev2", titolo:"Chiamata con la commissione di garanzia", inizio:at(1,15,0), fine:at(1,15,45), giorno:false, luogo:"", descrizione:"", link:"https://calendar.google.com/", allegati:[] },
    { id:"ev3", titolo:"Scadenza versamento IVA", inizio:day(5), fine:day(6), giorno:true, luogo:"", descrizione:"", link:"https://calendar.google.com/", allegati:[] },
    { id:"ev4", titolo:"Lancio ebook", inizio:at(12,9,30), fine:at(12,10,30), giorno:false, luogo:"Online", descrizione:"", link:"https://calendar.google.com/", allegati:[] }
  ];
  const linkNotes = (ids, ev) => (ids||[]).forEach(i => { const n = notes.find(x=>x.id===i); if (n) n.eventi = [{id:ev.id, titolo:ev.titolo, data:ev.inizio.slice(0,10), link:ev.link}].concat(n.eventi.filter(e=>e.id!==ev.id)); });
  const attach = (ev, ids) => { (ids||[]).forEach(i => { const n = notes.find(x=>x.id===i); if (n && !ev.allegati.some(a=>a.id===i)) ev.allegati.push({titolo:n.titolo, id:i, url:n.url}); }); linkNotes(ids, ev); return Object.assign({}, ev); };
  window.NB_DEMO = {
    getBootstrap: () => ({ email:"tu@gmail.com", aiEnabled:true, syncInstalled:true, isAdmin:true, plaudReady:true, prefs:prefs || {nome:"Achille"},
      personal: notes.filter(n=>n.sezione==="mie"), team: notes.filter(n=>n.sezione==="team") }),
    savePrefs: p => { prefs = p; return true; },
    updateNote: () => true,
    deleteNote: id => { const i = notes.findIndex(n=>n.id===id); if (i !== -1) notes.splice(i,1); return true; },
    getEditableText: id => { const n = notes.find(x=>x.id===id); return n.titolo + "\n\n" + n.riassunto + "\n\n(Nel prototipo il testo è di esempio.)"; },
    saveNoteText: (id, text) => { const n = notes.find(x=>x.id===id); n.riassunto = "Riassunto aggiornato dall'AI dopo la modifica: " + text.slice(0, 120); n.stato = "ai"; return Object.assign({}, n); },
    replaceFile: id => { const n = notes.find(x=>x.id===id); n.riassunto = "Riassunto del nuovo file, scritto dall'AI."; return Object.assign({}, n); },
    uploadRaw: () => new Promise(ok => setTimeout(() => ok(true), 400)),
    askArchive: q => new Promise(ok => setTimeout(() => {
      const words = q.toLowerCase().split(/\W+/).filter(w => w.length > 3);
      const hits = notes.map(n => ({ n, s: words.filter(w => (n.titolo + " " + n.riassunto + " " + n.etichette.join(" ")).toLowerCase().includes(w.slice(0, -1))).length })).filter(x => x.s).sort((a,b)=>b.s-a.s).slice(0,4);
      const fonti = (hits.length ? hits : notes.slice(0,3).map(n=>({n}))).map((x,i)=>({ n:i+1, id:x.n.id, titolo:x.n.titolo, citata:i<2 }));
      const a = fonti[0] && notes.find(n=>n.id===fonti[0].id);
      ok({ risposta: hits.length ? `Secondo le tue note, ${a.riassunto.charAt(0).toLowerCase() + a.riassunto.slice(1)} [1]` + (fonti[1] ? `\n\nC'è anche un collegamento con «${fonti[1].titolo}» [2].` : "") + "\n\n(Risposta di esempio: nell'app vera la scrive Claude leggendo le note.)"
        : "Non ho trovato note che parlino di questo. Prova con altre parole. (Risposta di esempio.)", fonti });
    }, 900)),
    moveNote: () => true,
    getThumbs: ids => new Promise(ok => setTimeout(() => { const o = {}; ids.forEach(i => { const n = notes.find(x=>x.id===i); o[i] = n ? thumb(Number(i.replace(/\D/g,"")), n.tipo) : ""; }); ok(o); }, 300)),
    listEvents: (from, to) => new Promise(ok => setTimeout(() => ok(events.filter(e => e.inizio.slice(0,10) < to && (e.giorno ? e.fine.slice(0,10) : e.inizio.slice(0,10)) >= from).map(e => Object.assign({}, e))), 250)),
    createEvent: o => { const ev = { id:"ev"+(events.length+1), titolo:o.titolo, giorno:!o.ora, luogo:o.luogo||"", descrizione:o.descrizione||"", link:"https://calendar.google.com/", allegati:[],
        inizio: o.ora ? new Date(o.data+"T"+o.ora+":00").toISOString() : o.data, fine: o.ora ? new Date(new Date(o.data+"T"+o.ora+":00").getTime()+o.durata*60000).toISOString() : (()=>{ const x=new Date(o.data+"T12:00:00"); x.setDate(x.getDate()+1); return x.toISOString().slice(0,10); })() };
      if (!ev.titolo) throw new Error("Scrivi il titolo dell'evento."); events.push(ev); return attach(ev, o.fileIds); },
    attachToEvent: (id, ids) => attach(events.find(e=>e.id===id), ids),
    attachToDay: (d, ids) => { let ev = events.find(e=>e.giorno && e.inizio===d && e.titolo==="File del giorno (Notabene)");
      if (!ev) { ev = { id:"ev"+(events.length+1), titolo:"File del giorno (Notabene)", giorno:true, inizio:d, fine:d, luogo:"", descrizione:"", link:"https://calendar.google.com/", allegati:[] }; events.push(ev); }
      return attach(ev, ids); },
    sendEmail: o => new Promise((ok, ko) => setTimeout(() => /@/.test(o.a) ? ok({ allegati:o.allega?o.fileIds.length:0, collegamenti:o.allega?0:o.fileIds.length, restanti:99 }) : ko(new Error("Scrivi almeno un destinatario.")), 500)),
    runPlaudQueue: () => ({ fatti:0, errori:[] }),
    demoUpload: (name, type, scope) => "demo-big-" + name,
    finishUpload: (fid, scope) => ({ id:"demo"+(++id), titolo:fid.replace("demo-big-","").replace(/\.[^.]+$/,""), tipo:"video", mime:"video/mp4", sezione:scope, categoria:"Da classificare", etichette:["video"], data:new Date().toISOString().slice(0,10),
      stato:"da rivedere", preferita:false, colore:"", media:"", eventi:[], riassunto:"In attesa dell'anteprima di Drive: la catalogazione riprova al prossimo aggiornamento.", url:"https://drive.google.com/", autore:"tu@gmail.com", percorso:"Notabene/" + fid }),
    searchText: q => notes.filter(n => n.tipo==="plaud" && "incentivi delibera allegati dec".includes(q.toLowerCase().split(/\s+/)[0])).map(n => ({id:n.id, estratto:"…per la liquidazione è obbligatoria una delibera annuale di ogni servizio proponente, con gli allegati che indicano chi ha fatto cosa…"})),
    getNoteText: () => "Esempio di testo completo. Nell'app reale qui compare il testo estratto dal file o la trascrizione Plaud.",
    syncNow: () => new Promise(ok => setTimeout(() => ok({ fatti:0, restanti:0 }), 600)),
    installSync: () => true,
    importPlaud: () => ({ url:"" }),
    setPlaudToken: () => true,
    uploadNote: (name, type, b64, scope) => ({ id:"demo"+(++id), titolo:name.replace(/\.[^.]+$/,""), tipo:/^audio/.test(type)?"audio":/pdf/.test(type)?"pdf":/^image/.test(type)?"img":/^text/.test(type)?"txt":"doc",
      sezione:scope, categoria:"Da classificare", etichette:["nuova"], data:new Date().toISOString().slice(0,10), stato:"da rivedere", preferita:false, colore:"",
      riassunto:"Nell'app reale qui compare il riassunto scritto dall'AI.", url:"https://drive.google.com/", autore:"tu@gmail.com", percorso:(scope==="team"?"Notabene Condivise/":"Notabene Personale/")+name })
  };
})();
