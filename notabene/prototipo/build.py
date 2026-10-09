"""Genera prototipo/index.html (pagina artifact con dati di esempio) da app/Index.html e app/Styles.html."""
import pathlib, re, sys
root = pathlib.Path(__file__).resolve().parent.parent
index = (root / "app/Index.html").read_text()

# Apps Script toglie i commenti dagli script senza capire i template literal: sequenze come "/*" o "//"
# dentro stringhe o template cancellano pezzi di codice nella pagina vera. Qui si fermano prima.
script = index.split("<script>")[1].split("</script>")[0]
code = re.sub(r"/\*.*?\*/", "", script, flags=re.S)                       # commenti a blocco
code = "\n".join(re.sub(r"(^|\s)//\s.*$", "", l) for l in code.split("\n"))  # commenti di riga
bad = [l.strip()[:90] for l in code.split("\n") if re.search(r"/\*|\*/|//", l)]
if bad:
    sys.exit("Sequenze di commento dentro il codice di Index.html:\n" + "\n".join(bad))
styles = (root / "app/Styles.html").read_text()
demo = (root / "prototipo/demo.js").read_text()
head = index.split("<head>")[1].split("</head>")[0]
head = re.sub(r'<meta charset[^>]*>\s*|<base [^>]*>\s*', "", head)
head = head.replace("<?!= HtmlService.createHtmlOutputFromFile('Styles').getContent(); ?>", styles)
body = index.split('<body data-me="<?= me ?>">')[1].split("</body>")[0]
banner = '<div style="background:var(--accent-soft);color:var(--fg);font-size:13px;padding:6px 16px;text-align:center">Prototipo con dati di esempio: le modifiche non vengono salvate su Drive</div>\n'
body = banner + body.replace("<script>", "<script>\n" + demo + "\n</script>\n<script>", 1)
(root / "prototipo/index.html").write_text(head.strip() + "\n" + body)
print("ok")
