// Education Section

const EducationSection = {
    data: [],

    render() {
        return `
      <div class="form-section" id="section-education" data-section="education">
        <div class="section-header">
          <h3><span class="section-icon">🎓</span> Education</h3>
          <span class="collapse-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="repeatable-entries" id="education-entries">
            ${this.renderEntries()}
          </div>
          <button class="btn-add-entry" onclick="EducationSection.addEntry()">
            <span>+</span>
            <span>Add Education</span>
          </button>
        </div>
      </div>
    `;
    },

    renderEntries() {
        if (this.data.length === 0) {
            this.addEntry();
        }

        return this.data.map((edu, index) => `
      <div class="entry-item" data-index="${index}">
        <div class="entry-header">
          <span class="entry-title">Education ${index + 1}</span>
          ${this.data.length > 1 ? `<button class="btn-remove-entry" onclick="EducationSection.removeEntry(${index})">×</button>` : ''}
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Degree</label>
            <input type="text" class="form-input" data-field="degree" data-index="${index}" value="${edu.degree || ''}" placeholder="Bachelor of Science">
          </div>
          <div class="form-group">
            <label class="form-label">Field of Study</label>
            <input type="text" class="form-input" data-field="field" data-index="${index}" value="${edu.field || ''}" placeholder="Computer Science">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Institution</label>
            <input type="text" class="form-input" data-field="institution" data-index="${index}" value="${edu.institution || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Graduation Date</label>
            <input type="month" class="form-input" data-field="graduationDate" data-index="${index}" value="${edu.graduationDate || ''}">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">GPA (Optional)</label>
            <input type="text" class="form-input" data-field="gpa" data-index="${index}" value="${edu.gpa || ''}" placeholder="3.8/4.0">
          </div>
        </div>
      </div>
    `).join('');
    },

    addEntry() {
        this.data.push({
            degree: '',
            field: '',
            institution: '',
            graduationDate: '',
            gpa: ''
        });
        window.appInstance?.renderForm();
    },

    removeEntry(index) {
        this.data.splice(index, 1);
        window.appInstance?.renderForm();
        window.appInstance?.updatePreview();
    },

    attachEventListeners() {
        const inputs = document.querySelectorAll('#section-education [data-field]');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const index = parseInt(input.dataset.index);
                const field = input.dataset.field;
                this.data[index][field] = input.value;
                window.appInstance?.updatePreview();
            });
        });
    },

    getData() {
        return this.data;
    },

    setData(data) {
        this.data = data || [];
    }
};
