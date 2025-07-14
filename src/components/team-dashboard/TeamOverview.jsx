// src/components/team-dashboard/TeamOverview.jsx

import React from 'react';
import MemberCard from './MemberCard';

const TeamOverview = ({ teamMembers }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {teamMembers.map(member => (
      <MemberCard key={member.id} member={member} />
    ))}
  </div>
);

export default TeamOverview;