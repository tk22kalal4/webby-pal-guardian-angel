export class SearchPage {
  constructor() {
    this.currentView = 'search';
    this.platforms = ['marrow', 'dams', 'prepladder'];
    this.subjects = ['anatomy', 'physiology'];
    this.searchResults = [];
  }

  async render() {
    const container = document.createElement('div');
    container.className = 'search-page';
    container.innerHTML = `
      <!-- AdSense Auto Ad Placement Area -->
      <div class="ad-container top-ad">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="2233445566"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <div class="search-header">
        <h1>Search Medical Content</h1>
        <p>Find lectures, teachers, and subjects across all platforms</p>
      </div>

      <div class="search-container">
        <div class="enhanced-search-bar">
          <input 
            type="text" 
            id="searchInput" 
            class="search-input" 
            placeholder="Search for teachers, subjects, lectures..."
            autocomplete="off"
          >
          <select id="searchType" class="search-type-select">
            <option value="all">All Content</option>
            <option value="teachers">Teachers Only</option>
            <option value="subjects">Subjects Only</option>
            <option value="lectures">Lectures Only</option>
          </select>
          <button id="searchBtn" class="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>

        <div class="filter-section">
          <div class="filter-group">
            <label>Platform:</label>
            <select id="platformFilter">
              <option value="all">All Platforms</option>
              <option value="marrow">Marrow</option>
              <option value="dams">DAMS</option>
              <option value="prepladder">PrepLadder</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Subject:</label>
            <select id="subjectFilter">
              <option value="all">All Subjects</option>
              <option value="anatomy">Anatomy</option>
              <option value="physiology">Physiology</option>
            </select>
          </div>
        </div>
      </div>

      <!-- AdSense Auto Ad Placement Area -->
      <div class="ad-container mid-ad">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="3344556677"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <div class="popular-searches">
        <h2>Popular Searches</h2>
        <div class="popular-tags">
          <span class="tag" data-search="anatomy lectures">Anatomy Lectures</span>
          <span class="tag" data-search="physiology notes">Physiology Notes</span>
          <span class="tag" data-search="marrow videos">Marrow Videos</span>
          <span class="tag" data-search="dams classes">DAMS Classes</span>
          <span class="tag" data-search="prepladder tests">PrepLadder Tests</span>
          <span class="tag" data-search="medical education">Medical Education</span>
        </div>
      </div>

      <div id="searchResults" class="search-results">
        <div class="search-prompt">
          <i class="fas fa-search"></i>
          <h3>Start Your Search</h3>
          <p>Enter keywords above to find medical content across all platforms</p>
        </div>
      </div>

      <!-- AdSense Auto Ad Placement Area -->
      <div class="ad-container bottom-ad">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="4455667788"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <div class="trending-content">
        <h2>Trending This Week</h2>
        <div class="trending-grid">
          <div class="trending-item">
            <i class="fas fa-fire"></i>
            <h3>Cardiovascular System</h3>
            <p>Most viewed anatomy topic</p>
            <span class="view-count">2.3k views</span>
          </div>
          <div class="trending-item">
            <i class="fas fa-fire"></i>
            <h3>Respiratory Physiology</h3>
            <p>Hot topic in physiology</p>
            <span class="view-count">1.8k views</span>
          </div>
          <div class="trending-item">
            <i class="fas fa-fire"></i>
            <h3>Neuroanatomy Basics</h3>
            <p>Essential for medical students</p>
            <span class="view-count">1.5k views</span>
          </div>
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
    const searchInput = container.querySelector('#searchInput');
    const searchBtn = container.querySelector('#searchBtn');
    const searchType = container.querySelector('#searchType');
    const platformFilter = container.querySelector('#platformFilter');
    const subjectFilter = container.querySelector('#subjectFilter');
    const popularTags = container.querySelectorAll('.tag');

    // Search functionality
    const performSearch = () => {
      const query = searchInput.value.trim();
      const type = searchType.value;
      const platform = platformFilter.value;
      const subject = subjectFilter.value;
      
      this.search(query, type, platform, subject, container);
    };

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    // Popular tags
    popularTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const searchTerm = tag.dataset.search;
        searchInput.value = searchTerm;
        performSearch();
      });
    });

    // Filter changes
    [searchType, platformFilter, subjectFilter].forEach(filter => {
      filter.addEventListener('change', () => {
        if (searchInput.value.trim()) {
          performSearch();
        }
      });
    });

    // Trending items
    const trendingItems = container.querySelectorAll('.trending-item');
    trendingItems.forEach(item => {
      item.addEventListener('click', () => {
        const topic = item.querySelector('h3').textContent;
        searchInput.value = topic;
        performSearch();
      });
    });

    // Initialize AdSense ads
    this.initializeAds();
  }

  async search(query, type, platform, subject, container) {
    if (!query) {
      this.showSearchPrompt(container);
      return;
    }

    const resultsContainer = container.querySelector('#searchResults');
    resultsContainer.innerHTML = '<div class="loading">Searching...</div>';

    // Simulate search delay
    setTimeout(() => {
      const mockResults = this.generateMockResults(query, type, platform, subject);
      this.displayResults(mockResults, resultsContainer);
      
      // Refresh ads after new content
      this.initializeAds();
    }, 500);
  }

  generateMockResults(query, type, platform, subject) {
    const mockData = [
      { title: 'Anatomy of Heart', teacher: 'Dr. Kumar', platform: 'Marrow', subject: 'anatomy', type: 'lecture', views: '12.5k' },
      { title: 'Physiology Basics', teacher: 'Prof. Sharma', platform: 'DAMS', subject: 'physiology', type: 'lecture', views: '8.3k' },
      { title: 'Cardiovascular System', teacher: 'Dr. Patel', platform: 'PrepLadder', subject: 'anatomy', type: 'lecture', views: '15.7k' },
      { title: 'Respiratory System', teacher: 'Dr. Singh', platform: 'Marrow', subject: 'physiology', type: 'lecture', views: '9.2k' },
      { title: 'Nervous System Overview', teacher: 'Prof. Gupta', platform: 'DAMS', subject: 'anatomy', type: 'lecture', views: '11.1k' },
    ];

    // Filter results based on criteria
    let filtered = mockData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.teacher.toLowerCase().includes(query.toLowerCase()) ||
      item.subject.toLowerCase().includes(query.toLowerCase())
    );

    if (platform !== 'all') {
      filtered = filtered.filter(item => item.platform.toLowerCase() === platform);
    }

    if (subject !== 'all') {
      filtered = filtered.filter(item => item.subject === subject);
    }

    if (type !== 'all') {
      if (type === 'teachers') {
        filtered = filtered.filter(item => item.teacher.toLowerCase().includes(query.toLowerCase()));
      } else if (type === 'subjects') {
        filtered = filtered.filter(item => item.subject.toLowerCase().includes(query.toLowerCase()));
      }
    }

    return filtered;
  }

  displayResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h3>No Results Found</h3>
          <p>Try adjusting your search criteria or explore popular topics</p>
        </div>
      `;
      return;
    }

    const resultsHTML = results.map(result => `
      <div class="search-result-card" onclick="this.classList.toggle('expanded')">
        <div class="result-header">
          <i class="fas fa-play-circle"></i>
          <h3>${result.title}</h3>
        </div>
        <div class="result-details">
          <span><i class="fas fa-user"></i> ${result.teacher}</span>
          <span><i class="fas fa-graduation-cap"></i> ${result.platform}</span>
          <span><i class="fas fa-book"></i> ${result.subject}</span>
          <span><i class="fas fa-eye"></i> ${result.views} views</span>
        </div>
        <div class="result-actions">
          <button class="watch-btn"><i class="fas fa-play"></i> Watch Now</button>
          <button class="save-btn"><i class="fas fa-bookmark"></i> Save</button>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="results-header">
        <h3>Found ${results.length} result${results.length !== 1 ? 's' : ''}</h3>
      </div>
      ${resultsHTML}
    `;
  }

  showSearchPrompt(container) {
    const resultsContainer = container.querySelector('#searchResults');
    resultsContainer.innerHTML = `
      <div class="search-prompt">
        <i class="fas fa-search"></i>
        <h3>Start Your Search</h3>
        <p>Enter keywords above to find medical content across all platforms</p>
      </div>
    `;
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