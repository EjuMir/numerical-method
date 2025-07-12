import React from 'react';
import { Home, Calculator, Users } from 'lucide-react';

const MainNavigation = ({ currentApp, setCurrentApp }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-white">📊 CurveCraft</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentApp('home')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              currentApp === 'home' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          
          <button
            onClick={() => setCurrentApp('curve-fitting')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              currentApp === 'curve-fitting' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Calculator className="w-5 h-5" />
            <span>Curve Fitting</span>
          </button>
          
          <button
            onClick={() => setCurrentApp('team')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              currentApp === 'team' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Team</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default MainNavigation;