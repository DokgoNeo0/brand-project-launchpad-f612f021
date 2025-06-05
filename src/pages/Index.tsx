
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Conecta Marcas con{' '}
            <span style={{ color: '#823af3' }}>Creadores UGC</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La plataforma definitiva para crear colaboraciones auténticas entre marcas y creadores de contenido. 
            Genera UGC que realmente conecta con tu audiencia.
          </p>
          
          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                ¡Bienvenido de vuelta, {user?.name}! 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-8 py-4 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#823af3' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6f2db8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#823af3';
                  }}
                >
                  Ir al Dashboard
                </Link>
                {user?.type === 'marca' && (
                  <Link
                    to="/crear-proyecto"
                    className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-medium rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 hover:scale-105"
                  >
                    Crear Nuevo Proyecto
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#823af3' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6f2db8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#823af3';
                }}
              >
                Empezar Gratis
              </Link>
              <Link
                to="/que-es-ugc"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-medium rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 hover:scale-105"
              >
                ¿Qué es UGC?
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir UGCHub?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Facilitamos las colaboraciones entre marcas y creadores con herramientas profesionales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#823af3' }}>
              <span className="text-white text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Para Marcas</h3>
            <p className="text-gray-600">
              Crea proyectos, encuentra creadores perfectos y gestiona colaboraciones de manera eficiente.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ffa900' }}>
              <span className="text-white text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Para Creadores</h3>
            <p className="text-gray-600">
              Descubre oportunidades, colabora con marcas increíbles y monetiza tu creatividad.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e8822e' }}>
              <span className="text-white text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Resultados</h3>
            <p className="text-gray-600">
              Contenido auténtico que genera engagement real y aumenta la confianza en tu marca.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Únete a cientos de marcas y creadores que ya están creando contenido increíble juntos.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#823af3' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6f2db8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#823af3';
                }}
              >
                Crear Cuenta Gratis
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105"
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
