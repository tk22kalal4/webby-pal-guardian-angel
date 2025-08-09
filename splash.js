// splash.js - PWA Splash Screen Handler
document.addEventListener('DOMContentLoaded', function() {
    // Ensure splash screen is visible
    const splashContainer = document.querySelector('.splash-container');
    if (splashContainer) {
        splashContainer.style.display = 'flex';
        
        // Update loading text progressively
        setTimeout(function() {
            const loadingText = document.querySelector('.loading-text');
            if (loadingText) {
                loadingText.textContent = "Loading resources...";
            }
        }, 1000);
        
        setTimeout(function() {
            const loadingText = document.querySelector('.loading-text');
            if (loadingText) {
                loadingText.textContent = "Almost ready...";
            }
        }, 2000);
        
        setTimeout(function() {
            const loadingText = document.querySelector('.loading-text');
            if (loadingText) {
                loadingText.textContent = "Welcome to LASTPULSE!";
            }
        }, 2500);
    }
    
    // Handle PWA standalone mode detection
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
        // Running as PWA
        document.body.classList.add('pwa-mode');
    }
});
