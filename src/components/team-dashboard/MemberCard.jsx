import React from 'react';
import { Trophy, Star } from 'lucide-react';

const MemberCard = ({ member, isSelected, onClick }) => (
  <div
    className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
      isSelected 
        ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-400 shadow-2xl' 
        : 'bg-white/10 hover:bg-white/20 border border-white/20'
    }`}
    onClick={() => onClick(member)}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
    <div className="relative p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-4xl">{member.avatar}</div>
        <div>
          <h3 className="text-xl font-bold text-white">{member.name}</h3>
          <p className="text-purple-200">{member.role}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-white/80 text-sm">Projects</span>
          </div>
          <p className="text-2xl font-bold text-white">{member.projects}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-white/80 text-sm">Rating</span>
          </div>
          <p className="text-2xl font-bold text-white">{member.rating}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {member.skills.slice(0, 3).map(skill => (
          <span
            key={skill}
            className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
        {member.skills.length > 3 && (
          <span className="px-2 py-1 bg-white/20 text-white/80 rounded-full text-xs">
            +{member.skills.length - 3} more
          </span>
        )}
      </div>
      
      <div className="text-white/80 text-sm line-clamp-2">
        {member.bio}
      </div>
    </div>
  </div>
);

export default MemberCard;