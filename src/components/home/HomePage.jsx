import React from 'react';
import { Calculator, Users, BarChart3, Code, Target } from 'lucide-react';

const HomePage = ({ setCurrentApp }) => {
  const teamMembers = [
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

  const teamMetrics = {
    totalProjects: teamMembers.reduce((acc, member) => acc + member.projects, 0),
    totalTasks: teamMembers.reduce((acc, member) => acc + member.completedTasks, 0),
    averageRating: (teamMembers.reduce((acc, member) => acc + member.rating, 0) / teamMembers.length).toFixed(1),
    averageExperience: (teamMembers.reduce((acc, member) => acc + member.experience, 0) / teamMembers.length).toFixed(1)
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 animate-pulse">
            Welcome to Dashboard
          </h1>
          <p className="text-2xl text-white/80 mb-12">
            Explore our integrated analytics and visualization tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Curve Fitting Card */}
          <div 
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-white/20 backdrop-blur-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            onClick={() => setCurrentApp('curve-fitting')}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-500/20 p-4 rounded-2xl">
                <Calculator className="w-12 h-12 text-blue-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Curve Fitting</h2>
                <p className="text-blue-200">Mathematical Visualization Tool</p>
              </div>
            </div>
            
            <p className="text-white/90 mb-6 text-lg">
              Interactive tool for understanding mathematical curve fitting algorithms including linear regression, polynomial fitting, exponential and power law models.
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Algorithms</span>
                <p className="text-white font-semibold">4</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Visualizations</span>
                <p className="text-white font-semibold">Interactive</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Code</span>
                <p className="text-white font-semibold">Python</p>
              </div>
            </div>
            
            <div className="flex items-center text-blue-300 font-medium">
              <span>Explore Curve Fitting</span>
              <span className="ml-2">→</span>
            </div>
          </div>

          {/* Team Dashboard Card */}
          <div 
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl p-8 border border-white/20 backdrop-blur-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            onClick={() => setCurrentApp('team')}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-purple-500/20 p-4 rounded-2xl">
                <Users className="w-12 h-12 text-purple-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Team Dashboard</h2>
                <p className="text-purple-200">Team Analytics & Insights</p>
              </div>
            </div>
            
            <p className="text-white/90 mb-6 text-lg">
              Comprehensive team management dashboard with member profiles, performance analytics, skill tracking, and project insights.
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Members</span>
                <p className="text-white font-semibold">{teamMembers.length}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Projects</span>
                <p className="text-white font-semibold">{teamMetrics.totalProjects}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Avg Rating</span>
                <p className="text-white font-semibold">{teamMetrics.averageRating}</p>
              </div>
            </div>
            
            <div className="flex items-center text-purple-300 font-medium">
              <span>View Team Dashboard</span>
              <span className="ml-2">→</span>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 mb-4">
                <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Interactive Visualizations</h3>
                <p className="text-white/80">Real-time charts and graphs with interactive controls</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 mb-4">
                <Code className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Code Integration</h3>
                <p className="text-white/80">Complete Python implementations with explanations</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 mb-4">
                <Target className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Performance Analytics</h3>
                <p className="text-white/80">Detailed metrics and performance tracking with charts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;