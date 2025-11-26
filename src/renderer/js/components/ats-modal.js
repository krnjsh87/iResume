// ATS Modal Component
// Displays detailed ATS score breakdown

const ATSModal = {
    overlay: null,
    modalBody: null,
    closeBtn: null,
    currentScore: null,

    init() {
        this.overlay = document.getElementById('ats-modal-overlay');
        this.modalBody = document.getElementById('ats-modal-body');
        this.closeBtn = document.getElementById('modal-close');

        if (!this.overlay || !this.modalBody || !this.closeBtn) {
            console.error('Modal elements not found');
            return;
        }

        // Event listeners
        this.closeBtn.addEventListener('click', () => this.hide());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hide();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) {
                this.hide();
            }
        });
    },

    show(scoreData) {
        this.currentScore = scoreData;
        this.render();
        this.overlay.classList.remove('hidden');
    },

    hide() {
        this.overlay.classList.add('hidden');
    },

    render() {
        if (!this.currentScore) return;

        const { totalScore, categoryScores, feedback, status } = this.currentScore;

        let html = `
      <div class="ats-score-display">
        <div class="ats-score-number">${totalScore}</div>
        <div class="ats-score-description">${status}</div>
      </div>
      
      <div class="score-categories">
    `;

        // Render each category
        Object.keys(categoryScores).forEach(categoryKey => {
            const category = ATSScorer.CATEGORIES[categoryKey];
            const score = categoryScores[categoryKey];
            const maxScore = category.weight;
            const categoryFeedback = feedback[categoryKey];

            const scoreClass = this.getScoreClass(score, maxScore);

            html += `
        <div class="score-category">
          <div class="category-header">
            <span class="category-name">${category.name}</span>
            <span class="category-score ${scoreClass}">${Math.round(score)}/${maxScore}</span>
          </div>
          <div class="category-feedback">
            ${categoryFeedback.map(item => `<div>• ${item}</div>`).join('')}
          </div>
        </div>
      `;
        });

        html += `</div>`;

        this.modalBody.innerHTML = html;
    },

    getScoreClass(score, maxScore) {
        const percentage = (score / maxScore) * 100;
        if (percentage >= 90) return 'score-excellent';
        if (percentage >= 75) return 'score-good';
        if (percentage >= 50) return 'score-needs-improvement';
        return 'score-poor';
    }
};
