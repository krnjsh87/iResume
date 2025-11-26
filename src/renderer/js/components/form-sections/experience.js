// Work Experience Section

const ExperienceSection = {
  data: [],

  render() {
    return `
      <div class="form-section" id="section-experience" data-section="experience">
        <div class="section-header">
          <h3><span class="section-icon">💼</span> Work Experience</h3>
          <span class="collapse-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="repeatable-entries" id="experience-entries">
            ${this.renderEntries()}
          </div>
          <button class="btn-add-entry" onclick="ExperienceSection.addEntry()">
            <span>+</span>
            <span>Add Experience</span>
          </button>
        </div>
      </div>
    `;
  },

  renderEntries() {
    if (this.data.length === 0) {
      this.addEntry();
    }

    return this.data.map((exp, index) => `
      <div class="entry-item" data-index="${index}">
        <div class="entry-header">
          <span class="entry-title">Experience ${index + 1}</span>
          ${this.data.length > 1 ? `<button class="btn-remove-entry" onclick="ExperienceSection.removeEntry(${index})">×</button>` : ''}
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Position</label>
            <input type="text" class="form-input" data-field="position" data-index="${index}" value="${exp.position || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Company</label>
            <input type="text" class="form-input" data-field="company" data-index="${index}" value="${exp.company || ''}">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Start Date</label>
            <input type="month" class="form-input" data-field="startDate" data-index="${index}" value="${exp.startDate || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">End Date</label>
            <input type="month" class="form-input" data-field="endDate" data-index="${index}" value="${exp.endDate || ''}" ${exp.current ? 'disabled' : ''}>
          </div>
        </div>
        
        <div class="form-group">
          <label style="display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" data-field="current" data-index="${index}" ${exp.current ? 'checked' : ''}>
            <span>Currently working here</span>
          </label>
        </div>
        
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-textarea" data-field="description" data-index="${index}" placeholder="• Led team of 5 developers&#10;• Increased sales by 30%&#10;• Managed $2M budget" rows="5">${exp.description || ''}</textarea>
          <small style="color: #666;">Use bullet points (•) and include measurable achievements</small>
        </div>
      </div>
    `).join('');
  },

  addEntry() {
    this.data.push({
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    window.appInstance?.renderForm();
  },

  removeEntry(index) {
    this.data.splice(index, 1);
    window.appInstance?.renderForm();
    window.appInstance?.updatePreview();
  },

  attachEventListeners() {
    const inputs = document.querySelectorAll('#section-experience [data-field]');
    inputs.forEach(input => {
      const index = parseInt(input.dataset.index);
      const field = input.dataset.field;

      if (input.type === 'checkbox') {
        input.addEventListener('change', () => {
          this.data[index][field] = input.checked;
          if (field === 'current') {
            window.appInstance?.renderForm();
          }
          window.appInstance?.updatePreview();
        });
      } else {
        input.addEventListener('input', () => {
          this.data[index][field] = input.value;
          window.appInstance?.updatePreview();
        });
      }
    });
  },

  getData() {
    return this.data;
  },

  setData(data) {
    this.data = data || [];
  }
};
