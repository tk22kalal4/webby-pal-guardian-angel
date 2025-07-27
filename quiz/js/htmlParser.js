
// HTML Parser for extracting quiz data from HTML files
class HTMLParser {
  static parseQuizHTML(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Extract main title from the first h1
    const mainTitle = doc.querySelector('h1')?.textContent?.trim() || 'Untitled Quiz';
    
    // Extract test chapters from navigation buttons
    const testButtons = doc.querySelectorAll('button[onclick*="showTest"]');
    const chapters = Array.from(testButtons).map(btn => {
      const testName = btn.textContent.trim().replace(/_/g, ' ');
      return testName;
    }).filter(name => name);
    
    // Extract questions from embedded iframe content
    const questions = this.extractQuestionsFromIframes(htmlContent);
    
    return {
      title: mainTitle,
      chapters: chapters.length > 0 ? chapters : ['Main Chapter'],
      questions,
      source: 'html'
    };
  }
  
  static extractQuestionsFromIframes(htmlContent) {
    const questions = [];
    
    // Find all iframe sections with test content
    const iframeMatches = htmlContent.match(/<iframe[^>]*srcdoc="([^"]*)"[^>]*>/g);
    
    if (!iframeMatches) {
      return this.extractFallbackQuestions(htmlContent);
    }
    
    iframeMatches.forEach((iframeTag, testIndex) => {
      try {
        // Extract srcdoc content
        const srcdocMatch = iframeTag.match(/srcdoc="([^"]*)"/);
        if (!srcdocMatch) return;
        
        // Decode HTML entities
        let iframeContent = srcdocMatch[1]
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/&amp;/g, '&');
        
        // Parse the iframe content to find questions
        const testQuestions = this.parseIframeQuestions(iframeContent, testIndex);
        questions.push(...testQuestions);
        
      } catch (error) {
        console.error('Error parsing iframe content:', error);
      }
    });
    
    return questions.length > 0 ? questions : this.extractFallbackQuestions(htmlContent);
  }
  
  static parseIframeQuestions(iframeContent, testIndex) {
    const questions = [];
    
    // Look for the questions array in JavaScript
    const questionsMatch = iframeContent.match(/questions\s*=\s*\[([\s\S]*?)\];/);
    
    if (questionsMatch) {
      try {
        // Try to extract questions from the JavaScript array
        const questionsArrayContent = questionsMatch[1];
        
        // Look for question objects in the array
        const questionObjects = this.extractQuestionObjects(questionsArrayContent);
        questions.push(...questionObjects);
        
      } catch (error) {
        console.error('Error parsing questions from JavaScript:', error);
      }
    }
    
    // If no questions found in JS, look for fallback questions
    if (questions.length === 0) {
      questions.push(...this.extractFallbackFromIframe(iframeContent, testIndex));
    }
    
    return questions;
  }
  
  static extractQuestionObjects(jsContent) {
    const questions = [];
    
    // Look for question object patterns
    const questionPattern = /\{\s*text:\s*["']([^"']*?)["'][\s\S]*?options:\s*\[([\s\S]*?)\][\s\S]*?\}/g;
    let match;
    let questionNumber = 1;
    
    while ((match = questionPattern.exec(jsContent)) !== null) {
      const questionText = match[1];
      const optionsContent = match[2];
      
      // Parse options
      const options = this.parseOptionsFromJS(optionsContent);
      
      if (questionText && options.length > 0) {
        const correctOption = options.find(opt => opt.correct);
        
        questions.push({
          q_no: questionNumber++,
          question: questionText,
          options: {
            A: options[0]?.text || "Option A",
            B: options[1]?.text || "Option B",
            C: options[2]?.text || "Option C",
            D: options[3]?.text || "Option D"
          },
          correct_answer: correctOption?.label || "A",
          explanation: "No explanation provided",
          image: null,
          explanation_image: null,
          chapter_heading: "HTML Import"
        });
      }
    }
    
    return questions;
  }
  
  static parseOptionsFromJS(optionsContent) {
    const options = [];
    const optionPattern = /\{\s*label:\s*["']([^"']*?)["'][\s\S]*?text:\s*["']([^"']*?)["'][\s\S]*?correct:\s*(true|false)/g;
    let match;
    
    while ((match = optionPattern.exec(optionsContent)) !== null) {
      options.push({
        label: match[1],
        text: match[2],
        correct: match[3] === 'true'
      });
    }
    
    return options;
  }
  
  static extractFallbackFromIframe(iframeContent, testIndex) {
    // Extract test title from iframe content
    const titleMatch = iframeContent.match(/<title>([^<]*)<\/title>/) || 
                      iframeContent.match(/<h1[^>]*>([^<]*)<\/h1>/);
    
    const testTitle = titleMatch ? titleMatch[1].trim() : `Test ${testIndex + 1}`;
    
    // Create sample questions based on the test
    return [{
      q_no: testIndex + 1,
      question: `Sample question from ${testTitle}`,
      options: {
        A: "Option A",
        B: "Option B",
        C: "Option C",
        D: "Option D"
      },
      correct_answer: "A",
      explanation: `This is a sample question extracted from ${testTitle}. The actual questions may need manual review.`,
      image: null,
      explanation_image: null,
      chapter_heading: testTitle
    }];
  }
  
  static extractFallbackQuestions(htmlContent) {
    // Fallback method for when iframe parsing fails
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const questions = [];
    
    // Try to find any question-like content
    const questionElements = doc.querySelectorAll('p, div, li');
    let questionNumber = 1;
    
    questionElements.forEach(element => {
      const text = element.textContent.trim();
      
      if (this.isQuestionStart(text)) {
        questions.push({
          q_no: questionNumber++,
          question: this.cleanQuestionText(text),
          options: {
            A: "Option A",
            B: "Option B",
            C: "Option C",
            D: "Option D"
          },
          correct_answer: "A",
          explanation: "No explanation provided",
          image: null,
          explanation_image: null,
          chapter_heading: "HTML Import"
        });
      }
    });
    
    return questions.length > 0 ? questions : [{
      q_no: 1,
      question: "Sample question from HTML file",
      options: {
        A: "Option A",
        B: "Option B",
        C: "Option C",
        D: "Option D"
      },
      correct_answer: "A",
      explanation: "This is a sample question. The HTML file structure may need manual review for proper question extraction.",
      image: null,
      explanation_image: null,
      chapter_heading: "HTML Import"
    }];
  }
  
  static isQuestionStart(text) {
    // Check for patterns like "1.", "Q1:", "Question 1", etc.
    return /^\d+[\.\)\:]/.test(text) || 
           /^Q\d+/i.test(text) || 
           /^Question\s+\d+/i.test(text) ||
           text.includes('?') && text.length > 20;
  }
  
  static isOption(text) {
    // Check for patterns like "A)", "a.", "(A)", etc.
    return /^[A-Da-d][\.\)\:]/.test(text) || 
           /^\([A-Da-d]\)/.test(text);
  }
  
  static isAnswer(text) {
    // Check for answer patterns
    return /^(Answer|Ans|Correct|Solution)[\:\s]/i.test(text) ||
           /^[A-Da-d][\s\.\)]/i.test(text) && text.length < 50;
  }
  
  static cleanQuestionText(text) {
    // Remove question numbers and clean up
    return text.replace(/^\d+[\.\)\:]?\s*/, '')
              .replace(/^Q\d+[\:\.]?\s*/i, '')
              .replace(/^Question\s+\d+[\:\.]?\s*/i, '')
              .trim();
  }
  
  static parseOption(text) {
    const match = text.match(/^[A-Da-d][\.\)\:]?\s*(.+)$/i);
    if (match) {
      const key = text.charAt(0).toUpperCase();
      const value = match[1].trim();
      return { key, value };
    }
    return null;
  }
  
  static parseAnswer(text) {
    let answer = null;
    let explanation = '';
    
    // Try to extract answer letter
    const answerMatch = text.match(/^(?:Answer|Ans|Correct|Solution)[\:\s]*([A-Da-d])/i);
    if (answerMatch) {
      answer = answerMatch[1].toUpperCase();
      explanation = text.replace(answerMatch[0], '').trim();
    } else {
      // Maybe it's just the answer letter
      const letterMatch = text.match(/^([A-Da-d])[\s\.\)]/i);
      if (letterMatch) {
        answer = letterMatch[1].toUpperCase();
        explanation = text.replace(letterMatch[0], '').trim();
      }
    }
    
    return { answer, explanation };
  }
  
  static formatQuestion(questionData, questionNumber) {
    return {
      q_no: questionNumber,
      question: questionData.question,
      options: Object.keys(questionData.options).length > 0 ? questionData.options : {
        A: questionData.optionTexts[0] || "Option A",
        B: questionData.optionTexts[1] || "Option B", 
        C: questionData.optionTexts[2] || "Option C",
        D: questionData.optionTexts[3] || "Option D"
      },
      correct_answer: questionData.correct_answer || "A",
      explanation: questionData.explanation || "No explanation provided",
      image: null,
      explanation_image: null,
      chapter_heading: "HTML Import"
    };
  }
}

// Export for global access
window.HTMLParser = HTMLParser;
