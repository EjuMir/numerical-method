import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Code, BarChart3, Database, BookOpen } from 'lucide-react';

const AlgorithmCard = ({
  method,
  title,
  description,
  color,
  dataPoints,
  showResiduals,
  polynomialDegree,
  generateCurveData,
  calculateResiduals,
  calculateRSquared,
  downloadChart
}) => {
    const [activeTab, setActiveTab] = useState('visualization');
    const { curveData, model } = generateCurveData(dataPoints, method, polynomialDegree);
    const residuals = calculateResiduals(dataPoints, method, polynomialDegree);
    const rSquared = calculateRSquared(dataPoints, residuals);

    const getPythonCode = () => {
      // This is a placeholder. You'd fill this with your actual Python code strings.
      return `
# Python code for ${title}
import numpy as np

# Data points
x_data = np.array([p['x'] for p in data_points])
y_data = np.array([p['y'] for p in data_points])

# --- Add specific fitting logic here ---
print("Equation:", "${model.equation}")
print("R-Squared:", "${rSquared.toFixed(4)}")
      `;
    };

    const getTheory = () => {
        // This is a placeholder. You'd fill this with your actual theory content.
        return {
            description: "Detailed theory for this model.",
            formula: "y = f(x)",
            mathematics: ["Equation 1", "Equation 2"],
            applications: "Various applications."
        };
    };

    const theory = getTheory();

    return (
      <div className={`bg-gradient-to-br ${color} rounded-2xl shadow-2xl border border-white/20 backdrop-blur-lg`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
              <p className="text-white/90">{description}</p>
            </div>
            <button
              onClick={() => downloadChart(method, title, dataPoints, showResiduals, polynomialDegree, generateCurveData, calculateResiduals, calculateRSquared)}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors flex items-center space-x-2 shadow-lg"
              title="Download Chart"
            >
              <Download className="w-5 h-5" />
              <span>Download Chart</span>
            </button>
          </div>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {[
              { id: 'visualization', icon: BarChart3, label: 'Visualization' },
              { id: 'data', icon: Database, label: 'Data Analysis' },
              { id: 'theory', icon: BookOpen, label: 'Theory' },
              { id: 'code', icon: Code, label: 'Python Code' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/15'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab === 'visualization' && (
            <div className="space-y-4">
                <div id={`chart-${method}`} className="h-80 bg-white/10 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                            <XAxis dataKey="x" type="number" domain={['dataMin-1', 'dataMax+1']} stroke="white"/>
                            <YAxis stroke="white" />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: 'white' }} />
                            <Line data={curveData} type="monotone" dataKey="y" stroke="#60a5fa" strokeWidth={3} dot={false} name="Fitted Curve" />
                            {dataPoints.map((point, index) => <Line key={index} data={[point]} dataKey="y" stroke="#ef4444" strokeWidth={0} dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }} name={`Point ${index + 1}`} />)}
                            {showResiduals && residuals.map((point, index) => <Line key={`residual-${index}`} data={[{ x: point.x, y: point.y }, { x: point.x, y: point.predicted }]} dataKey="y" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 5" dot={false} name={`Residual ${index + 1}`} />)}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Results ({title})</h4>
                    <p className="text-white/90 font-mono text-lg mb-2">{model.equation}</p>
                    <p className="text-white/80">R² = {rSquared.toFixed(4)}</p>
                </div>
            </div>
          )}

          {activeTab === 'data' && (
             <div className="space-y-4">
               {/* Data Analysis content here */}
             </div>
          )}
          {activeTab === 'theory' && (
             <div className="space-y-4">
                {/* Theory content here */}
             </div>
          )}
           {activeTab === 'code' && (
             <div className="bg-black/30 rounded-lg p-4">
               <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                 {getPythonCode()}
               </pre>
             </div>
           )}
        </div>
      </div>
    );
};
export default AlgorithmCard;