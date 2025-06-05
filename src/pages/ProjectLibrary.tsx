
import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects, Project } from '../contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
import { ChevronDown, Edit, MessageCircle, Eye, Users } from 'lucide-react';

const ProjectLibrary: React.FC = () => {
  const { user } = useAuth();
  const { projects, updateProject } = useProjects();
  const navigate = useNavigate();
  
  // Filter states
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [creatorsFilter, setCreatorsFilter] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  
  // Expanded projects
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  
  // Edit modal
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    minCreators: '',
    maxCreators: '',
    status: 'activo' as const
  });

  React.useEffect(() => {
    if (!user || user.type !== 'marca') {
      navigate('/login');
    }
  }, [user, navigate]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesName = !nameFilter || project.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesStatus = !statusFilter || project.status === statusFilter;
      const matchesStartDate = !startDateFilter || project.startDate >= startDateFilter;
      const matchesEndDate = !endDateFilter || (project.endDate && project.endDate <= endDateFilter);
      const matchesCreators = !creatorsFilter || project.assignedCreators.length.toString() === creatorsFilter;
      
      return matchesName && matchesStatus && matchesStartDate && matchesEndDate && matchesCreators;
    });
  }, [projects, nameFilter, statusFilter, startDateFilter, endDateFilter, creatorsFilter]);

  // Paginate projects
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setEditForm({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate || '',
      minCreators: project.minCreators?.toString() || '',
      maxCreators: project.maxCreators?.toString() || '',
      status: project.status
    });
  };

  const handleSaveEdit = () => {
    if (!editingProject) return;
    
    updateProject(editingProject.id, {
      name: editForm.name,
      description: editForm.description,
      startDate: editForm.startDate,
      endDate: editForm.endDate || undefined,
      minCreators: editForm.minCreators ? parseInt(editForm.minCreators) : undefined,
      maxCreators: editForm.maxCreators ? parseInt(editForm.maxCreators) : undefined,
      status: editForm.status
    });
    
    setEditingProject(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'pausado': return 'bg-yellow-100 text-yellow-800';
      case 'completado': return 'bg-blue-100 text-blue-800';
      case 'borrador': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelationStatusText = (status: string) => {
    switch (status) {
      case 'negociando': return 'En negociación';
      case 'contratado': return 'Contratado';
      case 'completado': return 'Trabajo completado';
      case 'rechazado': return 'Propuesta rechazada';
      default: return 'Estado desconocido';
    }
  };

  if (!user || user.type !== 'marca') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Mis Proyectos
        </h1>

        <div className="flex gap-8">
          {/* Filters Card - Left Side */}
          <div className="w-80 flex-shrink-0">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    placeholder="Buscar por nombre..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Todos los estados</option>
                    <option value="activo">Activo</option>
                    <option value="pausado">Pausado</option>
                    <option value="completado">Completado</option>
                    <option value="borrador">Borrador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de inicio (desde)
                  </label>
                  <input
                    type="date"
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de finalización (hasta)
                  </label>
                  <input
                    type="date"
                    value={endDateFilter}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de creadores
                  </label>
                  <input
                    type="number"
                    value={creatorsFilter}
                    onChange={(e) => setCreatorsFilter(e.target.value)}
                    placeholder="Filtrar por cantidad..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <Button
                  onClick={() => {
                    setNameFilter('');
                    setStatusFilter('');
                    setStartDateFilter('');
                    setEndDateFilter('');
                    setCreatorsFilter('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Limpiar filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Projects List - Right Side */}
          <div className="flex-1">
            {paginatedProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-500 mb-4">No se encontraron proyectos</p>
                <Button 
                  onClick={() => navigate('/crear-proyecto')}
                  style={{ backgroundColor: '#823af3' }}
                  className="text-white"
                >
                  Crear nuevo proyecto
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProjects.map((project) => (
                  <Card key={project.id} className="border border-gray-200">
                    <Collapsible>
                      <CollapsibleTrigger
                        className="w-full"
                        onClick={() => toggleProject(project.id)}
                      >
                        <div className="flex items-center justify-between p-6 hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {project.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                          <ChevronDown 
                            className={`h-5 w-5 text-gray-500 transform transition-transform ${
                              expandedProjects.has(project.id) ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="px-6 pb-6 border-t border-gray-100">
                          {/* Project Details Card */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 relative">
                            <button
                              onClick={() => openEditModal(project)}
                              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            
                            <div className="grid grid-cols-2 gap-4 pr-12">
                              <div>
                                <p className="text-sm font-medium text-gray-700">Descripción:</p>
                                <p className="text-gray-600">{project.description}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Fecha de inicio:</p>
                                <p className="text-gray-600">{new Date(project.startDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Fecha de finalización:</p>
                                <p className="text-gray-600">
                                  {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'No definida'}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Creadores:</p>
                                <p className="text-gray-600">
                                  {project.minCreators && project.maxCreators 
                                    ? `${project.minCreators} - ${project.maxCreators}` 
                                    : 'No especificado'}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Add Creators Button or Creators List */}
                          {project.assignedCreators.length === 0 ? (
                            <Button
                              onClick={() => navigate('/explora')}
                              style={{ backgroundColor: '#823af3' }}
                              className="text-white mb-4"
                            >
                              <Users className="h-4 w-4 mr-2" />
                              Añadir creadores
                            </Button>
                          ) : (
                            <>
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-md font-semibold text-gray-900">Creadores asignados</h4>
                                <Button
                                  onClick={() => navigate('/explora')}
                                  variant="outline"
                                  size="sm"
                                >
                                  <Users className="h-4 w-4 mr-2" />
                                  Añadir más
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {project.assignedCreators.map((creator) => (
                                  <div key={creator.id} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                    <div className="text-4xl mb-3">{creator.avatar}</div>
                                    <h5 className="font-medium text-gray-900 mb-2">{creator.name}</h5>
                                    <p className="text-sm text-gray-600 mb-3">{creator.specialty}</p>
                                    
                                    <div className="flex space-x-2 mb-3">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1"
                                      >
                                        <MessageCircle className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => navigate(`/propuestas-creador/${creator.id}`)}
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    
                                    <p className="text-xs text-gray-500">
                                      {getRelationStatusText(creator.relationStatus)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Edit Project Modal */}
        <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Proyecto</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
                  <input
                    type="date"
                    value={editForm.startDate}
                    onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
                  <input
                    type="date"
                    value={editForm.endDate}
                    onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min. creadores</label>
                  <input
                    type="number"
                    value={editForm.minCreators}
                    onChange={(e) => setEditForm({ ...editForm, minCreators: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max. creadores</label>
                  <input
                    type="number"
                    value={editForm.maxCreators}
                    onChange={(e) => setEditForm({ ...editForm, maxCreators: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="activo">Activo</option>
                  <option value="pausado">Pausado</option>
                  <option value="completado">Completado</option>
                  <option value="borrador">Borrador</option>
                </select>
              </div>

              <Button
                onClick={handleSaveEdit}
                style={{ backgroundColor: '#823af3' }}
                className="w-full text-white"
              >
                Guardar cambios
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectLibrary;
