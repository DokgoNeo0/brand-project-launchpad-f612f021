
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'marca' | 'creador';

export interface User {
  id: string;
  email: string;
  name: string;
  type: UserType;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: UserType) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, type: UserType): boolean => {
    // Simulación de login - en producción esto sería una llamada al backend
    if (email && password) {
      const mockUser: User = {
        id: `${type}-${Date.now()}`,
        email,
        name: type === 'marca' ? 'Empresa Demo' : 'Creador Demo',
        type
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
