import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const DataManagement = ({
  dataPoints,
  setDataPoints,
  showResiduals,
  setShowResiduals,
  polynomialDegree,
  setPolynomialDegree,
}) => {
  const [newX, setNewX] = useState('');
  const [newY, setNewY] = useState('');

  const addDataPoint = () => {
    if (newX && newY) {
      setDataPoints([...dataPoints, { x: parseFloat(newX), y: parseFloat(newY) }]);
      setNewX('');
      setNewY('');
    }
  };

  const removeDataPoint = (index) => {
    setDataPoints(dataPoints.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 max-w-6xl mx-auto">
      <h3 className="text-xl font-semibold text-white mb-4">Data Management</h3>
      
      <div className="flex justify-around gap-6">
        <div>
          <h4 className="text-lg text-white mb-3">Add Data Point</h4>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="X value"
              value={newX}
              onChange={(e) => setNewX(e.target.value)}
              className="flex-1 p-2 bg-white/20 text-white rounded-lg border border-white/30 placeholder-white/60"
            />
            <input
              type="number"
              placeholder="Y value"
              value={newY}
              onChange={(e) => setNewY(e.target.value)}
              className="flex-1 p-2 bg-white/20 text-white rounded-lg border border-white/30 placeholder-white/60"
            />
            <button
              onClick={addDataPoint}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg text-white mb-3">Current Data Points</h4>
          <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
            {dataPoints.map((point, index) => (
              <div key={index} className="flex items-center bg-white/20 rounded-lg px-3 py-1">
                <span className="text-white text-sm">({point.x}, {point.y})</span>
                <button
                  onClick={() => removeDataPoint(index)}
                  className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="residuals"
              checked={showResiduals}
              onChange={(e) => setShowResiduals(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="residuals" className="text-white/80">Show Residuals</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-white/80">Polynomial Degree:</label>
            <input
              type="range"
              min="1"
              max="5"
              value={polynomialDegree}
              onChange={(e) => setPolynomialDegree(parseInt(e.target.value))}
              className="w-20"
            />
            <span className="text-white/80">{polynomialDegree}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;