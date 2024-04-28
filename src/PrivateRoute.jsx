import React, { createContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

// Creating the authentication context
export const AuthContext = createContext(null);

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState(true);  // State to track if it's the first login attempt

  // Context value that will be provided to the children
  const authContextValue = {
    verifyToken: async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        setIsFirstLogin(true);
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/verifyToken', { token: token });
        const isTokenVerified = response.data.status === 'verified';
        setIsAuthenticated(isTokenVerified);
        if (isTokenVerified && !isFirstLogin) {
          // Redirect to the dashboard if the token is verified and it's not the first login attempt
          return <Navigate to="/dashboard" />;
        }
        setIsFirstLogin(false); // Set the first login attempt to false after the first check
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authContextValue.verifyToken();  // Initial verification on component mount
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </AuthContext.Provider>
  );
};

export default PrivateRoute;
