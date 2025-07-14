import React from 'react';
import {
  Calculator,
  Users,
  BarChart3,
  Code,
  Download,
  BookOpen,
  MousePointerClick,
  Database
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { teamMembers } from '../../utils/teamData';

// Sample data for the decorative chart
const decorativeData = [
    { name: 'A', uv: 100 },
    { name: 'B', uv: 300 },
    { name: 'C', uv: 180 },
    { name: 'D', uv: 450 },
    { name: 'E', uv: 280 },
    { name: 'F', uv: 500 },
    { name: 'G', uv: 400 },
];

const HomePage = ({ setCurrentApp }) => {
  // Derive metrics from the imported teamMembers data
  const teamMetrics = {
    totalRepos: teamMembers.reduce((acc, member) => acc + (member.repo_count || 0), 0),
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 animate-pulse">
            Welcome to Dashboard
          </h1>
          <p className="text-2xl text-white/80 mb-8">
            Explore our integrated analytics and visualization tools
          </p>
          
          {/* Animated Curve Visualization */}
          <div className="h-48 max-w-3xl mx-auto opacity-70">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={decorativeData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="welcomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="uv" 
                  stroke="#c4b5fd" 
                  strokeWidth={3} 
                  fill="url(#welcomeGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Navigation Cards */}
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
              Comprehensive team management dashboard with member profiles and analytics.
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Members</span>
                <p className="text-white font-semibold">{teamMembers.length}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Total Repos</span>
                <p className="text-white font-semibold">{teamMetrics.totalRepos}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Avg Rating</span>
                <p className="text-white font-semibold">4.8</p>
              </div>
            </div>
            <div className="flex items-center text-purple-300 font-medium">
              <span>View Team Dashboard</span>
              <span className="ml-2">→</span>
            </div>
          </div>
        </div>
        
        {/* Unified Key Features Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Key Features of CurveCraft</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/20 p-6 rounded-xl border border-white/10">
              <BarChart3 className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Interactive Visualizations</h3>
              <p className="text-white/80">Engage with real-time, interactive charts that bring your data to life.</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-500/20 p-6 rounded-xl border border-white/10">
              <Database className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Custom Data Inputs</h3>
              <p className="text-white/80">Manually add, edit, and remove data points to fit your specific needs.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/20 p-6 rounded-xl border border-white/10">
              <Code className="w-10 h-10 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Code Integration</h3>
              <p className="text-white/80">Access complete Python implementations with detailed explanations for each algorithm.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/20 p-6 rounded-xl border border-white/10">
              <BookOpen className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">In-Depth Theory</h3>
              <p className="text-white/80">Study the mathematical foundations and applications of each curve fitting method.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/20 p-6 rounded-xl border border-white/10">
              <MousePointerClick className="w-10 h-10 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Adjustable Parameters</h3>
              <p className="text-white/80">Fine-tune your analysis by adjusting parameters like the polynomial degree in real-time.</p>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-red-500/20 p-6 rounded-xl border border-white/10">
              <Download className="w-10 h-10 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Downloadable Charts</h3>
              <p className="text-white/80">Easily export your visualizations as high-quality PNG images for reports and presentations.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;