import React from 'react';

const TutorialPage = () => {
  return (
    <div className="pt-36 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-white mb-4">
            How to Use CurveCraft
          </h1>
          <p className="text-xl text-white/80">
            A step-by-step guide to mastering the application
          </p>
        </div>

        {/* 2x2 Grid Layout for the cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Step 1 Card */}
          <div className="bg-slate-900/40 p-8 rounded-2xl border-2 border-transparent hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-2xl font-semibold text-white mb-4">Step 1: Input Your Data</h3>
            <p className="text-white/80 mb-4 flex-grow">
              Navigate to the "Curve Fitting" page. Here you can add, edit, or remove data points in the "Data Management" section.
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Manually enter X and Y coordinates.</li>
              <li>Add new points using the "+" button.</li>
              <li>Remove points by clicking the "-" button.</li>
              <li>Reset to default sample data at any time.</li>
            </ul>
          </div>
          </div>

          {/* Step 2 Card */}
          <div className="bg-slate-900/40 p-8 rounded-2xl border-2 border-transparent hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
            <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-2xl font-semibold text-white mb-4">Step 2: Choose a Fitting Method</h3>
            <p className="text-white/80 mb-4 flex-grow">
              The "Curve Fitting" page displays cards for each algorithm. You can analyze each one:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li><strong>Linear Regression:</strong> For straight-line relationships.</li>
              <li><strong>Polynomial:</strong> For curved relationships.</li>
              <li><strong>Exponential:</strong> For modeling exponential growth.</li>
              <li><strong>Power Law:</strong> For capturing power-law relationships.</li>
            </ul>
          </div>
          </div>

          {/* Step 3 Card */}
          <div className="bg-slate-900/40 p-8 rounded-2xl border-2 border-transparent hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
          <div className="border-l-4 border-yellow-500 pl-6">
            <h3 className="text-2xl font-semibold text-white mb-4">Step 3: Visualize the Results</h3>
            <p className="text-white/80 mb-4 flex-grow">
              Each algorithm card has a "Visualization" tab that shows:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>An interactive chart with your data points and the fitted curve.</li>
              <li>The equation of the resulting curve.</li>
              <li>Goodness of fit measures like R² and MAE.</li>
              <li>Hover over the chart to see detailed data point values.</li>
            </ul>
          </div>
          </div>

          {/* Step 4 Card */}
          <div className="bg-slate-900/40 p-8 rounded-2xl border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
            <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-2xl font-semibold text-white mb-4">Step 4: Analyze and Export</h3>
            <p className="text-white/80 mb-4 flex-grow">
              Use the tabs within each algorithm card to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Toggle "Show Residuals" to visualize the error.</li>
              <li>Download the chart as a PNG image for your reports.</li>
              <li>View the Python implementation code for each algorithm.</li>
              <li>Study the mathematical theory behind each method.</li>
            </ul>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TutorialPage;