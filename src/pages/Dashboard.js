import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../utils/auth";
import { useAuth } from "../context/auth-context";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const token = new URLSearchParams(window.location.search).get("token");

        if (token) {
          localStorage.setItem("token", token);
          window.history.replaceState({}, document.title, "/dashboard");
        }

        if (!isAuthenticated()) {
          return navigate("/login");
        }

        await fetchUserProfile();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/profile", { 
        method: 'GET',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include' // If using cookies
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Fetch error:', error);
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Server connection failed. Please check if the server is running.');
      }
      throw error;
    }
  };

  const handleLogout = () => {
    try {
      logout();
      navigate('/');
      localStorage.removeItem("token");
      window.location.href = "http://localhost:5000/logout";
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback if redirect fails
      navigate("/login");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
      {user ? (
        <>
          <h1>Welcome to Dashboard, {user.name}</h1>
          {user.picture && <img src={user.picture} alt="Profile" />}
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </>
      ) : (
        <main className="dashboard-content">
         <div>Loading user data...</div>
      </main>
      )}
      </header>
    </div>
  );
};

export default Dashboard;