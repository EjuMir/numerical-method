export const teamMembers = [
    {
      id: 1,
      name: "Sayem Ahamed",
      role: "Lead Data Scientist",
      avatar: "🧑",
      email: "sarah.chen@company.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      joinDate: "2021-03-15",
      experience: 5,
      skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch"],
      projects: 12,
      completedTasks: 89,
      rating: 4.9,
      bio: "AI specialist with expertise in computer vision and NLP. Led 3 major ML projects resulting in $2M+ revenue increase.",
      social: {
        github: "sarah-chen-ai",
        linkedin: "sarah-chen-data"
      },
      performance: {
        productivity: 95,
        collaboration: 92,
        innovation: 98,
        leadership: 88,
        communication: 91
      },
      monthlyStats: [
        { month: 'Jan', tasks: 15, projects: 2, bugs: 3 },
        { month: 'Feb', tasks: 18, projects: 3, bugs: 2 },
        { month: 'Mar', tasks: 22, projects: 2, bugs: 1 },
        { month: 'Apr', tasks: 19, projects: 3, bugs: 2 },
        { month: 'May', tasks: 25, projects: 4, bugs: 1 },
        { month: 'Jun', tasks: 28, projects: 3, bugs: 0 }
      ]
    },
    {
      id: 2,
      name: "Turja Dutta",
      role: "Full Stack Developer",
      avatar: "👨‍💻",
      email: "marcus.rodriguez@company.com",
      phone: "+1 (555) 234-5678",
      location: "Austin, TX",
      joinDate: "2020-08-20",
      experience: 7,
      skills: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
      projects: 18,
      completedTasks: 134,
      rating: 4.7,
      bio: "Full-stack engineer passionate about scalable architectures. Built the company's main platform serving 100k+ users.",
      social: {
        github: "marcus-dev",
        linkedin: "marcus-rodriguez-dev"
      },
      performance: {
        productivity: 91,
        collaboration: 95,
        innovation: 87,
        leadership: 92,
        communication: 89
      },
      monthlyStats: [
        { month: 'Jan', tasks: 20, projects: 3, bugs: 5 },
        { month: 'Feb', tasks: 23, projects: 4, bugs: 3 },
        { month: 'Mar', tasks: 26, projects: 3, bugs: 4 },
        { month: 'Apr', tasks: 22, projects: 5, bugs: 2 },
        { month: 'May', tasks: 30, projects: 4, bugs: 1 },
        { month: 'Jun', tasks: 33, projects: 5, bugs: 2 }
      ]
    },
    {
      id: 3,
      name: "Mir Md. Tarhimul Quader",
      role: "UX/UI Designer",
      avatar: "🎨",
      email: "emily.watson@company.com",
      phone: "+1 (555) 345-6789",
      location: "New York, NY",
      joinDate: "2022-01-10",
      experience: 4,
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
      projects: 8,
      completedTasks: 67,
      rating: 4.8,
      bio: "Creative designer focused on user-centered design. Redesigned 5 major products improving user satisfaction by 40%.",
      social: {
        github: "emily-designs",
        linkedin: "emily-watson-ux"
      },
      performance: {
        productivity: 88,
        collaboration: 96,
        innovation: 94,
        leadership: 85,
        communication: 93
      },
      monthlyStats: [
        { month: 'Jan', tasks: 12, projects: 2, bugs: 1 },
        { month: 'Feb', tasks: 14, projects: 2, bugs: 0 },
        { month: 'Mar', tasks: 16, projects: 3, bugs: 1 },
        { month: 'Apr', tasks: 13, projects: 2, bugs: 0 },
        { month: 'May', tasks: 18, projects: 3, bugs: 1 },
        { month: 'Jun', tasks: 20, projects: 4, bugs: 0 }
      ]
    },
    {
      id: 4,
      name: "Mir Md. Ejajul Haque Eju",
      role: "DevOps Engineer",
      avatar: "⚙️",
      email: "david.kim@company.com",
      phone: "+1 (555) 456-7890",
      location: "Seattle, WA",
      joinDate: "2019-11-05",
      experience: 8,
      skills: ["Kubernetes", "Jenkins", "Terraform", "AWS", "Monitoring"],
      projects: 15,
      completedTasks: 102,
      rating: 4.6,
      bio: "Infrastructure expert ensuring 99.9% uptime. Reduced deployment time by 70% and infrastructure costs by 30%.",
      social: {
        github: "david-kim-devops",
        linkedin: "david-kim-infrastructure"
      },
      performance: {
        productivity: 93,
        collaboration: 87,
        innovation: 91,
        leadership: 89,
        communication: 86
      },
      monthlyStats: [
        { month: 'Jan', tasks: 17, projects: 2, bugs: 8 },
        { month: 'Feb', tasks: 19, projects: 3, bugs: 6 },
        { month: 'Mar', tasks: 21, projects: 2, bugs: 5 },
        { month: 'Apr', tasks: 18, projects: 4, bugs: 3 },
        { month: 'May', tasks: 24, projects: 3, bugs: 4 },
        { month: 'Jun', tasks: 27, projects: 4, bugs: 2 }
      ]
    }
];

export const teamMetrics = {
  totalProjects: teamMembers.reduce((total, member) => total + member.projects, 0),
  totalTasks: teamMembers.reduce((total, member) => total + member.completedTasks, 0),
  averageRating: (teamMembers.reduce((total, member) => total + member.rating, 0) / teamMembers.length).toFixed(1),
  averageExperience: (teamMembers.reduce((total, member) => total + member.experience, 0) / teamMembers.length).toFixed(1),
};

const skillsData = teamMembers.reduce((skills, member) => {
  member.skills.forEach(skill => {
    skills[skill] = (skills[skill] || 0) + 1;
  });
  return skills;
}, {});

export const skillsChartData = Object.entries(skillsData)
  .map(([skill, count]) => ({
    skill,
    count,
    percentage: ((count / teamMembers.length) * 100).toFixed(1),
  }))
  .sort((a, b) => b.count - a.count);

export const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];