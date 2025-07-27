
// New Platform Manager for HTML file imports
class NewPlatformManager {
  constructor() {
    this.htmlFiles = new Map();
    this.loadStoredFiles();
  }
  
  loadStoredFiles() {
    const stored = localStorage.getItem('newPlatformFiles');
    if (stored) {
      try {
        const files = JSON.parse(stored);
        files.forEach(file => {
          this.htmlFiles.set(file.filename, file);
        });
      } catch (error) {
        console.error('Error loading stored files:', error);
      }
    }
  }
  
  saveFiles() {
    const files = Array.from(this.htmlFiles.values());
    localStorage.setItem('newPlatformFiles', JSON.stringify(files));
  }
  
  async addHTMLFile(filename) {
    try {
      const response = await fetch(`new/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}`);
      }
      
      const htmlContent = await response.text();
      const parsedData = HTMLParser.parseQuizHTML(htmlContent);
      
      const fileData = {
        filename,
        title: parsedData.title,
        chapters: parsedData.chapters,
        questions: parsedData.questions,
        dateAdded: new Date().toISOString()
      };
      
      this.htmlFiles.set(filename, fileData);
      this.saveFiles();
      
      return fileData;
    } catch (error) {
      console.error('Error adding HTML file:', error);
      throw error;
    }
  }
  
  getAvailableFiles() {
    return Array.from(this.htmlFiles.values());
  }
  
  getFileData(filename) {
    return this.htmlFiles.get(filename);
  }
  
  async scanNewFolder() {
    // Try to load known HTML files from the new folder
    const knownFiles = ['a']; // Add more filenames as needed
    const availableFiles = [];
    
    for (const filename of knownFiles) {
      try {
        const response = await fetch(`new/${filename}`);
        if (response.ok) {
          if (!this.htmlFiles.has(filename)) {
            const fileData = await this.addHTMLFile(filename);
            availableFiles.push(fileData);
          } else {
            availableFiles.push(this.htmlFiles.get(filename));
          }
        }
      } catch (error) {
        console.log(`File ${filename} not found or error loading:`, error);
      }
    }
    
    return availableFiles;
  }
}

// Export for global access
window.NewPlatformManager = NewPlatformManager;
