/**
 * ==========================================
 * CONTACT FORM - EmailJS Integration
 * ==========================================
 * Premium contact form with dual email dispatch:
 * 1. Admin notification (you receive contact details)
 * 2. Auto-reply (user receives confirmation)
 */

(function() {
    'use strict';

    // ==========================================
    // EMAILJS CONFIGURATION
    // ==========================================
    const EMAILJS_CONFIG = {
        publicKey: 'OCuNKTF0IZbitQwV5',
        serviceID: 'service_zhp12ya',
        templateAdmin: 'template_n9j8jmq',      // Admin notification
        templateAutoReply: 'template_950xbkl'   // User auto-reply
    };

    // ==========================================
    // DOM ELEMENTS
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm?.querySelector('button[type="submit"]');
    const buttonText = submitButton?.querySelector('span');
    const buttonIcon = submitButton?.querySelector('i');

    // ==========================================
    // INITIALIZE EMAILJS
    // ==========================================
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
        }
    }

    // ==========================================
    // INPUT SANITIZATION (XSS Prevention)
    // ==========================================
    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        
        // Remove any script tags and potentially dangerous content
        const temp = document.createElement('div');
        temp.textContent = input;
        let sanitized = temp.innerHTML;
        
        // Additional sanitization: remove HTML entities that could be exploited
        sanitized = sanitized
            .replace(/&lt;/g, '')
            .replace(/&gt;/g, '')
            .replace(/&quot;/g, '')
            .replace(/&#x27;/g, '')
            .replace(/&#x2F;/g, '');
        
        return sanitized.trim();
    }

    // ==========================================
    // BUTTON STATE MANAGEMENT
    // ==========================================
    function setButtonState(state) {
        if (!submitButton || !buttonText || !buttonIcon) return;

        switch(state) {
            case 'loading':
                submitButton.disabled = true;
                submitButton.classList.add('loading');
                buttonText.textContent = 'Sending...';
                buttonIcon.className = 'fas fa-spinner fa-spin';
                break;

            case 'success':
                submitButton.disabled = true;
                submitButton.classList.remove('loading');
                submitButton.classList.add('success');
                buttonText.textContent = 'Sent Successfully!';
                buttonIcon.className = 'fas fa-check-circle';
                break;

            case 'error':
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.classList.add('error');
                buttonText.textContent = 'Failed - Try Again';
                buttonIcon.className = 'fas fa-exclamation-circle';
                break;

            case 'reset':
            default:
                submitButton.disabled = false;
                submitButton.classList.remove('loading', 'success', 'error');
                buttonText.textContent = 'Send Message';
                buttonIcon.className = 'fas fa-paper-plane';
                break;
        }
    }

    // ==========================================
    // NOTIFICATION SYSTEM
    // ==========================================
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `contact-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // ==========================================
    // FORM VALIDATION
    // ==========================================
    function validateForm(formData) {
        const errors = [];

        // Validate and sanitize name
        if (!formData.name || formData.name.length < 2) {
            errors.push('Name must be at least 2 characters');
        }
        
        // Check for potential script injection in name
        if (/<script|javascript:|onerror=/i.test(formData.name)) {
            errors.push('Invalid characters in name');
        }

        // Validate email format
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }

        // Validate message length
        if (!formData.message || formData.message.length < 10) {
            errors.push('Message must be at least 10 characters');
        }
        
        // Check for potential script injection in message
        if (/<script|javascript:|onerror=/i.test(formData.message)) {
            errors.push('Invalid characters in message');
        }

        return errors;
    }

    function isValidEmail(email) {
        // Enhanced email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // ==========================================
    // SEND EMAILS (ADMIN + AUTO-REPLY)
    // ==========================================
    async function sendEmails(formData) {
        try {
            // Sanitize all inputs before sending
            const templateParams = {
                name: sanitizeInput(formData.name),
                email: sanitizeInput(formData.email),
                message: sanitizeInput(formData.message),
                subject: sanitizeInput(formData.subject || 'No subject')
            };

            // Send admin notification email
            const adminResponse = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateAdmin,
                templateParams
            );

            // Send auto-reply to user
            const autoReplyResponse = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateAutoReply,
                templateParams
            );

            return {
                success: true,
                adminStatus: adminResponse.status,
                autoReplyStatus: autoReplyResponse.status
            };

        } catch (error) {
            // Don't expose system errors to user
            throw new Error('Email service unavailable');
        }
    }

    // ==========================================
    // FORM SUBMISSION HANDLER
    // ==========================================
    async function handleSubmit(event) {
        event.preventDefault();

        // Get and sanitize form data
        const formData = {
            name: sanitizeInput(contactForm.name.value),
            email: sanitizeInput(contactForm.email.value),
            subject: sanitizeInput(contactForm.subject?.value || ''),
            message: sanitizeInput(contactForm.message.value)
        };

        // Validate form
        const errors = validateForm(formData);
        if (errors.length > 0) {
            showNotification(errors.join('. '), 'error');
            return;
        }

        // Update button state
        setButtonState('loading');

        try {
            // Send both emails
            await sendEmails(formData);

            // Success state
            setButtonState('success');
            showNotification(
                'Message sent successfully! I\'ll get back to you soon.',
                'success'
            );

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => setButtonState('reset'), 3000);

        } catch (error) {
            // Error state - don't expose system details
            setButtonState('error');
            showNotification(
                'Unable to send message. Please try again later or email me directly.',
                'error'
            );

            // Reset button after 3 seconds
            setTimeout(() => setButtonState('reset'), 3000);
        }
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================
    function init() {
        // Initialize EmailJS
        initEmailJS();

        // Attach form submit handler
        if (contactForm) {
            contactForm.addEventListener('submit', handleSubmit);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// ==========================================
// SECURE CONTACT REVEAL
// No raw email/phone in HTML — assembled here
// ==========================================
(function () {
    'use strict';

    function initReveal() {
        var emailBtn = document.getElementById('reveal-email');
        var phoneBtn = document.getElementById('reveal-phone');

        if (emailBtn) {
            emailBtn.addEventListener('click', function () {
                var d = emailBtn.dataset;
                var addr = d.u + '\u0040' + d.d + '.' + d.t;
                window.location.href = 'mailto:' + addr;
            });
        }

        if (phoneBtn) {
            phoneBtn.addEventListener('click', function () {
                var d = phoneBtn.dataset;
                var num = d.c.replace(/\s/g, '') + d.n + d.x;
                window.location.href = 'tel:' + num;
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }
})();
