/**
 * Scroll Animations with Intersection Observer
 * Production-ready, performance-optimized
 */

'use strict';

// ================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ================================
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});

function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // If not supported, show all elements immediately
        showAllElements();
        return;
    }
    
    // Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    // Create observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Add animate class to trigger animation
                entry.target.classList.add('animate');
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Get all elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.fade-in, .fade-up, .slide-left, .slide-right, .scale-in'
    );
    
    // Observe each element
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

// Fallback for browsers without IntersectionObserver
function showAllElements() {
    const elements = document.querySelectorAll(
        '.fade-in, .fade-up, .slide-left, .slide-right, .scale-in'
    );
    
    elements.forEach(function(element) {
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
}

// ================================
// PARALLAX EFFECT (OPTIONAL)
// ================================
function initParallaxEffect() {
    // Only enable on desktop for better performance
    if (window.innerWidth < 1024) return;
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(function(element) {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrollY * parseFloat(speed));
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// Initialize parallax after page load
window.addEventListener('load', initParallaxEffect);

// ================================
// SCROLL REVEAL WITH STAGGER EFFECT
// ================================
function initStaggeredAnimations() {
    const staggerGroups = document.querySelectorAll('[data-stagger]');
    
    if (staggerGroups.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                const delay = parseInt(entry.target.getAttribute('data-stagger')) || 100;
                
                Array.from(children).forEach(function(child, index) {
                    setTimeout(function() {
                        child.classList.add('animate');
                    }, index * delay);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    staggerGroups.forEach(function(group) {
        observer.observe(group);
    });
}

// Initialize staggered animations
window.addEventListener('load', initStaggeredAnimations);

// ================================
// FADE IN ON LOAD
// ================================
window.addEventListener('load', function() {
    // Fade in hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(function() {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// ================================
// SMOOTH REVEAL FOR SECTIONS
// ================================
function revealSections() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(function(section) {
        observer.observe(section);
    });
}

// Initialize section reveals
document.addEventListener('DOMContentLoaded', revealSections);

// ================================
// ELEMENT VISIBILITY TRACKER
// ================================
function trackVisibleElements() {
    const trackedElements = document.querySelectorAll('[data-track]');
    
    if (trackedElements.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const elementName = entry.target.getAttribute('data-track');
                
                // Analytics tracking can be added here if needed
                // analytics.track('element_viewed', { element: elementName });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    trackedElements.forEach(function(element) {
        observer.observe(element);
    });
}

// Initialize tracking
document.addEventListener('DOMContentLoaded', trackVisibleElements);

// ================================
// VIEWPORT ANIMATION CONTROLLER
// ================================
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observer = null;
        this.init();
    }
    
    init() {
        if (!('IntersectionObserver' in window)) {
                        return;
        }
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                root: null,
                rootMargin: '50px',
                threshold: [0, 0.25, 0.5, 0.75, 1]
            }
        );
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            const animation = this.animations.get(entry.target);
            
            if (!animation) return;
            
            if (entry.isIntersecting && !animation.hasPlayed) {
                this.playAnimation(entry.target, animation);
                animation.hasPlayed = true;
                
                // Unobserve if animation should play only once
                if (animation.once) {
                    this.observer.unobserve(entry.target);
                }
            }
        });
    }
    
    playAnimation(element, animation) {
        element.classList.add('animate');
        
        if (animation.callback && typeof animation.callback === 'function') {
            animation.callback(element);
        }
    }
    
    observe(element, options = {}) {
        const defaultOptions = {
            once: true,
            callback: null,
            hasPlayed: false
        };
        
        const animationOptions = { ...defaultOptions, ...options };
        
        this.animations.set(element, animationOptions);
        
        if (this.observer) {
            this.observer.observe(element);
        }
    }
    
    unobserve(element) {
        if (this.observer) {
            this.observer.unobserve(element);
        }
        this.animations.delete(element);
    }
    
    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.animations.clear();
    }
}

// Export animation controller
window.AnimationController = AnimationController;

// ================================
// AUTO-INITIALIZE ANIMATIONS
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Create animation controller instance
    const controller = new AnimationController();
    
    // Auto-observe elements with data-animate attribute
    const autoAnimateElements = document.querySelectorAll('[data-animate]');
    
    autoAnimateElements.forEach(function(element) {
        const once = element.getAttribute('data-animate-once') !== 'false';
        
        controller.observe(element, {
            once: once,
            callback: function(el) {
                const callback = element.getAttribute('data-animate-callback');
                if (callback && typeof window[callback] === 'function') {
                    window[callback](el);
                }
            }
        });
    });
    
    // Store controller globally for access
    window.animationController = controller;
});

// ================================
// PERFORMANCE MONITORING
// ================================
function monitorAnimationPerformance() {
    if (!window.performance || !window.performance.now) return;
    
    let animationStartTime = 0;
    let frameCount = 0;
    let fps = 0;
    
    function measureFPS() {
        const currentTime = performance.now();
        frameCount++;
        
        if (currentTime >= animationStartTime + 1000) {
            fps = Math.round((frameCount * 1000) / (currentTime - animationStartTime));
            frameCount = 0;
            animationStartTime = currentTime;
            
            // Log FPS to console (remove in production)
            //             
            // Warn if FPS is too low
            if (fps < 30) {
                            }
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    animationStartTime = performance.now();
    requestAnimationFrame(measureFPS);
}

// Enable performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    monitorAnimationPerformance();
}

// ================================
// REDUCE MOTION SUPPORT
// ================================
function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function disableAnimations() {
        document.body.classList.add('reduce-motion');
        
        // Add style to disable animations
        const style = document.createElement('style');
        style.textContent = `
            .reduce-motion *,
            .reduce-motion *::before,
            .reduce-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    if (prefersReducedMotion.matches) {
        disableAnimations();
    }
    
    prefersReducedMotion.addEventListener('change', function() {
        if (this.matches) {
            disableAnimations();
        }
    });
}

// Initialize reduced motion handling
handleReducedMotion();

// ================================
// CLEANUP ON PAGE UNLOAD
// ================================
window.addEventListener('beforeunload', function() {
    // Clean up animation controller
    if (window.animationController) {
        window.animationController.disconnect();
    }
});

// ================================
// EXPORT UTILITIES
// ================================
window.AnimationUtils = {
    initScrollAnimations: initScrollAnimations,
    initParallaxEffect: initParallaxEffect,
    initStaggeredAnimations: initStaggeredAnimations,
    monitorAnimationPerformance: monitorAnimationPerformance
};
