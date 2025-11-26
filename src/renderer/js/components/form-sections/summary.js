// Professional Summary Section

const SummarySection = {
    data: '',

    render() {
        return `
      <div class="form-section" id="section-summary" data-section="summary">
        <div class="section-header">
          <h3><span class="section-icon">📝</span> Professional Summary</h3>
          <span class="collapse-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="form-group">
            <label class="form-label">Summary</label>
            <textarea class="form-textarea" id="summary" placeholder="Write a compelling professional summary highlighting your key achievements and skills..." rows="6">${this.data}</textarea>
            <small style="color: #666;">Tip: Focus on your most relevant experience 50-100 words</small>
          </div>
        </div>
      </div>
    `;
    },

    attachEventListeners() {
        const element = document.getElementById('summary');
        if (element) {
            element.addEventListener('input', () => {
                this.data = element.value;
                window.appInstance?.updatePreview();
            });
        }
    },

    getData() {
        return this.data;
    },

    setData(data) {
        this.data = data || '';
    }
};
