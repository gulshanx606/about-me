/**
 * Portfolio Website - Main JavaScript
 * Production-ready, bug-free, and optimized for performance
 */

'use strict';

// ================================
// WAIT FOR DOM TO LOAD
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initPageLoader();
    initScrollProgress();
    initCustomCursor();
    initNavigation();
    initSmoothScroll();
    initTypingAnimation();
    initCounterAnimation();
    initSkillBars();
    initContactForm();
    initContactGlassEffects();
    initScrollToTop();
    initMobileScrollBehavior();
    initResumeDropdown();
});

// ================================
// PAGE LOADER
// ================================
function initPageLoader() {
    const loader = document.getElementById('page-loader');
    
    if (!loader) return;
    
    // Hide loader after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 500);
    });
    
    // Fallback: hide loader after 3 seconds if page hasn't fully loaded
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 3000);
}

// ================================
// SCROLL PROGRESS BAR
// ================================
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    if (!progressBar) return;
    
    // Use RAF for smooth animation
    let ticking = false;
    
    function updateProgressBar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateProgressBar);
            ticking = true;
        }
    }, { passive: true });
}

// ================================
// CUSTOM CURSOR (Desktop Only)
// ================================
function initCustomCursor() {
    // Only enable on desktop
    if (window.innerWidth < 1024) return;
    
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor follow using RAF
    function animateCursor() {
        // Smooth follow for main cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Immediate follow for dot
        dotX = mouseX;
        dotY = mouseY;
        
        cursor.style.transform = `translate3d(${cursorX - 20}px, ${cursorY - 20}px, 0)`;
        cursorDot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effect
    const hoverElements = document.querySelectorAll('a, button, .nav-link, .btn, .social-link, .project-link');
    
    hoverElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
}

// ================================
// NAVIGATION
// ================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }, { passive: true });
}

// ================================
// SMOOTH SCROLL
// ================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// TYPING ANIMATION
// ================================
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    
    if (!typingElement) return;
    
    const texts = [
        'Data Engineer',
        'Python Developer',
        'SQL Expert',
        'ETL Specialist',
        'Analytics Engineer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Remove character
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            // Add character
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500;
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Start typing
    setTimeout(type, 1000);
}

// ================================
// COUNTER ANIMATION
// ================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    let hasAnimated = false;
    
    function animateCounters() {
        if (hasAnimated) return;
        
        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            function updateCounter() {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            }
            
            updateCounter();
        });
        
        hasAnimated = true;
    }
    
    // Trigger when counters are in view
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

// ================================
// SKILL BARS ANIMATION
// ================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(function(bar) {
        observer.observe(bar);
    });
}

// ================================
// 3D CARD TILT EFFECT (Desktop Only)
// ================================
function init3DCardEffect() {
    // Only enable on desktop
    if (window.innerWidth < 1024) return;
    
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize 3D cards after DOM load
window.addEventListener('load', init3DCardEffect);

// ================================
// CONTACT FORM
// ================================
// Note: Contact form now handled by contact-form.js with EmailJS integration
function initContactForm() {
    // Contact form functionality moved to js/contact-form.js
    // This function is kept for compatibility but functionality is disabled
    // EmailJS handles: validation, submission, notifications, and auto-reply
}

// ================================
// SCROLL TO TOP BUTTON
// ================================
function initScrollToTop() {
    // Create button if it doesn't exist
    let scrollBtn = document.getElementById('scroll-to-top');
    
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                color: white;
                background: var(--gradient-1);
                box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .scroll-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .scroll-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
            }
            
            body.light .scroll-to-top {
                background: var(--gradient-1);
                color: #ffffff;
                box-shadow: 0 5px 20px rgba(102, 126, 234, 0.45);
                border: none;
            }
            
            body.light .scroll-to-top:hover {
                box-shadow: 0 8px 28px rgba(102, 126, 234, 0.65);
            }
            
            @media (max-width: 768px) {
                .scroll-to-top {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }, { passive: true });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

// ================================
// LAZY LOAD IMAGES
// ================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// ================================
// CONTACT GLASS EFFECTS
// ================================
function initContactGlassEffects() {
    // Only on desktop
    if (window.innerWidth <= 768) return;
    
    const contactForm = document.querySelector('.contact-form');
    const contactItems = document.querySelectorAll('.contact-item');
    
    if (!contactForm) return;
    
    let rafId = null;
    
    function updateSpotlight(element, e) {
        const rect = element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        element.style.setProperty('--mouse-x', `${x}%`);
        element.style.setProperty('--mouse-y', `${y}%`);
    }
    
    function updateDynamicShadow(element, e) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 20;
        const deltaY = (e.clientY - centerY) / 20;
        
        element.style.boxShadow = `
            ${deltaX}px ${deltaY}px 40px rgba(0, 0, 0, 0.2),
            ${-deltaX}px ${-deltaY}px 40px rgba(56, 189, 248, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.1)
        `;
    }
    
    // Contact Form - Cursor Spotlight
    contactForm.addEventListener('mouseenter', function() {
        this.classList.add('spotlight-active');
    });
    
    contactForm.addEventListener('mouseleave', function() {
        this.classList.remove('spotlight-active');
        this.style.boxShadow = '';
    });
    
    contactForm.addEventListener('mousemove', function(e) {
        if (rafId) cancelAnimationFrame(rafId);
        
        rafId = requestAnimationFrame(() => {
            updateSpotlight(this, e);
            updateDynamicShadow(this, e);
        });
    });
    
    // Contact Items - Dynamic Lighting
    contactItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            if (rafId) cancelAnimationFrame(rafId);
            
            rafId = requestAnimationFrame(() => {
                updateDynamicShadow(this, e);
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// ================================
// MOBILE SCROLL HIDE/SHOW (Toggle + Hero Indicator)
// ================================
function initMobileScrollBehavior() {
    // Only on mobile
    if (window.innerWidth > 768) return;
    
    const toggleContainer = document.getElementById('theme-toggle-container');
    const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (!toggleContainer && !heroScrollIndicator) return;
    
    let lastScrollY = window.pageYOffset;
    let ticking = false;
    
    function handleScroll() {
        const currentScrollY = window.pageYOffset;
        
        // Detect scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling DOWN - hide elements
            if (toggleContainer) toggleContainer.classList.add('hide-on-scroll');
            if (heroScrollIndicator) heroScrollIndicator.classList.add('hide-on-scroll');
        } else if (currentScrollY < lastScrollY) {
            // Scrolling UP - show elements
            if (toggleContainer) toggleContainer.classList.remove('hide-on-scroll');
            if (heroScrollIndicator) heroScrollIndicator.classList.remove('hide-on-scroll');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });
}

// ================================
// RESUME DROPDOWN
// ================================
function initResumeDropdown() {
    const dropdown = document.querySelector('.resume-dropdown');
    const dropdownToggle = document.getElementById('resumeDropdown');
    const dropdownMenu = document.getElementById('resumeDropdownMenu');
    
    if (!dropdown || !dropdownToggle || !dropdownMenu) return;
    
    // Toggle dropdown on button click
    dropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Close dropdown when clicking a dropdown item
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function() {
            setTimeout(function() {
                dropdown.classList.remove('active');
            }, 300);
        });
    });
    
    // Prevent dropdown from closing when clicking the menu itself
    dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// ================================
// INITIALIZATION COMPLETE
// ================================
