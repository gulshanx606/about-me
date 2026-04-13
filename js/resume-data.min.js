'use strict';

// ==========================================
// RESUME DATA — SINGLE SOURCE OF TRUTH
// ==========================================
const RESUME_DATA = {
    name: 'Gulshan Kumar',
    titleFull: 'Data Engineer | ETL Pipelines | Python | SQL | Apache Airflow | AWS',
    contact: {
        email: 'gulshanrajnk@gmail.com',
        phone: '+91-9580215026',
        location: 'Mumbai, Maharashtra | Open to relocate: Delhi NCR, Noida, Gurgaon',
        linkedin: 'linkedin.com/in/gulshanx606',
        github: 'github.com/gulshanx606'
    },
    summary: 'Results-driven Data Engineer with 1.2 years of hands-on experience designing, building, and optimizing ETL pipelines, data ingestion workflows, and automation frameworks using Python and SQL. Delivered a 20% improvement in SQL query performance, built analytics-ready datasets for Power BI dashboards, and automated cross-platform data operations. Proficient in AWS S3, Apache Airflow (DAG-based orchestration), and Apache Spark to architect scalable, production-grade data engineering solutions.',
    skills: [
        { label: 'Programming & Scripting',  value: 'Python (Pandas, NumPy, Automation), SQL (Joins, CTEs, Window Functions, Query Optimization), PowerShell, Shell Scripting (Linux/Bash)' },
        { label: 'Data Engineering',         value: 'ETL Pipelines, Data Pipeline Development, Data Ingestion, Data Transformation, Data Integration, Batch Processing, Real-Time Processing, Data Quality Validation, Workflow Automation' },
        { label: 'Big Data & Orchestration', value: 'Apache Airflow (DAG-based workflows), Apache Spark (PySpark), Data Lake Architecture, Scalable Pipeline Design' },
        { label: 'Cloud & Storage',          value: 'AWS S3, Data Warehousing, Cloud Data Architecture' },
        { label: 'Databases',                value: 'PostgreSQL, MySQL, Query Optimization, Performance Tuning, Data Modeling' },
        { label: 'Tools & Monitoring',       value: 'Zabbix, Git, GitHub, Jupyter Notebook, Power BI, Excel, Log Data Processing' }
    ],
    experience: [
        {
            role: 'Data Engineer',
            company: 'Affix Center',
            period: 'October 2025 – Present',
            points: [
                'Architected and deployed end-to-end ETL pipelines using Python and SQL, reducing data processing time by 30% across structured data sources.',
                'Designed scalable data ingestion workflows integrating multiple source systems, transforming raw data into analytics-ready datasets for Power BI dashboards.',
                'Optimized complex SQL queries using CTEs, window functions, and joins — achieving 20% improvement in query performance and significantly reducing report generation time.',
                'Implemented data quality validation, logging, and monitoring systems to ensure pipeline reliability and data integrity across batch processing workflows.',
                'Automated data processing and reporting workflows, eliminating 5+ hours of manual effort per week.',
                'Developed data models and analytics-ready datasets consumed by BI teams for business reporting and decision-making.'
            ]
        },
        {
            role: 'Systems Engineer, Automation and Data Operations',
            company: 'Netcore Cloud',
            period: 'April 2025 – October 2025',
            points: [
                'Developed Python, PowerShell, and Shell automation scripts to streamline cross-platform data operations across Windows, Linux, and macOS, reducing manual intervention by 40%.',
                'Automated CSV-based data processing pipelines and built reporting dashboards for faster operational insights.',
                'Processed and analyzed system-generated log data, improving incident detection and response time.',
                'Designed automation workflows for OS patch scheduling, system restarts, and application deployment.',
                'Monitored enterprise infrastructure using Zabbix, performing log analysis and proactive alerting to minimize downtime.'
            ]
        },
        {
            role: 'IT Executive, System and Monitoring Operations',
            company: 'Epigeneres Biotech Pvt Ltd',
            period: 'March 2023 – March 2025',
            points: [
                'Managed Windows Server environments and enterprise networks, maintaining 99%+ uptime for critical business systems.',
                'Supported system data processing workflows and operational reporting for performance tracking and compliance audits.',
                'Built automation scripts for system monitoring, reducing manual effort and improving response times.',
                'Maintained data security and compliance standards across enterprise systems.'
            ]
        },
        {
            role: 'Desktop Support Engineer',
            company: 'Thoughtsol InfoTech',
            period: 'June 2022 – February 2023',
            points: [
                'Provided Level 1 and Level 2 technical support for Windows and Linux systems across enterprise environments.',
                'Managed user accounts and access control via Active Directory; supported monitoring and troubleshooting workflows.'
            ]
        }
    ],
    projects: [
        {
            title: 'Global Banking Data ETL Pipeline',
            points: [
                'Architected a multi-source ETL pipeline using Python and SQL to ingest, transform, and integrate banking data from heterogeneous sources into a centralized data warehouse.',
                'Applied Pandas-based transformation logic with data quality validation, error logging, and workflow tracking for pipeline reliability.',
                'Implemented batch processing mechanisms aligned with real-world data warehousing requirements.'
            ]
        },
        {
            title: 'Active Directory Self-Service Password Reset (SSPR) — Python Automation',
            points: [
                'Built a Python automation tool with LDAP authentication, reducing IT help desk ticket volume by automating a high-frequency manual process.',
                'Implemented secure audit logging and monitoring to track all automation actions for compliance and operational visibility.'
            ]
        }
    ],
    education: [
        {
            degree: 'Bachelor of Computer Applications (BCA)',
            institution: 'TMV University, Pune',
            year: '2025'
        }
    ],
    certifications: [
        'IBM Data Engineering Professional Certificate',
        'Hardware and Networking — Jetking Institute'
    ],
    highlights: [
        '1.2 years of dedicated Data Engineering experience across ETL pipelines, data ingestion, transformation, and automation.',
        'Hands-on with AWS S3, Apache Airflow, and Apache Spark for production-grade data engineering.',
        'Strong Python and SQL foundation with experience in scalable pipeline design and data quality validation.',
        'Progressive career: IT Operations → Automation Engineering → Data Engineering.',
        'Open to relocate to Delhi NCR, Noida, or Gurgaon.'
    ]
};

// ==========================================
// LAYOUT CONFIG — Single Source of Truth
// ==========================================
// Controls all dimensional differences between PDF and DOC modes.
// PDF uses responsive % widths; DOC uses fixed px for MSO compat.
// ==========================================
var RESUME_LAYOUT = {
    pdf: {
        containerBase: 'background:#ffffff;max-width:794px;width:100%;padding:40px 48px;box-sizing:border-box;',
        tableWidth:    '100%',
        colLeft:       '72%',
        colRight:      '28%'
    },
    doc: {
        containerBase: 'width:524px;padding:0;',
        tableWidth:    '524px',
        colLeftPx:     374,
        colRightPx:    150
    }
};

// ==========================================
// RENDERER — generateResumeHTML(data, mode)
// ==========================================
// Single HTML generator. mode = 'pdf' (default) | 'doc'.
// PDF mode: responsive %, existing layout preserved exactly.
// DOC mode: fixed px widths + MSO properties for Word compat.
// 100% inline styles. No CSS classes. No <style> blocks.
// ==========================================
function generateResumeHTML(data, mode) {
    mode = mode || 'pdf';
    var isDoc  = (mode === 'doc');
    var layout = RESUME_LAYOUT[mode] || RESUME_LAYOUT.pdf;

    // ── Shared style strings ──────────────────────────────────────
    // DOC: font-family lives in <body> only — remove from all inline styles
    // PDF: font-family stays inline as before (no body reset available)
    var FONT = isDoc ? '' : 'font-family:Arial,Helvetica,sans-serif;';

    // PDF keeps 1.5px border (existing, unchanged); DOC uses spec value 1.2px
    var borderWidth = isDoc ? '1.2px' : '1.5px';
    var H2 = FONT + 'font-size:11.5px;font-weight:700;text-transform:uppercase;' +
             'letter-spacing:0.8px;border-bottom:' + borderWidth + ' solid #1a1a1a;' +
             'padding-bottom:3px;margin:14px 0 6px 0;color:#1a1a1a;display:block';

    // ── TABLE HELPER ─────────────────────────────────────────────
    // PDF: table-layout:fixed + percentage widths (html2pdf compat).
    // DOC: HTML attributes (Word trusts these over CSS) + fixed px +
    //      explicit white backgrounds to kill Word's grey cell shading +
    //      mso-background-alt so Word's own renderer also sees white.
    function roleRow(leftText, rightText, leftBold) {
        if (isDoc) {
            var tStyle = 'width:524px;table-layout:fixed;border-collapse:collapse;border:none;' +
                         'mso-table-layout-alt:fixed;mso-padding-alt:0;mso-border-alt:none;' +
                         'mso-table-width-alt:5240;margin-bottom:2px;';
            var lStyle = 'width:' + layout.colLeftPx + 'px;' +
                         'mso-width-alt:' + (layout.colLeftPx * 10) + ';' +
                         (leftBold ? 'font-weight:700;' : '') +
                         'font-size:12px;color:#1a1a1a;padding:0;vertical-align:top;' +
                         'word-wrap:break-word;background-color:#ffffff;' +
                         'mso-background-alt:#ffffff;border:none;mso-border-alt:none;';
            var rStyle = 'width:' + layout.colRightPx + 'px;' +
                         'mso-width-alt:' + (layout.colRightPx * 10) + ';' +
                         'font-size:11px;color:#555;font-style:italic;' +
                         'padding:0;vertical-align:top;text-align:right;' +
                         'white-space:nowrap;background-color:#ffffff;' +
                         'mso-background-alt:#ffffff;border:none;mso-border-alt:none;';
            return '<table width="524" cellpadding="0" cellspacing="0" border="0" style="' + tStyle + '"><tr>' +
                   '<td style="' + lStyle + '">' + leftText  + '</td>' +
                   '<td style="' + rStyle + '">' + rightText + '</td>' +
                   '</tr></table>';
        }
        var tableStyle = 'width:100%;table-layout:fixed;border-collapse:collapse;' +
                         'margin-bottom:2px;font-family:Arial,Helvetica,sans-serif;';
        var leftStyle  = 'width:72%;' + (leftBold ? 'font-weight:700;' : '') +
                         'font-size:12px;color:#1a1a1a;padding:0;vertical-align:top;' +
                         'word-wrap:break-word;overflow-wrap:break-word;' +
                         'font-family:Arial,Helvetica,sans-serif;';
        var rightStyle = 'width:28%;font-size:11px;color:#555;font-style:italic;' +
                         'padding:0;vertical-align:top;text-align:right;' +
                         'word-wrap:break-word;overflow-wrap:break-word;' +
                         'font-family:Arial,Helvetica,sans-serif;';
        return '<table style="' + tableStyle + '"><tr>' +
               '<td style="' + leftStyle  + '">' + leftText  + '</td>' +
               '<td style="' + rightStyle + '">' + rightText + '</td>' +
               '</tr></table>';
    }

    // ── SKILLS ───────────────────────────────────────────────────
    var skillsHTML = data.skills.map(function (s) {
        return '<p style="' + FONT + 'font-size:11.5px;margin:0 0 4px 0;line-height:1.55">' +
               '<strong>' + s.label + ':</strong> ' + s.value + '</p>';
    }).join('');

    // ── EXPERIENCE ───────────────────────────────────────────────
    var experienceHTML = data.experience.map(function (e) {
        var bullets = e.points.map(function (pt) {
            return '<li style="' + FONT + 'font-size:11.5px;line-height:1.55;margin-bottom:2px">' +
                   pt + '</li>';
        }).join('');
        return roleRow(e.role, e.period, true) +
               '<p style="' + FONT + 'font-size:11.5px;font-weight:600;color:#333;margin:2px 0 4px 0">' +
                   e.company + '</p>' +
               '<ul style="padding-left:16px;margin:3px 0 12px 0">' + bullets + '</ul>';
    }).join('');

    // ── PROJECTS ─────────────────────────────────────────────────
    var projectsHTML = data.projects.map(function (p) {
        var bullets = p.points.map(function (pt) {
            return '<li style="' + FONT + 'font-size:11.5px;line-height:1.55;margin-bottom:2px">' +
                   pt + '</li>';
        }).join('');
        return '<p style="' + FONT + 'font-size:12px;font-weight:700;color:#1a1a1a;margin:0 0 3px 0">' +
                   p.title + '</p>' +
               '<ul style="padding-left:16px;margin:3px 0 12px 0">' + bullets + '</ul>';
    }).join('');

    // ── EDUCATION ────────────────────────────────────────────────
    var educationHTML = data.education.map(function (e) {
        return roleRow(e.degree, e.year, true) +
               '<p style="' + FONT + 'font-size:11.5px;color:#444;margin:2px 0 8px 0">' +
                   e.institution + '</p>';
    }).join('');

    // ── CERTIFICATIONS ───────────────────────────────────────────
    var certsHTML = data.certifications.map(function (c) {
        return '<li style="' + FONT + 'font-size:11.5px;line-height:1.55;margin-bottom:3px">' +
               c + '</li>';
    }).join('');

    // ── HIGHLIGHTS ───────────────────────────────────────────────
    var highlightsHTML = data.highlights.map(function (h) {
        return '<li style="' + FONT + 'font-size:11.5px;line-height:1.55;margin-bottom:3px">' +
               h + '</li>';
    }).join('');

    // ── FULL HTML ────────────────────────────────────────────────
    // Container: PDF uses responsive max-width; DOC uses fixed 524px per layout config.
    var containerStyle = layout.containerBase + FONT + 'font-size:11.5px;color:#1a1a1a;line-height:1.5;' +
                         (isDoc ? '' : 'display:block;');

    return (
        '<div style="' + containerStyle + '">' +

        /* HEADER */
        '<h1 style="' + FONT + 'font-size:22px;font-weight:700;margin:0 0 2px 0;color:#1a1a1a">' +
            data.name + '</h1>' +
        '<p style="' + FONT + 'font-size:12.5px;font-weight:600;color:#333;margin:0 0 6px 0">' +
            data.titleFull + '</p>' +
        '<p style="' + FONT + 'font-size:11px;color:#333;margin:0 0 2px 0">' +
            '<strong>Email:</strong> ' + data.contact.email + ' &nbsp;|&nbsp; ' +
            '<strong>Phone:</strong> ' + data.contact.phone + ' &nbsp;|&nbsp; ' +
            '<strong>Location:</strong> ' + data.contact.location +
        '</p>' +
        '<p style="' + FONT + 'font-size:11px;color:#333;margin:0 0 10px 0;' +
            'padding-bottom:8px;border-bottom:1px solid #d0d0d0">' +
            '<strong>LinkedIn:</strong> ' + data.contact.linkedin + ' &nbsp;|&nbsp; ' +
            '<strong>GitHub:</strong> ' + data.contact.github +
        '</p>' +

        /* SUMMARY */
        '<h2 style="' + H2 + '">Summary</h2>' +
        '<p style="' + FONT + 'font-size:11.5px;margin:0 0 6px 0;line-height:1.6">' +
            data.summary + '</p>' +

        /* TECHNICAL SKILLS */
        '<h2 style="' + H2 + '">Technical Skills</h2>' +
        '<div style="margin-bottom:6px">' + skillsHTML + '</div>' +

        /* EXPERIENCE */
        '<h2 style="' + H2 + '">Experience</h2>' +
        experienceHTML +

        /* PROJECTS */
        '<h2 style="' + H2 + '">Projects</h2>' +
        projectsHTML +

        /* EDUCATION */
        '<h2 style="' + H2 + '">Education</h2>' +
        educationHTML +

        /* CERTIFICATIONS */
        '<h2 style="' + H2 + '">Certifications</h2>' +
        '<ul style="padding-left:16px;margin:3px 0 10px 0">' + certsHTML + '</ul>' +

        /* KEY HIGHLIGHTS */
        '<h2 style="' + H2 + '">Key Highlights</h2>' +
        '<ul style="padding-left:16px;margin:3px 0">' + highlightsHTML + '</ul>' +

        '</div>'
    );
}

// ==========================================
// INIT — render preview and export on load
// ==========================================
(function renderResume() {
    function render() {
        var html = generateResumeHTML(RESUME_DATA);
        var preview = document.getElementById('resume-content');
        if (preview) preview.innerHTML = html;
        var exportDiv = document.getElementById('resume-export');
        if (exportDiv) exportDiv.innerHTML = html;
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();