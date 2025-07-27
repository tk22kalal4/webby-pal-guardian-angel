// Chapter loading and management
const ChapterManager = {
  async loadChapters() {
    try {
      // Handle "new" platform specially
      if (QuizState.selectedPlatform === 'new') {
        return await this.loadNewPlatformChapters();
      }
      
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

  async loadNewPlatformChapters() {
    try {
      if (!window.NewPlatformManager) {
        throw new Error('NewPlatformManager not loaded');
      }
      
      const manager = new NewPlatformManager();
      const availableFiles = await manager.scanNewFolder();
      
      const chapters = availableFiles.map(file => ({
        name: file.title,
        filename: file.filename,
        questionCount: file.questions.length,
        chapters: file.chapters
      }));
      
      this.displayChapters(chapters);
    } catch (error) {
      console.error('Error loading new platform chapters:', error);
      this.displayChapters([]);
    }
  },

  async getKnownFiles() {
    const knownFiles = [];
    
    // Try to load known files for the selected platform and subject
    const possibleFiles = [
      'PediAnatomy M8 Qbank_Pages_4-19.json',
      'sa',
      'ffg'
    ];
    
    for (const file of possibleFiles) {
      try {
        const response = await fetch(`${QuizState.selectedPlatform}/${QuizState.selectedSubject}/${file}`);
        if (response.ok) {
          const isJson = file.endsWith('.json');
          if (isJson) {
            const data = await response.json();
            knownFiles.push({
              name: data.chapter || file.replace('.json', ''),
              filename: file
            });
          } else {
            knownFiles.push({
              name: file,
              filename: file
            });
          }
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
      
      // Special handling for new platform
      if (QuizState.selectedPlatform === 'new') {
        button.innerHTML = `
          <i class="fas fa-file-code"></i> 
          <div>
            <div class="chapter-title">${chapter.name}</div>
            <div class="chapter-info">${chapter.questionCount} questions</div>
            ${chapter.chapters.length > 1 ? `<div class="chapter-sections">Sections: ${chapter.chapters.join(', ')}</div>` : ''}
          </div>
        `;
      } else {
        button.innerHTML = `<i class="fas fa-book"></i> ${chapter.name}`;
      }
      
      button.onclick = () => this.selectChapter(chapter.filename, chapter.name);
      chapterList.appendChild(button);
    });
  },

  async selectChapter(filename, chapterName) {
    QuizState.selectedChapter = filename;
    
    try {
      // Handle "new" platform specially
      if (QuizState.selectedPlatform === 'new') {
        return await this.selectNewPlatformChapter(filename, chapterName);
      }
      
      const response = await fetch(`${QuizState.selectedPlatform}/${QuizState.selectedSubject}/${filename}`);
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

  async selectNewPlatformChapter(filename, chapterName) {
    try {
      const manager = new NewPlatformManager();
      const fileData = manager.getFileData(filename);
      
      if (!fileData) {
        throw new Error('File data not found');
      }
      
      QuizState.questions = fileData.questions;
      
      if (QuizState.questions.length === 0) {
        alert('No questions found in this file.');
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
      console.error('Error loading new platform chapter:', error);
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
