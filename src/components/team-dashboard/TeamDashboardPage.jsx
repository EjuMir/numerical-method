import React, { useState } from 'react';
import { Users, TrendingUp, Star } from 'lucide-react';
import TeamOverview from './TeamOverview';
import Analytics from './Analytics';
import MemberCard from './MemberCard';
import { teamMembers, teamMetrics, skillsChartData, COLORS } from '../../utils/teamData';

const TeamDashboardPage = () => {
  const [teamView, setTeamView] = useState('overview');
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Team Dashboard
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Meet our amazing team and explore their achievements
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {[
            { id: 'overview', label: 'Team Overview', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'members', label: 'Team Members', icon: Star }
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

        {teamView === 'overview' && (
          <TeamOverview
            teamMetrics={teamMetrics}
            teamMembers={teamMembers}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
          />
        )}
        {teamView === 'analytics' && (
          <Analytics
            skillsChartData={skillsChartData}
            teamMembers={teamMembers}
            COLORS={COLORS}
          />
        )}
        {teamView === 'members' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map(member => (
              <MemberCard
                key={member.id}
                member={member}
                isSelected={false}
                onClick={setSelectedMember}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDashboardPage;