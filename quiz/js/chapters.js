
// Chapter loading and management
const ChapterManager = {
  async loadChapters() {
    try {
      const response = await fetch(`${QuizState.selectedPlatform}/${QuizState.selectedSubject}/`);
      if (!response.ok) {
        // If directory listing is not available, try to load a known file
        const knownFiles = await this.getKnownFiles();
        this.displayChapters(knownFiles);
        return;
      }
      
      // For now, we'll use a predefined list since directory listing may not work
      const knownFiles = await this.getKnownFiles();
      this.displayChapters(knownFiles);
    } catch (error) {
      console.error('Error loading chapters:', error);
      // Fallback to known files
      const knownFiles = await this.getKnownFiles();
      this.displayChapters(knownFiles);
    }
  },

  async getKnownFiles() {
    const knownFiles = [];
    
    // Define subject mappings for different platforms
    const subjectMappings = {
      'prepladder': {
        'anatomy': 'anatomy',
        'physiology': 'physiology', 
        'biochemistry': 'biochemistry',
        'pathology': 'pathology',
        'microbiology': 'microbiology',
        'pharmacology': 'pharmacology',
        'forensic medicine': 'fmt',
        'ent': 'ent',
        'ophthalmology': 'ophthalmology',
        'psm': 'psm',
        'general medicine': 'medicine',
        'general surgery': 'surgery',
        'obg': 'obgy',
        'pediatrics': 'pediatrics',
        'orthopedics': 'orthopedics',
        'radio-diagnosis': 'radiology',
        'anesthesia': 'anaesthesia',
        'psychiatry': 'psychiatry'
      },
      'marrow': {
        'anatomy': 'anatomy',
        'physiology': 'physiology',
        'biochemistry': 'biochemistry',
        'pathology': 'pathology',
        'microbiology': 'microbiology',
        'pharmacology': 'pharmacology',
        'forensic medicine': 'fmt',
        'ent': 'ent',
        'ophthalmology': 'ophthalmology',
        'medicine': 'medicine',
        'surgery': 'surgery',
        'obstetrics': 'obgy',
        'gynecology': 'obgy',
        'pediatrics': 'pediatrics',
        'orthopedics': 'orthopaedics',
        'radiology': 'radiology',
        'anesthesia': 'anaesthesia',
        'psychiatry': 'psychiatry',
        'dermatology': 'dermatology'
      }
    };

    // Get the correct subject folder name for the platform
    const platformSubjects = subjectMappings[QuizState.selectedPlatform.toLowerCase()];
    const subjectFolder = platformSubjects ? platformSubjects[QuizState.selectedSubject.toLowerCase()] : QuizState.selectedSubject.toLowerCase();
    
    if (!subjectFolder) {
      console.error('Subject not found for platform:', QuizState.selectedPlatform, QuizState.selectedSubject);
      return knownFiles;
    }

    // Try to load a directory listing file if it exists
    try {
      const directoryResponse = await fetch(`${QuizState.selectedPlatform}/${subjectFolder}/directory.json`);
      if (directoryResponse.ok) {
        const directory = await directoryResponse.json();
        for (const file of directory.files) {
          if (file.endsWith('.json')) {
            try {
              const response = await fetch(`${QuizState.selectedPlatform}/${subjectFolder}/${file}`);
              if (response.ok) {
                const data = await response.json();
                knownFiles.push({
                  name: data.chapter || file.replace('.json', ''),
                  filename: file
                });
              }
            } catch (error) {
              console.log(`Error loading ${file}:`, error);
            }
          }
        }
        return knownFiles;
      }
    } catch (error) {
      console.log('No directory.json found, scanning for common files...');
    }

    // Fallback: Try common file patterns for both platforms
    const commonFiles = [
      // Common question file patterns
      'Questions.json',
      'Previous_Year_Questions.json',
      'Rapid_Revision-Previous_Year_Questions.json',
      'Clinical_Essentials-Previous_Year_Questions.json',
      'Miscellaneous-Previous_Year_Questions.json',
      'Introduction-Previous_Year_Questions.json',
      'Special_Topics-Previous_Year_Questions.json',
      'Demonstration-Previous_Year_Questions.json',
      'Oxidative_Phosphorylation-Previous_Year_Questions.json',
      'Vitreous-Previous_Year_Questions.json',
      'Violent_Asphyxia_Deaths-Previous_Year_Questions.json',
      'Microbiology-Previous_Year_Questions.json',
      'Helminthology-Previous_Year_Questions.json',
      'Image_Based_Discussion-Previous_Year_Questions.json',
      'Images_And_Instruments-Previous_Year_Questions.json',
      'Previous_Year_Questions_10.json',
      'Miscellaneous_Topics-Previous_Year_Questions.json'
    ];

    // For marrow platform, try to scan common anatomy files
    if (QuizState.selectedPlatform.toLowerCase() === 'marrow' && subjectFolder === 'anatomy') {
      const anatomyFiles = [
        'Abdominal_cavity_and_Peritoneum.json',
        'Alimentary__Hepatobiliary_systems__Pancreas_and.json',
        'Anterior_Abdominal_Wall.json',
        'Basal_Ganglia_and_Limbic_System.json',
        'Bone__Cartilage___Muscular_Tissue.json',
        'Bones__Joints_and_Cartilage.json',
        'Bones_of_the_Lower_Limb.json',
        'Brachial_Plexus_and_Nerves.json',
        'Brainstem.json',
        'Breast.json',
        'Cardiovascular__Lymphatic_and_Nervous_Systems.json',
        'Cardiovascular__Lymphatic_and_Respiratory_Systems.json',
        'Cardiovascular_and_Respiratory_Systems.json',
        'Cell_Structure__Epithelia__Glands___Connective.json',
        'Cerebellum.json',
        'Cerebrum.json',
        'Cranial_Nerves.json',
        'Deep_fascia_and_Triangles_of_the_neck.json',
        'Diaphragm.json',
        'Diencephalon.json',
        'Digestive__Hepatobiliary___Genitourinary_Systems.json',
        'Embryonic_Phase_of_Development.json',
        'Face__Nose___Palate__Eye__Ear.json',
        'Fossae_and_Spaces_of_the_Upper_Limb.json',
        'GI_Tract.json',
        'Gametogenesis.json',
        'General_Anatomy_of_Thorax.json',
        'Glands_of_the_Head_and_Neck.json',
        'Heart.json',
        'Hepatobiliary_system__Spleen___Pancreas.json',
        'Important_Structures_of_Lower_Limb.json',
        'Internal_and_external_genitalia.json',
        'Joints_of_the_Lower_Limb.json',
        'KUB___Adrenal_Gland.json',
        'Larynx.json',
        'Lungs_and_Pleura.json',
        'Mediastinum.json',
        'Meninges_and_dural_venous_sinuses.json',
        'Muscles_-_Upper_Limb.json',
        'Muscles__Neurovascular_Anatomy_of_Head___Neck.json',
        'Muscles_and_Tendons.json',
        'Muscles_of_the_Lower_Limb.json',
        'Nerves___Vessels_of_Lower_Limb.json',
        'Nervous_System_and_Endocrine_Glands.json',
        'Nervous_and_Endocrine_Systems.json',
        'Osteology__Scalp_and_Face.json',
        'Pelvis___Perineum.json',
        'Pharyngeal_arches__Skeletal___Muscular_Systems.json',
        'Pharynx.json',
        'Placenta__Fetal_Membranes_and_Twinning.json',
        'Pre-Embryonic_Phase_of_Development.json',
        'Skin__Connective_Tissue_and_Ligaments.json',
        'Skin___Special_Senses__Eye_and_Ear.json',
        'Spinal_Cord.json',
        'Thoracic_Wall.json',
        'Tongue_and_Palate.json',
        'Upper_Limb_Bones_and_Joints.json',
        'Urogenital_System.json',
        'Vascular_supply_of_Brain.json',
        'Ventricular_System_and_Subarachnoid_Space.json',
        'Vertebral_Column.json',
        'Vessels-Upper_limb.json',
        'White_Matter_of_the_Brain.json'
      ];
      commonFiles.push(...anatomyFiles);
    }
    
    for (const file of commonFiles) {
      try {
        const response = await fetch(`${QuizState.selectedPlatform}/${subjectFolder}/${file}`);
        if (response.ok) {
          const data = await response.json();
          knownFiles.push({
            name: data.chapter || file.replace('.json', '').replace(/_/g, ' '),
            filename: file
          });
        }
      } catch (error) {
        console.log(`File ${file} not found`);
      }
    }
    
    return knownFiles;
  },

  displayChapters(chapters) {
    const chapterList = document.getElementById('chapter-list');
    chapterList.innerHTML = '';
    
    if (chapters.length === 0) {
      chapterList.innerHTML = '<p>No chapters available for this combination.</p>';
      return;
    }
    
    chapters.forEach(chapter => {
      const button = document.createElement('button');
      button.className = 'chapter-btn';
      button.innerHTML = `<i class="fas fa-book"></i> ${chapter.name}`;
      button.onclick = () => this.selectChapter(chapter.filename, chapter.name);
      chapterList.appendChild(button);
    });
  },

  async selectChapter(filename, chapterName) {
    QuizState.selectedChapter = filename;
    
    try {
      // Use the same subject mapping logic as in getKnownFiles
      const subjectMappings = {
        'prepladder': {
          'anatomy': 'anatomy',
          'physiology': 'physiology', 
          'biochemistry': 'biochemistry',
          'pathology': 'pathology',
          'microbiology': 'microbiology',
          'pharmacology': 'pharmacology',
          'forensic medicine': 'fmt',
          'ent': 'ent',
          'ophthalmology': 'ophthalmology',
          'psm': 'psm',
          'general medicine': 'medicine',
          'general surgery': 'surgery',
          'obg': 'obgy',
          'pediatrics': 'pediatrics',
          'orthopedics': 'orthopedics',
          'radio-diagnosis': 'radiology',
          'anesthesia': 'anaesthesia',
          'psychiatry': 'psychiatry'
        },
        'marrow': {
          'anatomy': 'anatomy',
          'physiology': 'physiology',
          'biochemistry': 'biochemistry',
          'pathology': 'pathology',
          'microbiology': 'microbiology',
          'pharmacology': 'pharmacology',
          'forensic medicine': 'fmt',
          'ent': 'ent',
          'ophthalmology': 'ophthalmology',
          'medicine': 'medicine',
          'surgery': 'surgery',
          'obstetrics': 'obgy',
          'gynecology': 'obgy',
          'pediatrics': 'pediatrics',
          'orthopedics': 'orthopaedics',
          'radiology': 'radiology',
          'anesthesia': 'anaesthesia',
          'psychiatry': 'psychiatry',
          'dermatology': 'dermatology'
        }
      };

      const platformSubjects = subjectMappings[QuizState.selectedPlatform.toLowerCase()];
      const subjectFolder = platformSubjects ? platformSubjects[QuizState.selectedSubject.toLowerCase()] : QuizState.selectedSubject.toLowerCase();
      
      const response = await fetch(`${QuizState.selectedPlatform}/${subjectFolder}/${filename}`);
      if (!response.ok) {
        throw new Error('Failed to load chapter data');
      }
      
      if (filename.endsWith('.json')) {
        const data = await response.json();
        QuizState.questions = data.questions || [];
      } else {
        // Handle non-JSON files
        const text = await response.text();
        QuizState.questions = this.parseTextToQuestions(text, chapterName);
      }
      
      if (QuizState.questions.length === 0) {
        alert('No questions found in this chapter.');
        return;
      }
      
      // Initialize quiz
      QuizState.currentQuestionIndex = 0;
      QuizState.userAnswers = [];
      QuizState.score = 0;
      QuizState.isReviewMode = false;
      
      NavigationManager.showScreen('quiz-container');
      QuizManager.loadQuestion();
    } catch (error) {
      console.error('Error loading chapter:', error);
      alert('Error loading chapter. Please try again.');
    }
  },

  parseTextToQuestions(text, chapterName) {
    // Simple parser for text files - this is a basic implementation
    // You can enhance this based on the actual format of your text files
    if (text.trim() === 'fg' || text.trim() === 'q') {
      return [{
        q_no: 1,
        question: `Sample question from ${chapterName}`,
        options: {
          A: "Option A",
          B: "Option B", 
          C: "Option C",
          D: "Option D"
        },
        correct_answer: "A",
        explanation: "This is a sample question since the file contains minimal content.",
        chapter_heading: chapterName
      }];
    }
    return [];
  }
};

// Export for global access
window.ChapterManager = ChapterManager;
