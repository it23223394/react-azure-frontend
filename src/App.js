import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5169';

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/weatherforecast`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Frontend + .NET Backend Integration</h1>
        <p>API Base URL: {API_BASE_URL}</p>
        
        {loading && <p>Loading data from .NET API...</p>}
        
        {error && (
          <div style={{ color: 'red', margin: '20px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {!loading && !error && (
          <div>
            <h2>Weather Forecast from .NET API:</h2>
            <button onClick={fetchWeatherData} style={{ margin: '10px', padding: '10px' }}>
              Refresh Data
            </button>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {weatherData.map((forecast, index) => (
                <div key={index} style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '15px',
                  margin: '10px',
                  minWidth: '200px',
                  backgroundColor: '#282c34'
                }}>
                  <h3>{new Date(forecast.date).toLocaleDateString()}</h3>
                  <p><strong>Temperature:</strong> {forecast.temperatureC}°C / {forecast.temperatureF}°F</p>
                  <p><strong>Summary:</strong> {forecast.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;