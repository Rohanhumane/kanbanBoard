import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import { authAPI } from '../../services/api';
import '../../styles/Auth.css';

// Simple captcha component
const generateCaptcha = (length = 5) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
  let results = "";

  for (let i = 0; i < length; i++) {
    results += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return results;
};

const SimpleCaptcha = ({ onChange, value }) => {
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");

  // Generate captcha on mount
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setInput("");
    onChange(""); // reset
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);

    if (val.toUpperCase() === captcha) {
      onChange("verified");
    } else {
      onChange("");
    }
  };

  return (
    <div className="captcha-container">
      <div className="captcha-box">
        <span className="captcha-text">{captcha} </span>

        <button
          type="button"
          className="captcha-refresh"
          onClick={refreshCaptcha}
        >
          ↻
        </button>
      </div>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter captcha"
        className="form-input"
        autoComplete="off"
      />
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
    captcha: ''
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (!formData.captcha) {
      newErrors.captcha = 'Please complete the captcha';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      dispatch(loginStart());
      
      const response = await authAPI.login({
        emailOrUsername: formData.emailOrUsername,
        password: formData.password,
      });
      
      dispatch(loginSuccess(response.data));
      navigate('/dashboard');
    } catch (err) {
      dispatch(loginFailure(err.message || 'Login failed'));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      
      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue managing your tasks</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailOrUsername">Email or Username</label>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className="form-input"
              />
              {errors.emailOrUsername && (
                <div className="field-error">{errors.emailOrUsername}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input"
              />
              {errors.password && (
                <div className="field-error">{errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <label>Verify you're human</label>
              <SimpleCaptcha
                onChange={(val) => setFormData(prev => ({ ...prev, captcha: val }))}
                value={formData.captcha}
              />
              {errors.captcha && (
                <div className="field-error">{errors.captcha}</div>
              )}
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
