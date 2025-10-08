import React from 'react';
import MetricsBarPlot from './components/MetricsBarPlot';
import './index.css';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem 1rem' 
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '2rem', 
          color: '#1f2937',
          lineHeight: '1.2'
        }}>
          Addition of Expected Goals (xG) in Football Outcome Prediction
        </h1>
        <MetricsBarPlot />
        
        {/* Footer */}
        <footer style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          color: '#6b7280' 
        }}>
          <a href="https://github.com/AlbarR19" style={{ 
            color: '#6b7280', 
            textDecoration: 'none' 
          }}
            onMouseEnter={e => e.target.style.color = 'black'}
            onMouseLeave={e => e.target.style.color = '#6b7280'}
          >Github @AlbarR19
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
