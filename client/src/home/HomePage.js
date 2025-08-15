export class HomePage {
  constructor() {
    this.featuredContent = [
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
  }

  async render() {
    const container = document.createElement('div');
    container.className = 'home-page';
    container.innerHTML = `
      <!-- AdSense Auto Ad Placement Area -->
      <div class="ad-container top-ad">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <div class="welcome-section">
        <h1>Welcome to LASTPULSE</h1>
        <p class="tagline">Your Ultimate Medical Education Hub</p>
        <p class="quote">"If he is a God than I am a Bloody Doctor"</p>
      </div>

      <!-- AdSense Auto Ad Placement Area -->
      <div class="ad-container mid-ad">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="0987654321"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <div class="stats-section">
        <h2>Our Platform Statistics</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <i class="fas fa-play-circle"></i>
            <h3>2000+</h3>
            <p>Video Lectures</p>
          </div>
          <div class="stat-card">
            <i class="fas fa-book"></i>
            <h3>50+</h3>
            <p>Subjects Covered</p>
          </div>
          <div class="stat-card">
            <i class="fas fa-graduation-cap"></i>
            <h3>3</h3>
            <p>Top Platforms</p>
          </div>
        </div>
      </div>

      <div class="platforms-preview">
        <h2>Featured Platforms</h2>
        <div class="platform-cards">
          <div class="platform-card" data-platform="marrow">
            <h3>Marrow</h3>
            <p>Comprehensive medical education with expert faculty</p>
            <button class="explore-btn">Explore Marrow</button>
          </div>
          <div class="platform-card" data-platform="dams">
            <h3>DAMS</h3>
            <p>Delhi Academy of Medical Sciences - Quality education</p>
            <button class="explore-btn">Explore DAMS</button>
          </div>
          <div class="platform-card" data-platform="prepladder">
            <h3>PrepLadder</h3>
            <p>India's largest test prep platform for medical students</p>
            <button class="explore-btn">Explore PrepLadder</button>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
          <button class="action-btn" id="browseVideos">
            <i class="fas fa-video"></i>
            Browse All Videos
          </button>
          <button class="action-btn" id="searchContent">
            <i class="fas fa-search"></i>
            Search Content
          </button>
          <button class="action-btn" id="trackProgress">
            <i class="fas fa-chart-bar"></i>
            Track Progress
          </button>
        </div>
      </div>

      <!-- AdSense Auto Ad Placement Area -->
      <div class="ad-container bottom-ad">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="1122334455"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <div class="featured-section">
        <h2>Featured Content</h2>
        <div class="featured-grid">
          ${this.featuredContent.map(item => `
            <div class="featured-card">
              <i class="${item.icon}"></i>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Add event listeners
    setTimeout(() => {
      this.attachEventListeners(container);
    }, 100);

    return container;
  }

  attachEventListeners(container) {
    const browseBtn = container.querySelector('#browseVideos');
    const searchBtn = container.querySelector('#searchContent');
    const trackBtn = container.querySelector('#trackProgress');

    browseBtn?.addEventListener('click', () => {
      const app = window.app;
      if (app) app.loadPage('platforms');
    });

    searchBtn?.addEventListener('click', () => {
      const app = window.app;
      if (app) app.loadPage('search');
    });

    trackBtn?.addEventListener('click', () => {
      alert('Progress tracking feature coming soon!');
    });

    // Platform card interactions
    container.querySelectorAll('.platform-card').forEach(card => {
      card.addEventListener('click', () => {
        const platform = card.dataset.platform;
        const app = window.app;
        if (app) {
          app.loadPage('platforms');
          // Set selected platform
          setTimeout(() => {
            const platformSelector = document.querySelector(`[data-platform="${platform}"]`);
            if (platformSelector) platformSelector.click();
          }, 200);
        }
      });
    });

    // Initialize AdSense ads
    this.initializeAds();
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