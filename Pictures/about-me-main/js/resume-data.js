/**
 * ==========================================
 * RESUME DATA — SINGLE SOURCE OF TRUTH
 * ==========================================
 * All resume content lives here.
 * HTML preview, PDF, and DOC all read from RESUME_DATA.
 * To update your resume, change only this file.
 */

'use strict';

const RESUME_DATA = {
    name: 'GULSHAN KUMAR',
    title: 'Data Engineer | ETL Pipelines | Python | SQL | Apache Airflow | AWS',
    contact: {
        email: 'gulshanrajnk@gmail.com',
        phone: '+91 9580215026',
        location: 'Mumbai (Open to relocate: Delhi NCR, Noida, Gurgaon)',
        github: 'github.com/gulshanx606',
        linkedin: 'linkedin.com/in/gulshanx606',
        githubUrl: 'https://github.com/gulshanx606',
        linkedinUrl: 'https://www.linkedin.com/in/gulshanx606/'
    },
    summary: 'Results-driven Data Engineer with ~1.2 years of hands-on experience designing and optimizing ETL pipelines, data ingestion workflows, and automation frameworks using Python and SQL. Proven track record of improving SQL query performance by 20%, building analytics-ready datasets for Power BI, and automating cross-platform data operations. Actively working with AWS S3, Apache Airflow (DAG-based orchestration), and Apache Spark to deliver scalable, production-grade data engineering solutions.',
    skills: [
        { label: 'Programming & Scripting',  value: 'Python (Pandas, NumPy, Automation), SQL (Joins, CTEs, Window Functions, Query Optimization), PowerShell, Shell Scripting (Linux/Bash)' },
        { label: 'Data Engineering',         value: 'ETL Pipelines, Data Pipeline Development, Data Ingestion, Data Transformation, Data Integration, Batch Processing, Real-Time Processing Concepts, Data Quality Validation, Workflow Automation' },
        { label: 'Big Data & Orchestration', value: 'Apache Airflow (DAG-based workflows), Apache Spark (PySpark basics), Data Lake Concepts, Scalable Pipeline Design' },
        { label: 'Cloud & Storage',          value: 'AWS S3 (Cloud Object Storage), Data Warehousing Concepts' },
        { label: 'Databases',                value: 'PostgreSQL, MySQL, Query Optimization, Performance Tuning, Data Modeling' },
        { label: 'Monitoring & Tools',       value: 'Zabbix, Log Data Processing, Git, GitHub, Jupyter Notebook, Power BI, Excel' }
    ],
    experience: [
        {
            role: 'Data Engineer',
            company: 'Affix Center',
            period: 'Oct 2025 – Present',
            points: [
                'Built and deployed end-to-end ETL pipelines using Python and SQL, enabling efficient data ingestion, transformation, and loading across structured data sources, reducing processing time by ~30%.',
                'Designed scalable data workflows integrating data ingestion from multiple sources, applying transformation logic, and loading into analytics-ready datasets for Power BI dashboards.',
                'Optimized complex SQL queries (CTEs, window functions, joins) achieving a 20% improvement in query performance and reducing report generation time significantly.',
                'Implemented robust data quality validation, logging, and monitoring systems to ensure pipeline reliability and data integrity across batch processing workflows.',
                'Automated data processing and reporting workflows, eliminating ~5+ hours of manual effort per week and improving operational efficiency.',
                'Developed data models and analytics-ready datasets consumed by BI teams for business reporting and decision-making.'
            ]
        },
        {
            role: 'Systems Engineer – Automation & Data Operations',
            company: 'Netcore Cloud',
            period: 'Apr 2025 – Oct 2025',
            points: [
                'Developed Python, PowerShell, and Shell automation scripts that streamlined cross-platform data operations across Windows, Linux, and macOS environments, reducing manual intervention by ~40%.',
                'Automated CSV-based data processing pipelines and built reporting dashboards, enabling faster access to operational insights for stakeholders.',
                'Processed and analyzed system-generated log data for monitoring and operational analysis, improving incident detection response time.',
                'Monitored enterprise infrastructure using Zabbix, performing log data analysis and proactive alerting to minimize downtime.'
            ]
        },
        {
            role: 'IT Executive – System & Monitoring Operations',
            company: 'Epigeneres Biotech Pvt Ltd',
            period: 'Mar 2023 – Mar 2025',
            points: [
                'Managed Windows Server environments and enterprise networks, ensuring 99%+ uptime for critical business systems.',
                'Supported system data processing workflows and operational reporting, contributing to performance tracking and compliance audits.',
                'Assisted in building automation scripts for system monitoring, reducing manual monitoring effort and improving response times.',
                'Maintained data security and compliance standards across enterprise systems.'
            ]
        },
        {
            role: 'Desktop Support Engineer',
            company: 'Thoughtsol InfoTech',
            period: 'Jun 2022 – Feb 2023',
            points: [
                'Provided Level-1/2 technical support for Windows/Linux systems across enterprise environments.',
                'Managed user accounts and access control via Active Directory; supported system monitoring and troubleshooting workflows.'
            ]
        }
    ],
    projects: [
        {
            title: 'Global Banking Data ETL Pipeline',
            points: [
                'Architected a multi-source ETL pipeline using Python and SQL to ingest, transform, and integrate banking data from heterogeneous sources into a centralized data store.',
                'Applied Pandas-based data transformation and processing logic with robust data quality validation, error logging, and workflow tracking, ensuring pipeline reliability.',
                'Implemented batch processing mechanisms and data integration patterns aligned with real-world data warehousing requirements.'
            ]
        },
        {
            title: 'Active Directory Self-Service Password Reset (SSPR) – Python Automation',
            points: [
                'Built a Python-based automation tool with LDAP authentication, reducing IT help desk ticket volume by automating a high-frequency manual process.',
                'Implemented secure audit logging and monitoring to track all automation actions, ensuring compliance and operational visibility.'
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
        'Hardware & Networking – Jetking Institute'
    ],
    highlights: [
        '~1.2 years of dedicated Data Engineering experience: ETL pipelines, data ingestion, transformation, and workflow automation.',
        'Hands-on with AWS S3, Apache Airflow (DAG orchestration), and Apache Spark for modern data engineering solutions.',
        'Strong Python + SQL foundation with practical experience in scalable pipeline design and data quality validation.',
        'Career progression from IT Operations → Automation Engineering → Data Engineering — demonstrating continuous upskilling.',
        'Open to relocate to Delhi NCR, Noida, or Gurgaon for the right opportunity.'
    ]
};

// ==========================================
// PREVIEW RENDERER
// Generates HTML using existing CSS classes
// for the visible #resume-content section.
// ==========================================
function generatePreviewHTML(data) {
    const skillsHTML = data.skills.map(s =>
        `<p class="resume-skill-inline"><strong>${s.label}:</strong> ${s.value}</p>`
    ).join('');

    const experienceHTML = data.experience.map(e =>
        `<div class="resume-experience">
            <div class="exp-row">
                <div class="exp-left">
                    <h3>${e.role} <span class="resume-company-inline">| ${e.company}</span></h3>
                </div>
                <span class="exp-date">${e.period}</span>
            </div>
            <ul>${e.points.map(pt => `<li>${pt}</li>`).join('')}</ul>
        </div>`
    ).join('');

    const projectsHTML = data.projects.map(p =>
        `<div class="resume-project">
            <h3>${p.title}</h3>
            <ul>${p.points.map(pt => `<li>${pt}</li>`).join('')}</ul>
        </div>`
    ).join('');

    const educationHTML = data.education.map(e =>
        `<div class="resume-cert">
            <div class="edu-row">
                <strong>${e.degree}</strong>
                <span class="exp-date">Graduated: ${e.year}</span>
            </div>
            <p class="resume-company">${e.institution}</p>
        </div>`
    ).join('');

    const certsHTML = data.certifications.map(c =>
        `<div class="resume-cert"><strong>${c}</strong></div>`
    ).join('');

    const highlightsHTML = data.highlights.map(h =>
        `<li>${h}</li>`
    ).join('');

    return `
        <div class="resume-header">
            <h1 class="resume-name">${data.name}</h1>
            <p class="resume-title">${data.title}</p>
            <div class="resume-contact">
                <span><i class="fas fa-envelope"></i> ${data.contact.email}</span>
                <span><i class="fas fa-phone"></i> ${data.contact.phone}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${data.contact.location}</span>
            </div>
            <div class="resume-links">
                <a href="${data.contact.githubUrl}" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i> ${data.contact.github}
                </a>
                <a href="${data.contact.linkedinUrl}" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin"></i> ${data.contact.linkedin}
                </a>
            </div>
        </div>

        <div class="resume-section">
            <h2 class="resume-section-title">Professional Summary</h2>
            <p>${data.summary}</p>
        </div>

        <div class="resume-section">
            <h2 class="resume-section-title">Technical Skills</h2>
            <div class="resume-skills-inline">${skillsHTML}</div>
        </div>

        <div class="resume-section">
            <h2 class="resume-section-title">Professional Experience</h2>
            ${experienceHTML}
        </div>

        <div class="resume-section">
            <h2 class="resume-section-title">Projects</h2>
            ${projectsHTML}
        </div>

        <div class="resume-section">
            <h2 class="resume-section-title">Education</h2>
            ${educationHTML}
        </div>

        <div class="resume-section">
            <h2 class="resume-section-title">Certifications</h2>
            ${certsHTML}
        </div>

        <div class="resume-section">
            <h2 class="resume-section-title">Key Highlights</h2>
            <ul class="resume-highlights-list">${highlightsHTML}</ul>
        </div>
    `;
}

// ==========================================
// EXPORT RENDERER
// Generates print-ready inline-styled HTML
// for #resume-export — used by both PDF and DOC.
// ==========================================
function generateExportHTML(data) {
    const skillsHTML = data.skills.map(s =>
        `<p style="margin:0 0 4px 0;font-size:10.5pt;line-height:1.5;"><strong>${s.label}:</strong> ${s.value}</p>`
    ).join('');

    const experienceHTML = data.experience.map(e => {
        const bullets = e.points.map(pt =>
            `<li style="margin-bottom:4px;">${pt}</li>`
        ).join('');
        return `
        <div style="margin-bottom:14px;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px;">
                <span style="font-weight:bold;font-size:11pt;">${e.role}<span style="font-weight:normal;"> | ${e.company}</span></span>
                <span style="font-size:9.5pt;white-space:nowrap;margin-left:8px;font-style:italic;">${e.period}</span>
            </div>
            <ul style="margin:4px 0 0 0;padding-left:20px;font-size:10.5pt;line-height:1.5;">${bullets}</ul>
        </div>`;
    }).join('');

    const projectsHTML = data.projects.map(p => {
        const bullets = p.points.map(pt =>
            `<li style="margin-bottom:4px;">${pt}</li>`
        ).join('');
        return `
        <div style="margin-bottom:14px;">
            <p style="margin:0 0 4px 0;font-weight:bold;font-size:11pt;">${p.title}</p>
            <ul style="margin:0;padding-left:20px;font-size:10.5pt;line-height:1.5;">${bullets}</ul>
        </div>`;
    }).join('');

    const educationHTML = data.education.map(e =>
        `<div style="margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
                <strong style="font-size:11pt;">${e.degree}</strong>
                <span style="font-size:9.5pt;white-space:nowrap;margin-left:8px;font-style:italic;">Graduated: ${e.year}</span>
            </div>
            <p style="margin:2px 0 0 0;font-size:10.5pt;">${e.institution}</p>
        </div>`
    ).join('');

    const certsHTML = data.certifications.map(c =>
        `<li style="margin-bottom:4px;">${c}</li>`
    ).join('');

    const highlightsHTML = data.highlights.map(h =>
        `<li style="margin-bottom:4px;">${h}</li>`
    ).join('');

    const sectionTitle = text =>
        `<p style="font-size:13pt;font-weight:bold;margin:14px 0 4px 0;color:#000;text-transform:uppercase;border-bottom:1.5px solid #000;padding-bottom:2px;letter-spacing:0.5px;">${text}</p>`;

    return `
    <style>*,*::before,*::after{box-sizing:border-box;overflow-wrap:break-word;word-break:break-word;}</style>
    <div style="font-family:Calibri,Arial,sans-serif;font-size:10.5pt;line-height:1.4;color:#000;width:794px;max-width:100%;margin:0 auto;padding:36px 40px;">

        <div style="text-align:center;margin-bottom:12px;">
            <p style="font-size:22pt;font-weight:bold;margin:0 0 4px 0;color:#000;text-decoration:underline;letter-spacing:1px;">${data.name}</p>
            <p style="font-size:11pt;margin:0 0 6px 0;color:#000;">${data.title}</p>
            <p style="font-size:10pt;margin:0 0 3px 0;color:#000;">
                ${data.contact.email}&nbsp;&nbsp;|&nbsp;&nbsp;${data.contact.phone}&nbsp;&nbsp;|&nbsp;&nbsp;${data.contact.location}
            </p>
            <p style="font-size:10pt;margin:0;color:#1155CC;">
                GitHub: <a href="${data.contact.githubUrl}" style="color:#1155CC;">${data.contact.github}</a>&nbsp;&nbsp;|&nbsp;&nbsp;LinkedIn: <a href="${data.contact.linkedinUrl}" style="color:#1155CC;">${data.contact.linkedin}</a>
            </p>
        </div>

        ${sectionTitle('Professional Summary')}
        <p style="margin:4px 0 0 0;font-size:10.5pt;line-height:1.5;text-align:justify;">${data.summary}</p>

        ${sectionTitle('Technical Skills')}
        <div style="margin-top:4px;">${skillsHTML}</div>

        ${sectionTitle('Professional Experience')}
        <div style="margin-top:6px;">${experienceHTML}</div>

        ${sectionTitle('Projects')}
        <div style="margin-top:6px;">${projectsHTML}</div>

        ${sectionTitle('Education')}
        <div style="margin-top:6px;">${educationHTML}</div>

        ${sectionTitle('Certifications')}
        <ul style="margin:4px 0 0 0;padding-left:20px;font-size:10.5pt;">${certsHTML}</ul>

        ${sectionTitle('Key Highlights')}
        <ul style="margin:4px 0 0 0;padding-left:20px;font-size:10.5pt;">${highlightsHTML}</ul>

    </div>`;
}

// ==========================================
// INITIALIZATION — render content on load
// ==========================================
(function renderResume() {
    function render() {
        var preview = document.getElementById('resume-content');
        if (preview) {
            preview.innerHTML = generatePreviewHTML(RESUME_DATA);
        }

        var exportDiv = document.getElementById('resume-export');
        if (exportDiv) {
            exportDiv.innerHTML = generateExportHTML(RESUME_DATA);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
