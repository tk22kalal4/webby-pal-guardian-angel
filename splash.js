// splash.js
document.addEventListener('DOMContentLoaded', function() {
    // Show splash screen initially
    const splashContainer = document.querySelector('.splash-container');
    splashContainer.style.display = 'flex';
    
    setTimeout(function() {
        document.querySelector('.loading-text').textContent = "Initialization complete!";
        
        setTimeout(function() {
            // Fade out splash screen
            splashContainer.style.opacity = '0';
            splashContainer.style.transition = 'opacity 0.5s ease-in-out';
            
            setTimeout(function() {
                splashContainer.style.display = 'none';
                // Show main content
                document.querySelector('.main-content').style.display = 'block';
            }, 500);
        }, 1500);
    }, 3000);
});
