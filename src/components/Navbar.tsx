
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [showLanguages, setShowLanguages] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const unauthenticatedLinks = [
    { path: '/explora', label: 'Explora' },
    { path: '/que-es-ugc', label: '¿Qué es UGC?' }
  ];

  const authenticatedLinks = [
    { path: '/dashboard', label: 'Mi perfil (Dashboard)' },
    { path: '/explora', label: 'Explora' },
    { path: '/propuestas', label: 'Propuestas' },
    { path: '/favoritos', label: 'Favoritos' },
    ...(user?.type === 'marca' ? [{ path: '/mis-proyectos', label: 'Mis proyectos' }] : []),
    { path: '/mis-pagos', label: 'Mis pagos' }
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              UGC<span style={{ color: '#823af3' }}>Hub</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {(isAuthenticated ? authenticatedLinks : unauthenticatedLinks).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActivePath(link.path)
                      ? 'text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{
                    backgroundColor: isActivePath(link.path) ? '#823af3' : 'transparent'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector with hover */}
            <div 
              className="relative"
              onMouseEnter={() => setShowLanguages(true)}
              onMouseLeave={() => setShowLanguages(false)}
            >
              <button className="text-gray-700 hover:text-gray-900 text-sm">
                🌐 ES
              </button>
              {showLanguages && (
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      🇪🇸 ES
                    </button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      🇺🇸 EN
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  Hola, {user?.name} ({user?.type})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 text-sm font-medium"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: '#823af3',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6f2db8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#823af3';
                  }}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
