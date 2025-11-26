// Projects Section

const ProjectsSection = {
    data: [],

    render() {
        return `
      <div class="form-section" id="section-projects" data-section="projects">
        <div class="section-header">
          <h3><span class="section-icon">🚀</span> Projects</h3>
          <span class="collapse-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="repeatable-entries" id="project-entries">
            ${this.renderEntries()}
          </div>
          <button class="btn-add-entry" onclick="ProjectsSection.addEntry()">
            <span>+</span>
            <span>Add Project</span>
          </button>
        </div>
      </div>
    `;
    },

    renderEntries() {
        return this.data.map((proj, index) => `
      <div class="entry-item" data-index="${index}">
        <div class="entry-header">
          <span class="entry-title">Project ${index + 1}</span>
          <button class="btn-remove-entry" onclick="ProjectsSection.removeEntry(${index})">×</button>
        </div>
        
        <div class="form-group">
          <label class="form-label">Project Name</label>
          <input type="text" class="form-input" data-field="name" data-index="${index}" value="${proj.name || ''}">
        </div>
        
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-textarea" data-field="description" data-index="${index}" rows="4">${proj.description || ''}</textarea>
        </div>
        
        <div class="form-group">
          <label class="form-label">Technologies Used</label>
          <input type="text" class="form-input" data-field="technologies" data-index="${index}" value="${proj.technologies || ''}" placeholder="React, Node.js, MongoDB">
        </div>
      </div>
    `).join('');
    },

    addEntry() {
        this.data.push({ name: '', description: '', technologies: '' });
        window.appInstance?.renderForm();
    },

    removeEntry(index) {
        this.data.splice(index, 1);
        window.appInstance?.renderForm();
        window.appInstance?.updatePreview();
    },

    attachEventListeners() {
        const inputs = document.querySelectorAll('#section-projects [data-field]');
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
