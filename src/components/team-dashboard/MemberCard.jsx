// src/components/team-dashboard/MemberCard.jsx

import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const MemberCard = ({ member }) => (
  <div className="bg-slate-900/40 p-8 rounded-2xl border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col text-center items-center">
    <img 
      src={member.avatar_url} 
      alt={`${member.name}'s avatar`}
      className="w-32 h-32 rounded-full mb-4 border-4 border-white/20"
    />
    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
    <p className="text-purple-300">@{member.username}</p>
    <p className="text-cyan-400 text-sm mb-2">{member.matric_id}</p> {/* New Matric ID */}
    
    {/* Role Badge */}
    <div className="mb-6 mt-2 flex-grow">
        <span className="px-4 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">
            {member.role}
        </span>
    </div>

    {/* Updated Links Section */}
    <div className="mt-auto w-full flex items-center justify-center space-x-4">
        <a 
            href={member.profile_url}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="w-12 h-12 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
            <Github className="w-6 h-6" />
        </a>
        <a 
            href={member.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="w-12 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
            <Linkedin className="w-6 h-6" />
        </a>
    </div>
  </div>
);

export default MemberCard;