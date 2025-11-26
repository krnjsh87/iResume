// Skills Section

const SkillsSection = {
    data: [],

    render() {
        return `
      <div class="form-section" id="section-skills" data-section="skills">
        <div class="section-header">
          <h3><span class="section-icon">⚡</span> Skills</h3>
          <span class="collapse-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="form-group">
            <label class="form-label">Add Skills</label>
            <div class="tags-container" id="skills-tags">
              ${this.renderTags()}
              <input type="text" class="tag-input" id="skill-input" placeholder="Type skill and press Enter">
            </div>
            <small style="color: #666;">Tip: Add 10-15 relevant skills. Press Enter to add each skill.</small>
          </div>
        </div>
      </div>
    `;
    },

    renderTags() {
        return this.data.map((skill, index) => `
      <span class="tag-item">
        ${skill}
        <span class="tag-remove" onclick="SkillsSection.removeSkill(${index})">×</span>
      </span>
    `).join('');
    },

    addSkill(skill) {
        if (skill && !this.data.includes(skill)) {
            this.data.push(skill);
            window.appInstance?.renderForm();
            window.appInstance?.updatePreview();
        }
    },

    removeSkill(index) {
        this.data.splice(index, 1);
        window.appInstance?.renderForm();
        window.appInstance?.updatePreview();
    },

    attachEventListeners() {
        const input = document.getElementById('skill-input');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const skill = input.value.trim();
                    if (skill) {
                        this.addSkill(skill);
                        input.value = '';
                    }
                }
            });
        }
    },

    getData() {
        return this.data;
    },

    setData(data) {
        this.data = data || [];
    }
};
