// Panel Resizer Component
// Handles draggable separator between left and right panels

const PanelResizer = {
    leftPanel: null,
    rightPanel: null,
    separator: null,
    isDragging: false,
    minSize: 30, // Minimum 30% for either panel

    init() {
        this.leftPanel = document.getElementById('left-panel');
        this.rightPanel = document.getElementById('right-panel');
        this.separator = document.getElementById('panel-separator');

        if (!this.leftPanel || !this.rightPanel || !this.separator) {
            console.error('Panel elements not found');
            return;
        }

        // Load saved sizes
        const savedSizes = StorageService.loadPanelSizes();
        this.applyPanelSizes(savedSizes.leftPanel, savedSizes.rightPanel);

        // Add event listeners
        this.separator.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.onDrag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));
    },

    startDrag(e) {
        this.isDragging = true;
        this.separator.classList.add('dragging');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    },

    onDrag(e) {
        if (!this.isDragging) return;

        const container = this.leftPanel.parentElement;
        const containerRect = container.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left;
        const containerWidth = containerRect.width;

        // Calculate new sizes as percentages
        let leftPercent = (mouseX / containerWidth) * 100;
        let rightPercent = 100 - leftPercent;

        // Enforce minimum sizes
        if (leftPercent < this.minSize) {
            leftPercent = this.minSize;
            rightPercent = 100 - this.minSize;
        }
        if (rightPercent < this.minSize) {
            rightPercent = this.minSize;
            leftPercent = 100 - this.minSize;
        }

        this.applyPanelSizes(leftPercent, rightPercent);
    },

    stopDrag() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.separator.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';

        // Save panel sizes
        const leftPercent = parseFloat(this.leftPanel.style.flexBasis);
        const rightPercent = parseFloat(this.rightPanel.style.flexBasis);
        StorageService.savePanelSizes({
            leftPanel: leftPercent,
            rightPanel: rightPercent
        });
    },

    applyPanelSizes(leftPercent, rightPercent) {
        this.leftPanel.style.flexBasis = `${leftPercent}%`;
        this.rightPanel.style.flexBasis = `${rightPercent}%`;
    }
};
