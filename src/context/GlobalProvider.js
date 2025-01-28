import React, { createContext, useState, useContext, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = (token, userData, remember = false) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(userData));
    setRememberMe(remember);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setRememberMe(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    rememberMe,
    setRememberMe
  };

  return (
    <GlobalContext.Provider value={value}>
      {!loading && children}
    </GlobalContext.Provider>
  );
};