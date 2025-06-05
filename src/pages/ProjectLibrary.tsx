
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';
import AddCreatorsModal from '../components/AddCreatorsModal';

const ProjectLibrary: React.FC = () => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');

  React.useEffect(() => {
    if (!user || user.type !== 'marca') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleAddCreators = (projectId: string) => {
    setSelectedProject(projectId);
    setModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (!user || user.type !== 'marca') {
    return null;
  }

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Mis Proyectos
            </h1>
            <p className="text-gray-600">
              Gestiona tus proyectos UGC y añade creadores
            </p>
          </div>
          <button
            onClick={() => navigate('/crear-proyecto')}
            className="text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50"
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
            + Nuevo Proyecto
          </button>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Aún no tienes proyectos
            </h3>
            <p className="text-gray-600 mb-6">
              ¡Crea tu primer proyecto UGC y empieza a colaborar con creadores!
            </p>
            <button
              onClick={() => navigate('/crear-proyecto')}
              className="text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#823af3' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6f2db8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#823af3';
              }}
            >
              Crear mi primer proyecto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {project.name}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {formatDate(project.createdAt)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Dates */}
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <span className="font-medium mr-2">Inicio:</span>
                      <span>{formatDate(project.startDate)}</span>
                    </div>
                    {project.endDate && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Fin:</span>
                        <span>{formatDate(project.endDate)}</span>
                      </div>
                    )}
                  </div>

                  {/* Creators Range */}
                  {(project.minCreators || project.maxCreators) && (
                    <div className="mb-4">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Creadores:</span>
                        {project.minCreators && project.maxCreators
                          ? ` ${project.minCreators}-${project.maxCreators}`
                          : project.minCreators
                          ? ` mín. ${project.minCreators}`
                          : ` máx. ${project.maxCreators}`
                        }
                      </div>
                    </div>
                  )}

                  {/* Assigned Creators */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Creadores asignados
                      </span>
                      <span className="text-sm text-gray-500">
                        {project.assignedCreators.length}
                      </span>
                    </div>
                    
                    {project.assignedCreators.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {project.assignedCreators.slice(0, 3).map((creator) => (
                          <div
                            key={creator.id}
                            className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs"
                          >
                            <span className="mr-1">{creator.avatar}</span>
                            <span className="font-medium">{creator.name}</span>
                          </div>
                        ))}
                        {project.assignedCreators.length > 3 && (
                          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600">
                            +{project.assignedCreators.length - 3} más
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Ningún creador asignado aún
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleAddCreators(project.id)}
                    className="w-full text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50"
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
                    Añadir creadores
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Creators Modal */}
        <AddCreatorsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          projectId={selectedProject}
          projectName={selectedProjectData?.name || ''}
        />
      </div>
    </div>
  );
};

export default ProjectLibrary;
