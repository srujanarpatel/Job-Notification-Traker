const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const generateId = () => Math.random().toString(36).substr(2, 9);

const companies = [
    'Infosys', 'TCS', 'Wipro', 'Accenture', 'Capgemini', 'Cognizant', 'IBM', 'Oracle', 'SAP', 'Dell',
    'Amazon', 'Flipkart', 'Swiggy', 'Razorpay', 'PhonePe', 'Paytm', 'Zoho', 'Freshworks', 'Juspay', 'CRED',
    'Microsoft', 'Google', 'Adobe', 'Cisco', 'Salesforce', 'Uber', 'Zomato', 'Meesho', 'Ola', 'InMobi',
    'Groww', 'Zerodha', 'Postman', 'BrowserStack', 'Chargebee', 'Hasura', 'Polygon', 'CoinSwitch', 'Upstox'
];

const roles = [
    'SDE Intern', 'Graduate Engineer Trainee', 'Junior Backend Developer', 'Frontend Intern',
    'QA Intern', 'Data Analyst Intern', 'Java Developer', 'Python Developer', 'React Developer',
    'Software Engineer 1', 'Full Stack Developer', 'Cloud Engineer Assoc', 'DevOps Junior'
];

const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Chennai', 'Gurgaon', 'Noida', 'Delhi'];
const modes = ['Remote', 'Hybrid', 'Onsite'];
const experiences = ['Fresher', '0-1 Years', '1-3 Years', '3-5 Years'];
const salaries = ['3-5 LPA', '4-7 LPA', '6-10 LPA', '10-18 LPA', '12-24 LPA', '₹15k-₹40k/month', '₹20k-₹50k/month'];
const sources = ['LinkedIn', 'Naukri', 'Indeed'];
const skillsPool = ['Java', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'JavaScript', 'C++', 'Spring Boot', 'Docker', 'Kubernetes', 'Redux', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Git', 'Linux', 'Azure', 'Machine Learning', 'Data Structures'];

const descriptions = [
    "We are looking for a passionate developer to join our team. You will work on cutting-edge technologies.",
    "Great opportunity for freshers to kickstart their career in a fast-paced environment. Training provided.",
    "Responsible for designing and implementing scalable web services. Must be proficient in core concepts.",
    "Join our dynamic team to build the next generation of our product. Collaborative culture.",
    "Seeking an enthusiastic intern with strong problem-solving skills and a hunger to learn.",
    "Work closely with our senior engineers to develop robust software solutions. Flexible working hours."
];

const generateJobs = (count) => {
    const jobs = [];
    for (let i = 0; i < count; i++) {
        const role = getRandom(roles);
        const company = getRandom(companies);
        const exp = role.includes('Intern') || role.includes('Trainee') ? 'Fresher' : getRandom(experiences);
        const sal = role.includes('Intern') ? (Math.random() > 0.5 ? '₹15k-₹40k/month' : '₹20k-₹50k/month') : getRandom(salaries);

        // Skill selection
        const numSkills = 3 + Math.floor(Math.random() * 3);
        const selectedSkills = [];
        while (selectedSkills.length < numSkills) {
            const s = getRandom(skillsPool);
            if (!selectedSkills.includes(s)) selectedSkills.push(s);
        }

        jobs.push({
            id: generateId(),
            title: role,
            company: company,
            location: getRandom(locations),
            mode: getRandom(modes),
            experience: exp,
            skills: selectedSkills,
            source: getRandom(sources),
            postedDaysAgo: Math.floor(Math.random() * 11), // 0-10
            salaryRange: sal,
            applyUrl: `https://www.${company.toLowerCase().replace(/\s/g, '')}.com/careers`,
            description: `${getRandom(descriptions)}\n\nRequirements:\n- Strong knowledge of ${selectedSkills[0]} and ${selectedSkills[1]}\n- Ability to work in a team\n- Good communication skills.`
        });
    }
    return jobs.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
};

export const jobs = generateJobs(60);
