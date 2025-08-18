import os
import re

# List of medical icons (cycled if subjects > icons)
icons = [
    "fa-stethoscope",
    "fa-heartbeat",
    "fa-brain",
    "fa-bone",
    "fa-dna",
    "fa-vials",
    "fa-microscope",
    "fa-capsules",
    "fa-pills",
    "fa-syringe",
    "fa-hospital",
    "fa-clinic-medical",
    "fa-procedures",
    "fa-baby",
    "fa-female",
    "fa-venus",
    "fa-eye",
    "fa-allergies",
    "fa-x-ray",
    "fa-ambulance",
]

index = 0  # icon index counter

# Walk through all subjects.html in platforms/*
for root, dirs, files in os.walk("."):
    for file in files:
        if file == "subjects.html":
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()

            # Pick icon in round-robin style
            icon = icons[index % len(icons)]
            index += 1

            # Replace <i class="fas fa-user"></i>
            updated = re.sub(
                r'<i class="fas fa-user"></i>',
                f'<i class="fas {icon}"></i>',
                content
            )

            if updated != content:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(updated)
                print(f"✔ Updated {path} → {icon}")
            else:
                print(f"⚠ No change in {path}")

