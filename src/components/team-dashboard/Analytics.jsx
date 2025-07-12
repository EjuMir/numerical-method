import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const Analytics = ({ skillsChartData, teamMembers, COLORS }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Skills Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillsChartData.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis dataKey="skill" stroke="white" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="white" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Team Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={teamMembers.map(member => ({
              name: member.name.split(' ')[0],
              ...member.performance
            }))}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis dataKey="name" tick={{ fill: 'white', fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: 'white', fontSize: 10 }}
              />
              <Radar
                name="Productivity"
                dataKey="productivity"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
              />
              <Radar
                name="Collaboration"
                dataKey="collaboration"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

export default Analytics;