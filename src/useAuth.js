import { useState, useEffect } from 'react';

const useAuth = (navigate) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/verifyToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setIsAuthenticated(true);
          navigate('/dashboard');  // Redirect to dashboard if token is valid
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('authToken');  // Clear invalid token
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
