// Languages Section

const LanguagesSection = {
    data: [],

    render() {
        return `
      <div class="form-section" id="section-languages" data-section="languages">
        <div class="section-header">
          <h3><span class="section-icon">🌐</span> Languages</h3>
          <span class="collapse-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="repeatable-entries" id="language-entries">
            ${this.renderEntries()}
          </div>
          <button class="btn-add-entry" onclick="LanguagesSection.addEntry()">
            <span>+</span>
            <span>Add Language</span>
          </button>
        </div>
      </div>
    `;
    },

    renderEntries() {
        return this.data.map((lang, index) => `
      <div class="entry-item" data-index="${index}">
        <div class="entry-header">
          <span class="entry-title">Language ${index + 1}</span>
          <button class="btn-remove-entry" onclick="LanguagesSection.removeEntry(${index})">×</button>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Language</label>
            <input type="text" class="form-input" data-field="name" data-index="${index}" value="${lang.name || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Proficiency</label>
            <select class="form-input" data-field="proficiency" data-index="${index}">
              <option value="">Select</option>
              <option value="Native" ${lang.proficiency === 'Native' ? 'selected' : ''}>Native</option>
              <option value="Fluent" ${lang.proficiency === 'Fluent' ? 'selected' : ''}>Fluent</option>
              <option value="Professional" ${lang.proficiency === 'Professional' ? 'selected' : ''}>Professional</option>
              <option value="Intermediate" ${lang.proficiency === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
              <option value="Basic" ${lang.proficiency === 'Basic' ? 'selected' : ''}>Basic</option>
            </select>
          </div>
        </div>
      </div>
    `).join('');
    },

    addEntry() {
        this.data.push({ name: '', proficiency: '' });
        window.appInstance?.renderForm();
    },

    removeEntry(index) {
        this.data.splice(index, 1);
        window.appInstance?.renderForm();
        window.appInstance?.updatePreview();
    },

    attachEventListeners() {
        const inputs = document.querySelectorAll('#section-languages [data-field]');
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
