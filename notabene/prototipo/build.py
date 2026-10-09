"""Genera prototipo/index.html (pagina artifact con dati di esempio) da app/Index.html e app/Styles.html."""
import pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
index = (root / "app/Index.html").read_text()
styles = (root / "app/Styles.html").read_text()
demo = (root / "prototipo/demo.js").read_text()
head = index.split("<head>")[1].split("</head>")[0]
head = re.sub(r'<meta charset[^>]*>\s*|<base [^>]*>\s*', "", head)
head = head.replace("<?!= HtmlService.createHtmlOutputFromFile('Styles').getContent(); ?>", styles)
body = index.split("<body>")[1].split("</body>")[0].replace("<?!= JSON.stringify(me) ?>", "\"\"")
banner = '<div style="background:var(--accent-soft);color:var(--fg);font-size:13px;padding:6px 16px;text-align:center">Prototipo con dati di esempio: le modifiche non vengono salvate su Drive</div>\n'
body = banner + body.replace("<script>", "<script>\n" + demo + "\n</script>\n<script>", 1)
(root / "prototipo/index.html").write_text(head.strip() + "\n" + body)
print("ok")
