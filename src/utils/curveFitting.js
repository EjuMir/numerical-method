export const linearRegression = (points) => {
  const n = points.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  
  for (let i = 0; i < n; i++) {
    sumX += points[i].x;
    sumY += points[i].y;
    sumXY += points[i].x * points[i].y;
    sumX2 += points[i].x * points[i].x;
  }
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  return { slope, intercept, equation: `y = ${slope.toFixed(3)}x + ${intercept.toFixed(3)}` };
};

export const polynomialRegression = (points, degree) => {
  const n = points.length;
  const matrix = [];
  const vector = [];
  
  for (let i = 0; i <= degree; i++) {
    const row = [];
    for (let j = 0; j <= degree; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += Math.pow(points[k].x, i + j);
      }
      row.push(sum);
    }
    matrix.push(row);
    
    let sum = 0;
    for (let k = 0; k < n; k++) {
      sum += points[k].y * Math.pow(points[k].x, i);
    }
    vector.push(sum);
  }
  
  const coefficients = gaussianElimination(matrix, vector);
  
  return { coefficients, equation: formatPolynomial(coefficients) };
};

export const exponentialFit = (points) => {
  const transformedPoints = points.map(p => ({ x: p.x, y: Math.log(p.y) }));
  const { slope: b, intercept: lnA } = linearRegression(transformedPoints);
  const a = Math.exp(lnA);
  
  return { a, b, equation: `y = ${a.toFixed(3)}e^(${b.toFixed(3)}x)` };
};

export const powerLawFit = (points) => {
  const transformedPoints = points.map(p => ({ x: Math.log(p.x), y: Math.log(p.y) }));
  const { slope: b, intercept: lnA } = linearRegression(transformedPoints);
  const a = Math.exp(lnA);
  
  return { a, b, equation: `y = ${a.toFixed(3)}x^${b.toFixed(3)}` };
};

export const gaussianElimination = (matrix, vector) => {
  const n = matrix.length;
  const augmented = matrix.map((row, i) => [...row, vector[i]]);
  
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
        maxRow = k;
      }
    }
    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
    
    for (let k = i + 1; k < n; k++) {
      const factor = augmented[k][i] / augmented[i][i];
      for (let j = i; j < n + 1; j++) {
        augmented[k][j] -= factor * augmented[i][j];
      }
    }
  }
  
  const solution = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    solution[i] = augmented[i][n];
    for (let j = i + 1; j < n; j++) {
      solution[i] -= augmented[i][j] * solution[j];
    }
    solution[i] /= augmented[i][i];
  }
  
  return solution;
};

export const formatPolynomial = (coefficients) => {
  let equation = 'y = ';
  coefficients.forEach((coeff, i) => {
    if (i === 0) {
      equation += coeff.toFixed(3);
    } else {
      const sign = coeff >= 0 ? ' + ' : ' - ';
      const absCoeff = Math.abs(coeff).toFixed(3);
      if (i === 1) {
        equation += `${sign}${absCoeff}x`;
      } else {
        equation += `${sign}${absCoeff}x^${i}`;
      }
    }
  });
  return equation;
};

export const generateCurveData = (dataPoints, method, polynomialDegree) => {
  const xMin = Math.min(...dataPoints.map(p => p.x)) - 1;
  const xMax = Math.max(...dataPoints.map(p => p.x)) + 1;
  const step = (xMax - xMin) / 100;
  const curveData = [];
  
  let model;
  switch (method) {
    case 'linear':
      model = linearRegression(dataPoints);
      for (let x = xMin; x <= xMax; x += step) {
        curveData.push({ x, y: model.slope * x + model.intercept });
      }
      break;
    case 'polynomial':
      model = polynomialRegression(dataPoints, polynomialDegree);
      for (let x = xMin; x <= xMax; x += step) {
        let y = 0;
        model.coefficients.forEach((coeff, i) => {
          y += coeff * Math.pow(x, i);
        });
        curveData.push({ x, y });
      }
      break;
    case 'exponential':
      model = exponentialFit(dataPoints);
      for (let x = xMin; x <= xMax; x += step) {
        curveData.push({ x, y: model.a * Math.exp(model.b * x) });
      }
      break;
    case 'power':
      model = powerLawFit(dataPoints);
      for (let x = xMin; x <= xMax; x += step) {
        curveData.push({ x, y: model.a * Math.pow(x, model.b) });
      }
      break;
  }
  
  return { curveData, model };
};

export const calculateResiduals = (dataPoints, method, polynomialDegree) => {
  const { model } = generateCurveData(dataPoints, method, polynomialDegree);
  return dataPoints.map(point => {
    let predicted;
    switch (method) {
      case 'linear':
        predicted = model.slope * point.x + model.intercept;
        break;
      case 'polynomial':
        predicted = model.coefficients.reduce((sum, coeff, i) => sum + coeff * Math.pow(point.x, i), 0);
        break;
      case 'exponential':
        predicted = model.a * Math.exp(model.b * point.x);
        break;
      case 'power':
        predicted = model.a * Math.pow(point.x, model.b);
        break;
    }
    return {
      x: point.x,
      y: point.y,
      predicted: predicted,
      residual: point.y - predicted
    };
  });
};

export const calculateRSquared = (dataPoints, residuals) => {
  const meanY = dataPoints.reduce((sum, p) => sum + p.y, 0) / dataPoints.length;
  const ssRes = residuals.reduce((sum, p) => sum + p.residual * p.residual, 0);
  const ssTot = dataPoints.reduce((sum, p) => sum + Math.pow(p.y - meanY, 2), 0);
  return 1 - (ssRes / ssTot);
};

export const downloadChart = (method, title, dataPoints, showResiduals, polynomialDegree, generateCurveData, calculateResiduals, calculateRSquared) => {
    const chartContainer = document.getElementById(`chart-${method}`);
    if (!chartContainer) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 600;
    
    ctx.fillStyle = '#1e293b'; // Dark blue background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const { curveData, model } = generateCurveData(dataPoints, method, polynomialDegree);
    const residuals = calculateResiduals(dataPoints, method, polynomialDegree);
    const rSquared = calculateRSquared(dataPoints, residuals);
    
    const margin = { top: 60, right: 50, bottom: 80, left: 60 };
    const chartWidth = canvas.width - margin.left - margin.right;
    const chartHeight = canvas.height - margin.top - margin.bottom;
    
    const allData = [...dataPoints, ...curveData];
    const xMin = Math.min(...allData.map(p => p.x));
    const xMax = Math.max(...allData.map(p => p.x));
    const yMin = Math.min(...allData.map(p => p.y));
    const yMax = Math.max(...allData.map(p => p.y));
    
    const xPadding = (xMax - xMin) * 0.1 || 1;
    const yPadding = (yMax - yMin) * 0.1 || 1;
    
    const xScale = (x) => margin.left + ((x - (xMin - xPadding)) / ((xMax + xPadding) - (xMin - xPadding))) * chartWidth;
    const yScale = (y) => margin.top + chartHeight - ((y - (yMin - yPadding)) / ((yMax + yPadding) - (yMin - yPadding))) * chartHeight;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = margin.left + (i * chartWidth) / 10;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + chartHeight);
      ctx.stroke();
    }
    for (let i = 0; i <= 10; i++) {
      const y = margin.top + (i * chartHeight) / 10;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + chartWidth, y);
      ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.stroke();
    
    // Draw fitted curve
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    curveData.forEach((point, i) => {
      const x = xScale(point.x);
      const y = yScale(point.y);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Draw data points
    dataPoints.forEach(point => {
      const x = xScale(point.x);
      const y = yScale(point.y);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
    // Draw Title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, margin.top - 20);
    
    
    // ** Draw Legend and Equation at the Bottom ** (This is the updated part)
    const bottomY = canvas.height - 30;
    
    // --- Left Side: Legend ---
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    let currentX = margin.left;

    // Data Points Legend Item
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(currentX, bottomY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.fillText('Data Points', currentX + 10, bottomY + 5);
    currentX += 120;

    // Fitted Curve Legend Item
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(currentX, bottomY);
    ctx.lineTo(currentX + 20, bottomY);
    ctx.stroke();
    ctx.fillText('Fitted Curve', currentX + 25, bottomY + 5);
    
    // --- Right Side: Equation & R-Squared ---
    ctx.font = '16px Monospace';
    ctx.textAlign = 'right';
    const equationText = `${model.equation}   |   R² = ${rSquared.toFixed(4)}`;
    ctx.fillText(equationText, canvas.width - margin.right, bottomY + 5);
    
    // Download the canvas as image
    const link = document.createElement('a');
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-chart.png`;
    link.href = canvas.toDataURL();
    link.click();
  };