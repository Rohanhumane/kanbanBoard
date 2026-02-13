import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/App.css';

const Register = lazy(() => import('./components/auth/Register'));
const Login = lazy(() => import('./components/auth/Login'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const KanbanBoard = lazy(() => import('./components/kanban/KanbanBoard'));

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/kanban"
            element={
              <PrivateRoute>
                <KanbanBoard />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
