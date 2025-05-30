import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component that wraps the app and provides auth context
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock authentication for the frontend prototype
  // In a real implementation, these would make API calls to the backend
  async function login(email, password) {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid email and password
      // In production, this would verify credentials with the server
      if (email && password.length >= 6) {
        const userData = {
          id: 'user-123',
          email,
          firstName: 'Demo',
          lastName: 'User',
          isFirstGen: true,
          isInternational: false
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setCurrentUser(userData);
        return userData;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function register(userData) {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, store user data in localStorage
      // In production, this would send the data to the server
      const newUser = {
        id: `user-${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isFirstGen: userData.isFirstGen,
        isInternational: userData.isInternational,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      return newUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function logout() {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function updateProfile(profileData) {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user profile data
      const updatedUser = { ...currentUser, ...profileData };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Check if there's a stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  // Auth context value
  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}