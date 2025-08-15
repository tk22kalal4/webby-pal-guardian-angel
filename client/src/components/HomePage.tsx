import React from 'react';
import { useLocation } from 'wouter';
import './HomePage.css';

interface FeaturedContent {
  title: string;
  description: string;
  icon: string;
}

const HomePage: React.FC = () => {
  const [, setLocation] = useLocation();

  const featuredContent: FeaturedContent[] = [
    {
      title: 'Latest Updates',
      description: 'New lectures added daily across all platforms',
      icon: 'fas fa-star'
    },
    {
      title: 'Study Progress',
      description: 'Track your learning journey',
      icon: 'fas fa-chart-line'
    },
    {
      title: 'Quick Access',
      description: 'Jump to your favorite subjects',
      icon: 'fas fa-bolt'
    }
  ];

  const handleBrowseVideos = () => {
    setLocation('/search');
  };

  const handleSearchContent = () => {
    setLocation('/search');
  };

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>Welcome to LASTPULSE</h2>
        <p style={{ fontStyle: 'italic', fontSize: '1.1em', color: '#666', marginTop: '1rem' }}>
          „If he is a God than I am a Bloody Doctor"
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <i className="fas fa-play-circle"></i>
          <h3>2000+</h3>
          <p>Video Lectures</p>
        </div>
        <div className="stat-card">
          <i className="fas fa-book"></i>
          <h3>50+</h3>
          <p>Subjects Covered</p>
        </div>
        <div className="stat-card">
          <i className="fas fa-graduation-cap"></i>
          <h3>3</h3>
          <p>Top Platforms</p>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={handleBrowseVideos}>
            <i className="fas fa-video"></i>
            Browse Videos
          </button>
          <button className="action-btn" onClick={handleSearchContent}>
            <i className="fas fa-search"></i>
            Search Content
          </button>
        </div>
      </div>

      <div className="featured-section">
        <h3>Featured</h3>
        <div className="featured-grid">
          {featuredContent.map((item, index) => (
            <div key={index} className="featured-card">
              <i className={item.icon}></i>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;