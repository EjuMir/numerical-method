import React, { useState, useEffect, useRef } from 'react';
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
  { id: 'linear', title: 'Linear Regression', icon: LineChart, color: 'from-blue-500 to-cyan-500', stroke: '#38bdf8' },
  { id: 'polynomial', title: 'Polynomial Regression', icon: Sigma, color: 'from-purple-500 to-pink-500', stroke: '#c084fc' },
  { id: 'exponential', title: 'Exponential Fitting', icon: Atom, color: 'from-green-500 to-emerald-500', stroke: '#4ade80' },
  { id: 'power', title: 'Power Law Fitting', icon: Superscript, color: 'from-yellow-400 to-lime-500', stroke: '#eab308' },
];

// Final preview data with visually appealing lines
const previewData = {
    points: [{x: 0, y: 1}, {x: 1, y: 2.8}, {x: 2, y: 4.2}, {x: 3, y: 8.1}, {x: 4, y: 10.3}],
    curves: {
        linear:      [{x: 0, y: 1.5}, {x: 1, y: 3.5}, {x: 2, y: 5.5}, {x: 3, y: 7.5}, {x: 4, y: 9.5}],
        polynomial:  [{x: 0, y: 1.5}, {x: 1, y: 1.8}, {x: 2, y: 3.5}, {x: 3, y: 7}, {x: 4, y: 10.8}],
        exponential: [{x: 0, y: 1.8}, {x: 1, y: 2.5}, {x: 2, y: 3.8}, {x: 3, y: 6.2}, {x: 4, y: 10.5}],
        power:       [{x: 0.2, y: 0.8}, {x: 1, y: 2}, {x: 2, y: 4}, {x: 3, y: 6.5}, {x: 4, y: 9}],
    }
};

const CurveFittingPage = () => {
  const [dataPoints, setDataPoints] = useState([
    { x: 1, y: 2.1 }, { x: 2, y: 3.9 }, { x: 3, y: 6.2 }, { x: 4, y: 7.8 }, { x: 5, y: 10.1 }
  ]);
  const [polynomialDegree, setPolynomialDegree] = useState(2);
  const [showResiduals, setShowResiduals] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      for (const card of container.getElementsByClassName('algo-card')) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [cardsContainerRef]);


  const getSelectedAlgorithmProps = () => {
    if (!selectedAlgorithm) return null;
    const algo = algorithms.find(a => a.id === selectedAlgorithm.id);
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
    <div className="pt-28 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Curve Fitting Visualization</h1>
          <p className="text-xl text-white/80">Select an algorithm to begin your analysis.</p>
        </div>

        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12" style={{ perspective: '1000px' }}>
            {algorithms.map(algo => (
                <div
                    key={algo.id}
                    onClick={() => setSelectedAlgorithm(algo)}
                    className={`algo-card relative rounded-2xl p-1 bg-gradient-to-br ${algo.color} transition-all duration-300 cursor-pointer transform-style-3d hover:scale-105`}
                >
                    <div className="bg-slate-900 rounded-xl h-full p-4 flex flex-col justify-between">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="bg-black/30 p-2 rounded-lg">
                                <algo.icon className="w-6 h-6" style={{ color: algo.stroke }} />
                            </div>
                            <h3 className="font-bold text-xl text-white">{algo.title}</h3>
                        </div>
                        <div className="h-32 w-full">
                            <ResponsiveContainer>
                                <ReLineChart data={[...previewData.points, ...previewData.curves[algo.id]]} margin={{ top: 15, right: 15, left: 15, bottom: 15 }}>
                                    <Line data={previewData.curves[algo.id]} type="monotone" dataKey="y" stroke={algo.stroke} strokeWidth={2.5} dot={false} />
                                    <Line dataKey="y" data={previewData.points} stroke="#ef4444" strokeWidth={0} dot={{ fill: '#ef4444', r: 3, strokeWidth: 0 }} />
                                </ReLineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                     <div className={`spotlight absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 ${selectedAlgorithm?.id === algo.id ? 'opacity-100' : 'group-hover:opacity-100'}`}></div>
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
  );
};

// --- Injected CSS for advanced effects ---
const advancedStyles = document.createElement('style');
advancedStyles.innerHTML = `
.transform-style-3d {
  transform-style: preserve-3d;
}
.algo-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.algo-card:hover {
  transform: rotateY(calc((var(--mouse-x) - 150px) / 10 * -1deg)) rotateX(calc((var(--mouse-y) - 150px) / 10 * 1deg)) translateZ(20px);
}
.algo-card .spotlight {
  background: radial-gradient(
    circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.15),
    transparent 40%
  );
  z-index: 2;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
`;
document.head.appendChild(advancedStyles);

export default CurveFittingPage;