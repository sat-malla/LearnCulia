import fitz, os
docs_dir = 'documents'
for f in os.listdir(docs_dir):
    if f.endswith('.pdf'):
        doc = fitz.open(os.path.join(docs_dir, f))
        text = ''.join([page.get_text() for page in doc])
        out = os.path.join(docs_dir, f.replace('.pdf', '.txt'))
        open(out, 'w').write(text)
        print(f'Converted {f}')