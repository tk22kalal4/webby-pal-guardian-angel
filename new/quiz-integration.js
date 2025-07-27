// Quiz Integration Script - Ensures proper functionality with our app theme
// This script enhances the quiz functionality and ensures seamless integration

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initQuizIntegration() {
        console.log('Initializing Quiz Integration...');
        
        // Override any existing theme toggles to maintain our theme
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.style.display = 'none';
        }
        
        // Enhance button interactions
        enhanceButtonInteractions();
        
        // Add smooth transitions
        addSmoothTransitions();
        
        // Fix z-index issues
        fixZIndexIssues();
        
        // Add keyboard navigation
        addKeyboardNavigation();
        
        // Enhance mobile experience
        enhanceMobileExperience();
        
        console.log('Quiz Integration completed successfully');
    }
    
    function enhanceButtonInteractions() {
        // Add enhanced hover effects and focus states
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            // Add focus visible styles
            button.addEventListener('focus', function() {
                this.style.outline = '2px solid rgba(59, 130, 246, 0.5)';
                this.style.outlineOffset = '2px';
            });
            
            button.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
            
            // Add click animation
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Enhance option buttons specifically
        const optionButtons = document.querySelectorAll('.option-btn');
        optionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(59, 130, 246, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    left: 50%;
                    top: 50%;
                    width: 20px;
                    height: 20px;
                    margin-left: -10px;
                    margin-top: -10px;
                `;
                
                this.appendChild(ripple);
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    function addSmoothTransitions() {
        // Add CSS for smooth animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes slideInFromRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeInUp {
                from {
                    transform: translateY(20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .nav-panel:not(.hidden) {
                animation: slideInFromRight 0.3s ease-out;
            }
            
            .section-transition:not(.hidden) {
                animation: fadeInUp 0.4s ease-out;
            }
            
            .question-nav-btn,
            .result-nav-btn-grid {
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            
            .option-btn {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                position: relative !important;
                overflow: hidden !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    function fixZIndexIssues() {
        // Ensure proper stacking order
        const elementsToFix = [
            { selector: '.nav-panel', zIndex: 1000 },
            { selector: '.results-nav-panel', zIndex: 1000 },
            { selector: '.fixed', zIndex: 1050 },
            { selector: '.fixed > div', zIndex: 1051 },
            { selector: 'header', zIndex: 100 },
            { selector: '.bg-white, section > div', zIndex: 10 },
            { selector: 'button', zIndex: 20 }
        ];
        
        elementsToFix.forEach(({ selector, zIndex }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.zIndex = zIndex;
                el.style.position = el.style.position || 'relative';
            });
        });
    }
    
    function addKeyboardNavigation() {
        // Add keyboard navigation for better accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close any open panels or modals
                const openPanels = document.querySelectorAll('.nav-panel:not(.hidden), .results-nav-panel:not(.hidden)');
                openPanels.forEach(panel => panel.classList.add('hidden'));
                
                const openModals = document.querySelectorAll('.fixed:not(.hidden)');
                openModals.forEach(modal => modal.classList.add('hidden'));
            }
            
            // Arrow key navigation for questions
            if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.metaKey) {
                const prevBtn = document.getElementById('previous-btn');
                if (prevBtn && !prevBtn.disabled) {
                    e.preventDefault();
                    prevBtn.click();
                }
            }
            
            if (e.key === 'ArrowRight' && !e.ctrlKey && !e.metaKey) {
                const nextBtn = document.getElementById('next-btn');
                if (nextBtn && !nextBtn.disabled) {
                    e.preventDefault();
                    nextBtn.click();
                }
            }
            
            // Number keys for option selection
            if (e.key >= '1' && e.key <= '4') {
                const optionBtns = document.querySelectorAll('.option-btn');
                const index = parseInt(e.key) - 1;
                if (optionBtns[index]) {
                    e.preventDefault();
                    optionBtns[index].click();
                }
            }
        });
    }
    
    function enhanceMobileExperience() {
        // Add touch-friendly enhancements
        if ('ontouchstart' in window) {
            // Prevent zoom on double tap for buttons
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    this.click();
                });
            });
            
            // Add touch feedback
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    button {
                        min-height: 44px !important;
                        min-width: 44px !important;
                    }
                    
                    .option-btn {
                        padding: 1.25rem !important;
                        font-size: 1rem !important;
                    }
                    
                    .question-nav-btn,
                    .result-nav-btn-grid {
                        width: 44px !important;
                        height: 44px !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Auto-save functionality enhancement
    function enhanceAutoSave() {
        const originalSaveProgress = window.saveProgress;
        if (typeof originalSaveProgress === 'function') {
            window.saveProgress = function() {
                try {
                    originalSaveProgress.apply(this, arguments);
                    // Add visual feedback for auto-save
                    showAutoSaveIndicator();
                } catch (error) {
                    console.error('Error in enhanced save progress:', error);
                }
            };
        }
    }
    
    function showAutoSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.textContent = 'Progress saved';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(16, 185, 129, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 2000;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: translateY(-10px); }
                20%, 80% { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(indicator);
        setTimeout(() => {
            indicator.remove();
            style.remove();
        }, 2000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuizIntegration);
    } else {
        initQuizIntegration();
    }
    
    // Re-initialize when content changes (for dynamic content)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Re-run enhancements for new content
                setTimeout(initQuizIntegration, 100);
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Enhance auto-save when available
    setTimeout(enhanceAutoSave, 1000);
    
})();