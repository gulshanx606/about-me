/**
 * Theme Switcher - Glass Toggle
 * Premium sun/moon sliding switch
 */

'use strict';

// ================================
// THEME SWITCHER INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    initThemeSwitcher();
});

function initThemeSwitcher() {
    const toggleContainer = document.getElementById('theme-toggle-container');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check if elements exist
    if (!toggleContainer || !themeToggle || !body) {
        return;
    }
    
    // ================================
    // LOAD SAVED THEME
    // ================================
    function loadTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        
        if (savedTheme) {
            body.classList.remove('dark', 'light');
            body.classList.add(savedTheme);
        } else {
            // Default to dark theme
            body.classList.add('dark');
            localStorage.setItem('portfolio-theme', 'dark');
        }
        
        // Update bulb appearance
        updateBulbAppearance();
    }
    
    // ================================
    // SAVE THEME TO LOCALSTORAGE
    // ================================
    function saveTheme(theme) {
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) {
            // Silently fail if localStorage is not available
        }
    }
    
    // ================================
    // TOGGLE THEME WITH VIEW TRANSITIONS
    // ================================
    function toggleTheme(event) {
        const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Get toggle button position for animation origin
        const toggleRect = toggleContainer.getBoundingClientRect();
        const x = toggleRect.left + toggleRect.width / 2;
        const y = toggleRect.top + toggleRect.height / 2;
        
        // Set CSS variables for circular transition origin
        document.documentElement.style.setProperty('--transition-x', `${x}px`);
        document.documentElement.style.setProperty('--transition-y', `${y}px`);
        
        // Check if browser supports View Transitions API
        if (!document.startViewTransition) {
            // Fallback for browsers without View Transitions support
            body.classList.remove('dark', 'light');
            body.classList.add(newTheme);
            saveTheme(newTheme);
            updateToggleAppearance();
            triggerThemeChangeEvent(newTheme);
            addClickAnimation();
            return;
        }
        
        // Modern browsers: Use View Transitions API
        const transition = document.startViewTransition(() => {
            body.classList.remove('dark', 'light');
            body.classList.add(newTheme);
            saveTheme(newTheme);
            updateToggleAppearance();
        });
        
        // Handle transition completion
        transition.finished.then(() => {
            triggerThemeChangeEvent(newTheme);
        }).catch(() => {
            // Transition interrupted - no action needed
        });
        
        // Add click animation to toggle button
        addClickAnimation();
    }
    
    // ================================
    // UPDATE TOGGLE APPEARANCE
    // ================================
    function updateToggleAppearance() {
        // Theme classes on body handle all visual updates via CSS
    }
    
    // ================================
    // ADD CLICK ANIMATION
    // ================================
    function addClickAnimation() {
        themeToggle.style.transform = 'scale(0.95)';
        
        setTimeout(function() {
            themeToggle.style.transform = '';
        }, 150);
    }
    
    // ================================
    // TRIGGER CUSTOM EVENT
    // ================================
    function triggerThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: { theme: theme }
        });
        window.dispatchEvent(event);
    }
    
    // ================================
    // EVENT LISTENERS
    // ================================
    
    // Click event on toggle
    toggleContainer.addEventListener('click', function(e) {
        e.preventDefault();
        toggleTheme(e);
    });
    
    // Touch event for mobile
    toggleContainer.addEventListener('touchend', function(e) {
        e.preventDefault();
        toggleTheme(e);
    }, { passive: false });
    
    // Keyboard accessibility (Enter/Space)
    toggleContainer.setAttribute('tabindex', '0');
    toggleContainer.setAttribute('role', 'switch');
    toggleContainer.setAttribute('aria-label', 'Toggle theme');
    
    toggleContainer.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme(null);
        }
    });
    
    // ================================
    // INITIALIZE
    // ================================
    loadTheme();
    
    }

// ================================
// SYSTEM THEME DETECTION
// ================================
function detectSystemTheme() {
    if (!window.matchMedia) return null;
    
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return darkModeQuery.matches ? 'dark' : 'light';
}

// ================================
// AUTO THEME BASED ON TIME
// ================================
function getAutoTheme() {
    const hour = new Date().getHours();
    
    // Dark theme from 7 PM to 7 AM
    if (hour >= 19 || hour < 7) {
        return 'dark';
    } else {
        return 'light';
    }
}

// ================================
// THEME UTILITIES
// ================================
const ThemeUtils = {
    /**
     * Get current theme
     */
    getCurrentTheme: function() {
        return document.body.classList.contains('dark') ? 'dark' : 'light';
    },
    
    /**
     * Set theme manually
     */
    setTheme: function(theme) {
        if (theme !== 'dark' && theme !== 'light') {
                        return;
        }
        
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
        
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) {
                    }
        
            },
    
    /**
     * Toggle theme
     */
    toggleTheme: function() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },
    
    /**
     * Use system theme
     */
    useSystemTheme: function() {
        const systemTheme = detectSystemTheme();
        if (systemTheme) {
            this.setTheme(systemTheme);
                    }
    },
    
    /**
     * Use auto theme based on time
     */
    useAutoTheme: function() {
        const autoTheme = getAutoTheme();
        this.setTheme(autoTheme);
            },
    
    /**
     * Listen to theme changes
     */
    onThemeChange: function(callback) {
        if (typeof callback !== 'function') {
                        return;
        }
        
        window.addEventListener('themeChanged', function(e) {
            callback(e.detail.theme);
        });
    }
};

// Export theme utilities
window.ThemeUtils = ThemeUtils;

// ================================
// LISTEN TO SYSTEM THEME CHANGES
// ================================
if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    darkModeQuery.addEventListener('change', function(e) {
                
        // Optionally auto-switch (uncomment if desired)
        // ThemeUtils.useSystemTheme();
    });
}

// ================================
// THEME PERSISTENCE CHECK
// ================================
function checkThemePersistence() {
    try {
        // Test localStorage
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
                return false;
    }
}

checkThemePersistence();

// ================================
// SMOOTH THEME TRANSITION
// ================================
function enableSmoothThemeTransition() {
    const body = document.body;
    
    // Add transition class
    if (!body.classList.contains('theme-transition')) {
        body.classList.add('theme-transition');
        
        // Add CSS for smooth transition
        const style = document.createElement('style');
        style.textContent = `
            .theme-transition,
            .theme-transition *,
            .theme-transition *::before,
            .theme-transition *::after {
                transition: background-color 0.3s ease,
                            color 0.3s ease,
                            border-color 0.3s ease,
                            box-shadow 0.3s ease !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Enable smooth transitions
document.addEventListener('DOMContentLoaded', enableSmoothThemeTransition);

// ================================
// THEME CHANGE ANIMATION
// ================================
function animateThemeChange() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9997;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Fade in
    setTimeout(function() {
        overlay.style.opacity = '1';
    }, 10);
    
    // Fade out and remove
    setTimeout(function() {
        overlay.style.opacity = '0';
        
        setTimeout(function() {
            document.body.removeChild(overlay);
        }, 300);
    }, 300);
}

// Listen to theme changes and animate
window.addEventListener('themeChanged', animateThemeChange);

// ================================
// ACCESSIBILITY ANNOUNCEMENT
// ================================
function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = `Theme switched to ${theme} mode`;
    
    document.body.appendChild(announcement);
    
    setTimeout(function() {
        document.body.removeChild(announcement);
    }, 1000);
}

// Listen to theme changes and announce
window.addEventListener('themeChanged', function(e) {
    announceThemeChange(e.detail.theme);
});

// ================================
// PRELOAD THEME BEFORE RENDER
// ================================
(function() {
    // This code runs immediately to prevent flash of wrong theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme) {
        document.documentElement.classList.add(savedTheme);
    }
})();

