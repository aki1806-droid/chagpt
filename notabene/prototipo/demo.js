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
    ["Nota vocale: idee corso anticorruzione","audio","mie","Idee",["anticorruzione","corsi"],d(2),"Modulo extra con casi pratici anonimizzati e un quiz finale di dieci domande.","ai",false,""]
  ];
  let id = 0;
  const MIME = {doc:"application/vnd.google-apps.document", plaud:"application/vnd.google-apps.document", txt:"text/plain", pdf:"application/pdf", img:"image/jpeg", audio:"audio/mp4"};
  const notes = N.map(r => ({ id:"demo"+(++id), mime:MIME[r[1]], titolo:r[0], tipo:r[1], sezione:r[2], categoria:r[3], etichette:r[4], data:r[5], riassunto:r[6], stato:r[7], preferita:r[8], colore:r[9],
    url:"https://drive.google.com/", autore:r[2]==="team"&&id%2?"collega@gmail.com":"tu@gmail.com",
    percorso:(r[2]==="team"?"Notabene Condivise/":"Notabene Personale/")+(r[1]==="plaud"?"Plaud/":"")+r[0] }));
  let prefs = null;
  window.NB_DEMO = {
    getBootstrap: () => ({ email:"tu@gmail.com", aiEnabled:true, syncInstalled:true, prefs:prefs || {nome:"Achille"},
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
    searchText: q => notes.filter(n => n.tipo==="plaud" && "incentivi delibera allegati dec".includes(q.toLowerCase().split(/\s+/)[0])).map(n => ({id:n.id, estratto:"…per la liquidazione è obbligatoria una delibera annuale di ogni servizio proponente, con gli allegati che indicano chi ha fatto cosa…"})),
    getNoteText: () => "Esempio di testo completo. Nell'app reale qui compare il testo estratto dal file o la trascrizione Plaud.",
    syncNow: () => new Promise(ok => setTimeout(() => ok({ fatti:0, restanti:0 }), 600)),
    installSync: () => true,
    uploadNote: (name, type, b64, scope) => ({ id:"demo"+(++id), titolo:name.replace(/\.[^.]+$/,""), tipo:/^audio/.test(type)?"audio":/pdf/.test(type)?"pdf":/^image/.test(type)?"img":/^text/.test(type)?"txt":"doc",
      sezione:scope, categoria:"Da classificare", etichette:["nuova"], data:new Date().toISOString().slice(0,10), stato:"da rivedere", preferita:false, colore:"",
      riassunto:"Nell'app reale qui compare il riassunto scritto dall'AI.", url:"https://drive.google.com/", autore:"tu@gmail.com", percorso:(scope==="team"?"Notabene Condivise/":"Notabene Personale/")+name })
  };
})();
