import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { taskAPI } from '../../services/api';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await taskAPI.getTasks();
      const tasks = response.data;
      
      setStats({
        total: tasks.length,
        completed: tasks.filter(t => t.stage === 3).length,
        pending: tasks.filter(t => t.stage !== 3).length,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-background">
        <div className="grid-pattern"></div>
        <div className="gradient-overlay"></div>
      </div>

      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>TaskFlow</h2>
        </div>
        <div className="nav-actions">
          <button onClick={() => navigate('/kanban')} className="nav-button primary">
            Go to Board
          </button>
          <button onClick={handleLogout} className="nav-button secondary">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <div className="user-greeting">
            {user?.profileImage && (
              <img src={user.profileImage} alt={user.name} className="user-avatar" />
            )}
            <div>
              <h1>Welcome back, {user?.name}! 👋</h1>
              <p>Here's your task overview</p>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Total Tasks</h3>
              <p className="stat-number">{stats.total}</p>
              <span className="stat-label">All tasks created</span>
            </div>
          </div>

          <div className="stat-card completed">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Completed</h3>
              <p className="stat-number">{stats.completed}</p>
              <span className="stat-label">Tasks finished</span>
            </div>
          </div>

          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>Pending</h3>
              <p className="stat-number">{stats.pending}</p>
              <span className="stat-label">Tasks in progress</span>
            </div>
          </div>

          <div className="stat-card productivity">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>Completion Rate</h3>
              <p className="stat-number">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
              </p>
              <span className="stat-label">Overall productivity</span>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-cards">
            <button onClick={() => navigate('/kanban')} className="action-card">
              <span className="action-icon">📋</span>
              <h3>Manage Tasks</h3>
              <p>View and organize your kanban board</p>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
