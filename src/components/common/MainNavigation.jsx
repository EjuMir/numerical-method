import React from 'react';
import { Home, Calculator, Users, BookOpen } from 'lucide-react';

const AnimatedLogo = () => (
  <>
    <style>
      {`
        @keyframes spin-loop {
          0%, 100% {
            transform: rotateY(90deg);
            opacity: 0;
          }
          20%, 80% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }
        .spin-loop-1 {
          transform-origin: center;
          animation: spin-loop 4s ease-in-out infinite;
        }
        .spin-loop-2 {
          transform-origin: center;
          animation: spin-loop 4s ease-in-out infinite;
          animation-delay: 0.3s; /* Staggered start */
        }
      `}
    </style>
    <div className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg border border-white/20 mr-3">
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 32 32" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
            </defs>
            <g className="spin-loop-1">
              <path d="M24 24 A 10 10, 0, 1, 1, 24 8" stroke="url(#logoGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
            <g className="spin-loop-2">
              <path d="M8 8 A 10 10, 0, 1, 0, 8 24" stroke="url(#logoGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
        </svg>
    </div>
  </>
);


const MainNavigation = ({ currentApp, setCurrentApp }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center">
          <AnimatedLogo />
          <span className="text-2xl font-bold text-white">CurveCraft</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentApp('home')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              currentApp === 'home' 
                ? 'bg-purple-600 text-white shadow-lg' 
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
                ? 'bg-purple-600 text-white shadow-lg' 
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
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Team</span>
          </button>

          <button
            onClick={() => setCurrentApp('tutorial')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              currentApp === 'tutorial' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Tutorial</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default MainNavigation;