// NHS Healthcare Dashboard Component
import React, { useState, useEffect } from 'react';

const HealthDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalAppointments: 0,
    waitingTime: 0,
    patientSatisfaction: 0,
    resourceUtilization: 0
  });

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  const fetchDashboardMetrics = async () => {
    try {
      const response = await fetch('/api/nhs/dashboard-metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch NHS dashboard metrics:', error);
    }
  };

  return (
    <div className="nhs-dashboard">
      <h2>NHS Healthcare Dashboard</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Appointments</h3>
          <span className="metric-value">{metrics.totalAppointments}</span>
        </div>
        
        <div className="metric-card">
          <h3>Average Wait Time</h3>
          <span className="metric-value">{metrics.waitingTime} days</span>
        </div>
        
        <div className="metric-card">
          <h3>Patient Satisfaction</h3>
          <span className="metric-value">{metrics.patientSatisfaction}%</span>
        </div>
        
        <div className="metric-card">
          <h3>Resource Utilization</h3>
          <span className="metric-value">{metrics.resourceUtilization}%</span>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;
