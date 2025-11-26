// ATS Scoring Engine
// Analyzes resume content and provides score with detailed feedback

const ATSScorer = {
    // Score categories and their weights
    CATEGORIES: {
        CONTACT_INFO: { weight: 10, name: 'Contact Information' },
        FORMATTING: { weight: 15, name: 'ATS-Friendly Formatting' },
        KEYWORDS: { weight: 20, name: 'Keywords & Action Verbs' },
        COMPLETENESS: { weight: 15, name: 'Section Completeness' },
        LENGTH: { weight: 10, name: 'Optimal Length' },
        CONSISTENCY: { weight: 10, name: 'Consistency' },
        ACHIEVEMENTS: { weight: 10, name: 'Measurable Achievements' },
        SKILLS: { weight: 10, name: 'Skills Section' }
    },

    // Action verbs for scoring
    ACTION_VERBS: [
        'achieved', 'improved', 'developed', 'created', 'implemented', 'managed',
        'led', 'increased', 'decreased', 'launched', 'designed', 'built',
        'optimized', 'streamlined', 'resolved', 'established', 'coordinated',
        'executed', 'delivered', 'generated', 'analyzed', 'strategized'
    ],

    // Calculate overall ATS score
    calculateScore(formData, country) {
        const scores = {};
        const feedback = {};

        // 1. Contact Information (10 points)
        const contactScore = this.scoreContactInfo(formData);
        scores.CONTACT_INFO = contactScore.score;
        feedback.CONTACT_INFO = contactScore.feedback;

        // 2. Formatting (15 points)
        const formatScore = this.scoreFormatting(formData);
        scores.FORMATTING = formatScore.score;
        feedback.FORMATTING = formatScore.feedback;

        // 3. Keywords & Action Verbs (20 points)
        const keywordScore = this.scoreKeywords(formData);
        scores.KEYWORDS = keywordScore.score;
        feedback.KEYWORDS = keywordScore.feedback;

        // 4. Section Completeness (15 points)
        const completenessScore = this.scoreCompleteness(formData, country);
        scores.COMPLETENESS = completenessScore.score;
        feedback.COMPLETENESS = completenessScore.feedback;

        // 5. Length Optimization (10 points)
        const lengthScore = this.scoreLength(formData);
        scores.LENGTH = lengthScore.score;
        feedback.LENGTH = lengthScore.feedback;

        // 6. Consistency (10 points)
        const consistencyScore = this.scoreConsistency(formData);
        scores.CONSISTENCY = consistencyScore.score;
        feedback.CONSISTENCY = consistencyScore.feedback;

        // 7. Measurable Achievements (10 points)
        const achievementScore = this.scoreAchievements(formData);
        scores.ACHIEVEMENTS = achievementScore.score;
        feedback.ACHIEVEMENTS = achievementScore.feedback;

        // 8. Skills Section (10 points)
        const skillsScore = this.scoreSkills(formData);
        scores.SKILLS = skillsScore.score;
        feedback.SKILLS = skillsScore.feedback;

        // Calculate total score
        let totalScore = 0;
        Object.keys(scores).forEach(category => {
            totalScore += scores[category];
        });

        return {
            totalScore: Math.round(totalScore),
            categoryScores: scores,
            feedback: feedback,
            status: this.getScoreStatus(totalScore)
        };
    },

    // Score contact information
    scoreContactInfo(formData) {
        let score = 0;
        const feedback = [];
        const max = this.CATEGORIES.CONTACT_INFO.weight;

        const email = formData.personalInfo?.email || '';
        const phone = formData.personalInfo?.phone || '';
        const location = formData.personalInfo?.address || '';

        if (email && email.includes('@')) {
            score += max * 0.4;
        } else {
            feedback.push('Add a valid email address');
        }

        if (phone && phone.length >= 10) {
            score += max * 0.3;
        } else {
            feedback.push('Add a valid phone number');
        }

        if (location) {
            score += max * 0.3;
        } else {
            feedback.push('Add your location/address');
        }

        if (score === max) {
            feedback.push('Contact information is complete ✓');
        }

        return { score, feedback };
    },

    // Score ATS-friendly formatting
    scoreFormatting(formData) {
        let score = 0;
        const feedback = [];
        const max = this.CATEGORIES.FORMATTING.weight;

        // Check for simple text (ATS prefers plain text)
        score += max * 0.5; // Assume good formatting since we control it
        feedback.push('Using ATS-friendly format ✓');

        // Check for clear section headers
        const hasExperience = formData.experience?.length > 0;
        const hasEducation = formData.education?.length > 0;
        if (hasExperience || hasEducation) {
            score += max * 0.5;
            feedback.push('Clear section organization ✓');
        } else {
            feedback.push('Add experience or education sections');
        }

        return { score, feedback };
    },

    // Score keywords and action verbs
    scoreKeywords(formData) {
        let score = 0;
        const feedback = [];
        const max = this.CATEGORIES.KEYWORDS.weight;

        // Gather all text content
        let allText = '';
        if (formData.summary) allText += formData.summary.toLowerCase() + ' ';
        if (formData.experience) {
            formData.experience.forEach(exp => {
                allText += (exp.description || '').toLowerCase() + ' ';
            });
        }

        // Count action verbs
        let verbCount = 0;
        this.ACTION_VERBS.forEach(verb => {
            if (allText.includes(verb)) verbCount++;
        });

        if (verbCount >= 8) {
            score += max * 0.6;
            feedback.push(`Great use of action verbs (${verbCount} found) ✓`);
        } else if (verbCount >= 4) {
            score += max * 0.4;
            feedback.push(`Good use of action verbs, but add more (${verbCount} found)`);
        } else {
            score += max * 0.2;
            feedback.push(`Add more action verbs (only ${verbCount} found). Use words like: achieved, implemented, managed, led`);
        }

        // Check for skills keywords
        const skillsCount = formData.skills?.length || 0;
        if (skillsCount >= 10) {
            score += max * 0.4;
            feedback.push('Good number of skills listed ✓');
        } else if (skillsCount >= 5) {
            score += max * 0.2;
            feedback.push('Add more relevant skills');
        } else {
            feedback.push('Add 10+ relevant skills for better keyword matching');
        }

        return { score, feedback };
    },

    // Score section completeness
    scoreCompleteness(formData, country) {
        let score = 0;
        const feedback = [];
        const max = this.CATEGORIES.COMPLETENESS.weight;

        const requiredSections = [
            { key: 'personalInfo', name: 'Personal Info', points: 0.2 },
            { key: 'summary', name: 'Summary', points: 0.15 },
            { key: 'experience', name: 'Experience', points: 0.3 },
            { key: 'education', name: 'Education', points: 0.2 },
            { key: 'skills', name: 'Skills', points: 0.15 }
        ];

        requiredSections.forEach(section => {
            const data = formData[section.key];
            const hasData = Array.isArray(data) ? data.length > 0 : (data && Object.keys(data).length > 0);

            if (hasData) {
                score += max * section.points;
                feedback.push(`${section.name} section complete ✓`);
            } else {
                feedback.push(`Add ${section.name} section`);
            }
        });

        return { score, feedback };
    },

    // Score optimal resume length
    scoreLength(formData) {
        let score = 0;
        const feedback = [];
        const max = this.CATEGORIES.LENGTH.weight;

        // Estimate length based on content
        const expCount = formData.experience?.length || 0;
        const eduCount = formData.education?.length || 0;
        const projCount = formData.projects?.length || 0;

        const totalEntries = expCount + eduCount + projCount;

        if (totalEntries >= 4 && totalEntries <= 8) {
            score = max;
            feedback.push('Optimal resume length ✓');
        } else if (totalEntries >= 2 && totalEntries < 4) {
            score = max * 0.6;
            feedback.push('Resume could include more experience/projects');
        } else if (totalEntries > 8) {
            score = max * 0.7;
            feedback.push('Consider condensing to most relevant experience');
        } else {
            score = max * 0.3;
            feedback.push('Add more experience and education entries');
        }

        return { score, feedback };
    },

    // Score consistency (dates, formatting)
    scoreConsistency(formData) {
        let score = 0;
        const feedback = [];
        const max = this.CATEGORIES.CONSISTENCY.weight;

        // Check date consistency
        let dateFormats = new Set();
        const checkDates = (entries) => {
            if (!entries) return;
            entries.forEach(entry => {
                if (entry.startDate) dateFormats.add(entry.startDate.includes('/') ? 'slash' : 'dash');
            });
        };

        checkDates(formData.experience);
        checkDates(formData.education);

        if (dateFormats.size <= 1) {
            score += max * 0.5;
            feedback.push('Consistent date formatting ✓');
        } else {
            feedback.push('Use consistent date format throughout');
        }

        // Check for bullet points in descriptions
        let hasBullets = false;
        if (formData.experience) {
            formData.experience.forEach(exp => {
                if (exp.description && exp.description.includes('•')) {
                    hasBullets = true;
                }
            });
        }

        if (hasBullets) {
            score += max * 0.5;
            feedback.push('Using bullet points for clarity ✓');
        } else {
            score += max * 0.3;
            feedback.push('Use bullet points to highlight achievements');
        }

        return { score, feedback };
    },

    // Score measurable achievements
    scoreAchievements(formData) {
        let score = 0;
        const feedback = [];
        const max = this.CATEGORIES.ACHIEVEMENTS.weight;

        let allText = '';
        if (formData.experience) {
            formData.experience.forEach(exp => {
                allText += (exp.description || '') + ' ';
            });
        }

        // Look for numbers and percentages
        const hasNumbers = /\d+/.test(allText);
        const hasPercentages = /%/.test(allText);
        const hasCurrency = /\$|€|£|₹/.test(allText);

        let metricCount = 0;
        if (hasNumbers) metricCount++;
        if (hasPercentages) metricCount++;
        if (hasCurrency) metricCount++;

        if (metricCount >= 2) {
            score = max;
            feedback.push('Excellent use of quantifiable metrics ✓');
        } else if (metricCount === 1) {
            score = max * 0.5;
            feedback.push('Add more quantifiable achievements (numbers, percentages, revenue impact)');
        } else {
            score = max * 0.2;
            feedback.push('Include measurable results: "Increased sales by 30%", "Managed $2M budget"');
        }

        return { score, feedback };
    },

    // Score skills section
    scoreSkills(formData) {
        let score = 0;
        const feedback = [];
        const max = this.CATEGORIES.SKILLS.weight;

        const skillsCount = formData.skills?.length || 0;

        if (skillsCount >= 15) {
            score = max;
            feedback.push(`Comprehensive skills list (${skillsCount} skills) ✓`);
        } else if (skillsCount >= 10) {
            score = max * 0.8;
            feedback.push(`Good skills coverage (${skillsCount} skills) ✓`);
        } else if (skillsCount >= 5) {
            score = max * 0.5;
            feedback.push(`Add more skills (currently ${skillsCount}, aim for 10-15)`);
        } else {
            score = max * 0.2;
            feedback.push('Add more relevant skills to improve keyword matching');
        }

        return { score, feedback };
    },

    // Get status message based on score
    getScoreStatus(score) {
        if (score >= 90) return 'Excellent - ATS Optimized';
        if (score >= 75) return 'Good - Minor improvements needed';
        if (score >= 60) return 'Fair - Several improvements recommended';
        return 'Needs Improvement - Follow suggestions below';
    }
};
