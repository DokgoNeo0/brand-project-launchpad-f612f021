
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';

const ProjectLibrary: React.FC = () => {
  const { user } = useAuth();
  const { projects, availableCreators, addCreatorsToProject } = useProjects();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  React.useEffect(() => {
    if (!user || user.type !== 'marca') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleAddCreators = () => {
    if (selectedProject && selectedCreators.length > 0) {
      addCreatorsToProject(selectedProject, selectedCreators);
      setSelectedCreators([]);
      setSelectedProject(null);
    }
  };

  const handleCreatorToggle = (creatorId: string) => {
    setSelectedCreators(prev => 
      prev.includes(creatorId) 
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    );
  };

  if (!user || user.type !== 'marca') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mis Proyectos
          </h1>
          <p className="text-gray-600">
            Gestiona tus proyectos y añade creadores
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-500 mb-4">No tienes proyectos creados todavía</p>
            <Button 
              onClick={() => navigate('/crear-proyecto')}
              className="text-white px-6 py-2"
              style={{ backgroundColor: '#823af3' }}
            >
              Crear mi primer proyecto
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <p><strong>Inicio:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
                  {project.endDate && (
                    <p><strong>Fin:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
                  )}
                  {project.minCreators && (
                    <p><strong>Creadores mín:</strong> {project.minCreators}</p>
                  )}
                  {project.maxCreators && (
                    <p><strong>Creadores máx:</strong> {project.maxCreators}</p>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Creadores asignados:</h4>
                  {project.assignedCreators.length === 0 ? (
                    <p className="text-gray-500 text-sm">No hay creadores asignados</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {project.assignedCreators.map((creator) => (
                        <span 
                          key={creator.id}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                        >
                          {creator.avatar} {creator.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelectedProject(project.id)}
                      className="w-full text-white"
                      style={{ backgroundColor: '#823af3' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#6f2db8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#823af3';
                      }}
                    >
                      Añadir creadores
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Añadir creadores al proyecto</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      {availableCreators
                        .filter(creator => !project.assignedCreators.some(assigned => assigned.id === creator.id))
                        .map((creator) => (
                        <div key={creator.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={creator.id}
                            checked={selectedCreators.includes(creator.id)}
                            onChange={() => handleCreatorToggle(creator.id)}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={creator.id} className="flex items-center space-x-2 cursor-pointer">
                            <span className="text-2xl">{creator.avatar}</span>
                            <div>
                              <p className="font-medium">{creator.name}</p>
                              <p className="text-sm text-gray-500">{creator.specialty}</p>
                            </div>
                          </label>
                        </div>
                      ))}
                      <Button
                        onClick={handleAddCreators}
                        className="w-full mt-4 text-white"
                        style={{ backgroundColor: '#823af3' }}
                        disabled={selectedCreators.length === 0}
                      >
                        Añadir seleccionados
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectLibrary;
