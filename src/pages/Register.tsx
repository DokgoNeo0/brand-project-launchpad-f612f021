
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'marca'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de registro
    alert('Registro simulado - En producción aquí crearías la cuenta');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link
              to="/login"
              className="font-medium hover:underline"
              style={{ color: '#823af3' }}
            >
              inicia sesión aquí
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: '#823af3' }}
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: '#823af3' }}
                placeholder="tu-email@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de usuario
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: '#823af3' }}
              >
                <option value="marca">Marca</option>
                <option value="creador">Creador</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: '#823af3' }}
                placeholder="Tu contraseña"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: '#823af3' }}
                placeholder="Confirma tu contraseña"
              />
            </div>
          </div>

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
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
