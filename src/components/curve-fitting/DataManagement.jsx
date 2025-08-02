import React, { useState } from 'react';
import { Plus, Minus, Upload } from 'lucide-react';
import Papa from 'papaparse';

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          const parsedData = result.data.map(row => ({
            x: row.x,
            y: row.y
          })).filter(p => p.x !== undefined && p.y !== undefined);
          setDataPoints(parsedData);
        },
      });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-6xl mx-auto">
      <h3 className="text-xl font-semibold text-white mb-6">Data Management</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Section 1: Add Data Point */}
        <div className="space-y-3">
          <h4 className="text-lg text-white">Add Data Point</h4>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="X value"
              value={newX}
              onChange={(e) => setNewX(e.target.value)}
              className="w-full p-2 bg-white/20 text-white rounded-lg border border-white/30 placeholder-white/60 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
            />
            <input
              type="number"
              placeholder="Y value"
              value={newY}
              onChange={(e) => setNewY(e.target.value)}
              className="w-full p-2 bg-white/20 text-white rounded-lg border border-white/30 placeholder-white/60 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
            />
            <button
              onClick={addDataPoint}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors flex-shrink-0"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Section 2: Current Data Points */}
        <div className="space-y-3">
          <h4 className="text-lg text-white">Current Data Points</h4>
          <div className="bg-black/20 p-2 rounded-lg h-24 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
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

        {/* Section 3: Import from CSV */}
        <div className="space-y-3">
            <h4 className="text-lg text-white">Import from CSV</h4>
            <label htmlFor="csv-upload" className="w-full cursor-pointer bg-white/20 border border-white/30 rounded-lg p-2 flex items-center justify-center text-white/80 hover:bg-white/30 transition-colors">
                <Upload className="w-5 h-5 mr-2"/>
                <span>Choose File</span>
            </label>
            <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
            />
        </div>
      </div>
      
      {/* Bottom Controls Section */}
      <div className="mt-6 border-t border-white/20 pt-4 flex items-center justify-start space-x-8">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="residuals"
              checked={showResiduals}
              onChange={(e) => setShowResiduals(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="residuals" className="text-white/80">Show Residuals</label>
          </div>
          
          <div className="flex items-center space-x-3">
            <label className="text-white/80">Polynomial Degree:</label>
            <input
              type="range"
              min="1"
              max="5"
              value={polynomialDegree}
              onChange={(e) => setPolynomialDegree(parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-white font-semibold">{polynomialDegree}</span>
          </div>
      </div>
    </div>
  );
};

export default DataManagement;