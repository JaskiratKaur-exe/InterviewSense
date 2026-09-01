import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Default mock candidate profile matching your reference image
const DEFAULT_MOCK_USER = {
  id: 'johndoe',
  name: 'John Doe',
  email: 'john.doe@interviewsense.ai',
  role: 'Candidate',
  targetRole: 'Software Engineer',
  avatar: null,
  initials: 'JD',
  joinedDate: 'May 2025',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('interview_sense_token');
      const storedUser = localStorage.getItem('interview_sense_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to parse stored auth session:', err);
      localStorage.removeItem('interview_sense_token');
      localStorage.removeItem('interview_sense_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login method
   * Simulated mock authentication ready to be swapped with Flask API in Phase 13
   */
  const login = async (email, password) => {
    setIsLoading(true);

    // Simulate network latency (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create session
    const mockToken = `jwt_mock_${Date.now()}`;
    const loggedUser = {
      ...DEFAULT_MOCK_USER,
      email: email || DEFAULT_MOCK_USER.email,
    };

    setToken(mockToken);
    setUser(loggedUser);

    localStorage.setItem('interview_sense_token', mockToken);
    localStorage.setItem('interview_sense_user', JSON.stringify(loggedUser));

    setIsLoading(false);
    return loggedUser;
  };

  /**
   * Register method
   */
  const register = async ({ name, email, password, targetRole }) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const mockToken = `jwt_mock_${Date.now()}`;
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name || 'John Doe',
      email: email,
      role: 'Candidate',
      targetRole: targetRole || 'Software Engineer',
      avatar: null,
      initials: name ? name.split(' ').map((n) => n[0]).join('').toUpperCase() : 'JD',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    setToken(mockToken);
    setUser(newUser);

    localStorage.setItem('interview_sense_token', mockToken);
    localStorage.setItem('interview_sense_user', JSON.stringify(newUser));

    setIsLoading(false);
    return newUser;
  };

  /**
   * Update candidate target role
   */
  const updateTargetRole = (targetRole) => {
    if (!user) return;
    const updated = { ...user, targetRole };
    setUser(updated);
    localStorage.setItem('interview_sense_user', JSON.stringify(updated));
  };

  /**
   * Logout method
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('interview_sense_token');
    localStorage.removeItem('interview_sense_user');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    updateTargetRole,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom Hook for accessing auth state anywhere in the application
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
