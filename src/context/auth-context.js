import React, { createContext, useContext, useState, useCallback } from 'react';

// export const AuthContext = createContext({
//     isLoggedIn: false,
//     login: () => {},
//     logout: () => {}
// })
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = useCallback (async (credentials) => {
    try {
      // Implement your login logic here
      // Make API call to your backend
      const response = await fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const responseData = await response.json();
      if (!response) {
        throw new Error(responseData.message);
      }
      setIsAuthenticated(true);
      setUser(responseData.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};