export class PlatformSelector {
  constructor() {
    this.platforms = [
      {
        name: 'Marrow',
        id: 'marrow',
        description: 'Comprehensive medical education with expert faculty and interactive content',
        subjects: ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
        features: ['HD Video Lectures', 'Interactive Tests', 'Study Materials', 'Expert Faculty'],
        color: '#e53e3e'
      },
      {
        name: 'DAMS',
        id: 'dams',
        description: 'Delhi Academy of Medical Sciences - Quality education for medical aspirants',
        subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Microbiology'],
        features: ['Live Classes', 'Recorded Sessions', 'Mock Tests', 'Doubt Clearing'],
        color: '#3182ce'
      },
      {
        name: 'PrepLadder',
        id: 'prepladder',
        description: 'India\'s largest test prep platform for medical students',
        subjects: ['Anatomy', 'Physiology', 'Medicine', 'Surgery'],
        features: ['Test Series', 'Video Lectures', 'Study Notes', 'Performance Analytics'],
        color: '#38a169'
      }
    ];
  }

  async render() {
    const container = document.createElement('div');
    container.className = 'platform-selector';
    container.innerHTML = `
      <!-- AdSense Auto Ad Placement Area -->
      <div class="ad-container top-ad">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="5566778899"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <div class="platform-header">
        <h1>Choose Your Learning Platform</h1>
        <p>Select from top medical education platforms to access thousands of lectures</p>
      </div>

      <div class="platform-comparison">
        <h2>Platform Comparison</h2>
        <div class="comparison-grid">
          ${this.platforms.map(platform => `
            <div class="platform-detail-card" data-platform="${platform.id}" style="border-top: 4px solid ${platform.color}">
              <div class="platform-header-section">
                <h3>${platform.name}</h3>
                <p class="platform-description">${platform.description}</p>
              </div>
              
              <div class="platform-stats">
                <div class="stat">
                  <span class="stat-number">500+</span>
                  <span class="stat-label">Lectures</span>
                </div>
                <div class="stat">
                  <span class="stat-number">${platform.subjects.length}</span>
                  <span class="stat-label">Subjects</span>
                </div>
                <div class="stat">
                  <span class="stat-number">100+</span>
                  <span class="stat-label">Faculty</span>
                </div>
              </div>

              <div class="subjects-section">
                <h4>Available Subjects</h4>
                <div class="subject-tags">
                  ${platform.subjects.map(subject => 
                    `<span class="subject-tag">${subject}</span>`
                  ).join('')}
                </div>
              </div>

              <div class="features-section">
                <h4>Key Features</h4>
                <ul class="feature-list">
                  ${platform.features.map(feature => 
                    `<li><i class="fas fa-check"></i> ${feature}</li>`
                  ).join('')}
                </ul>
              </div>

              <div class="platform-actions">
                <button class="explore-platform-btn" data-platform="${platform.id}" style="background: ${platform.color}">
                  <i class="fas fa-arrow-right"></i>
                  Explore ${platform.name}
                </button>
                <button class="view-subjects-btn" data-platform="${platform.id}">
                  <i class="fas fa-list"></i>
                  View Subjects
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- AdSense Auto Ad Placement Area -->
      <div class="ad-container mid-ad">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="6677889900"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <div class="platform-benefits">
        <h2>Why Choose These Platforms?</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <i class="fas fa-star"></i>
            <h3>Expert Faculty</h3>
            <p>Learn from India's top medical educators with years of teaching experience</p>
          </div>
          <div class="benefit-card">
            <i class="fas fa-clock"></i>
            <h3>Flexible Learning</h3>
            <p>Study at your own pace with 24/7 access to all course materials</p>
          </div>
          <div class="benefit-card">
            <i class="fas fa-mobile-alt"></i>
            <h3>Mobile Friendly</h3>
            <p>Access lectures and materials on any device, anywhere, anytime</p>
          </div>
          <div class="benefit-card">
            <i class="fas fa-chart-line"></i>
            <h3>Track Progress</h3>
            <p>Monitor your learning progress with detailed analytics and reports</p>
          </div>
        </div>
      </div>

      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div class="activity-item">
            <i class="fas fa-play text-blue"></i>
            <div class="activity-content">
              <h4>New Anatomy Lecture Added</h4>
              <p>Cardiovascular System - Advanced concepts by Dr. Kumar</p>
              <span class="activity-time">2 hours ago</span>
            </div>
          </div>
          <div class="activity-item">
            <i class="fas fa-bookmark text-green"></i>
            <div class="activity-content">
              <h4>Updated Study Material</h4>
              <p>Physiology notes for respiratory system updated</p>
              <span class="activity-time">1 day ago</span>
            </div>
          </div>
          <div class="activity-item">
            <i class="fas fa-trophy text-yellow"></i>
            <div class="activity-content">
              <h4>New Achievement Unlocked</h4>
              <p>Completed 50+ anatomy lectures milestone</p>
              <span class="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </div>

      <!-- AdSense Auto Ad Placement Area -->
      <div class="ad-container bottom-ad">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="7788990011"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    `;

    // Add event listeners
    setTimeout(() => {
      this.attachEventListeners(container);
    }, 100);

    return container;
  }

  attachEventListeners(container) {
    // Platform exploration buttons
    const exploreButtons = container.querySelectorAll('.explore-platform-btn');
    exploreButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const platform = btn.dataset.platform;
        this.explorePlatform(platform);
      });
    });

    // View subjects buttons
    const subjectButtons = container.querySelectorAll('.view-subjects-btn');
    subjectButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const platform = btn.dataset.platform;
        this.viewSubjects(platform);
      });
    });

    // Platform cards hover effects
    const platformCards = container.querySelectorAll('.platform-detail-card');
    platformCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      });
    });

    // Initialize AdSense ads
    this.initializeAds();
  }

  explorePlatform(platformId) {
    alert(`Exploring ${platformId.toUpperCase()} platform! Feature coming soon with detailed subject listings and lecture access.`);
    
    // You can implement navigation to platform-specific pages here
    console.log(`Navigate to ${platformId} platform`);
  }

  viewSubjects(platformId) {
    const platform = this.platforms.find(p => p.id === platformId);
    if (platform) {
      const subjectList = platform.subjects.join(', ');
      alert(`${platform.name} Subjects:\n\n${subjectList}\n\nDetailed subject pages coming soon!`);
    }
  }

  initializeAds() {
    // Load AdSense ads after content is loaded
    if (window.adsbygoogle) {
      const ads = document.querySelectorAll('.adsbygoogle');
      ads.forEach(ad => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.log('AdSense not loaded yet');
        }
      });
    }
  }
}