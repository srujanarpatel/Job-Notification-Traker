export const calculateMatchScore = (job, preferences) => {
    let score = 0;

    // Normalize preferences
    const roleKeywords = preferences.roleKeywords?.toLowerCase().split(',').map(k => k.trim()).filter(Boolean) || [];
    const preferredLocations = preferences.preferredLocations?.toLowerCase().split(',').map(l => l.trim()).filter(Boolean) || [];
    const userSkills = preferences.skills?.toLowerCase().split(',').map(s => s.trim()).filter(Boolean) || [];
    const expLevel = preferences.expérienceLevel || '';

    const jobTitle = job.title.toLowerCase();
    const jobDesc = job.description.toLowerCase();
    const jobLoc = job.location.toLowerCase();
    const jobMode = job.mode; // 'Remote', 'Hybrid', 'Onsite'
    const jobExp = job.experience;
    const jobSkills = job.skills.map(s => s.toLowerCase());

    // 1. Role Keyword Match (+25 Title)
    const titleMatch = roleKeywords.some(k => jobTitle.includes(k));
    if (titleMatch) score += 25;

    // 2. Role Keyword Description Match (+15 Desc)
    // ONLY IF NOT ALREADY MATCHED TITLE? Requirement says: "+15 if any roleKeyword appears in job.description"
    // Usually separate. Let's do separate.
    const descMatch = roleKeywords.some(k => jobDesc.includes(k));
    if (descMatch) score += 15;

    // 3. Location Match (+15)
    // Check if job location is in preferred locations
    const locMatch = preferredLocations.some(l => jobLoc.includes(l));
    if (locMatch) score += 15;

    // 4. Mode Match (+10)
    if (preferences.preferredMode && preferences.preferredMode[jobMode]) {
        score += 10;
    }

    // 5. Experience Match (+10)
    // Exact string match for simplicity as per MVP, or improved logic? 
    // Requirement: "+10 if job.experience matches experienceLevel"
    // job.experience might be '0-1 Years', user might be '0-1 Years'.
    // If user says "Fresher", job "Fresher" matches.
    if (preferences.experienceLevel && jobExp === preferences.experienceLevel) {
        score += 10;
    }

    // 6. Skill Overlap (+15)
    // "if overlap between job.skills and user.skills (any match)"
    const skillMatch = jobSkills.some(s => userSkills.includes(s));
    if (skillMatch) score += 15;

    // 7. Recency (+5)
    if (job.postedDaysAgo <= 2) score += 5;

    // 8. Source (+5)
    if (job.source === 'LinkedIn') score += 5;

    // Cap at 100
    return Math.min(score, 100);
};

export const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FFB300'; // Amber
    if (score >= 40) return '#9E9E9E'; // Neutral/Grey
    return '#E0E0E0'; // Subtle Grey
};
