import os
import re

icons = [
"fa-stethoscope", "fa-heartbeat", "fa-brain", "fa-bone", "fa-dna",
"fa-vials", "fa-microscope", "fa-capsules", "fa-pills", "fa-syringe",
"fa-hospital", "fa-clinic-medical", "fa-procedures", "fa-baby",
"fa-female", "fa-venus", "fa-eye", "fa-allergies", "fa-x-ray",
"fa-ambulance",
]

file_index = 0

for root, _, files in os.walk("."):
    for file in files:
        if file == "subjects.html":
            file_index += 1
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()

            def icon_generator():
                for icon in icons:
                    yield icon
                while True:  # wrap around if needed
                    yield from icons

            gen = icon_generator()
            used_icons = set()

            def repl(match):
                # get next unused icon for this file
                while True:
                    candidate = next(gen)
                    if candidate not in used_icons:
                        used_icons.add(candidate)
                        return f'<i class="fas {candidate}"></i>'

            pattern = re.compile(r'<i[^>]*fa-user[^>]*></i>')
            updated = pattern.sub(repl, content)
            if updated != content:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(updated)
                print(f"✔ {path} updated with {len(used_icons)} unique icons.")
            else:
                print(f"⚠ No changes in {path}")
