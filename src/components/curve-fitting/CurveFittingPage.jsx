import React, { useState } from 'react';
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

const CurveFittingPage = () => {
  const [dataPoints, setDataPoints] = useState([
    { x: 1, y: 2.1 },
    { x: 2, y: 3.9 },
    { x: 3, y: 6.2 },
    { x: 4, y: 7.8 },
    { x: 5, y: 10.1 }
  ]);
  const [polynomialDegree, setPolynomialDegree] = useState(2);
  const [showResiduals, setShowResiduals] = useState(false);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Curve Fitting Visualization
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Interactive tool for understanding mathematical curve fitting algorithms
          </p>

          <DataManagement
            dataPoints={dataPoints}
            setDataPoints={setDataPoints}
            showResiduals={showResiduals}
            setShowResiduals={setShowResiduals}
            polynomialDegree={polynomialDegree}
            setPolynomialDegree={setPolynomialDegree}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AlgorithmCard
            method="linear"
            title="Linear Regression"
            description="Fits a straight line through data points using least squares method"
            color="from-blue-600/20 to-cyan-600/20"
            dataPoints={dataPoints}
            showResiduals={showResiduals}
            polynomialDegree={polynomialDegree}
            generateCurveData={generateCurveData}
            calculateResiduals={calculateResiduals}
            calculateRSquared={calculateRSquared}
            downloadChart={downloadChart}
            linearRegression={linearRegression}
          />
          
          <AlgorithmCard
            method="polynomial"
            title="Polynomial Regression"
            description="Fits polynomial curves of varying degrees to capture non-linear patterns"
            color="from-purple-600/20 to-pink-600/20"
            dataPoints={dataPoints}
            showResiduals={showResiduals}
            polynomialDegree={polynomialDegree}
            generateCurveData={generateCurveData}
            calculateResiduals={calculateResiduals}
            calculateRSquared={calculateRSquared}
            downloadChart={downloadChart}
            polynomialRegression={polynomialRegression}
          />
          
          <AlgorithmCard
            method="exponential"
            title="Exponential Fitting"
            description="Models exponential growth/decay patterns common in natural phenomena"
            color="from-green-600/20 to-emerald-600/20"
            dataPoints={dataPoints}
            showResiduals={showResiduals}
            polynomialDegree={polynomialDegree}
            generateCurveData={generateCurveData}
            calculateResiduals={calculateResiduals}
            calculateRSquared={calculateRSquared}
            downloadChart={downloadChart}
            exponentialFit={exponentialFit}
          />
          
          <AlgorithmCard
            method="power"
            title="Power Law Fitting"
            description="Captures power-law relationships found in scaling laws and physics"
            color="from-orange-600/20 to-red-600/20"
            dataPoints={dataPoints}
            showResiduals={showResiduals}
            polynomialDegree={polynomialDegree}
            generateCurveData={generateCurveData}
            calculateResiduals={calculateResiduals}
            calculateRSquared={calculateRSquared}
            downloadChart={downloadChart}
            powerLawFit={powerLawFit}
          />
        </div>
      </div>
    </div>
  );
};

export default CurveFittingPage;