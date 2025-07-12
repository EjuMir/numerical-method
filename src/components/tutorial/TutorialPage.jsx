import React from 'react';

const TutorialPage = () => {
  return (
    <div className="mt-48 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            How to Use CurveCraft
          </h1>
          <p className="text-xl text-white/80">
            A step-by-step guide to mastering the application
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white/10 p-6 rounded-2xl">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-semibold text-white mb-3">Step 1: Input Your Data</h3>
              <p className="text-white/80 mb-4">
                Navigate to the "Curve Fitting" page. Here you can add, edit, or remove data points in the "Data Management" section.
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Manually enter X and Y coordinates.</li>
                <li>Add new points using the "+" button.</li>
                <li>Remove points by clicking the "-" button next to each data point.</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white/10 p-6 rounded-2xl">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-2xl font-semibold text-white mb-3">Step 2: Choose a Fitting Method</h3>
              <p className="text-white/80 mb-4">
                The "Curve Fitting" page displays cards for each available algorithm. You can analyze each one:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li><strong>Linear Regression:</strong> For straight-line relationships.</li>
                <li><strong>Polynomial:</strong> For curved relationships. Use the slider to adjust the degree.</li>
                <li><strong>Exponential:</strong> For modeling exponential growth or decay.</li>
                <li><strong>Power Law:</strong> For capturing power-law relationships.</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white/10 p-6 rounded-2xl">
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-2xl font-semibold text-white mb-3">Step 3: Visualize the Results</h3>
              <p className="text-white/80 mb-4">
                Each algorithm card has a "Visualization" tab that shows:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>An interactive chart with your data points and the fitted curve.</li>
                <li>The equation of the resulting curve.</li>
                <li>Goodness of fit measures like R² and Mean Absolute Error (MAE).</li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white/10 p-6 rounded-2xl">
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-semibold text-white mb-3">Step 4: Analyze and Export</h3>
              <p className="text-white/80 mb-4">
                Use the tabs within each algorithm card to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Toggle "Show Residuals" to visualize the error for each data point.</li>
                <li>Download the chart as a PNG image for your reports.</li>
                <li>View the Python implementation code.</li>
                <li>Study the mathematical theory behind each algorithm.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;