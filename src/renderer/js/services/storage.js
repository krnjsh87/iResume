// LocalStorage Service for saving/loading form data and preferences

const StorageService = {
    KEYS: {
        FORM_DATA: 'iresume_form_data',
        PREFERENCES: 'iresume_preferences',
        PANEL_SIZES: 'iresume_panel_sizes'
    },

    // Save form data
    saveFormData(data) {
        try {
            localStorage.setItem(this.KEYS.FORM_DATA, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving form data:', error);
            return false;
        }
    },

    // Load form data
    loadFormData() {
        try {
            const data = localStorage.getItem(this.KEYS.FORM_DATA);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading form data:', error);
            return null;
        }
    },

    // Save preferences (country, theme)
    savePreferences(preferences) {
        try {
            localStorage.setItem(this.KEYS.PREFERENCES, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return false;
        }
    },

    // Load preferences
    loadPreferences() {
        try {
            const prefs = localStorage.getItem(this.KEYS.PREFERENCES);
            return prefs ? JSON.parse(prefs) : {
                country: 'India',
                theme: 'Modern'
            };
        } catch (error) {
            console.error('Error loading preferences:', error);
            return {
                country: 'India',
                theme: 'Modern'
            };
        }
    },

    // Save panel sizes
    savePanelSizes(sizes) {
        try {
            localStorage.setItem(this.KEYS.PANEL_SIZES, JSON.stringify(sizes));
            return true;
        } catch (error) {
            console.error('Error saving panel sizes:', error);
            return false;
        }
    },

    // Load panel sizes
    loadPanelSizes() {
        try {
            const sizes = localStorage.getItem(this.KEYS.PANEL_SIZES);
            return sizes ? JSON.parse(sizes) : {
                leftPanel: 40,
                rightPanel: 60
            };
        } catch (error) {
            console.error('Error loading panel sizes:', error);
            return {
                leftPanel: 40,
                rightPanel: 60
            };
        }
    },

    // Clear all data
    clearAll() {
        try {
            Object.values(this.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    }
};
