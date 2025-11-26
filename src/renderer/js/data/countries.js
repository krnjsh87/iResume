// Country resume format configurations
// Each country defines which fields are visible and their specific requirements

const COUNTRIES = {
    // North America
    "United States": {
        continent: "North America",
        code: "US",
        fields: {
            photo: false,
            dateOfBirth: false,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: true,
            summary: true,
            objective: false
        },
        dateFormat: "MM/DD/YYYY",
        phoneFormat: "+1 (XXX) XXX-XXXX",
        pageLimit: 1, // 1-2 pages preferred
        sectionOrder: ["summary", "experience", "education", "skills", "certifications", "projects", "languages", "references"],
        tips: "Focus on achievements and quantifiable results. Avoid personal information."
    },
    "Canada": {
        continent: "North America",
        code: "CA",
        fields: {
            photo: false,
            dateOfBirth: false,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: true,
            summary: true,
            objective: false
        },
        dateFormat: "YYYY-MM-DD",
        phoneFormat: "+1 (XXX) XXX-XXXX",
        pageLimit: 2,
        sectionOrder: ["summary", "experience", "education", "skills", "certifications", "projects", "languages", "references"],
        tips: "Similar to US format. Be concise and achievement-focused."
    },
    "Mexico": {
        continent: "North America",
        code: "MX",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+52 XX XXXX XXXX",
        pageLimit: 2,
        tips: "Include personal details and professional photo."
    },

    // South America
    "Brazil": {
        continent: "South America",
        code: "BR",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+55 (XX) XXXXX-XXXX",
        pageLimit: 2,
        tips: "Include photo and personal details. Be thorough."
    },
    "Argentina": {
        continent: "South America",
        code: "AR",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+54 9 XX XXXX-XXXX",
        pageLimit: 2,
        tips: "Professional photo recommended. Include personal information."
    },
    "Chile": {
        continent: "South America",
        code: "CL",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+56 9 XXXX XXXX",
        pageLimit: 2,
        tips: "Photo and personal details expected."
    },
    "Colombia": {
        continent: "South America",
        code: "CO",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+57 XXX XXX XXXX",
        pageLimit: 2,
        tips: "Include photo and comprehensive personal information."
    },
    "Peru": {
        continent: "South America",
        code: "PE",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+51 XXX XXX XXX",
        pageLimit: 2,
        tips: "Photo and personal details standard practice."
    },

    // Europe
    "United Kingdom": {
        continent: "Europe",
        code: "GB",
        fields: {
            photo: false,
            dateOfBirth: false,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: true,
            summary: true,
            objective: false
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+44 XXXX XXXXXX",
        pageLimit: 2,
        sectionOrder: ["summary", "experience", "skills", "education", "certifications", "projects", "languages", "references"],
        tips: "No photo or personal details. Focus on skills and achievements."
    },
    "Germany": {
        continent: "Europe",
        code: "DE",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: false,
            references: false,
            summary: true,
            objective: false
        },
        dateFormat: "DD.MM.YYYY",
        phoneFormat: "+49 XXX XXXXXXX",
        pageLimit: 2,
        sectionOrder: ["experience", "education", "skills", "certifications", "projects", "languages", "summary", "references"],
        tips: "Professional photo required. Include personal details."
    },
    "France": {
        continent: "Europe",
        code: "FR",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: false,
            references: false,
            summary: true,
            objective: false
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+33 X XX XX XX XX",
        pageLimit: 1,
        tips: "Brief CV with photo. Include age and marital status."
    },
    "Italy": {
        continent: "Europe",
        code: "IT",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+39 XXX XXX XXXX",
        pageLimit: 2,
        tips: "Photo and personal information expected."
    },
    "Spain": {
        continent: "Europe",
        code: "ES",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+34 XXX XX XX XX",
        pageLimit: 2,
        tips: "Photo common. Include DOB and nationality."
    },
    "Netherlands": {
        continent: "Europe",
        code: "NL",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: false
        },
        dateFormat: "DD-MM-YYYY",
        phoneFormat: "+31 X XX XX XX XX",
        pageLimit: 2,
        tips: "Photo and DOB acceptable but not required."
    },
    "Belgium": {
        continent: "Europe",
        code: "BE",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: false
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+32 XXX XX XX XX",
        pageLimit: 2,
        tips: "Photo and personal details common."
    },
    "Switzerland": {
        continent: "Europe",
        code: "CH",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: false,
            references: false,
            summary: true,
            objective: false
        },
        dateFormat: "DD.MM.YYYY",
        phoneFormat: "+41 XX XXX XX XX",
        pageLimit: 2,
        tips: "Professional photo and detailed personal information."
    },
    "Austria": {
        continent: "Europe",
        code: "AT",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: false,
            references: false,
            summary: true,
            objective: false
        },
        dateFormat: "DD.MM.YYYY",
        phoneFormat: "+43 XXX XXXXXX",
        pageLimit: 2,
        tips: "Similar to Germany. Professional photo required."
    },
    "Sweden": {
        continent: "Europe",
        code: "SE",
        fields: {
            photo: true,
            dateOfBirth: false,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: false
        },
        dateFormat: "YYYY-MM-DD",
        phoneFormat: "+46 XX XXX XX XX",
        pageLimit: 2,
        tips: "Photo optional. Keep concise and relevant."
    },
    "Norway": {
        continent: "Europe",
        code: "NO",
        fields: {
            photo: false,
            dateOfBirth: false,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: true,
            summary: true,
            objective: false
        },
        dateFormat: "DD.MM.YYYY",
        phoneFormat: "+47 XXX XX XXX",
        pageLimit: 2,
        tips: "No photo or personal details. Include references."
    },
    "Denmark": {
        continent: "Europe",
        code: "DK",
        fields: {
            photo: false,
            dateOfBirth: false,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: false
        },
        dateFormat: "DD-MM-YYYY",
        phoneFormat: "+45 XX XX XX XX",
        pageLimit: 2,
        tips: "Brief and to the point. No personal information."
    },
    "Finland": {
        continent: "Europe",
        code: "FI",
        fields: {
            photo: false,
            dateOfBirth: true,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: false
        },
        dateFormat: "DD.MM.YYYY",
        phoneFormat: "+358 XX XXX XXXX",
        pageLimit: 2,
        tips: "DOB acceptable. Keep concise."
    },
    "Poland": {
        continent: "Europe",
        code: "PL",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD.MM.YYYY",
        phoneFormat: "+48 XXX XXX XXX",
        pageLimit: 2,
        tips: "Photo and DOB expected."
    },
    "Portugal": {
        continent: "Europe",
        code: "PT",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+351 XXX XXX XXX",
        pageLimit: 2,
        tips: "Photo and personal details common."
    },
    "Greece": {
        continent: "Europe",
        code: "GR",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+30 XXX XXX XXXX",
        pageLimit: 2,
        tips: "Include photo and comprehensive personal information."
    },
    "Ireland": {
        continent: "Europe",
        code: "IE",
        fields: {
            photo: false,
            dateOfBirth: false,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: true,
            summary: true,
            objective: false
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+353 XX XXX XXXX",
        pageLimit: 2,
        tips: "Similar to UK. No personal details."
    },

    // Asia
    "India": {
        continent: "Asia",
        code: "IN",
        fields: {
            photo: false,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: false,
            gender: true,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+91 XXXXX XXXXX",
        pageLimit: 2,
        sectionOrder: ["education", "experience", "skills", "certifications", "projects", "languages", "summary", "references"],
        tips: "Include DOB, gender, and nationality. Detailed format accepted."
    },
    "China": {
        continent: "Asia",
        code: "CN",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "YYYY-MM-DD",
        phoneFormat: "+86 XXX XXXX XXXX",
        pageLimit: 2,
        tips: "Photo required. Include all personal details."
    },
    "Japan": {
        continent: "Asia",
        code: "JP",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: false,
            gender: true,
            references: false,
            summary: true,
            objective: false
        },
        dateFormat: "YYYY/MM/DD",
        phoneFormat: "+81 XX-XXXX-XXXX",
        pageLimit: 2,
        tips: "Professional photo mandatory. Follow strict format conventions."
    },
    "South Korea": {
        continent: "Asia",
        code: "KR",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "YYYY.MM.DD",
        phoneFormat: "+82 XX-XXXX-XXXX",
        pageLimit: 2,
        tips: "Photo required. Include comprehensive personal information."
    },
    "Singapore": {
        continent: "Asia",
        code: "SG",
        fields: {
            photo: false,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: false,
            gender: false,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+65 XXXX XXXX",
        pageLimit: 2,
        tips: "Include DOB and nationality. Concise and professional."
    },
    "Malaysia": {
        continent: "Asia",
        code: "MY",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+60 XX-XXX XXXX",
        pageLimit: 2,
        tips: "Photo and detailed personal information expected."
    },
    "Thailand": {
        continent: "Asia",
        code: "TH",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+66 XX XXX XXXX",
        pageLimit: 2,
        tips: "Photo required with comprehensive personal details."
    },
    "Indonesia": {
        continent: "Asia",
        code: "ID",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+62 XXX-XXXX-XXXX",
        pageLimit: 2,
        tips: "Photo mandatory. Include all personal information."
    },
    "Philippines": {
        continent: "Asia",
        code: "PH",
        fields: {
            photo: false,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+63 XXX XXX XXXX",
        pageLimit: 2,
        tips: "Include personal details. Photo optional."
    },
    "Vietnam": {
        continent: "Asia",
        code: "VN",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+84 XX XXXX XXXX",
        pageLimit: 2,
        tips: "Photo and comprehensive personal information required."
    },
    "United Arab Emirates": {
        continent: "Asia",
        code: "AE",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: false,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+971 XX XXX XXXX",
        pageLimit: 2,
        tips: "Photo common. Include nationality and visa status."
    },
    "Saudi Arabia": {
        continent: "Asia",
        code: "SA",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+966 XX XXX XXXX",
        pageLimit: 2,
        tips: "Include photo and complete personal details."
    },
    "Israel": {
        continent: "Asia",
        code: "IL",
        fields: {
            photo: false,
            dateOfBirth: true,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+972 XX-XXX-XXXX",
        pageLimit: 2,
        tips: "DOB acceptable. Keep focused on qualifications."
    },
    "Turkey": {
        continent: "Asia",
        code: "TR",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD.MM.YYYY",
        phoneFormat: "+90 XXX XXX XX XX",
        pageLimit: 2,
        tips: "Photo and personal details expected."
    },

    // Africa
    "South Africa": {
        continent: "Africa",
        code: "ZA",
        fields: {
            photo: false,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: false,
            gender: false,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+27 XX XXX XXXX",
        pageLimit: 2,
        tips: "Include DOB and nationality. Photo optional."
    },
    "Nigeria": {
        continent: "Africa",
        code: "NG",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+234 XXX XXX XXXX",
        pageLimit: 2,
        tips: "Photo and comprehensive personal details expected."
    },
    "Egypt": {
        continent: "Africa",
        code: "EG",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+20 XX XXXX XXXX",
        pageLimit: 2,
        tips: "Photo required. Include all personal information."
    },
    "Kenya": {
        continent: "Africa",
        code: "KE",
        fields: {
            photo: false,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: false,
            gender: false,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+254 XXX XXXXXX",
        pageLimit: 2,
        tips: "Include DOB and nationality. References important."
    },
    "Ghana": {
        continent: "Africa",
        code: "GH",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+233 XX XXX XXXX",
        pageLimit: 2,
        tips: "Photo and personal details standard."
    },
    "Morocco": {
        continent: "Africa",
        code: "MA",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+212 XXX-XXXXXX",
        pageLimit: 2,
        tips: "Photo and personal information expected."
    },

    // Oceania
    "Australia": {
        continent: "Oceania",
        code: "AU",
        fields: {
            photo: false,
            dateOfBirth: false,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: true,
            summary: true,
            objective: false
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+61 XXX XXX XXX",
        pageLimit: 2,
        tips: "No personal details or photo. Focus on skills and achievements."
    },
    "New Zealand": {
        continent: "Oceania",
        code: "NZ",
        fields: {
            photo: false,
            dateOfBirth: false,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: true,
            summary: true,
            objective: false
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+64 XX XXX XXXX",
        pageLimit: 2,
        tips: "Similar to Australia. No personal information."
    },

    // Additional European countries
    "Russia": {
        continent: "Europe",
        code: "RU",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD.MM.YYYY",
        phoneFormat: "+7 XXX XXX-XX-XX",
        pageLimit: 2,
        tips: "Photo and detailed personal information required."
    },
    "Czech Republic": {
        continent: "Europe",
        code: "CZ",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD.MM.YYYY",
        phoneFormat: "+420 XXX XXX XXX",
        pageLimit: 2,
        tips: "Photo and DOB common practice."
    },
    "Hungary": {
        continent: "Europe",
        code: "HU",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: false,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "YYYY.MM.DD",
        phoneFormat: "+36 XX XXX XXXX",
        pageLimit: 2,
        tips: "Photo and DOB expected."
    },
    "Romania": {
        continent: "Europe",
        code: "RO",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: false,
            gender: false,
            references: false,
            summary: true,
            objective: true
        },
        dateFormat: "DD.MM.YYYY",
        phoneFormat: "+40 XXX XXX XXX",
        pageLimit: 2,
        tips: "Photo and personal details common."
    },

    // Additional Asian countries
    "Bangladesh": {
        continent: "Asia",
        code: "BD",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+880 XXXX-XXXXXX",
        pageLimit: 2,
        tips: "Photo and comprehensive personal information."
    },
    "Pakistan": {
        continent: "Asia",
        code: "PK",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+92 XXX XXXXXXX",
        pageLimit: 2,
        tips: "Photo and detailed personal information expected."
    },
    "Sri Lanka": {
        continent: "Asia",
        code: "LK",
        fields: {
            photo: true,
            dateOfBirth: true,
            nationality: true,
            maritalStatus: true,
            gender: true,
            references: true,
            summary: true,
            objective: true
        },
        dateFormat: "DD/MM/YYYY",
        phoneFormat: "+94 XX XXX XXXX",
        pageLimit: 2,
        tips: "Photo and full personal details standard."
    }
};

// Helper function to get countries sorted by continent
function getCountriesByContinent() {
    const continentOrder = [
        "North America",
        "South America",
        "Europe",
        "Asia",
        "Africa",
        "Oceania"
    ];

    const grouped = {};
    continentOrder.forEach(continent => {
        grouped[continent] = [];
    });

    Object.keys(COUNTRIES).forEach(countryName => {
        const country = COUNTRIES[countryName];
        grouped[country.continent].push(countryName);
    });

    // Sort countries within each continent alphabetically
    Object.keys(grouped).forEach(continent => {
        grouped[continent].sort();
    });

    return grouped;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COUNTRIES, getCountriesByContinent };
}
