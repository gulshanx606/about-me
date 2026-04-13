/**
 * ==========================================
 * RESUME DOWNLOAD SYSTEM
 * ==========================================
 * PDF  → html2pdf renders #resume-export
 * DOC  → Blob wraps #resume-export innerHTML
 * Content lives in resume-data.js (RESUME_DATA)
 * Works on GitHub Pages (no backend required)
 */

(function () {
    'use strict';

    // ==========================================
    // PDF DOWNLOAD (html2pdf renders #resume-export)
    // ==========================================
    async function downloadPDF(event) {
        const button = event ? event.currentTarget : null;

        if (typeof window.html2pdf !== 'function') {
            alert('PDF library not loaded. Please refresh the page.');
            return;
        }

        const exportEl = document.getElementById('resume-export');
        if (!exportEl) {
            alert('Resume content not ready. Please refresh the page.');
            return;
        }

        try {
            setButtonState(button, 'loading', 'Generating PDF...');

            // Pass innerHTML as a string so html2pdf builds its own visible
            // container — avoids blank-page issue caused by display:none on exportEl
            await window.html2pdf()
                .set({
                    margin:      [10, 10, 10, 10],
                    filename:    'Gulshan_Kumar_Resume.pdf',
                    image:       { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true, logging: false },
                    jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' }
                })
                .from(exportEl.innerHTML)
                .save();

            setButtonState(button, 'success', 'Downloaded!');
            setTimeout(() => setButtonState(button, 'reset'), 2000);

        } catch (error) {
            setButtonState(button, 'error', 'Failed');
            setTimeout(() => setButtonState(button, 'reset'), 2000);
        }
    }

    // ==========================================
    // DOC DOWNLOAD — generated fresh via mode='doc', never from innerHTML
    // ==========================================
    function downloadDOCX(event) {
        var button = event ? event.currentTarget : null;

        if (typeof generateResumeHTML !== 'function' || typeof RESUME_DATA === 'undefined') {
            setButtonState(button, 'error', 'Failed');
            setTimeout(function () { setButtonState(button, 'reset'); }, 2000);
            return;
        }

        setButtonState(button, 'loading', 'Generating DOC...');

        try {
            // Always generate DOC HTML fresh from data — NEVER reuse PDF innerHTML
            var docContent = generateResumeHTML(RESUME_DATA, 'doc');

            var wordDocument =
                '<!DOCTYPE html>\n' +
                '<html xmlns:o="urn:schemas-microsoft-com:office:office"\n' +
                '      xmlns:w="urn:schemas-microsoft-com:office:word"\n' +
                '      xmlns="http://www.w3.org/TR/REC-html40">\n' +
                '<head>\n' +
                '<meta charset="utf-8">\n' +
                '<title>Gulshan Kumar - Resume</title>\n' +
                '<xml>\n' +
                '  <w:WordDocument>\n' +
                '    <w:View>Print</w:View>\n' +
                '    <w:Zoom>100</w:Zoom>\n' +
                '    <w:DoNotOptimizeForBrowser/>\n' +
                '  </w:WordDocument>\n' +
                '</xml>\n' +
                '<style>\n' +
                '  @page  { margin: 1.5cm 2cm; }\n' +
                '  body   { font-family: Arial, Helvetica, sans-serif; font-size: 11.5px;\n' +
                '           color: #1a1a1a; margin: 0; background: white; }\n' +
                '  table  { border-collapse: collapse !important; border-spacing: 0 !important;\n' +
                '           mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;\n' +
                '           border: none !important; }\n' +
                '  tr     { border: none !important; background: transparent !important; }\n' +
                '  td, th { border: none !important; mso-border-alt: none !important;\n' +
                '           padding: 0 !important; }\n' +
                '  p      { margin: 0; }\n' +
                '  ul     { margin: 0; padding-left: 16px; }\n' +
                '  h1, h2 { margin: 0; }\n' +
                '</style>\n' +
                '</head>\n' +
                '<body>\n' +
                docContent + '\n' +
                '</body>\n' +
                '</html>';

            var bom  = '\ufeff';
            var blob = new Blob([bom + wordDocument], {
                type: 'application/msword;charset=utf-8'
            });
            var url  = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href     = url;
            link.download = 'Gulshan_Kumar_Resume.doc';
            link.click();
            window.URL.revokeObjectURL(url);

            setButtonState(button, 'success', 'Downloaded!');
            setTimeout(function () { setButtonState(button, 'reset'); }, 2000);

        } catch (error) {
            setButtonState(button, 'error', 'Failed');
            setTimeout(function () { setButtonState(button, 'reset'); }, 2000);
        }
    }

    // ==========================================
    // BUTTON STATE MANAGEMENT
    // ==========================================
    function setButtonState(button, state, text) {
        if (!button) return;

        const span = button.querySelector('span');
        const icon = button.querySelector('i');

        switch (state) {
            case 'loading':
                button.disabled = true;
                button.classList.add('loading');
                if (span) span.textContent = text || 'Processing...';
                if (icon) icon.className = 'fas fa-spinner fa-spin';
                break;

            case 'success':
                button.disabled = false;
                button.classList.remove('loading');
                button.classList.add('success');
                if (span) span.textContent = text || 'Success!';
                if (icon) icon.className = 'fas fa-check-circle';
                break;

            case 'error':
                button.disabled = false;
                button.classList.remove('loading');
                button.classList.add('error');
                if (span) span.textContent = text || 'Error';
                if (icon) icon.className = 'fas fa-exclamation-circle';
                break;

            case 'reset':
            default:
                button.disabled = false;
                button.classList.remove('loading', 'success', 'error');
                if (button.id === 'download-pdf' || button.id === 'hero-download-pdf') {
                    if (span) span.textContent = button.id === 'hero-download-pdf' ? 'PDF Format' : 'Download PDF';
                    if (icon) icon.className = 'fas fa-file-pdf';
                } else if (button.id === 'download-docx' || button.id === 'hero-download-docx') {
                    if (span) span.textContent = button.id === 'hero-download-docx' ? 'DOC Format' : 'Download DOCX';
                    if (icon) icon.className = 'fas fa-file-word';
                }
                break;
        }
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================
    function init() {
        const attachListeners = () => {
            ['download-pdf', 'hero-download-pdf'].forEach(id => {
                const btn = document.getElementById(id);
                if (btn) btn.addEventListener('click', downloadPDF);
            });
            ['download-docx', 'hero-download-docx'].forEach(id => {
                const btn = document.getElementById(id);
                if (btn) btn.addEventListener('click', downloadDOCX);
            });
        };

        // html2pdf.js is loaded as a CDN bundle — wait for it if needed
        if (typeof window.html2pdf === 'function') {
            attachListeners();
        } else {
            const check = setInterval(() => {
                if (typeof window.html2pdf === 'function') {
                    clearInterval(check);
                    attachListeners();
                }
            }, 100);

            // Fallback: attach listeners regardless after 10s
            setTimeout(() => {
                clearInterval(check);
                attachListeners();
            }, 10000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose to global scope (prevents minification issues)
    window.downloadPDF  = function () { downloadPDF(null); };
    window.downloadDOCX = function () { downloadDOCX(null); };

})();
