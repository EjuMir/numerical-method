import React from 'react';
import { Trophy, Target, Star, Clock } from 'lucide-react';
import MemberCard from './MemberCard';

const TeamOverview = ({ teamMetrics, teamMembers, selectedMember, setSelectedMember }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="text-white/80 text-sm">Total Projects</p>
            <p className="text-3xl font-bold text-white">{teamMetrics.totalProjects}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-3">
          <Target className="w-8 h-8 text-green-400" />
          <div>
            <p className="text-white/80 text-sm">Completed Tasks</p>
            <p className="text-3xl font-bold text-white">{teamMetrics.totalTasks}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-3">
          <Star className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="text-white/80 text-sm">Avg Rating</p>
            <p className="text-3xl font-bold text-white">{teamMetrics.averageRating}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-3">
          <Clock className="w-8 h-8 text-blue-400" />
          <div>
            <p className="text-white/80 text-sm">Avg Experience</p>
            <p className="text-3xl font-bold text-white">{teamMetrics.averageExperience}y</p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {teamMembers.map(member => (
        <MemberCard
          key={member.id}
          member={member}
          isSelected={selectedMember?.id === member.id}
          onClick={setSelectedMember}
        />
      ))}
    </div>
  </div>
);

export default TeamOverview;