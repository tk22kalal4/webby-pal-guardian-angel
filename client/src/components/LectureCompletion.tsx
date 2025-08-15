import React, { useState, useEffect } from 'react';
import './LectureCompletion.css';

interface CompletionData {
  [key: string]: boolean;
}

interface LectureStats {
  totalLectures: number;
  completedLectures: number;
  completionRate: number;
}

const LectureCompletion: React.FC = () => {
  const [completions, setCompletions] = useState<CompletionData>({});
  const [stats, setStats] = useState<LectureStats>({
    totalLectures: 0,
    completedLectures: 0,
    completionRate: 0
  });

  const storageKey = 'lectureCompletions';

  useEffect(() => {
    loadCompletions();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [completions]);

  const loadCompletions = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      const loadedCompletions = stored ? JSON.parse(stored) : {};
      setCompletions(loadedCompletions);
    } catch (error) {
      console.error('Error reading completions from localStorage:', error);
      setCompletions({});
    }
  };

  const saveCompletions = (newCompletions: CompletionData) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newCompletions));
      setCompletions(newCompletions);
    } catch (error) {
      console.error('Error saving completions to localStorage:', error);
    }
  };

  const toggleCompletion = (platform: string, subject: string, lectureTitle: string) => {
    const key = `${platform}-${subject}-${lectureTitle}`;
    const newCompletions = {
      ...completions,
      [key]: !completions[key]
    };
    saveCompletions(newCompletions);
  };

  const calculateStats = () => {
    const totalLectures = Object.keys(completions).length;
    const completedLectures = Object.values(completions).filter(Boolean).length;
    const completionRate = totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0;

    setStats({
      totalLectures,
      completedLectures,
      completionRate: Math.round(completionRate * 100) / 100
    });
  };

  const clearAllProgress = () => {
    if (window.confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
      localStorage.removeItem(storageKey);
      setCompletions({});
    }
  };

  // Mock lecture data for demonstration
  const mockLectures = [
    { platform: 'Marrow', subject: 'anatomy', title: 'Introduction to Anatomy' },
    { platform: 'Marrow', subject: 'anatomy', title: 'Skeletal System' },
    { platform: 'DAMS', subject: 'physiology', title: 'Cardiovascular System' },
    { platform: 'Prepladder', subject: 'anatomy', title: 'Nervous System' },
  ];

  return (
    <div className="lecture-completion">
      <div className="completion-header">
        <h2>Study Progress</h2>
        <p>Track your learning journey across all platforms</p>
      </div>

      <div className="stats-overview">
        <div className="stat-item">
          <div className="stat-number">{stats.completedLectures}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.totalLectures}</div>
          <div className="stat-label">Total Lectures</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.completionRate}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
        <span className="progress-text">{stats.completionRate}% Complete</span>
      </div>

      <div className="lectures-list">
        <div className="list-header">
          <h3>Recent Lectures</h3>
          <button onClick={clearAllProgress} className="clear-progress-btn">
            Clear All Progress
          </button>
        </div>

        <div className="lectures-grid">
          {mockLectures.map((lecture, index) => {
            const key = `${lecture.platform}-${lecture.subject}-${lecture.title}`;
            const isCompleted = completions[key] || false;

            return (
              <div key={index} className="lecture-item">
                <div 
                  className={`completion-circle ${isCompleted ? 'completed' : ''}`}
                  onClick={() => toggleCompletion(lecture.platform, lecture.subject, lecture.title)}
                >
                  {isCompleted && <i className="fas fa-check"></i>}
                </div>
                <div className="lecture-info">
                  <h4>{lecture.title}</h4>
                  <p>{lecture.subject.charAt(0).toUpperCase() + lecture.subject.slice(1)} • {lecture.platform}</p>
                </div>
                <div className="lecture-status">
                  {isCompleted ? (
                    <span className="completed-badge">✓ Completed</span>
                  ) : (
                    <span className="pending-badge">Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LectureCompletion;