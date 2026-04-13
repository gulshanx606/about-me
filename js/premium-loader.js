/**
 * ==========================================
 * PREMIUM PERSONAL PORTFOLIO PRELOADER
 * Custom loader with smooth animations
 * ==========================================
 */

(function() {
    'use strict';

    // DOM Elements
    const pct = document.getElementById('pct');
    const fill = document.getElementById('logoFill');
    const loader = document.getElementById('preloader');
    const page = document.getElementById('page') || document.querySelector('.portfolio-section') || document.body;

    // Configuration
    let count = 0;
    const duration = 2400; // ms total
    const interval = 28;
    const steps = duration / interval;
    let step = 0;

    // Ease-out curve for smooth progress
    const ease = t => 1 - Math.pow(1 - t, 3);

    /**
     * Prevent body scroll during loading
     */
    function lockScroll() {
        document.body.style.overflow = 'hidden';
    }

    /**
     * Restore body scroll after loading
     */
    function unlockScroll() {
        document.body.style.overflow = '';
    }

    /**
     * Main loader animation
     */
    function runLoader() {
        lockScroll();

        const timer = setInterval(() => {
            step++;
            const progress = ease(step / steps);
            count = Math.min(100, Math.round(progress * 100));
            
            if (pct) {
                pct.textContent = count;
            }

            // Fill logo as percent grows
            if (fill) {
                const fromTop = 100 - count;
                fill.style.clipPath = `inset(${fromTop}% 0 0 0)`;
            }

            if (count >= 100) {
                clearInterval(timer);
                
                // Small pause, then reveal
                setTimeout(() => {
                    if (fill) {
                        fill.classList.add('reveal');
                    }
                    
                    setTimeout(() => {
                        if (loader) {
                            loader.classList.add('hide');
                        }
                        
                        document.body.classList.add('ready');
                        unlockScroll();
                        
                        // Show page content
                        if (page && page !== document.body) {
                            page.classList.add('visible');
                        }
                    }, 500);
                }, 200);
            }
        }, interval);
    }

    /**
     * Initialize on DOM ready
     */
    function init() {
        // Start loader animation
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runLoader);
        } else {
            runLoader();
        }

        // Fallback: Force hide after 5 seconds
        setTimeout(() => {
            if (loader && !loader.classList.contains('hide')) {
                if (fill) {
                    fill.classList.add('reveal');
                }
                loader.classList.add('hide');
                document.body.classList.add('ready');
                unlockScroll();
                
                if (page && page !== document.body) {
                    page.classList.add('visible');
                }
            }
        }, 5000);
    }

    // Start initialization
    init();

    // Expose API for manual control (optional)
    window.PremiumLoader = {
        hide: function() {
            if (loader) {
                if (fill) {
                    fill.classList.add('reveal');
                }
                loader.classList.add('hide');
                document.body.classList.add('ready');
                unlockScroll();
            }
        },
        isHidden: function() {
            return loader ? loader.classList.contains('hide') : true;
        }
    };

})();
