import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import { Plus, Minus, Download, Code, BarChart3, Database, BookOpen, Users, Star, Trophy, TrendingUp, Calendar, Clock, Target, Award, Mail, Phone, MapPin, Github, Linkedin, Coffee, Zap, Home, Calculator } from 'lucide-react';

const IntegratedDashboard = () => {
  const [currentApp, setCurrentApp] = useState('home');
  
  // Curve Fitting States
  const [dataPoints, setDataPoints] = useState([
    { x: 1, y: 2.1 },
    { x: 2, y: 3.9 },
    { x: 3, y: 6.2 },
    { x: 4, y: 7.8 },
    { x: 5, y: 10.1 }
  ]);
  const [polynomialDegree, setPolynomialDegree] = useState(2);
  const [showResiduals, setShowResiduals] = useState(false);
  const [newX, setNewX] = useState('');
  const [newY, setNewY] = useState('');

  // Team Dashboard States
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamView, setTeamView] = useState('overview');

  // Team Members Data
  const teamMembers = [
    {
      id: 1,
      name: "Sayem Ahamed",
      role: "Lead Data Scientist",
      avatar: "🧑",
      email: "sarah.chen@company.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      joinDate: "2021-03-15",
      experience: 5,
      skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch"],
      projects: 12,
      completedTasks: 89,
      rating: 4.9,
      bio: "AI specialist with expertise in computer vision and NLP. Led 3 major ML projects resulting in $2M+ revenue increase.",
      social: {
        github: "sarah-chen-ai",
        linkedin: "sarah-chen-data"
      },
      performance: {
        productivity: 95,
        collaboration: 92,
        innovation: 98,
        leadership: 88,
        communication: 91
      },
      monthlyStats: [
        { month: 'Jan', tasks: 15, projects: 2, bugs: 3 },
        { month: 'Feb', tasks: 18, projects: 3, bugs: 2 },
        { month: 'Mar', tasks: 22, projects: 2, bugs: 1 },
        { month: 'Apr', tasks: 19, projects: 3, bugs: 2 },
        { month: 'May', tasks: 25, projects: 4, bugs: 1 },
        { month: 'Jun', tasks: 28, projects: 3, bugs: 0 }
      ]
    },
    {
      id: 2,
      name: "Turja Dutta",
      role: "Full Stack Developer",
      avatar: "👨‍💻",
      email: "marcus.rodriguez@company.com",
      phone: "+1 (555) 234-5678",
      location: "Austin, TX",
      joinDate: "2020-08-20",
      experience: 7,
      skills: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
      projects: 18,
      completedTasks: 134,
      rating: 4.7,
      bio: "Full-stack engineer passionate about scalable architectures. Built the company's main platform serving 100k+ users.",
      social: {
        github: "marcus-dev",
        linkedin: "marcus-rodriguez-dev"
      },
      performance: {
        productivity: 91,
        collaboration: 95,
        innovation: 87,
        leadership: 92,
        communication: 89
      },
      monthlyStats: [
        { month: 'Jan', tasks: 20, projects: 3, bugs: 5 },
        { month: 'Feb', tasks: 23, projects: 4, bugs: 3 },
        { month: 'Mar', tasks: 26, projects: 3, bugs: 4 },
        { month: 'Apr', tasks: 22, projects: 5, bugs: 2 },
        { month: 'May', tasks: 30, projects: 4, bugs: 1 },
        { month: 'Jun', tasks: 33, projects: 5, bugs: 2 }
      ]
    },
    {
      id: 3,
      name: "Mir Md. Tarhimul Quader",
      role: "UX/UI Designer",
      avatar: "🎨",
      email: "emily.watson@company.com",
      phone: "+1 (555) 345-6789",
      location: "New York, NY",
      joinDate: "2022-01-10",
      experience: 4,
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
      projects: 8,
      completedTasks: 67,
      rating: 4.8,
      bio: "Creative designer focused on user-centered design. Redesigned 5 major products improving user satisfaction by 40%.",
      social: {
        github: "emily-designs",
        linkedin: "emily-watson-ux"
      },
      performance: {
        productivity: 88,
        collaboration: 96,
        innovation: 94,
        leadership: 85,
        communication: 93
      },
      monthlyStats: [
        { month: 'Jan', tasks: 12, projects: 2, bugs: 1 },
        { month: 'Feb', tasks: 14, projects: 2, bugs: 0 },
        { month: 'Mar', tasks: 16, projects: 3, bugs: 1 },
        { month: 'Apr', tasks: 13, projects: 2, bugs: 0 },
        { month: 'May', tasks: 18, projects: 3, bugs: 1 },
        { month: 'Jun', tasks: 20, projects: 4, bugs: 0 }
      ]
    },
    {
      id: 4,
      name: "Mir Md. Ejajul Haque Eju",
      role: "DevOps Engineer",
      avatar: "⚙️",
      email: "david.kim@company.com",
      phone: "+1 (555) 456-7890",
      location: "Seattle, WA",
      joinDate: "2019-11-05",
      experience: 8,
      skills: ["Kubernetes", "Jenkins", "Terraform", "AWS", "Monitoring"],
      projects: 15,
      completedTasks: 102,
      rating: 4.6,
      bio: "Infrastructure expert ensuring 99.9% uptime. Reduced deployment time by 70% and infrastructure costs by 30%.",
      social: {
        github: "david-kim-devops",
        linkedin: "david-kim-infrastructure"
      },
      performance: {
        productivity: 93,
        collaboration: 87,
        innovation: 91,
        leadership: 89,
        communication: 86
      },
      monthlyStats: [
        { month: 'Jan', tasks: 17, projects: 2, bugs: 8 },
        { month: 'Feb', tasks: 19, projects: 3, bugs: 6 },
        { month: 'Mar', tasks: 21, projects: 2, bugs: 5 },
        { month: 'Apr', tasks: 18, projects: 4, bugs: 3 },
        { month: 'May', tasks: 24, projects: 3, bugs: 4 },
        { month: 'Jun', tasks: 27, projects: 4, bugs: 2 }
      ]
    }
  ];

  // Curve Fitting Functions
  const linearRegression = (points) => {
    const n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    // Calculate sums using normal iteration
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

  const polynomialRegression = (points, degree) => {
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

  const exponentialFit = (points) => {
    const transformedPoints = points.map(p => ({ x: p.x, y: Math.log(p.y) }));
    const { slope: b, intercept: lnA } = linearRegression(transformedPoints);
    const a = Math.exp(lnA);
    
    return { a, b, equation: `y = ${a.toFixed(3)}e^(${b.toFixed(3)}x)` };
  };

  const powerLawFit = (points) => {
    const transformedPoints = points.map(p => ({ x: Math.log(p.x), y: Math.log(p.y) }));
    const { slope: b, intercept: lnA } = linearRegression(transformedPoints);
    const a = Math.exp(lnA);
    
    return { a, b, equation: `y = ${a.toFixed(3)}x^${b.toFixed(3)}` };
  };

  const gaussianElimination = (matrix, vector) => {
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

  const formatPolynomial = (coefficients) => {
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

  const generateCurveData = (method) => {
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

  const calculateResiduals = (method) => {
    const { model } = generateCurveData(method);
    const residuals = [];
    
    // Calculate residuals using normal iteration
    for (let i = 0; i < dataPoints.length; i++) {
      const point = dataPoints[i];
      let predicted;
      
      switch (method) {
        case 'linear':
          predicted = model.slope * point.x + model.intercept;
          break;
        case 'polynomial':
          predicted = 0;
          for (let j = 0; j < model.coefficients.length; j++) {
            predicted += model.coefficients[j] * Math.pow(point.x, j);
          }
          break;
        case 'exponential':
          predicted = model.a * Math.exp(model.b * point.x);
          break;
        case 'power':
          predicted = model.a * Math.pow(point.x, model.b);
          break;
      }
      
      residuals.push({
        x: point.x,
        y: point.y,
        predicted: predicted,
        residual: point.y - predicted
      });
    }
    
    return residuals;
  };

  const calculateRSquared = (residuals) => {
    // Calculate mean Y using normal iteration
    let sumY = 0;
    for (let i = 0; i < dataPoints.length; i++) {
      sumY += dataPoints[i].y;
    }
    const meanY = sumY / dataPoints.length;
    
    // Calculate sum of squared residuals and total sum of squares
    let ssRes = 0;
    let ssTot = 0;
    
    for (let i = 0; i < residuals.length; i++) {
      ssRes += residuals[i].residual * residuals[i].residual;
    }
    
    for (let i = 0; i < dataPoints.length; i++) {
      const diff = dataPoints[i].y - meanY;
      ssTot += diff * diff;
    }
    
    return 1 - (ssRes / ssTot);
  };

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

  // Chart Download Function
  const downloadChart = (method, title) => {
    const chartContainer = document.getElementById(`chart-${method}`);
    if (!chartContainer) return;

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Fill background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Get chart data
    const { curveData, model } = generateCurveData(method);
    const residuals = calculateResiduals(method);
    const rSquared = calculateRSquared(residuals);
    
    // Calculate chart dimensions
    const margin = { top: 80, right: 80, bottom: 80, left: 80 };
    const chartWidth = canvas.width - margin.left - margin.right;
    const chartHeight = canvas.height - margin.top - margin.bottom;
    
    // Get data bounds using normal iteration
    let xMin = dataPoints[0].x;
    let xMax = dataPoints[0].x;
    let yMin = dataPoints[0].y;
    let yMax = dataPoints[0].y;
    
    // Find min/max for data points
    for (let i = 1; i < dataPoints.length; i++) {
      if (dataPoints[i].x < xMin) xMin = dataPoints[i].x;
      if (dataPoints[i].x > xMax) xMax = dataPoints[i].x;
      if (dataPoints[i].y < yMin) yMin = dataPoints[i].y;
      if (dataPoints[i].y > yMax) yMax = dataPoints[i].y;
    }
    
    // Find min/max for curve data
    for (let i = 0; i < curveData.length; i++) {
      if (curveData[i].x < xMin) xMin = curveData[i].x;
      if (curveData[i].x > xMax) xMax = curveData[i].x;
      if (curveData[i].y < yMin) yMin = curveData[i].y;
      if (curveData[i].y > yMax) yMax = curveData[i].y;
    }
    
    // Add some padding
    const xPadding = (xMax - xMin) * 0.1;
    const yPadding = (yMax - yMin) * 0.1;
    
    // Scale functions
    const xScale = (x) => margin.left + ((x - (xMin - xPadding)) / ((xMax + xPadding) - (xMin - xPadding))) * chartWidth;
    const yScale = (y) => margin.top + chartHeight - ((y - (yMin - yPadding)) / ((yMax + yPadding) - (yMin - yPadding))) * chartHeight;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = margin.left + (i * chartWidth) / 10;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + chartHeight);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = margin.top + (i * chartHeight) / 10;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + chartWidth, y);
      ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.stroke();
    
    // Draw fitted curve using normal iteration
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < curveData.length; i++) {
      const point = curveData[i];
      const x = xScale(point.x);
      const y = yScale(point.y);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw data points using normal iteration
    ctx.fillStyle = '#ef4444';
    for (let i = 0; i < dataPoints.length; i++) {
      const point = dataPoints[i];
      const x = xScale(point.x);
      const y = yScale(point.y);
      
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add white border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Draw residuals if enabled using normal iteration
    if (showResiduals) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      for (let i = 0; i < residuals.length; i++) {
        const point = residuals[i];
        const x = xScale(point.x);
        const y1 = yScale(point.y);
        const y2 = yScale(point.predicted);
        
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();
      }
      
      ctx.setLineDash([]);
    }
    
    // Add title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, 40);
    
    // Add equation
    ctx.font = '18px Arial';
    ctx.fillText(model.equation, canvas.width / 2, canvas.height - 40);
    
    // Add R-squared
    ctx.fillText(`R² = ${rSquared.toFixed(4)}`, canvas.width / 2, canvas.height - 15);
    
    // Add legend
    ctx.textAlign = 'left';
    ctx.font = '14px Arial';
    
    // Data points legend
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(margin.left + 20, 30, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.fillText('Data Points', margin.left + 35, 35);
    
    // Fitted curve legend
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(margin.left + 150, 30);
    ctx.lineTo(margin.left + 180, 30);
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fillText('Fitted Curve', margin.left + 190, 35);
    
    // Add residuals legend if shown
    if (showResiduals) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(margin.left + 300, 30);
      ctx.lineTo(margin.left + 330, 30);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'white';
      ctx.fillText('Residuals', margin.left + 340, 35);
    }
    
    // Download the canvas as image
    const link = document.createElement('a');
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-chart.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // Team Dashboard Functions
  const teamMetrics = {
    totalProjects: (() => {
      let total = 0;
      for (let i = 0; i < teamMembers.length; i++) {
        total += teamMembers[i].projects;
      }
      return total;
    })(),
    totalTasks: (() => {
      let total = 0;
      for (let i = 0; i < teamMembers.length; i++) {
        total += teamMembers[i].completedTasks;
      }
      return total;
    })(),
    averageRating: (() => {
      let total = 0;
      for (let i = 0; i < teamMembers.length; i++) {
        total += teamMembers[i].rating;
      }
      return (total / teamMembers.length).toFixed(1);
    })(),
    averageExperience: (() => {
      let total = 0;
      for (let i = 0; i < teamMembers.length; i++) {
        total += teamMembers[i].experience;
      }
      return (total / teamMembers.length).toFixed(1);
    })()
  };

  const skillsData = (() => {
    const skills = {};
    for (let i = 0; i < teamMembers.length; i++) {
      const member = teamMembers[i];
      for (let j = 0; j < member.skills.length; j++) {
        const skill = member.skills[j];
        skills[skill] = (skills[skill] || 0) + 1;
      }
    }
    return skills;
  })();

  const skillsChartData = (() => {
    const entries = Object.entries(skillsData);
    const chartData = [];
    
    for (let i = 0; i < entries.length; i++) {
      const [skill, count] = entries[i];
      chartData.push({
        skill,
        count,
        percentage: (count / teamMembers.length * 100).toFixed(1)
      });
    }
    
    // Sort by count (descending) using normal iteration
    chartData.sort((a, b) => b.count - a.count);
    return chartData;
  })();

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  // Main Navigation
  const MainNavigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">📊 CurveCraft</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentApp('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentApp === 'home' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            
            <button
              onClick={() => setCurrentApp('curve-fitting')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentApp === 'curve-fitting' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span>Curve Fitting</span>
            </button>
            
            <button
              onClick={() => setCurrentApp('team')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentApp === 'team' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Team</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 animate-pulse">
            Welcome to Dashboard
          </h1>
          <p className="text-2xl text-white/80 mb-12">
            Explore our integrated analytics and visualization tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Curve Fitting Card */}
          <div 
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-white/20 backdrop-blur-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            onClick={() => setCurrentApp('curve-fitting')}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-500/20 p-4 rounded-2xl">
                <Calculator className="w-12 h-12 text-blue-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Curve Fitting</h2>
                <p className="text-blue-200">Mathematical Visualization Tool</p>
              </div>
            </div>
            
            <p className="text-white/90 mb-6 text-lg">
              Interactive tool for understanding mathematical curve fitting algorithms including linear regression, polynomial fitting, exponential and power law models.
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Algorithms</span>
                <p className="text-white font-semibold">4</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Visualizations</span>
                <p className="text-white font-semibold">Interactive</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Code</span>
                <p className="text-white font-semibold">Python</p>
              </div>
            </div>
            
            <div className="flex items-center text-blue-300 font-medium">
              <span>Explore Curve Fitting</span>
              <span className="ml-2">→</span>
            </div>
          </div>

          {/* Team Dashboard Card */}
          <div 
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl p-8 border border-white/20 backdrop-blur-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            onClick={() => setCurrentApp('team')}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-purple-500/20 p-4 rounded-2xl">
                <Users className="w-12 h-12 text-purple-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Team Dashboard</h2>
                <p className="text-purple-200">Team Analytics & Insights</p>
              </div>
            </div>
            
            <p className="text-white/90 mb-6 text-lg">
              Comprehensive team management dashboard with member profiles, performance analytics, skill tracking, and project insights.
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Members</span>
                <p className="text-white font-semibold">{teamMembers.length}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Projects</span>
                <p className="text-white font-semibold">{teamMetrics.totalProjects}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-white/80 text-sm">Avg Rating</span>
                <p className="text-white font-semibold">{teamMetrics.averageRating}</p>
              </div>
            </div>
            
            <div className="flex items-center text-purple-300 font-medium">
              <span>View Team Dashboard</span>
              <span className="ml-2">→</span>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 mb-4">
                <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Interactive Visualizations</h3>
                <p className="text-white/80">Real-time charts and graphs with interactive controls</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 mb-4">
                <Code className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Code Integration</h3>
                <p className="text-white/80">Complete Python implementations with explanations</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 mb-4">
                <Target className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Performance Analytics</h3>
                <p className="text-white/80">Detailed metrics and performance tracking with charts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Curve Fitting Algorithm Card Component
  const AlgorithmCard = ({ method, title, description, color }) => {
    const [activeTab, setActiveTab] = useState('visualization');
    const { curveData, model } = generateCurveData(method);
    const residuals = calculateResiduals(method);
    const rSquared = calculateRSquared(residuals);

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
              onClick={() => downloadChart(method, title)}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors flex items-center space-x-2 shadow-lg"
              title="Download Chart"
            >
              <Download className="w-5 h-5" />
              <span>Download Chart</span>
            </button>
          </div>
          
          {/* Tab Navigation */}
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

          {/* Tab Content */}
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
                  MAE = {(() => {
                    let sum = 0;
                    for (let i = 0; i < residuals.length; i++) {
                      sum += Math.abs(residuals[i].residual);
                    }
                    return (sum / residuals.length).toFixed(4);
                  })()}
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
                    {(() => {
                      const rows = [];
                      for (let i = 0; i < residuals.length; i++) {
                        const point = residuals[i];
                        rows.push(
                          <tr key={i} className="border-b border-white/10">
                            <td className="text-white py-1">{point.x}</td>
                            <td className="text-white py-1">{point.y.toFixed(3)}</td>
                            <td className="text-white py-1">{point.predicted.toFixed(3)}</td>
                            <td className={`py-1 ${point.residual > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {point.residual.toFixed(3)}
                            </td>
                          </tr>
                        );
                      }
                      return rows;
                    })()}
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
                    {(() => {
                      let sum = 0;
                      for (let i = 0; i < residuals.length; i++) {
                        sum += Math.abs(residuals[i].residual);
                      }
                      return (sum / residuals.length).toFixed(4);
                    })()}
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

  // Curve Fitting Page
  const CurveFittingPage = () => (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Curve Fitting Visualization
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Interactive tool for understanding mathematical curve fitting algorithms
          </p>
          
          {/* Global Data Controls */}
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
                  {(() => {
                    const pointElements = [];
                    for (let i = 0; i < dataPoints.length; i++) {
                      const point = dataPoints[i];
                      pointElements.push(
                        <div key={i} className="flex items-center bg-white/20 rounded-lg px-3 py-1">
                          <span className="text-white text-sm">({point.x}, {point.y})</span>
                          <button
                            onClick={() => removeDataPoint(i)}
                            className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    }
                    return pointElements;
                  })()}
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
        </div>

        {/* Algorithm Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AlgorithmCard
            method="linear"
            title="Linear Regression"
            description="Fits a straight line through data points using least squares method"
            color="from-blue-600/20 to-cyan-600/20"
          />
          
          <AlgorithmCard
            method="polynomial"
            title="Polynomial Regression"
            description="Fits polynomial curves of varying degrees to capture non-linear patterns"
            color="from-purple-600/20 to-pink-600/20"
          />
          
          <AlgorithmCard
            method="exponential"
            title="Exponential Fitting"
            description="Models exponential growth/decay patterns common in natural phenomena"
            color="from-green-600/20 to-emerald-600/20"
          />
          
          <AlgorithmCard
            method="power"
            title="Power Law Fitting"
            description="Captures power-law relationships found in scaling laws and physics"
            color="from-orange-600/20 to-red-600/20"
          />
        </div>
      </div>
    </div>
  );

  // Team Member Card Component
  const MemberCard = ({ member, isSelected, onClick }) => (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
        isSelected 
          ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-400 shadow-2xl' 
          : 'bg-white/10 hover:bg-white/20 border border-white/20'
      }`}
      onClick={() => onClick(member)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      <div className="relative p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-4xl">{member.avatar}</div>
          <div>
            <h3 className="text-xl font-bold text-white">{member.name}</h3>
            <p className="text-purple-200">{member.role}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-white/80 text-sm">Projects</span>
            </div>
            <p className="text-2xl font-bold text-white">{member.projects}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white/80 text-sm">Rating</span>
            </div>
            <p className="text-2xl font-bold text-white">{member.rating}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {(() => {
            const skillElements = [];
            const skillsToShow = Math.min(3, member.skills.length);
            
            for (let i = 0; i < skillsToShow; i++) {
              const skill = member.skills[i];
              skillElements.push(
                <span
                  key={i}
                  className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded-full text-xs"
                >
                  {skill}
                </span>
              );
            }
            
            if (member.skills.length > 3) {
              skillElements.push(
                <span key="more" className="px-2 py-1 bg-white/20 text-white/80 rounded-full text-xs">
                  +{member.skills.length - 3} more
                </span>
              );
            }
            
            return skillElements;
          })()}
        </div>
        
        <div className="text-white/80 text-sm line-clamp-2">
          {member.bio}
        </div>
      </div>
    </div>
  );

  // Team Dashboard Page
  const TeamDashboardPage = () => (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Team Dashboard
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Meet our amazing team and explore their achievements
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          {[
            { id: 'overview', label: 'Team Overview', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'members', label: 'Team Members', icon: Star }
          ].map(view => (
            <button
              key={view.id}
              onClick={() => setTeamView(view.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                teamView === view.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <view.icon className="w-5 h-5" />
              <span>{view.label}</span>
            </button>
          ))}
        </div>

        {teamView === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-white/80 text-sm">Total Projects</p>
                    <p className="text-3xl font-bold text-white">{teamMetrics.totalProjects}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Target className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-white/80 text-sm">Completed Tasks</p>
                    <p className="text-3xl font-bold text-white">{teamMetrics.totalTasks}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Star className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-white/80 text-sm">Avg Rating</p>
                    <p className="text-3xl font-bold text-white">{teamMetrics.averageRating}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-white/80 text-sm">Avg Experience</p>
                    <p className="text-3xl font-bold text-white">{teamMetrics.averageExperience}y</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(() => {
                const memberCards = [];
                for (let i = 0; i < teamMembers.length; i++) {
                  const member = teamMembers[i];
                  memberCards.push(
                    <MemberCard
                      key={member.id}
                      member={member}
                      isSelected={selectedMember?.id === member.id}
                      onClick={setSelectedMember}
                    />
                  );
                }
                return memberCards;
              })()}
            </div>
          </div>
        )}

        {teamView === 'analytics' && (
          <div className="space-y-8">
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Skills Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillsChartData.slice(0, 8)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                      <XAxis dataKey="skill" stroke="white" angle={-45} textAnchor="end" height={100} />
                      <YAxis stroke="white" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Bar dataKey="count" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Team Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={teamMembers.map(member => ({
                      name: member.name.split(' ')[0],
                      ...member.performance
                    }))}>
                      <PolarGrid stroke="rgba(255,255,255,0.2)" />
                      <PolarAngleAxis dataKey="name" tick={{ fill: 'white', fontSize: 12 }} />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fill: 'white', fontSize: 10 }}
                      />
                      <Radar
                        name="Productivity"
                        dataKey="productivity"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Collaboration"
                        dataKey="collaboration"
                        stroke="#06b6d4"
                        fill="#06b6d4"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {teamView === 'members' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(() => {
                const memberCards = [];
                for (let i = 0; i < teamMembers.length; i++) {
                  const member = teamMembers[i];
                  memberCards.push(
                    <MemberCard
                      key={member.id}
                      member={member}
                      isSelected={false}
                      onClick={setSelectedMember}
                    />
                  );
                }
                return memberCards;
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <MainNavigation />
      
      {currentApp === 'home' && <HomePage />}
      {currentApp === 'curve-fitting' && <CurveFittingPage />}
      {currentApp === 'team' && <TeamDashboardPage />}
    </div>
  );
};

export default IntegratedDashboard;