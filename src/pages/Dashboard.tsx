
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { projects } = useProjects();

  if (!user) {
    return null;
  }

  const totalCreatorsAssigned = projects.reduce((total, project) => 
    total + project.assignedCreators.length, 0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ¡Hola, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Bienvenido a tu dashboard {user.type === 'marca' ? 'de marca' : 'de creador'}
          </p>
        </div>

        {/* Stats Cards */}
        {user.type === 'marca' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#823af3' }}>
                  <span className="text-white text-xl">📁</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Proyectos</p>
                  <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#ffa900' }}>
                  <span className="text-white text-xl">👥</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Creadores Asignados</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCreatorsAssigned}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#e8822e' }}>
                  <span className="text-white text-xl">🎯</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Proyectos Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones rápidas</h2>
          
          {user.type === 'marca' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/crear-proyecto"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: '#823af3' }}>
                  <span className="text-white text-lg">➕</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Crear Proyecto</h3>
                  <p className="text-sm text-gray-600">Inicia un nuevo proyecto UGC</p>
                </div>
              </Link>

              <Link
                to="/mis-proyectos"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: '#ffa900' }}>
                  <span className="text-white text-lg">📚</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Mis Proyectos</h3>
                  <p className="text-sm text-gray-600">Gestiona tus proyectos</p>
                </div>
              </Link>

              <Link
                to="/explora"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: '#e8822e' }}>
                  <span className="text-white text-lg">🔍</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Explorar Creadores</h3>
                  <p className="text-sm text-gray-600">Encuentra nuevos talentos</p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/propuestas"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: '#823af3' }}>
                  <span className="text-white text-lg">💌</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ver Propuestas</h3>
                  <p className="text-sm text-gray-600">Revisa ofertas de marcas</p>
                </div>
              </Link>

              <Link
                to="/mis-pagos"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: '#ffa900' }}>
                  <span className="text-white text-lg">💰</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Mis Pagos</h3>
                  <p className="text-sm text-gray-600">Gestiona tus ingresos</p>
                </div>
              </Link>

              <Link
                to="/explora"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: '#e8822e' }}>
                  <span className="text-white text-lg">🔍</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Explorar Proyectos</h3>
                  <p className="text-sm text-gray-600">Encuentra oportunidades</p>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Recent Projects (for brands) */}
        {user.type === 'marca' && projects.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Proyectos Recientes</h2>
              <Link
                to="/mis-proyectos"
                className="text-sm font-medium hover:underline"
                style={{ color: '#823af3' }}
              >
                Ver todos
              </Link>
            </div>
            
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.assignedCreators.length} creadores asignados</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {new Date(project.createdAt).toLocaleDateString('es-ES')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
