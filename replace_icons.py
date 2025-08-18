#!/usr/bin/env python3
import os
import re
from pathlib import Path
import random

# Medical icons to use as replacements
MEDICAL_ICONS = [
    "fas fa-ambulance", "fas fa-clinic-medical", "fas fa-heartbeat",
    "fas fa-heart", "fas fa-lungs", "fas fa-brain", "fas fa-bone",
    "fas fa-allergies", "fas fa-band-aid", "fas fa-biohazard",
    "fas fa-dna", "fas fa-microscope", "fas fa-pills",
    "fas fa-syringe", "fas fa-virus", "fas fa-x-ray"
]

def replace_icons_in_file(file_path):
    with open(file_path, 'r+', encoding='utf-8') as f:
        content = f.read()
        
        # Find all unique icon classes in the file
        icon_matches = re.findall(r'<i class="(fas fa-[^"]+)"', content)
        unique_icons = list(set(icon_matches))
        
        if not unique_icons:
            return False  # No icons found
        
        # Create mapping of old icons to new medical icons
        random.shuffle(MEDICAL_ICONS)
        icon_map = {}
        for i, old_icon in enumerate(unique_icons):
            icon_map[old_icon] = MEDICAL_ICONS[i % len(MEDICAL_ICONS)]
        
        # Replace all occurrences
        for old_icon, new_icon in icon_map.items():
            content = content.replace(
                f'class="{old_icon}"',
                f'class="{new_icon}"'
            )
        
        # Write changes back to file
        f.seek(0)
        f.write(content)
        f.truncate()
        return True

def main():
    base_dir = os.path.join(os.getcwd(), 'platforms')
    processed_files = 0
    
    for root, _, files in os.walk(base_dir):
        for file in files:
            if file == 'subjects.html':
                file_path = os.path.join(root, file)
                try:
                    if replace_icons_in_file(file_path):
                        print(f"Updated icons in: {file_path}")
                        processed_files += 1
                    else:
                        print(f"No icons found in: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {str(e)}")
    
    print(f"\nProcessing complete. Updated {processed_files} files.")

if __name__ == '__main__':
    main()
