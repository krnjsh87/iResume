// Preview Component
// Renders live preview of resume with selected theme and country format

const PreviewRenderer = {
    container: null,
    currentData: null,
    currentTheme: 'Modern',
    currentCountry: 'India',

    init() {
        this.container = document.getElementById('preview-container');
        if (!this.container) {
            console.error('Preview container not found');
            return;
        }
    },

    update(formData, theme, country) {
        this.currentData = formData;
        this.currentTheme = theme;
        this.currentCountry = country;
        this.render();
    },

    render() {
        if (!this.currentData) {
            this.container.innerHTML = '<div class="preview-watermark">iResume</div><div class="loading">Start filling out your resume...</div>';
            return;
        }

        const themeClass = `theme-${this.currentTheme.toLowerCase().replace(/\s+/g, '-')}`;
        const countryConfig = COUNTRIES[this.currentCountry];

        let html = `<div class="preview-watermark">iResume</div><div class="resume-page"><div class="resume-preview ${themeClass}">`;

        // Header
        html += this.renderHeader(countryConfig);

        // Render sections in country-specific order
        const sectionOrder = countryConfig.sectionOrder ||
            ["summary", "experience", "education", "skills", "certifications", "projects", "languages", "references"];

        const sectionRenderers = {
            summary: () => this.currentData.summary && countryConfig.fields.summary ? this.renderSummary() : '',
            experience: () => this.currentData.experience && this.currentData.experience.length > 0 ? this.renderExperience() : '',
            education: () => this.currentData.education && this.currentData.education.length > 0 ? this.renderEducation() : '',
            skills: () => this.currentData.skills && this.currentData.skills.length > 0 ? this.renderSkills() : '',
            projects: () => this.currentData.projects && this.currentData.projects.length > 0 ? this.renderProjects() : '',
            certifications: () => this.currentData.certifications && this.currentData.certifications.length > 0 ? this.renderCertifications() : '',
            languages: () => this.currentData.languages && this.currentData.languages.length > 0 ? this.renderLanguages() : '',
            references: () => this.currentData.references && this.currentData.references.length > 0 && countryConfig.fields.references ? this.renderReferences() : ''
        };

        // Render sections in the specified order
        sectionOrder.forEach(sectionName => {
            if (sectionRenderers[sectionName]) {
                html += sectionRenderers[sectionName]();
            }
        });

        html += `</div></div>`;
        this.container.innerHTML = html;
    },

    renderHeader(countryConfig) {
        const personal = this.currentData.personalInfo || {};
        let html = '<div class="resume-header">';

        // Photo (if country requires it)
        if (countryConfig.fields.photo && personal.photoData) {
            html += `<div class="resume-photo-container"><img src="${personal.photoData}" alt="Photo" class="resume-photo"></div>`;
        }

        // Name
        html += `<div class="resume-name">${personal.fullName || 'Your Name'}</div>`;

        // Contact info
        html += '<div class="resume-contact">';
        if (personal.email) {
            html += `<span class="resume-contact-item">✉ ${personal.email}</span>`;
        }
        if (personal.phone) {
            html += `<span class="resume-contact-item">📱 ${personal.phone}</span>`;
        }
        if (personal.address) {
            html += `<span class="resume-contact-item">📍 ${personal.address}</span>`;
        }
        if (personal.linkedin) {
            html += `<span class="resume-contact-item">💼 ${personal.linkedin}</span>`;
        }
        html += '</div>';

        // Personal details (if country requires)
        if (countryConfig.fields.dateOfBirth || countryConfig.fields.nationality || countryConfig.fields.gender) {
            html += '<div class="resume-personal-info">';
            if (countryConfig.fields.dateOfBirth && personal.dateOfBirth) {
                html += `<span>DOB: ${personal.dateOfBirth}</span>`;
            }
            if (countryConfig.fields.nationality && personal.nationality) {
                html += `<span>Nationality: ${personal.nationality}</span>`;
            }
            if (countryConfig.fields.gender && personal.gender) {
                html += `<span>Gender: ${personal.gender}</span>`;
            }
            if (countryConfig.fields.maritalStatus && personal.maritalStatus) {
                html += `<span>Marital Status: ${personal.maritalStatus}</span>`;
            }
            html += '</div>';
        }

        html += '</div>';
        return html;
    },

    renderSummary() {
        return `
      <div class="resume-section">
        <div class="resume-section-title">Professional Summary</div>
        <div>${this.escapeHtml(this.currentData.summary)}</div>
      </div>
    `;
    },

    renderExperience() {
        let html = '<div class="resume-section"><div class="resume-section-title">Work Experience</div>';

        this.currentData.experience.forEach(exp => {
            html += `
        <div class="resume-entry">
          <div class="resume-entry-header">
            <div>
              <div class="resume-entry-title">${this.escapeHtml(exp.position || '')}</div>
              <div class="resume-entry-subtitle">${this.escapeHtml(exp.company || '')}</div>
            </div>
            <div class="resume-entry-date">${this.escapeHtml(exp.startDate || '')} - ${exp.current ? 'Present' : this.escapeHtml(exp.endDate || '')}</div>
          </div>
          ${exp.description ? `<div class="resume-entry-description">${this.formatDescription(exp.description)}</div>` : ''}
        </div>
      `;
        });

        html += '</div>';
        return html;
    },

    renderEducation() {
        let html = '<div class="resume-section"><div class="resume-section-title">Education</div>';

        this.currentData.education.forEach(edu => {
            html += `
        <div class="resume-entry">
          <div class="resume-entry-header">
            <div>
              <div class="resume-entry-title">${this.escapeHtml(edu.degree || '')}</div>
              <div class="resume-entry-subtitle">${this.escapeHtml(edu.institution || '')}</div>
            </div>
            <div class="resume-entry-date">${this.escapeHtml(edu.graduationDate || '')}</div>
          </div>
          ${edu.field ? `<div>${this.escapeHtml(edu.field)}</div>` : ''}
          ${edu.gpa ? `<div>GPA: ${this.escapeHtml(edu.gpa)}</div>` : ''}
        </div>
      `;
        });

        html += '</div>';
        return html;
    },

    renderSkills() {
        let html = '<div class="resume-section"><div class="resume-section-title">Skills</div>';
        html += '<div class="resume-skills">';

        this.currentData.skills.forEach(skill => {
            html += `<span class="resume-skill-tag">${this.escapeHtml(skill)}</span>`;
        });

        html += '</div></div>';
        return html;
    },

    renderProjects() {
        let html = '<div class="resume-section"><div class="resume-section-title">Projects</div>';

        this.currentData.projects.forEach(proj => {
            html += `
        <div class="resume-entry">
          <div class="resume-entry-title">${this.escapeHtml(proj.name || '')}</div>
          ${proj.description ? `<div class="resume-entry-description">${this.formatDescription(proj.description)}</div>` : ''}
          ${proj.technologies ? `<div><strong>Technologies:</strong> ${this.escapeHtml(proj.technologies)}</div>` : ''}
        </div>
      `;
        });

        html += '</div>';
        return html;
    },

    renderCertifications() {
        let html = '<div class="resume-section"><div class="resume-section-title">Certifications</div>';

        this.currentData.certifications.forEach(cert => {
            html += `
        <div class="resume-entry">
          <div class="resume-entry-header">
            <div class="resume-entry-title">${this.escapeHtml(cert.name || '')}</div>
            <div class="resume-entry-date">${this.escapeHtml(cert.date || '')}</div>
          </div>
          ${cert.issuer ? `<div class="resume-entry-subtitle">${this.escapeHtml(cert.issuer)}</div>` : ''}
        </div>
      `;
        });

        html += '</div>';
        return html;
    },

    renderLanguages() {
        let html = '<div class="resume-section"><div class="resume-section-title">Languages</div>';
        html += '<div class="resume-skills">';

        this.currentData.languages.forEach(lang => {
            const display = lang.proficiency ? `${lang.name} (${lang.proficiency})` : lang.name;
            html += `<span class="resume-skill-tag">${this.escapeHtml(display)}</span>`;
        });

        html += '</div></div>';
        return html;
    },

    renderReferences() {
        let html = '<div class="resume-section"><div class="resume-section-title">References</div>';

        this.currentData.references.forEach(ref => {
            html += `
        <div class="resume-entry">
          <div class="resume-entry-title">${this.escapeHtml(ref.name || '')}</div>
          ${ref.position ? `<div>${this.escapeHtml(ref.position)}</div>` : ''}
          ${ref.company ? `<div>${this.escapeHtml(ref.company)}</div>` : ''}
          ${ref.email ? `<div>✉ ${this.escapeHtml(ref.email)}</div>` : ''}
          ${ref.phone ? `<div>📱 ${this.escapeHtml(ref.phone)}</div>` : ''}
        </div>
      `;
        });

        html += '</div>';
        return html;
    },

    formatDescription(text) {
        // Convert bullet points
        text = text.replace(/^[•\-\*]\s/gm, '• ');
        // Convert line breaks to HTML
        text = text.replace(/\n/g, '<br>');
        return this.escapeHtml(text);
    },

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
