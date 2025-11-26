// References Section

const ReferencesSection = {
    data: [],

    render() {
        return `
      <div class="form-section" id="section-references" data-section="references">
        <div class="section-header">
          <h3><span class="section-icon">👥</span> References</h3>
          <span class="collapse-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="repeatable-entries" id="reference-entries">
            ${this.renderEntries()}
          </div>
          <button class="btn-add-entry" onclick="ReferencesSection.addEntry()">
            <span>+</span>
            <span>Add Reference</span>
          </button>
        </div>
      </div>
    `;
    },

    renderEntries() {
        return this.data.map((ref, index) => `
      <div class="entry-item" data-index="${index}">
        <div class="entry-header">
          <span class="entry-title">Reference ${index + 1}</span>
          <button class="btn-remove-entry" onclick="ReferencesSection.removeEntry(${index})">×</button>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Name</label>
            <input type="text" class="form-input" data-field="name" data-index="${index}" value="${ref.name || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Position</label>
            <input type="text" class="form-input" data-field="position" data-index="${index}" value="${ref.position || ''}">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Company</label>
            <input type="text" class="form-input" data-field="company" data-index="${index}" value="${ref.company || ''}">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" data-field="email" data-index="${index}" value="${ref.email || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-input" data-field="phone" data-index="${index}" value="${ref.phone || ''}">
          </div>
        </div>
      </div>
    `).join('');
    },

    addEntry() {
        this.data.push({ name: '', position: '', company: '', email: '', phone: '' });
        window.appInstance?.renderForm();
    },

    removeEntry(index) {
        this.data.splice(index, 1);
        window.appInstance?.renderForm();
        window.appInstance?.updatePreview();
    },

    attachEventListeners() {
        const inputs = document.querySelectorAll('#section-references [data-field]');
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
