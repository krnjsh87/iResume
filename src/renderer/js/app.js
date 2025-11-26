// Main Application Controller
// Coordinates all components and manages state

class ResumeApp {
    constructor() {
        this.formData = {
            personalInfo: {},
            summary: '',
            experience: [],
            education: [],
            skills: [],
            certifications: [],
            projects: [],
            languages: [],
            references: []
        };

        this.currentCountry = 'India';
        this.currentTheme = 'Modern';
        this.currentScore = null;

        // Make app instance globally available for component callbacks
        window.appInstance = this;
    }

    async init() {
        // Load saved preferences
        const prefs = StorageService.loadPreferences();
        this.currentCountry = prefs.country;
        this.currentTheme = prefs.theme;

        // Load saved form data
        const savedData = StorageService.loadFormData();
        if (savedData) {
            this.loadFormData(savedData);
        }

        // Initialize all components
        this.initializeComponents();

        // Setup event listeners
        this.setupEventListeners();

        // Initial render
        this.renderForm();
        this.updatePreview();
        this.updateATSScore();
    }

    initializeComponents() {
        // Initialize UI components
        PanelResizer.init();
        ATSModal.init();
        PreviewRenderer.init();

        // Populate dropdowns
        this.populateCountryDropdown();
        this.populateThemeDropdown();
    }

    populateCountryDropdown() {
        const select = document.getElementById('country-select');
        const grouped = getCountriesByContinent();

        Object.keys(grouped).forEach(continent => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = continent;

            grouped[continent].forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                if (country === this.currentCountry) {
                    option.selected = true;
                }
                optgroup.appendChild(option);
            });

            select.appendChild(optgroup);
        });
    }

    populateThemeDropdown() {
        const select = document.getElementById('theme-select');
        const themes = getThemeNames();

        themes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme;
            option.textContent = theme;
            if (theme === this.currentTheme) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    }

    setupEventListeners() {
        // Country change
        document.getElementById('country-select').addEventListener('change', (e) => {
            this.currentCountry = e.target.value;
            StorageService.savePreferences({ country: this.currentCountry, theme: this.currentTheme });
            this.renderForm();
            this.updatePreview();
            this.updateATSScore();
        });

        // Theme change
        document.getElementById('theme-select').addEventListener('change', (e) => {
            this.currentTheme = e.target.value;
            StorageService.savePreferences({ country: this.currentCountry, theme: this.currentTheme });
            this.updatePreview();
        });

        // ATS score click
        document.getElementById('ats-score-btn').addEventListener('click', () => {
            if (this.currentScore) {
                ATSModal.show(this.currentScore);
            }
        });

        // Download button
        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadPDF();
        });

        // Clear Data button
        const clearDataBtn = document.getElementById('clear-data-btn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => {
                console.log('Clear Data button clicked');
                try {
                    this.clearAllData();
                } catch (error) {
                    console.error('Error in clearAllData:', error);
                    alert('Error clearing data: ' + error.message);
                }
            });
        } else {
            console.error('Clear Data button not found');
        }

        // Expand All button
        document.getElementById('expand-all-btn').addEventListener('click', () => {
            this.expandAllSections();
        });

        // Collapse All button
        document.getElementById('collapse-all-btn').addEventListener('click', () => {
            this.collapseAllSections();
        });

        // Section collapse/expand
        document.addEventListener('click', (e) => {
            if (e.target.closest('.section-header')) {
                const section = e.target.closest('.form-section');
                section.classList.toggle('collapsed');
            }
        });
    }

    renderForm() {
        const container = document.getElementById('form-container');
        const countryConfig = COUNTRIES[this.currentCountry];

        // Render all sections
        let html = '';
        html += PersonalInfoSection.render(countryConfig);
        html += SummarySection.render();
        html += ExperienceSection.render();
        html += EducationSection.render();
        html += SkillsSection.render();
        html += CertificationsSection.render();
        html += ProjectsSection.render();
        html += LanguagesSection.render();
        html += ReferencesSection.render();

        container.innerHTML = html;

        // Attach event listeners for all sections
        PersonalInfoSection.attachEventListeners();
        SummarySection.attachEventListeners();
        ExperienceSection.attachEventListeners();
        EducationSection.attachEventListeners();
        SkillsSection.attachEventListeners();
        CertificationsSection.attachEventListeners();
        ProjectsSection.attachEventListeners();
        LanguagesSection.attachEventListeners();
        ReferencesSection.attachEventListeners();
    }

    updatePreview() {
        // Gather all form data
        this.formData = {
            personalInfo: PersonalInfoSection.getData(),
            summary: SummarySection.getData(),
            experience: ExperienceSection.getData(),
            education: EducationSection.getData(),
            skills: SkillsSection.getData(),
            certifications: CertificationsSection.getData(),
            projects: ProjectsSection.getData(),
            languages: LanguagesSection.getData(),
            references: ReferencesSection.getData()
        };

        // Update preview
        PreviewRenderer.update(this.formData, this.currentTheme, this.currentCountry);

        // Save form data
        StorageService.saveFormData(this.formData);

        // Update ATS score
        this.updateATSScore();
    }

    updateATSScore() {
        const countryConfig = COUNTRIES[this.currentCountry];
        this.currentScore = ATSScorer.calculateScore(this.formData, countryConfig);

        // Update score display
        const scoreElement = document.getElementById('ats-score-value');
        scoreElement.textContent = this.currentScore.totalScore;

        // Update color based on score
        const badge = document.querySelector('.ats-score-badge');
        if (this.currentScore.totalScore >= 90) {
            badge.style.background = '#2C5F2D'; // Green
        } else if (this.currentScore.totalScore >= 75) {
            badge.style.background = '#D4AF37'; // Gold
        } else if (this.currentScore.totalScore >= 60) {
            badge.style.background = '#E67E22'; // Orange
        } else {
            badge.style.background = '#C0392B'; // Red
        }
    }

    async downloadPDF() {
        try {
            const previewContainer = document.querySelector('.resume-preview');
            if (!previewContainer) {
                alert('Please fill out some resume information first');
                return;
            }

            // Generate filename
            const name = this.formData.personalInfo?.fullName || 'Resume';
            const filename = `${name.replace(/\s+/g, '_')}_Resume.pdf`;

            // Check if we're in Electron
            if (window.electronAPI) {
                // Use Electron's save dialog
                const pdfData = await PDFGenerator.generatePDFBlob(previewContainer);
                if (pdfData) {
                    const result = await window.electronAPI.savePDF(pdfData, filename);
                    if (result.success) {
                        alert('Resume downloaded successfully!');
                    } else if (!result.canceled) {
                        alert('Error saving PDF: ' + (result.error || 'Unknown error'));
                    }
                }
            } else {
                // Fallback to direct download (browser mode)
                await PDFGenerator.generatePDF(previewContainer, filename);
            }
        } catch (error) {
            console.error('Download error:', error);
            alert('Error generating PDF. Please try again.');
        }
    }

    clearAllData() {
        try {
            console.log('clearAllData method called');

            // Confirm before clearing
            const confirmed = confirm(
                'Are you sure you want to clear all resume data? This action cannot be undone.'
            );

            if (!confirmed) {
                console.log('User cancelled clear data');
                return;
            }

            console.log('Clearing localStorage...');
            // Clear localStorage
            StorageService.clearAll();

            console.log('Clearing form sections...');
            // Clear all form sections explicitly
            if (PersonalInfoSection.clear) {
                PersonalInfoSection.clear();
            } else {
                PersonalInfoSection.setData({});
            }

            // For other sections, we can still use setData([]) as they are array-based
            // But ideally we should add clear() to them as well
            SummarySection.setData('');
            ExperienceSection.setData([]);
            EducationSection.setData([]);
            SkillsSection.setData([]);
            CertificationsSection.setData([]);
            ProjectsSection.setData([]);
            LanguagesSection.setData([]);
            ReferencesSection.setData([]);

            console.log('Resetting form data...');
            // Reset form data to default empty state
            this.formData = {
                personalInfo: {},
                summary: '',
                experience: [],
                education: [],
                skills: [],
                certifications: [],
                projects: [],
                languages: [],
                references: []
            };

            // Reset to defaults
            this.currentCountry = 'India';
            this.currentTheme = 'Modern';

            // Update dropdowns
            document.getElementById('country-select').value = this.currentCountry;
            document.getElementById('theme-select').value = this.currentTheme;

            console.log('Re-rendering form...');
            // CRITICAL: Re-render the form to update the DOM with empty fields
            this.renderForm();

            console.log('Updating preview...');
            // Update preview and ATS score
            this.updatePreview();
            this.updateATSScore();

            console.log('Data cleared successfully');
            alert('All data has been cleared successfully!');
        } catch (error) {
            console.error('Error in clearAllData:', error);
            alert('Error clearing data: ' + error.message);
        }
    }

    expandAllSections() {
        const sections = document.querySelectorAll('.form-section');
        sections.forEach(section => {
            section.classList.remove('collapsed');
        });
    }

    collapseAllSections() {
        const sections = document.querySelectorAll('.form-section');
        sections.forEach(section => {
            section.classList.add('collapsed');
        });
    }

    loadFormData(data) {
        if (data.personalInfo) PersonalInfoSection.setData(data.personalInfo);
        if (data.summary) SummarySection.setData(data.summary);
        if (data.experience) ExperienceSection.setData(data.experience);
        if (data.education) EducationSection.setData(data.education);
        if (data.skills) SkillsSection.setData(data.skills);
        if (data.certifications) CertificationsSection.setData(data.certifications);
        if (data.projects) ProjectsSection.setData(data.projects);
        if (data.languages) LanguagesSection.setData(data.languages);
        if (data.references) ReferencesSection.setData(data.references);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new ResumeApp();
    app.init();
});
