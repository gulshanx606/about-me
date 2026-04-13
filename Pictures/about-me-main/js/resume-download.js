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
                    margin:      0,
                    filename:    'Gulshan_Kumar_Resume.pdf',
                    image:       { type: 'jpeg', quality: 1 },
                    html2canvas: { scale: 2, useCORS: true, logging: false },
                    jsPDF:       { unit: 'pt', format: 'a4', orientation: 'portrait' }
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
    // DOC DOWNLOAD (Word blob from #resume-export)
    // ==========================================
    function downloadDOCX(event) {
        const button = event ? event.currentTarget : null;

        const exportEl = document.getElementById('resume-export');
        if (!exportEl) {
            setButtonState(button, 'error', 'Failed');
            setTimeout(() => setButtonState(button, 'reset'), 2000);
            return;
        }

        setButtonState(button, 'loading', 'Generating DOC...');

        try {
            const content = exportEl.innerHTML;

            const wordDocument = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
    <meta charset='utf-8'>
    <title>Gulshan Kumar - Resume</title>
    <xml>
        <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
    </xml>
</head>
<body style="font-family:Calibri,Arial,sans-serif;font-size:10.5pt;line-height:1.4;color:#000;margin:1.5cm 2cm;background:white;">
${content}
</body>
</html>`;

            const bom  = '\ufeff';
            const blob = new Blob([bom + wordDocument], {
                type: 'application/msword;charset=utf-8'
            });
            const url  = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href     = url;
            link.download = 'Gulshan_Kumar_Resume.doc';
            link.click();
            window.URL.revokeObjectURL(url);

            setButtonState(button, 'success', 'Downloaded!');
            setTimeout(() => setButtonState(button, 'reset'), 2000);

        } catch (error) {
            setButtonState(button, 'error', 'Failed');
            setTimeout(() => setButtonState(button, 'reset'), 2000);
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
