import React, { useState } from 'react';
import MainNavigation from './components/common/MainNavigation';
import HomePage from './components/home/HomePage';
import CurveFittingPage from './components/curve-fitting/CurveFittingPage';
import TeamDashboardPage from './components/team-dashboard/TeamDashboardPage';
import TutorialPage from './components/tutorial/TutorialPage'; // Import the new TutorialPage

const App = () => {
  const [currentApp, setCurrentApp] = useState('home');

  return (
    <div className="min-h-screen">
      <MainNavigation currentApp={currentApp} setCurrentApp={setCurrentApp} />
      
      {currentApp === 'home' && <HomePage setCurrentApp={setCurrentApp} />}
      {currentApp === 'curve-fitting' && <CurveFittingPage />}
      {currentApp === 'team' && <TeamDashboardPage />}
      {currentApp === 'tutorial' && <TutorialPage />} {/* Render the new TutorialPage */}
    </div>
  );
};

export default App;