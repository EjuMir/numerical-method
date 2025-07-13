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
      switch (method) {
        case 'linear':
          return `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Data points
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2.1, 3.9, 6.2, 7.8, 10.1])

# Create and fit the model
model = LinearRegression()
model.fit(X, y)

# Get coefficients
slope = model.coef_[0]
intercept = model.intercept_

# Make predictions
y_pred = model.predict(X)

# Calculate R-squared
r_squared = model.score(X, y)

print(f"Equation: y = {slope:.3f}x + {intercept:.3f}")
print(f"R-squared: {r_squared:.4f}")

# Plot results
plt.scatter(X, y, color='red', label='Data points')
plt.plot(X, y_pred, color='blue', label='Fitted line')
plt.xlabel('X')
plt.ylabel('Y')
plt.legend()
plt.show()`;

        case 'polynomial':
          return `import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline

# Data points
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2.1, 3.9, 6.2, 7.8, 10.1])

# Create polynomial features and fit
degree = ${polynomialDegree}
poly_model = Pipeline([
    ('poly', PolynomialFeatures(degree=degree)),
    ('linear', LinearRegression())
])

poly_model.fit(X, y)

# Make predictions
y_pred = poly_model.predict(X)

# Calculate R-squared
r_squared = poly_model.score(X, y)

print(f"Polynomial degree: {degree}")
print(f"R-squared: {r_squared:.4f}")

# Plot results
X_plot = np.linspace(X.min(), X.max(), 100).reshape(-1, 1)
y_plot = poly_model.predict(X_plot)

plt.scatter(X, y, color='red', label='Data points')
plt.plot(X_plot, y_plot, color='blue', label=f'Polynomial fit (degree {degree})')
plt.xlabel('X')
plt.ylabel('Y')
plt.legend()
plt.show()`;

        case 'exponential':
          return `import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit

# Data points
X = np.array([1, 2, 3, 4, 5])
y = np.array([2.1, 3.9, 6.2, 7.8, 10.1])

# Define exponential function
def exponential_func(x, a, b):
    return a * np.exp(b * x)

# Fit the curve
popt, pcov = curve_fit(exponential_func, X, y)
a, b = popt

# Make predictions
y_pred = exponential_func(X, a, b)

# Calculate R-squared
ss_res = np.sum((y - y_pred) ** 2)
ss_tot = np.sum((y - np.mean(y)) ** 2)
r_squared = 1 - (ss_res / ss_tot)

print(f"Equation: y = {a:.3f}e^({b:.3f}x)")
print(f"R-squared: {r_squared:.4f}")

# Plot results
X_plot = np.linspace(X.min(), X.max(), 100)
y_plot = exponential_func(X_plot, a, b)

plt.scatter(X, y, color='red', label='Data points')
plt.plot(X_plot, y_plot, color='blue', label='Exponential fit')
plt.xlabel('X')
plt.ylabel('Y')
plt.legend()
plt.show()`;

        case 'power':
          return `import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit

# Data points
X = np.array([1, 2, 3, 4, 5])
y = np.array([2.1, 3.9, 6.2, 7.8, 10.1])

# Define power law function
def power_law_func(x, a, b):
    return a * np.power(x, b)

# Fit the curve
popt, pcov = curve_fit(power_law_func, X, y)
a, b = popt

# Make predictions
y_pred = power_law_func(X, a, b)

# Calculate R-squared
ss_res = np.sum((y - y_pred) ** 2)
ss_tot = np.sum((y - np.mean(y)) ** 2)
r_squared = 1 - (ss_res / ss_tot)

print(f"Equation: y = {a:.3f}x^{b:.3f}")
print(f"R-squared: {r_squared:.4f}")

# Plot results
X_plot = np.linspace(X.min(), X.max(), 100)
y_plot = power_law_func(X_plot, a, b)

plt.scatter(X, y, color='red', label='Data points')
plt.plot(X_plot, y_plot, color='blue', label='Power law fit')
plt.xlabel('X')
plt.ylabel('Y')
plt.legend()
plt.show()`;

        default:
          return '';
      }
    };

    const getTheory = () => {
      switch (method) {
        case 'linear':
          return {
            description: "Linear regression fits a straight line through the data points using the least squares method. It minimizes the sum of squared residuals.",
            formula: "y = mx + b",
            mathematics: [
              "slope (m) = (n∑xy - ∑x∑y) / (n∑x² - (∑x)²)",
              "intercept (b) = (∑y - m∑x) / n",
              "where n is the number of data points"
            ],
            applications: "Used for simple linear relationships, trend analysis, and as a baseline model."
          };

        case 'polynomial':
          return {
            description: "Polynomial regression fits a polynomial curve of specified degree. Higher degrees can capture more complex patterns but may overfit.",
            formula: `y = a₀ + a₁x + a₂x² + ... + a${polynomialDegree}x^${polynomialDegree}`,
            mathematics: [
              "Solved using normal equations: (X'X)a = X'Y",
              "X is the Vandermonde matrix with powers of x",
              "Coefficients found via Gaussian elimination"
            ],
            applications: "Useful for non-linear relationships, curve fitting in physics, and polynomial interpolation."
          };

        case 'exponential':
          return {
            description: "Exponential fitting models exponential growth or decay patterns. Common in population dynamics, radioactive decay, and compound interest.",
            formula: "y = ae^(bx)",
            mathematics: [
              "Transform to linear: ln(y) = ln(a) + bx",
              "Apply linear regression to (x, ln(y))",
              "Back-transform: a = e^(intercept), b = slope"
            ],
            applications: "Population growth, radioactive decay, bacterial growth, compound interest calculations."
          };

        case 'power':
          return {
            description: "Power law fitting models relationships where one variable is proportional to a power of another. Common in physics and scaling laws.",
            formula: "y = ax^b",
            mathematics: [
              "Transform to linear: ln(y) = ln(a) + b·ln(x)",
              "Apply linear regression to (ln(x), ln(y))",
              "Back-transform: a = e^(intercept), b = slope"
            ],
            applications: "Scaling laws, allometric relationships, fractal geometry, power-law distributions."
          };

        default:
          return { description: "", formula: "", mathematics: [], applications: "" };
      }
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
          
          <div className="flex space-x-2 mb-6">
            {[
              { id: 'visualization', icon: BarChart3, label: 'Visualization' },
              { id: 'code', icon: Code, label: 'Python Code' },
              { id: 'data', icon: Database, label: 'Data Analysis' },
              { id: 'theory', icon: BookOpen, label: 'Theory' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
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
                    <XAxis 
                      dataKey="x" 
                      type="number" 
                      domain={['dataMin-1', 'dataMax+1']}
                      stroke="white"
                    />
                    <YAxis stroke="white" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    
                    <Line
                      data={curveData}
                      type="monotone"
                      dataKey="y"
                      stroke="#60a5fa"
                      strokeWidth={3}
                      dot={false}
                      name="Fitted Curve"
                    />
                    
                    {dataPoints.map((point, index) => (
                      <Line
                        key={index}
                        data={[point]}
                        dataKey="y"
                        stroke="#ef4444"
                        strokeWidth={0}
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                        name={`Point ${index + 1}`}
                      />
                    ))}
                    
                    {showResiduals && residuals.map((point, index) => (
                      <Line
                        key={`residual-${index}`}
                        data={[
                          { x: point.x, y: point.y },
                          { x: point.x, y: point.predicted }
                        ]}
                        dataKey="y"
                        stroke="#fbbf24"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name={`Residual ${index + 1}`}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Results</h4>
                <p className="text-white/90 font-mono text-lg mb-2">{model.equation}</p>
                <p className="text-white/80">R² = {rSquared.toFixed(4)}</p>
                <p className="text-white/80">
                  MAE = {(residuals.reduce((acc, p) => acc + Math.abs(p.residual), 0) / residuals.length).toFixed(4)}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="bg-black/30 rounded-lg p-4">
              <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                {getPythonCode()}
              </pre>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4 max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white/80 pb-2">X</th>
                      <th className="text-left text-white/80 pb-2">Observed</th>
                      <th className="text-left text-white/80 pb-2">Predicted</th>
                      <th className="text-left text-white/80 pb-2">Residual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residuals.map((point, i) => (
                      <tr key={i} className="border-b border-white/10">
                        <td className="text-white py-1">{point.x}</td>
                        <td className="text-white py-1">{point.y.toFixed(3)}</td>
                        <td className="text-white py-1">{point.predicted.toFixed(3)}</td>
                        <td className={`py-1 ${point.residual > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {point.residual.toFixed(3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <h5 className="text-white font-medium mb-1">R² Score</h5>
                  <p className="text-2xl font-bold text-white">{rSquared.toFixed(4)}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <h5 className="text-white font-medium mb-1">Mean Absolute Error</h5>
                  <p className="text-2xl font-bold text-white">
                    {(residuals.reduce((acc, p) => acc + Math.abs(p.residual), 0) / residuals.length).toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theory' && (
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Mathematical Foundation</h4>
                <p className="text-white/90 mb-3">{theory.description}</p>
                <div className="bg-black/30 rounded-lg p-3 mb-3">
                  <p className="text-white/90 font-mono text-lg">{theory.formula}</p>
                </div>
                <div className="space-y-2">
                  {theory.mathematics.map((eq, index) => (
                    <p key={index} className="text-white/80 font-mono text-sm">{eq}</p>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Applications</h4>
                <p className="text-white/90">{theory.applications}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default AlgorithmCard;