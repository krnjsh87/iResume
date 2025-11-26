// Theme configurations for resume styling
// Each theme defines colors, fonts, and layout preferences

const THEMES = {
    "Modern": {
        id: "modern",
        colors: {
            primary: "#8B2635",      // Burgundy
            secondary: "#D4AF37",    // Gold
            text: "#2C2C2C",         // Charcoal
            textLight: "#666666",    // Gray
            background: "#FFFFFF",
            accent: "#C17B3F"        // Burnt Orange
        },
        fonts: {
            heading: "'Montserrat', sans-serif",
            body: "'Open Sans', sans-serif"
        },
        layout: {
            headerStyle: "centered",
            sectionDivider: "line",
            bulletStyle: "circle"
        },
        description: "Clean and contemporary with bold section headers"
    },

    "Professional": {
        id: "professional",
        colors: {
            primary: "#1B4965",      // Deep Ocean Blue
            secondary: "#5FA8D3",    // Sky Blue
            text: "#333333",
            textLight: "#666666",
            background: "#FFFFFF",
            accent: "#62B6CB"        // Light Blue accent
        },
        fonts: {
            heading: "'Merriweather', serif",
            body: "'Lato', sans-serif"
        },
        layout: {
            headerStyle: "left-aligned",
            sectionDivider: "line",
            bulletStyle: "square"
        },
        description: "Traditional and trustworthy with serif headings"
    },

    "Creative": {
        id: "creative",
        colors: {
            primary: "#FF6B9D",      // Pink
            secondary: "#C44569",    // Dark Pink
            text: "#2D3436",         // Charcoal
            textLight: "#636E72",    // Gray
            background: "#FFFFFF",
            accent: "#FDA7DF"        // Light Pink
        },
        fonts: {
            heading: "'Poppins', sans-serif",
            body: "'Nunito', sans-serif"
        },
        layout: {
            headerStyle: "creative-split",
            sectionDivider: "decorative",
            bulletStyle: "arrow"
        },
        description: "Bold and vibrant for creative industries"
    },

    "Minimalist": {
        id: "minimalist",
        colors: {
            primary: "#2F3640",      // Dark Slate
            secondary: "#95A5A6",    // Silver
            text: "#333333",
            textLight: "#888888",
            background: "#FFFFFF",
            accent: "#BDC3C7"        // Light Gray
        },
        fonts: {
            heading: "'Helvetica Neue', 'Arial', sans-serif",
            body: "'Helvetica Neue', 'Arial', sans-serif"
        },
        layout: {
            headerStyle: "minimal",
            sectionDivider: "space",
            bulletStyle: "dash"
        },
        description: "Clean lines and maximum white space"
    },

    "Executive": {
        id: "executive",
        colors: {
            primary: "#1E3A5F",      // Navy Blue
            secondary: "#C9A35C",    // Champagne Gold
            text: "#2F2F2F",
            textLight: "#6B6B6B",
            background: "#FFFFFF",
            accent: "#D4AF69"        // Gold accent
        },
        fonts: {
            heading: "'Playfair Display', serif",
            body: "'Source Sans Pro', sans-serif"
        },
        layout: {
            headerStyle: "elegant",
            sectionDivider: "double-line",
            bulletStyle: "circle"
        },
        description: "Sophisticated and prestigious for senior roles"
    },

    "Academic": {
        id: "academic",
        colors: {
            primary: "#0C2340",      // Oxford Blue
            secondary: "#8B4513",    // Saddle Brown
            text: "#2C2C2C",
            textLight: "#5A5A5A",
            background: "#FFFFFF",
            accent: "#A0826D"        // Tan accent
        },
        fonts: {
            heading: "'Georgia', serif",
            body: "'Times New Roman', serif"
        },
        layout: {
            headerStyle: "traditional",
            sectionDivider: "line",
            bulletStyle: "square"
        },
        description: "Classic and scholarly with traditional formatting"
    },

    "Technical": {
        id: "technical",
        colors: {
            primary: "#00A86B",      // Jade Green
            secondary: "#008B8B",    // Dark Cyan
            text: "#212121",
            textLight: "#616161",
            background: "#FFFFFF",
            accent: "#20B2AA"        // Light Sea Green
        },
        fonts: {
            heading: "'Roboto', sans-serif",
            body: "'Roboto Mono', monospace"
        },
        layout: {
            headerStyle: "structured",
            sectionDivider: "line-with-icon",
            bulletStyle: "chevron"
        },
        description: "Tech-focused with structured sections"
    },

    "Classic": {
        id: "classic",
        colors: {
            primary: "#6B1F3D",      // Wine Red
            secondary: "#B8733A",    // Copper
            text: "#1C1C1C",
            textLight: "#4F4F4F",
            background: "#FFFFFF",
            accent: "#9D5C3D"        // Brown accent
        },
        fonts: {
            heading: "'Garamond', serif",
            body: "'Garamond', serif"
        },
        layout: {
            headerStyle: "centered-classic",
            sectionDivider: "ornamental",
            bulletStyle: "circle"
        },
        description: "Timeless elegance with serif fonts throughout"
    },

    "Bold": {
        id: "bold",
        colors: {
            primary: "#E84A5F",      // Vibrant Red
            secondary: "#FF847C",    // Coral
            text: "#212121",
            textLight: "#757575",
            background: "#FFFFFF",
            accent: "#FECEA8"        // Peach
        },
        fonts: {
            heading: "'Oswald', sans-serif",
            body: "'Raleway', sans-serif"
        },
        layout: {
            headerStyle: "bold-header",
            sectionDivider: "thick-line",
            bulletStyle: "filled-circle"
        },
        description: "Strong and impactful with heavy typography"
    },

    "Elegant": {
        id: "elegant",
        colors: {
            primary: "#663399",      // Rebecca Purple
            secondary: "#9B59B6",    // Amethyst
            text: "#2C2C2C",
            textLight: "#6C6C6C",
            background: "#FFFFFF",
            accent: "#BB8FCE"        // Lavender
        },
        fonts: {
            heading: "'Cormorant Garamond', serif",
            body: "'Crimson Text', serif"
        },
        layout: {
            headerStyle: "refined",
            sectionDivider: "subtle-line",
            bulletStyle: "diamond"
        },
        description: "Refined and graceful with sophisticated details"
    }
};

// Helper function to get theme names as array
function getThemeNames() {
    return Object.keys(THEMES);
}

// Helper function to get theme by name
function getTheme(themeName) {
    return THEMES[themeName] || THEMES["Modern"];
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { THEMES, getThemeNames, getTheme };
}
