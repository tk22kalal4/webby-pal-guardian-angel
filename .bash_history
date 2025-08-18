mkdir -p /sdcard/gitwork
mv -f ~/* /sdcard/gitwork/ 2>/dev/null
mkdir -p /sdcard/gitwork
mv -f ~/{*,.*} /sdcard/gitwork/ 2>/dev/null
rm -rf ~/*
rm -rf ~/.* 2>/dev/null
apt clean
cd /sdcard
mkdir gitwork
cd gitwork
# Clone source repo
git clone https://github.com/tk22kalal4/webby-pal-guardian-angel.git
# Clone target repo
git clone https://github.com/tk22kalal/simple-java-page.git
cd /sdcard/gitwork/simple-java-page
rsync -a --delete --exclude='.git' ../webby-pal-guardian-angel/ ./
git add -A
git commit -m "Replace contents with webby-pal-guardian-angel"
git push origin main   # or master if that's your branch
git config --global --add safe.directory /storage/emulated/0/gitwork/simple-java-page
git push origin main   # or master
ls -la | head
git add -A
git commit -m "Replace contents with webby-pal-guardian-angel"
git push origin main   # or master
git config --global user.email "you@example.com"
git config --global user.email "heroofjusticetk@gmail.com"
cd /sdcard/gitwork/simple-java-page
rsync -av --delete --exclude='.git' ../webby-pal-guardian-angel/ ./
git add -A
git commit -m "Replace contents with webby-pal-guardian-angel"
git push origin main   # or master if that's the branch
pkg update -y
pkg install -y git python
cd ~
rm -rf webby-pal-guardian-angel
git clone https://github.com/tk22kalal4/webby-pal-guardian-angel.git
cd webby-pal-guardian-angel/quiz/marrow
python3 - << 'PY'
import os, json, re

def pretty_name(filename):
    base = os.path.splitext(filename)[0]
    base = re.sub(r'[_\-]+', ' ', base)          # underscores/dashes -> spaces
    base = re.sub(r'\s+', ' ', base).strip()
    return base.title()                           # Title Case (e.g., "Nerve Physiology")

root = os.getcwd()                                # should be .../quiz/marrow
manifest = {}

# Iterate only direct subfolders (subjects)
for d in sorted(os.listdir(root)):
    dpath = os.path.join(root, d)
    if not os.path.isdir(dpath) or d.startswith('.'):
        continue

    items = []
    for f in sorted(os.listdir(dpath)):
        fpath = os.path.join(dpath, f)
        if os.path.isfile(fpath) and f.lower().endswith('.json'):
            items.append({
                "name": pretty_name(f),
                "file": f
            })

    if items:
        manifest[d] = items

out_path = os.path.join(root, 'manifest.json')
with open(out_path, 'w', encoding='utf-8') as out:
    json.dump(manifest, out, ensure_ascii=False, indent=2)
print(f"Wrote {out_path}")
PY

cd ~/webby-pal-guardian-angel
git add quiz/marrow/manifest.json
git commit -m "Auto-generate quiz/marrow/manifest.json from subfolders and JSON files"
git push origin main
cd quiz/prepladder
python3 - << 'PY'
import os, json, re

def pretty_name(filename):
    base = os.path.splitext(filename)[0]
    base = re.sub(r'[_\-]+', ' ', base)          # underscores/dashes -> spaces
    base = re.sub(r'\s+', ' ', base).strip()
    return base.title()                           # Title Case (e.g., "Liver Physiology")

root = os.getcwd()                                # should be .../quiz/prepladder
manifest = {}

# Iterate only direct subfolders (subjects)
for d in sorted(os.listdir(root)):
    dpath = os.path.join(root, d)
    if not os.path.isdir(dpath) or d.startswith('.'):
        continue

    items = []
    for f in sorted(os.listdir(dpath)):
        fpath = os.path.join(dpath, f)
        if os.path.isfile(fpath) and f.lower().endswith('.json'):
            items.append({
                "name": pretty_name(f),
                "file": f
            })

    if items:
        manifest[d] = items

out_path = os.path.join(root, 'manifest.json')
with open(out_path, 'w', encoding='utf-8') as out:
    json.dump(manifest, out, ensure_ascii=False, indent=2)
print(f"Wrote {out_path}")
PY

cd ~/webby-pal-guardian-angel
git add quiz/prepladder/manifest.json
git commit -m "Auto-generate quiz/prepladder/manifest.json from subfolders and JSON files"
git push origin main
cd ~/webby-pal-guardian-angel/quiz/Testmode/AMCQS
python3 - << 'PY'
import os, re

target = """.error-message {
        color: #ef4444;
        font-weight: bold;
        margin-top: 1rem;
    }"""

insert = """.bg-white.rounded-lg.shadow-md.p-4.md\:p-6 {
      margin-bottom: 50px;
      height: auto;
      display: block;
      margin: 10px auto;
      border-radius: 4px;
      object-fit: contain;
    }"""

for fname in os.listdir():
    if fname.endswith(".html"):
        with open(fname, "r", encoding="utf-8") as f:
            content = f.read()

        # Insert only if not already present
        if target in content and insert not in content:
            new_content = content.replace(target, target + "\n\n" + insert)
            with open(fname, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated: {fname}")
        else:
            print(f"Skipped: {fname}")
PY

cd ~/webby-pal-guardian-angel
git add quiz/Testmode/AMCQS/*.html
git commit -m "Added .bg-white.rounded-lg.shadow-md.p-4.md:p-6 CSS block to AMCQS HTML files"
git push origin main
cd ~/webby-pal-guardian-angel
git pull --rebase origin main
cd ~/webby-pal-guardian-angel/quiz/Testmode/AMCQS
python3 - << 'PY'
import os, re

target = """.error-message {
        color: #ef4444;
        font-weight: bold;
        margin-top: 1rem;
    }"""

insert = """.bg-white.rounded-lg.shadow-md.p-4.md\:p-6 {
      margin-bottom: 60px;
      height: auto;
      display: block;
      margin: 10px auto;
      border-radius: 4px;
      object-fit: contain;
    }"""

for fname in os.listdir():
    if fname.endswith(".html"):
        with open(fname, "r", encoding="utf-8") as f:
            content = f.read()

        # Insert only if not already present
        if target in content and insert not in content:
            new_content = content.replace(target, target + "\n\n" + insert)
            with open(fname, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated: {fname}")
        else:
            print(f"Skipped: {fname}")
PY

cd ~/webby-pal-guardian-angel
git add quiz/Testmode/AMCQS/*.html
git commit -m "Added .bg-white.rounded-lg.shadow-md.p-4.md:p-6 CSS block to AMCQS HTML files"
git push origin main
cd ~/webby-pal-guardian-angel/platforms/cerebellum
python3 - << 'PY'
import os, shutil

repo_root = os.path.expanduser("~/webby-pal-guardian-angel")
template_path = os.path.join(repo_root, "platforms/marrow/manaesthesia.html")
cerebellum_path = os.path.join(repo_root, "platforms/cerebellum")

# Read the template file once
with open(template_path, "r", encoding="utf-8") as f:
    template_content = f.read()

# Loop through JSON files in cerebellum
for fname in os.listdir(cerebellum_path):
    if fname.lower().endswith(".json"):
        json_file = fname
        html_file = os.path.splitext(fname)[0] + ".html"
        html_path = os.path.join(cerebellum_path, html_file)

        # Replace "manaesthesia.json" with actual JSON filename
        new_content = template_content.replace("manaesthesia.json", json_file)

        # Write new HTML file
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(new_content)

        print(f"Created: {html_file} (linked to {json_file})")
PY

cd ~/webby-pal-guardian-angel
git add platforms/cerebellum/*.html
git commit -m "Auto-generate HTML files in cerebellum from JSON files using manaesthesia.html template"
git push origin main
cd ~/webby-pal-guardian-angel/platforms
python3 - << 'PY'
import os, re

platforms_root = os.path.expanduser("~/webby-pal-guardian-angel/platforms")

def pretty_subject(name):
    base = os.path.splitext(name)[0]
    base = re.sub(r'[_\-]+', ' ', base)
    base = re.sub(r'\s+', ' ', base).strip()
    return base.title()

for platform in os.listdir(platforms_root):
    p_path = os.path.join(platforms_root, platform)
    if not os.path.isdir(p_path):
        continue

    subj_file = os.path.join(p_path, "subjects.html")
    if not os.path.exists(subj_file):
        continue

    # Collect all .html files except subjects.html
    html_files = [f for f in os.listdir(p_path) if f.endswith(".html") and f != "subjects.html"]

    new_buttons = []
    for f in sorted(html_files):
        subject_name = pretty_subject(f)
        # add CB prefix (as in example)
        subject_name = f"{platform[:2].upper()} {subject_name}"
        button = f"""<div class="subject-card" onclick="window.location.href='{f}'">
  <i class="fas fa-user"></i>
  <span>{subject_name}</span>
</div>"""
        new_buttons.append(button)

    new_content = "\n\n".join(new_buttons)

    # Replace whole file with only the new buttons
    with open(subj_file, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Updated {subj_file} with {len(html_files)} buttons")
PY

head -20 cerebellum/subjects.html
head -100 cerebellum/subjects.html
cd ~/webby-pal-guardian-angel/platforms
python3 - << 'PY'
import os

platforms_root = os.path.expanduser("~/webby-pal-guardian-angel/platforms")

for platform in os.listdir(platforms_root):
    p_path = os.path.join(platforms_root, platform)
    if not os.path.isdir(p_path):
        continue

    # Collect JSON basenames
    json_files = [f for f in os.listdir(p_path) if f.endswith(".json")]
    valid_bases = {os.path.splitext(f)[0] for f in json_files}

    # Collect HTML files
    html_files = [f for f in os.listdir(p_path) if f.endswith(".html")]

    for html in html_files:
        if html == "subjects.html":
            continue
        base = os.path.splitext(html)[0]
        if base not in valid_bases:
            os.remove(os.path.join(p_path, html))
            print(f"Deleted {platform}/{html}")
PY

ls e-gurukul
cd ~/webby-pal-guardian-angel
git add -u platforms/*
git commit -m "Cleaned platforms: removed unmatched HTML files, kept only JSON-matched HTML + subjects.html"
git push origin main
cd ~/webby-pal-guardian-angel/platforms
python3 - << 'PY'
import os, re

platforms_root = os.path.expanduser("~/webby-pal-guardian-angel/platforms")

def pretty_subject(name):
    base = os.path.splitext(name)[0]
    base = re.sub(r'[_\-]+', ' ', base)
    base = re.sub(r'\s+', ' ', base).strip()
    return base.title()

for platform in os.listdir(platforms_root):
    p_path = os.path.join(platforms_root, platform)
    if not os.path.isdir(p_path):
        continue

    subj_file = os.path.join(p_path, "subjects.html")
    if not os.path.exists(subj_file):
        continue

    # Collect all .html files except subjects.html
    html_files = [f for f in os.listdir(p_path) if f.endswith(".html") and f != "subjects.html"]

    new_buttons = []
    for f in sorted(html_files):
        subject_name = pretty_subject(f)
        # add CB prefix (as in example)
        subject_name = f"{platform[:2].upper()} {subject_name}"
        button = f"""<div class="subject-card" onclick="window.location.href='{f}'">
  <i class="fas fa-user"></i>
  <span>{subject_name}</span>
</div>"""
        new_buttons.append(button)

    new_content = "\n\n".join(new_buttons)

    # Replace whole file with only the new buttons
    with open(subj_file, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Updated {subj_file} with {len(html_files)} buttons")
PY

cd ~/webby-pal-guardian-angel
git add platforms/*/subjects.html
git commit -m "Regenerated subjects.html with auto buttons for all platforms"
git push origin main
cd ~/webby-pal-guardian-angel/platforms/dams
python3 - << 'PY'
import os, re

dams_root = os.path.expanduser("~/webby-pal-guardian-angel/platforms/dams")

def pretty_subject(name):
    base = os.path.splitext(name)[0]
    base = re.sub(r'[_\-]+', ' ', base)
    base = re.sub(r'\s+', ' ', base).strip()
    return base.title()

# Loop through each subfolder inside dams/
for sub in os.listdir(dams_root):
    s_path = os.path.join(dams_root, sub)
    if not os.path.isdir(s_path):
        continue

    subj_file = os.path.join(s_path, "subjects.html")
    if not os.path.exists(subj_file):
        continue

    # Collect all HTML files except subjects.html
    html_files = [f for f in os.listdir(s_path) if f.endswith(".html") and f != "subjects.html"]

    new_buttons = []
    for f in sorted(html_files):
        subject_name = pretty_subject(f)
        # prefix: first 2 letters of folder name in uppercase
        subject_name = f"{sub[:2].upper()} {subject_name}"
        button = f"""<div class="subject-card" onclick="window.location.href='{f}'">
  <i class="fas fa-user"></i>
  <span>{subject_name}</span>
</div>"""
        new_buttons.append(button)

    new_content = "\n\n".join(new_buttons)

    # Overwrite subjects.html with fresh content
    with open(subj_file, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Updated {subj_file} with {len(html_files)} buttons")
PY

cd ~/webby-pal-guardian-angel
git add platforms/dams/*/subjects.html
git commit -m "Regenerated subjects.html files inside dams subfolders with auto buttons"
git push origin main
cd ~/webby-pal-guardian-angel/platforms/dams
python3 - << 'PY'
import os, re

dams_root = os.path.expanduser("~/webby-pal-guardian-angel/platforms/dams")

old_link = '<link rel="stylesheet" href="../../styles.css">'
new_link = '<link rel="stylesheet" href="../../../styles.css">'

old_nav = '''<nav class="bottom-nav">
    <a href="../../app.html"><i class="fas fa-lightbulb"></i><span>Home</span></a>
    <a href="../../platforms.html" class="active"><i class="fas fa-play-circle"></i><span>Videos</span></a>
    <a href="../../search.html"><i class="fas fa-search"></i><span>Search</span></a>
    <a href="#"><i class="fas fa-question-circle"></i><span>Q Bank</span></a>
  </nav>'''

new_nav = '''<nav class="bottom-nav">
    <a href="../../../app.html"><i class="fas fa-lightbulb"></i><span>Home</span></a>
    <a href="../../../platforms.html" class="active"><i class="fas fa-play-circle"></i><span>Videos</span></a>
    <a href="../../../search.html"><i class="fas fa-search"></i><span>Search</span></a>
    <a href="../../../quiz/index.html"><i class="fas fa-question-circle"></i><span>Q Bank</span></a>
  </nav>'''

for sub in os.listdir(dams_root):
    sub_path = os.path.join(dams_root, sub)
    if not os.path.isdir(sub_path):
        continue
    for fname in os.listdir(sub_path):
        if not fname.endswith(".html"):
            continue
        fpath = os.path.join(sub_path, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        new_content = content.replace(old_link, new_link).replace(old_nav, new_nav)
        if new_content != content:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated: {fpath}")
PY

cd ~/webby-pal-guardian-angel
git add platforms/dams/*/*.html
git commit -m "Fix stylesheet and bottom-nav paths in dams subfolder HTML files"
git push origin main
cd ~/webby-pal-guardian-angel
git pull --rebase origin main   # fetch remote changes and replay your commits
git add <file1> <file2>   # mark conflicts as resolved
git rebase --continue     # continue after fixing
git push origin main
