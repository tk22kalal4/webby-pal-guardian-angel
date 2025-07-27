
// HTML Parser for extracting quiz data from HTML files
class HTMLParser {
  static parseQuizHTML(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Extract title
    const titleElement = doc.querySelector('h1, .title, .main-title') || 
                        doc.querySelector('title') || 
                        doc.querySelector('h2');
    const title = titleElement ? titleElement.textContent.trim() : 'Untitled Quiz';
    
    // Extract chapter/test names
    const chapterElements = doc.querySelectorAll('h2, h3, .chapter, .test-name, .section-title');
    const chapters = Array.from(chapterElements).map(el => el.textContent.trim()).filter(text => text);
    
    // Extract questions - looking for common patterns
    const questions = this.extractQuestions(doc);
    
    return {
      title,
      chapters: chapters.length > 0 ? chapters : ['Main Chapter'],
      questions,
      source: 'html'
    };
  }
  
  static extractQuestions(doc) {
    const questions = [];
    
    // Method 1: Look for numbered questions
    const questionElements = doc.querySelectorAll('p, div, li');
    let currentQuestionData = null;
    let questionNumber = 1;
    
    questionElements.forEach(element => {
      const text = element.textContent.trim();
      
      // Check if this looks like a question (starts with number or question pattern)
      if (this.isQuestionStart(text)) {
        // Save previous question if exists
        if (currentQuestionData && currentQuestionData.question) {
          questions.push(this.formatQuestion(currentQuestionData, questionNumber - 1));
        }
        
        // Start new question
        currentQuestionData = {
          question: this.cleanQuestionText(text),
          options: {},
          optionTexts: []
        };
        questionNumber++;
      }
      // Check if this looks like an option (A), B), etc.)
      else if (this.isOption(text) && currentQuestionData) {
        const optionData = this.parseOption(text);
        if (optionData) {
          currentQuestionData.options[optionData.key] = optionData.value;
          currentQuestionData.optionTexts.push(optionData.value);
        }
      }
      // Check if this looks like an answer or explanation
      else if (this.isAnswer(text) && currentQuestionData) {
        const answerData = this.parseAnswer(text);
        if (answerData) {
          currentQuestionData.correct_answer = answerData.answer;
          currentQuestionData.explanation = answerData.explanation;
        }
      }
    });
    
    // Don't forget the last question
    if (currentQuestionData && currentQuestionData.question) {
      questions.push(this.formatQuestion(currentQuestionData, questionNumber - 1));
    }
    
    return questions;
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
