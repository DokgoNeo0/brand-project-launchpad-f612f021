
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserType } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('marca');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    const success = login(email, password, userType);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
    }
  };

  const handleDemoLogin = (type: UserType) => {
    const success = login(`demo-${type}@example.com`, 'demo123', type);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link
              to="/register"
              className="font-medium hover:underline"
              style={{ color: '#823af3' }}
            >
              regístrate aquí
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de usuario
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="marca"
                    checked={userType === 'marca'}
                    onChange={(e) => setUserType(e.target.value as UserType)}
                    className="h-4 w-4 border-gray-300 mr-2"
                    style={{ accentColor: '#823af3' }}
                  />
                  <span className="text-sm text-gray-700">Marca</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="creador"
                    checked={userType === 'creador'}
                    onChange={(e) => setUserType(e.target.value as UserType)}
                    className="h-4 w-4 border-gray-300 mr-2"
                    style={{ accentColor: '#823af3' }}
                  />
                  <span className="text-sm text-gray-700">Creador</span>
                </label>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: '#823af3' }}
                placeholder="tu-email@ejemplo.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: '#823af3' }}
                placeholder="Tu contraseña"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: '#823af3',
                focusRingColor: '#823af3'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6f2db8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#823af3';
              }}
            >
              Iniciar sesión
            </button>
          </div>

          {/* Demo Login Buttons */}
          <div className="space-y-3">
            <div className="text-center text-sm text-gray-600">
              O prueba con cuentas demo:
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('marca')}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Demo Marca
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('creador')}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Demo Creador
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
