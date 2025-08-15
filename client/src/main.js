// Main application entry point
import { HomePage } from './home/HomePage.js';
import { SearchPage } from './search/SearchPage.js';
import { PlatformSelector } from './components/PlatformSelector.js';

class App {
  constructor() {
    this.currentPage = 'home';
    this.init();
  }

  async init() {
    // Initialize the app
    document.addEventListener('DOMContentLoaded', () => {
      this.setupNavigation();
      this.loadPage(this.currentPage);
    });
  }

  setupNavigation() {
    // Create bottom navigation
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.innerHTML = `
      <a href="#" data-page="home">
        <i class="fas fa-home"></i>
        <span>Home</span>
      </a>
      <a href="#" data-page="platforms">
        <i class="fas fa-video"></i>
        <span>Platforms</span>
      </a>
      <a href="#" data-page="search">
        <i class="fas fa-search"></i>
        <span>Search</span>
      </a>
    `;

    document.body.appendChild(nav);

    // Add navigation event listeners
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        this.loadPage(page);
      });
    });
  }

  async loadPage(pageName) {
    const container = document.getElementById('root');
    container.innerHTML = '';

    // Update active navigation
    document.querySelectorAll('.bottom-nav a').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageName);
    });

    switch(pageName) {
      case 'home':
        const homePage = new HomePage();
        const homeContent = await homePage.render();
        container.appendChild(homeContent);
        break;
      
      case 'platforms':
        const platformSelector = new PlatformSelector();
        const platformContent = await platformSelector.render();
        container.appendChild(platformContent);
        break;
      
      case 'search':
        const searchPage = new SearchPage();
        const searchContent = await searchPage.render();
        container.appendChild(searchContent);
        break;
    }

    this.currentPage = pageName;
    
    // Refresh AdSense ads if they exist
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }
}

// Initialize the app
new App();