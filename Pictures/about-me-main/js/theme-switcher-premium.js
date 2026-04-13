/**
 * Premium Theme Switcher - Glass UI
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    initPremiumThemeSwitcher();
});

function initPremiumThemeSwitcher() {
    const themeBulb = document.getElementById('theme-bulb');
    const themeIconWrapper = themeBulb?.querySelector('.theme-icon-wrapper');
    const body = document.body;
    
    if (!themeBulb || !body) {
                return;
    }
    
    // Load saved theme
    loadTheme();
    
    // Add click event
    themeBulb.addEventListener('click', toggleTheme);
    
    function loadTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        body.classList.remove('dark', 'light');
        body.classList.add(savedTheme);
    }
    
    function toggleTheme() {
        const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add premium animations
        themeBulb.classList.add('switching');
        if (themeIconWrapper) {
            themeIconWrapper.classList.add('rotating');
        }
        
        // Switch theme
        body.classList.remove('dark', 'light');
        body.classList.add(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Remove animation classes
        setTimeout(() => {
            themeBulb.classList.remove('switching');
            if (themeIconWrapper) {
                themeIconWrapper.classList.remove('rotating');
            }
        }, 600);
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    }
}
