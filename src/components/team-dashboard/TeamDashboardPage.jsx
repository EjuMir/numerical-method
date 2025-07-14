// src/components/team-dashboard/TeamDashboardPage.jsx

import React, { useState } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { teamMembers, skillsChartData, performanceChartData, COLORS } from '../../utils/teamData';
import TeamOverview from './TeamOverview';
import Analytics from './Analytics';

const TeamDashboardPage = () => {
  const [teamView, setTeamView] = useState('overview');

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Meet the Team
          </h1>
          <p className="text-xl text-white/80">
            The developers behind CurveCraft
          </p>
        </div>

        {/* View Toggles */}
        <div className="flex justify-center space-x-4 mb-12">
          {[
            { id: 'overview', label: 'Team Overview', icon: Users },
            { id: 'analytics', label: 'Team Analytics', icon: TrendingUp },
          ].map(view => (
            <button
              key={view.id}
              onClick={() => setTeamView(view.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                teamView === view.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <view.icon className="w-5 h-5" />
              <span>{view.label}</span>
            </button>
          ))}
        </div>

        {/* Conditional View Rendering */}
        {teamView === 'overview' && <TeamOverview teamMembers={teamMembers} />}
        
        {teamView === 'analytics' && (
          <Analytics
            skillsChartData={skillsChartData}
            performanceChartData={performanceChartData}
            teamMembers={teamMembers}
            COLORS={COLORS}
          />
        )}
      </div>
    </div>
  );
};

export default TeamDashboardPage;