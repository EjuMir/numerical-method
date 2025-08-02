import React, {useState, useEffect, useRef } from 'react';
import AlgorithmCard from './AlgorithmCard';
import DataManagement from './DataManagement';
import {
  linearRegression,
  polynomialRegression,
  exponentialFit,
  powerLawFit,
  generateCurveData,
  calculateResiduals,
  calculateRSquared,
  downloadChart
} from '../../utils/curveFitting';
import { LineChart, Atom, Sigma, Superscript } from 'lucide-react';
import { ResponsiveContainer, LineChart as ReLineChart, Line } from 'recharts';

const algorithms = [
  { id: 'linear', title: 'Linear Regression', icon: LineChart, color: 'from-blue-500 to-cyan-500', stroke: '#38bdf8', bg: 'bg-blue-500/10' },
  { id: 'polynomial', title: 'Polynomial Regression', icon: Sigma, color: 'from-purple-500 to-pink-500', stroke: '#c084fc', bg: 'bg-purple-500/10' },
  { id: 'exponential', title: 'Exponential Fitting', icon: Atom, color: 'from-green-500 to-emerald-500', stroke: '#4ade80', bg: 'bg-green-500/10' },
  { id: 'power', title: 'Power Law Fitting', icon: Superscript, color: 'from-yellow-400 to-lime-500', stroke: '#eab308', bg: 'bg-yellow-400/10' },
];

const previewChartData = {
    linear: [
        { x: 0, p: 1, c: 1.5 }, { x: 1, p: 2.8, c: 3.5 }, { x: 2, p: 4.2, c: 5.5 }, { x: 3, p: 8.1, c: 7.5 }, { x: 4, p: 10.3, c: 9.5 }
    ],
    polynomial: [
        { x: 0, p: 1, c: 1.5 }, { x: 1, p: 2.8, c: 1.8 }, { x: 2, p: 4.2, c: 3.5 }, { x: 3, p: 8.1, c: 7 }, { x: 4, p: 10.3, c: 10.8 }
    ],
    exponential: [
        { x: 0, p: 1, c: 1.8 }, { x: 1, p: 2.8, c: 2.5 }, { x: 2, p: 4.2, c: 3.8 }, { x: 3, p: 8.1, c: 6.2 }, { x: 4, p: 10.3, c: 10.5 }
    ],
    power: [
        { x: 0, p: 1, c: null }, { x: 1, p: 2.8, c: 2.8 }, { x: 2, p: 4.2, c: 5.2 }, { x: 3, p: 8.1, c: 7.6 }, { x: 4, p: 10.3, c: 10.4 }
    ]
};

const advancedStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
`;

const CurveFittingPage = () => {
  const [dataPoints, setDataPoints] = useState([
    { x: 1, y: 2.1 }, { x: 2, y: 3.9 }, { x: 3, y: 6.2 }, { x: 4, y: 7.8 }, { x: 5, y: 10.1 }
  ]);
  const [polynomialDegree, setPolynomialDegree] = useState(2);
  const [showResiduals, setShowResiduals] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getSelectedAlgorithmProps = () => {
    if (!selectedAlgorithm) return null;
    switch (selectedAlgorithm.id) {
        case 'linear': return { method: 'linear', title: 'Linear Regression', description: 'Fits a straight line...', color: 'from-blue-600/20 to-cyan-600/20', linearRegression };
        case 'polynomial': return { method: 'polynomial', title: 'Polynomial Regression', description: 'Fits polynomial curves...', color: 'from-purple-600/20 to-pink-600/20', polynomialRegression };
        case 'exponential': return { method: 'exponential', title: 'Exponential Fitting', description: 'Models exponential growth...', color: 'from-green-600/20 to-emerald-600/20', exponentialFit };
        case 'power': return { method: 'power', title: 'Power Law Fitting', description: 'Captures power-law relationships...', color: 'from-yellow-500/20 to-lime-500/20', powerLawFit };
        default: return null;
    }
  };
  const selectedProps = getSelectedAlgorithmProps();

  return (
    <>
      <style>{advancedStyles}</style>
      <div className="pt-28 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">Curve Fitting Visualization</h1>
            <p className="text-xl text-white/80">Select an algorithm to begin your analysis.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {algorithms.map(algo => (
                  <div
                      key={algo.id}
                      onClick={() => setSelectedAlgorithm(algo)}
                      className={`rounded-2xl p-1 bg-gradient-to-br ${algo.color} transition-all duration-300 cursor-pointer ${selectedAlgorithm?.id === algo.id ? 'shadow-2xl shadow-purple-500/30' : ''}`}
                  >
                      <div className="bg-slate-900 rounded-xl h-full flex flex-col overflow-hidden">
                          <div className={`p-4 ${algo.bg}`}>
                              <div className="flex items-center space-x-3">
                                  <div className="bg-black/30 p-2 rounded-lg">
                                      <algo.icon className="w-6 h-6" style={{ color: algo.stroke }} />
                                  </div>
                                  <h3 className="font-bold text-xl text-white">{algo.title}</h3>
                              </div>
                          </div>
                          <div className="h-32 w-full flex-grow flex items-center justify-center p-2">
                            {isClient && (
                                <ResponsiveContainer width="100%" height="100%">
                                  <ReLineChart data={previewChartData[algo.id]} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                      <Line dataKey="c" type="monotone" stroke={algo.stroke} strokeWidth={2.5} dot={false} />
                                      <Line dataKey="p" stroke="none" dot={{ fill: '#ef4444', r: 3 }} />
                                  </ReLineChart>
                                </ResponsiveContainer>
                            )}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
          {selectedAlgorithm && selectedProps && (
            <div className="space-y-8 animate-fade-in">
              <DataManagement dataPoints={dataPoints} setDataPoints={setDataPoints} showResiduals={showResiduals} setShowResiduals={setShowResiduals} polynomialDegree={polynomialDegree} setPolynomialDegree={setPolynomialDegree} />
              <AlgorithmCard key={selectedProps.method} {...selectedProps} dataPoints={dataPoints} showResiduals={showResiduals} polynomialDegree={polynomialDegree} generateCurveData={generateCurveData} calculateResiduals={calculateResiduals} calculateRSquared={calculateRSquared} downloadChart={downloadChart} />
            </div>
          )}
          {!selectedAlgorithm && (
              <div className="text-center text-white/60 py-20">
                  <p>Please select an algorithm from the cards above to start.</p>
              </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CurveFittingPage;