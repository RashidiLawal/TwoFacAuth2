import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { GoogleLogin } from "react-google-login";

const clientId = "178211860600-7g1j2dcmf480nnamrj62gghaonhuvb51.apps.googleusercontent.com";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await login(credentials);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const onSuccess = (response) => {
    console.log("Login Success:", response.profileObj);
    window.location.href = "http://localhost:5000/auth/google"; // Redirect to backend
  };

  const onFailure = (response) => {
    console.log("Login Failed:", response);
  };

  return (
    <div className="login-container">
       <h2>Login with Google</h2>
       <GoogleLogin clientId={clientId} buttonText="Sign in with Google" onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={"single_host_origin"} />
        <h2>Or</h2>
      <form onSubmit={handleSubmit} className="login-form">
      <h2>Login using email and password</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
