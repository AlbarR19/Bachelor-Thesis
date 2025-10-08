import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const MetricsBarPlot = () => {
  // Prepare data for the bar chart
  const data = [
    {
      model: 'M1',
      accuracy: 66.54,
      precision_H: 71,
      precision_A: 65,
      precision_D: 38,
      recall_H: 85,
      recall_A: 74,
      recall_D: 13,
      f1_H: 78,
      f1_A: 69,
      f1_D: 20
    },
    {
      model: 'M2',
      accuracy: 65.78,
      precision_H: 69,
      precision_A: 66,
      precision_D: 34,
      recall_H: 84,
      recall_A: 75,
      recall_D: 11,
      f1_H: 76,
      f1_A: 70,
      f1_D: 16
    },
    {
      model: 'M3',
      accuracy: 64.84,
      precision_H: 70,
      precision_A: 65,
      precision_D: 26,
      recall_H: 85,
      recall_A: 71,
      recall_D: 9,
      f1_H: 77,
      f1_A: 68,
      f1_D: 13
    },
    {
      model: 'M4',
      accuracy: 65.22,
      precision_H: 69,
      precision_A: 66,
      precision_D: 27,
      recall_H: 85,
      recall_A: 74,
      recall_D: 9,
      f1_H: 76,
      f1_A: 70,
      f1_D: 13
    }
  ];

  const [selectedMetric, setSelectedMetric] = React.useState('accuracy');

  const getMetricData = (metric) => {
    switch(metric) {
      case 'accuracy':
        return data.map(d => ({ model: d.model, value: d.accuracy }));
      case 'precision':
        return data.map(d => ({ 
          model: d.model, 
          H: d.precision_H, 
          A: d.precision_A, 
          D: d.precision_D 
        }));
      case 'recall':
        return data.map(d => ({ 
          model: d.model, 
          H: d.recall_H, 
          A: d.recall_A, 
          D: d.recall_D 
        }));
      case 'f1':
        return data.map(d => ({ 
          model: d.model, 
          H: d.f1_H, 
          A: d.f1_A, 
          D: d.f1_D 
        }));
      default:
        return [];
    }
  };

  // Enhanced custom label formatter
  const renderCustomLabel = (props) => {
    const { x, y, width, value } = props;
    if (!value) return null;
    
    return (
      <text 
        x={x + width / 2} 
        y={y - 10} 
        fill="#1f2937" 
        textAnchor="middle" 
        fontSize="13"
        fontWeight="bold"
        dominantBaseline="middle"
      >
        {`${value}%`}
      </text>
    );
  };

  const renderChart = () => {
    const chartData = getMetricData(selectedMetric);
    
    if (selectedMetric === 'accuracy') {
      return (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart 
            data={chartData} 
            margin={{ top: 60, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="model" 
              height={80}
              fontSize={16}
              tick={{ fill: '#374151' }}
            />
            <YAxis 
              domain={[0, 100]}
              label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
              tick={{ fill: '#374151' }}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Accuracy']}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="value" 
              fill="#2563eb" 
              radius={[6, 6, 0, 0]}
            >
              <LabelList content={renderCustomLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart 
            data={chartData} 
            margin={{ top: 60, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="model" 
              height={80}
              fontSize={16}
              tick={{ fill: '#374151' }}
            />
            <YAxis 
              domain={[0, 100]}
              label={{ value: `${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} (%)`, angle: -90, position: 'insideLeft' }}
              tick={{ fill: '#374151' }}
            />
            <Tooltip 
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="H" 
              fill="#10b981" 
              name="H (Home Win)" 
              radius={[4, 4, 0, 0]}
            >
              <LabelList content={renderCustomLabel} />
            </Bar>
            <Bar 
              dataKey="A" 
              fill="#f59e0b" 
              name="A (Away Win)" 
              radius={[4, 4, 0, 0]}
            >
              <LabelList content={renderCustomLabel} />
            </Bar>
            <Bar 
              dataKey="D" 
              fill="#ef4444"
              name="D (Draw)" 
              radius={[4, 4, 0, 0]}
            >
              <LabelList content={renderCustomLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      backgroundColor: '#ffffff', 
      borderRadius: '1rem', 
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' 
    }}>
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: '2rem', 
        color: '#1f2937' 
      }}>
        Model Evaluation Metrics Comparison
      </h2>
      
      {/* Metric selector */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {['accuracy', 'precision', 'recall', 'f1'].map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: selectedMetric === metric ? '#2563eb' : '#e5e7eb',
                color: selectedMetric === metric ? '#ffffff' : '#374151',
                boxShadow: selectedMetric === metric ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                transform: 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (selectedMetric !== metric) {
                  e.target.style.backgroundColor = '#d1d5db';
                }
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                if (selectedMetric !== metric) {
                  e.target.style.backgroundColor = '#e5e7eb';
                }
                e.target.style.transform = 'scale(1)';
              }}
            >
              {metric === 'f1' ? 'F1-Score' : metric.charAt(0).toUpperCase() + metric.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ 
        backgroundColor: '#f9fafb', 
        borderRadius: '0.5rem', 
        padding: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {renderChart()}
      </div>

      {/* Model descriptions */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        fontSize: '0.875rem', 
        marginBottom: '1.5rem' 
      }}>
        <div style={{ 
          backgroundColor: '#dbeafe', 
          padding: '1rem', 
          borderRadius: '0.5rem' 
        }}>
          <h3 style={{ 
            fontWeight: 'bold', 
            color: '#1e40af', 
            fontSize: '1.125rem', 
            margin: '0 0 0.5rem 0' 
          }}>M1</h3>
          <p style={{  
            color: '#1e40af', 
            fontSize: '1.125rem', 
            margin: '0 0 0.5rem 0'
          }}>Random Forest with Expected Goals</p>
        </div>
        <div style={{ 
          backgroundColor: '#d1fae5', 
          padding: '1rem', 
          borderRadius: '0.5rem'
        }}>
          <h3 style={{ 
            fontWeight: 'bold', 
            color: '#065f46', 
            fontSize: '1.125rem', 
            margin: '0 0 0.5rem 0' 
          }}>M2</h3>
          <p style={{ 
            color: '#059669', 
            fontSize: '1.125rem', 
            margin: '0 0 0.5rem 0'
          }}>XGBoost with Expected Goals</p>
        </div>
        <div style={{ 
          backgroundColor: '#fef3c7', 
          padding: '1rem', 
          borderRadius: '0.5rem'
        }}>
          <h3 style={{ 
            fontWeight: 'bold', 
            color: '#92400e', 
            fontSize: '1.125rem', 
            margin: '0 0 0.5rem 0' 
          }}>M3</h3>
          <p style={{ 
            color: '#d97706', 
            fontSize: '1.125rem', 
            margin: '0 0 0.5rem 0'
          }}>Random Forest</p>
        </div>
        <div style={{ 
          backgroundColor: '#fecaca', 
          padding: '1rem', 
          borderRadius: '0.5rem' 
        }}>
          <h3 style={{ 
            fontWeight: 'bold', 
            color: '#991b1b', 
            fontSize: '1.125rem', 
            margin: '0 0 0.5rem 0' 
          }}>M4</h3>
          <p style={{ 
            color: '#dc2626', 
            fontSize: '1.125rem', 
            margin: '0 0 0.5rem 0' 
          }}>XGBoost</p>
        </div>
      </div>

      {/* Legend for class labels */}
      <div style={{ 
        textAlign: 'center', 
        color: '#6b7280', 
        fontWeight: '500' 
      }}>
        <p><strong>Class Labels:</strong> H = Home Win, A = Away Win, D = Draw</p>
      </div>
    </div>
  );
};

export default MetricsBarPlot;