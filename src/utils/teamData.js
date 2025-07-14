// src/utils/teamData.js

export const teamMembers = [
  {
    id: 1,
    name: "Md. Iftaker Ahamed Sayem",
    username: "Sayemahamed",
    avatar_url: "https://github.com/Sayemahamed.png",
    role: "Project Leader",
    profile_url: "https://github.com/Sayemahamed",
    linkedin_url: "https://www.linkedin.com/in/sayem-ahamed-47b890242/",
    matric_id: "C221020",
    skills: ["TypeScript", "JavaScript", "Python", "C++", "React", "Django", "Jupyter Notebook", "AI", "ML"],
    repo_count: 52,
    followers: 16,
    contributions_2025: 305,
    all_time_contributions: 1785,
  },
  {
    id: 2,
    name: "Turja Dutta",
    username: "duttaturja",
    avatar_url: "https://github.com/duttaturja.png",
    role: "Full Stack Developer",
    profile_url: "https://github.com/duttaturja",
    linkedin_url: "https://www.linkedin.com/in/duttaturja/",
    matric_id: "C221026",
    skills: ["Python", "JavaScript", "React",  "Jupyter Notebook", "C++", "AI", "ML", "Django"],
    repo_count: 31,
    followers: 15,
    contributions_2025: 391,
    all_time_contributions: 570,
  },
  {
    id: 3,
    name: "Mir Md. Tarhimul Quader",
    username: "mmtq",
    avatar_url: "https://github.com/mmtq.png",
    role: "Full Stack Developer",
    profile_url: "https://github.com/mmtq",
    linkedin_url: "https://www.linkedin.com/in/tarhimul/",
    matric_id: "C221017",
    skills: ["Python", "JavaScript", "C++", "React", "AI", "ML", "Jupyter Notebook", "Django"],
    repo_count: 25,
    followers: 6,
    contributions_2025: 283,
    all_time_contributions: 482,
  },
  {
    id: 4,
    name: "Mir Md. Ejajul Haque",
    username: "EjuMir",
    avatar_url: "https://github.com/EjuMir.png",
    role: "Full Stack Developer",
    profile_url: "https://github.com/EjuMir",
    linkedin_url: "https://www.linkedin.com/in/ejumir/",
    matric_id: "C221036",
    skills: ["React", "JavaScript", "Typescript", "AI"],
    repo_count: 26,
    followers: 10,
    contributions_2025: 11,
    all_time_contributions: 372,
  }
];

// --- DYNAMICALLY GENERATED DATA FOR CHARTS ---
const skillsCounter = teamMembers.flatMap(member => member.skills).reduce((acc, skill) => {
    acc[skill] = (acc[skill] || 0) + 1;
    return acc;
}, {});

export const skillsChartData = Object.entries(skillsCounter)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);

// Performance Radar Chart Data (NORMALIZED)
// Calculate raw impact score first
teamMembers.forEach(member => {
    member.impact_score = member.repo_count > 0 ? member.all_time_contributions / member.repo_count : 0;
});

const maxRepos = Math.max(...teamMembers.map(m => m.repo_count));
const maxContributions = Math.max(...teamMembers.map(m => m.contributions_2025));
const maxImpact = Math.max(...teamMembers.map(m => m.impact_score));

export const performanceChartData = [
  {
    subject: 'Repositories',
    ...teamMembers.reduce((acc, member) => ({ ...acc, [member.username]: Math.round((member.repo_count / maxRepos) * 100) }), {}),
    fullMark: 100,
  },
  {
    subject: 'Contributions',
    ...teamMembers.reduce((acc, member) => ({ ...acc, [member.username]: Math.round((member.contributions_2025 / maxContributions) * 100) }), {}),
    fullMark: 100,
  },
  {
    subject: 'Impact',
    ...teamMembers.reduce((acc, member) => ({ ...acc, [member.username]: Math.round((member.impact_score / maxImpact) * 100) }), {}),
    fullMark: 100,
  },
];

export const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];