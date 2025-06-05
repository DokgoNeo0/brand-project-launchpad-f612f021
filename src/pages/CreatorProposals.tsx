
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { MessageCircle, Star, MapPin, Languages } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  lastName: string;
  avatar: string;
  rating: number;
  location: string;
  languages: string[];
  specialty: string;
}

interface Proposal {
  id: string;
  price: number;
  date: string;
  projectName: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const CreatorProposals: React.FC = () => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const { creatorId } = useParams();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Mock data del creador
  const creator: Creator = {
    id: creatorId || '1',
    name: 'Ana',
    lastName: 'García',
    avatar: '👩‍💼',
    rating: 4.8,
    location: 'Madrid, España',
    languages: ['Español', 'Inglés', 'Francés'],
    specialty: 'Fashion & Lifestyle'
  };

  // Mock data de propuestas
  const proposals: Proposal[] = [
    {
      id: '1',
      price: 250,
      date: '2024-01-15',
      projectName: 'Campaña Primavera 2024',
      status: 'pending'
    },
    {
      id: '2',
      price: 180,
      date: '2024-01-10',
      projectName: 'Video Review Productos Tech',
      status: 'pending'
    },
    {
      id: '3',
      price: 320,
      date: '2024-01-08',
      projectName: 'Colaboración Beauty Brand',
      status: 'accepted'
    }
  ];

  React.useEffect(() => {
    if (!user || user.type !== 'marca') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSelectProject = () => {
    if (selectedProject) {
      console.log('Proyecto seleccionado:', selectedProject);
      setShowProjectModal(false);
      setSelectedProject('');
    }
  };

  const handleProposalAction = (proposalId: string, action: 'accept' | 'reject' | 'chat') => {
    console.log(`Acción ${action} en propuesta ${proposalId}`);
    
    switch (action) {
      case 'accept':
        alert('Propuesta aceptada');
        break;
      case 'reject':
        alert('Propuesta rechazada');
        break;
      case 'chat':
        alert('Abriendo chat...');
        break;
    }
  };

  const handleOpenChat = () => {
    alert('Abriendo chat con ' + creator.name);
  };

  if (!user || user.type !== 'marca') {
    return null;
  }

  // Filtrar proyectos que incluyen este creador
  const creatorProjects = projects.filter(project => 
    project.assignedCreators.some(assignedCreator => assignedCreator.id === creator.id)
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Columna izquierda - Perfil del creador */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Imagen de perfil */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                  {creator.avatar}
                </div>
              </div>

              {/* Botón de chat */}
              <div className="text-center">
                <Button
                  onClick={handleOpenChat}
                  className="w-full flex items-center justify-center space-x-2 text-white"
                  style={{ backgroundColor: '#823af3' }}
                >
                  <MessageCircle size={16} />
                  <span>Chat</span>
                </Button>
              </div>

              {/* Tarjeta de datos del creador */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {creator.name} {creator.lastName}
                </h3>
                
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{creator.rating}/5</span>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">{creator.location}</span>
                </div>

                <div className="flex items-start space-x-2">
                  <Languages className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    {creator.languages.join(', ')}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Especialidad</h4>
                  <p className="text-sm text-gray-600">{creator.specialty}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Contenido principal */}
          <div className="lg:col-span-3">
            {/* Botón Seleccionar proyecto */}
            <div className="mb-8">
              <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
                <DialogTrigger asChild>
                  <Button
                    className="text-white px-6 py-3 text-lg font-medium"
                    style={{ backgroundColor: '#823af3' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#6f2db8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#823af3';
                    }}
                  >
                    Seleccionar proyecto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Seleccionar proyecto</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Proyectos donde {creator.name} está incluido:
                    </p>
                    {creatorProjects.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        Este creador no está asignado a ningún proyecto.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {creatorProjects.map((project) => (
                          <div key={project.id} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              id={project.id}
                              name="project"
                              value={project.id}
                              checked={selectedProject === project.id}
                              onChange={(e) => setSelectedProject(e.target.value)}
                              className="text-purple-600"
                            />
                            <label htmlFor={project.id} className="cursor-pointer">
                              <p className="font-medium">{project.name}</p>
                              <p className="text-sm text-gray-500">{project.description}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      onClick={handleSelectProject}
                      className="w-full text-white"
                      style={{ backgroundColor: '#823af3' }}
                      disabled={!selectedProject}
                    >
                      Seleccionar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Lista de propuestas */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Propuestas con {creator.name}
              </h2>

              {proposals.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💌</div>
                  <p className="text-gray-500">No hay propuestas con este creador</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Precio</h4>
                              <p className="text-2xl font-bold" style={{ color: '#823af3' }}>
                                €{proposal.price}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Fecha</h4>
                              <p className="text-gray-600">
                                {new Date(proposal.date).toLocaleDateString('es-ES')}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Proyecto</h4>
                              <p className="text-gray-600">{proposal.projectName}</p>
                            </div>
                          </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex items-center space-x-3 ml-6">
                          <Button
                            onClick={() => handleProposalAction(proposal.id, 'accept')}
                            className="text-white px-4 py-2"
                            style={{ backgroundColor: '#28a745' }}
                            size="sm"
                          >
                            Aceptar
                          </Button>
                          <Button
                            onClick={() => handleProposalAction(proposal.id, 'reject')}
                            className="text-white px-4 py-2"
                            style={{ backgroundColor: '#dc3545' }}
                            size="sm"
                          >
                            Rechazar
                          </Button>
                          <Button
                            onClick={() => handleProposalAction(proposal.id, 'chat')}
                            className="text-white px-4 py-2 flex items-center space-x-1"
                            style={{ backgroundColor: '#823af3' }}
                            size="sm"
                          >
                            <MessageCircle size={14} />
                            <span>Chat</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProposals;
