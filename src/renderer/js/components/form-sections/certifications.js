// Certifications Section

const CertificationsSection = {
    data: [],

    render() {
        return `
      <div class="form-section" id="section-certifications" data-section="certifications">
        <div class="section-header">
          <h3><span class="section-icon">🏆</span> Certifications</h3>
          <span class="collapse-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="repeatable-entries" id="cert-entries">
            ${this.renderEntries()}
          </div>
          <button class="btn-add-entry" onclick="CertificationsSection.addEntry()">
            <span>+</span>
            <span>Add Certification</span>
          </button>
        </div>
      </div>
    `;
    },

    renderEntries() {
        return this.data.map((cert, index) => `
      <div class="entry-item" data-index="${index}">
        <div class="entry-header">
          <span class="entry-title">Certification ${index + 1}</span>
          <button class="btn-remove-entry" onclick="CertificationsSection.removeEntry(${index})">×</button>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Certification Name</label>
            <input type="text" class="form-input" data-field="name" data-index="${index}" value="${cert.name || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Issuing Organization</label>
            <input type="text" class="form-input" data-field="issuer" data-index="${index}" value="${cert.issuer || ''}">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="month" class="form-input" data-field="date" data-index="${index}" value="${cert.date || ''}">
          </div>
        </div>
      </div>
    `).join('');
    },

    addEntry() {
        this.data.push({ name: '', issuer: '', date: '' });
        window.appInstance?.renderForm();
    },

    removeEntry(index) {
        this.data.splice(index, 1);
        window.appInstance?.renderForm();
        window.appInstance?.updatePreview();
    },

    attachEventListeners() {
        const inputs = document.querySelectorAll('#section-certifications [data-field]');
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
