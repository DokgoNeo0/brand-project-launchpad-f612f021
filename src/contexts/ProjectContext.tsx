
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  minCreators?: number;
  maxCreators?: number;
  status: 'activo' | 'pausado' | 'completado' | 'borrador';
  assignedCreators: Creator[];
  createdAt: string;
}

export interface Creator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  specialty: string;
  rating: number;
  location: string;
  relationStatus: 'negociando' | 'contratado' | 'completado' | 'rechazado';
}

interface ProjectContextType {
  projects: Project[];
  availableCreators: Creator[];
  createProject: (projectData: Omit<Project, 'id' | 'assignedCreators' | 'createdAt'>) => void;
  updateProject: (projectId: string, projectData: Partial<Project>) => void;
  addCreatorsToProject: (projectId: string, creatorIds: string[]) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Mock projects with initial data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'project-1',
      name: 'Campaña Verano 2024',
      description: 'Campaña de marketing para productos de verano con influencers de moda',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      minCreators: 3,
      maxCreators: 8,
      status: 'activo',
      assignedCreators: [
        {
          id: '1',
          name: 'Ana García',
          email: 'ana@example.com',
          avatar: '👩‍💼',
          specialty: 'Fashion & Lifestyle',
          rating: 4.8,
          location: 'Madrid, España',
          relationStatus: 'contratado'
        },
        {
          id: '3',
          name: 'María González',
          email: 'maria@example.com',
          avatar: '👩‍🎨',
          specialty: 'Beauty & Wellness',
          rating: 4.9,
          location: 'Valencia, España',
          relationStatus: 'negociando'
        }
      ],
      createdAt: '2024-05-15T10:00:00Z'
    },
    {
      id: 'project-2',
      name: 'Lanzamiento Producto Tech',
      description: 'Lanzamiento de nueva línea de productos tecnológicos',
      startDate: '2024-07-15',
      endDate: '2024-09-15',
      minCreators: 2,
      maxCreators: 5,
      status: 'borrador',
      assignedCreators: [],
      createdAt: '2024-06-01T14:30:00Z'
    },
    {
      id: 'project-3',
      name: 'Campaña Navideña',
      description: 'Campaña especial para las fiestas navideñas con creadores de diferentes nichos',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      minCreators: 5,
      maxCreators: 12,
      status: 'pausado',
      assignedCreators: [
        {
          id: '2',
          name: 'Carlos López',
          email: 'carlos@example.com',
          avatar: '👨‍💻',
          specialty: 'Tech & Gaming',
          rating: 4.6,
          location: 'Barcelona, España',
          relationStatus: 'completado'
        }
      ],
      createdAt: '2024-05-20T09:15:00Z'
    },
    {
      id: 'project-4',
      name: 'Campaña Food & Travel',
      description: 'Colaboración con food bloggers y travel influencers',
      startDate: '2024-08-01',
      endDate: '2024-10-31',
      minCreators: 4,
      maxCreators: 10,
      status: 'activo',
      assignedCreators: [
        {
          id: '4',
          name: 'Diego Martín',
          email: 'diego@example.com',
          avatar: '👨‍🍳',
          specialty: 'Food & Travel',
          rating: 4.7,
          location: 'Sevilla, España',
          relationStatus: 'contratado'
        },
        {
          id: '5',
          name: 'Laura Sánchez',
          email: 'laura@example.com',
          avatar: '👩‍🏫',
          specialty: 'Education & DIY',
          rating: 4.5,
          location: 'Bilbao, España',
          relationStatus: 'negociando'
        }
      ],
      createdAt: '2024-06-10T16:45:00Z'
    }
  ]);
  
  // Mock de creadores disponibles
  const [availableCreators] = useState<Creator[]>([
    {
      id: '1',
      name: 'Ana García',
      email: 'ana@example.com',
      avatar: '👩‍💼',
      specialty: 'Fashion & Lifestyle',
      rating: 4.8,
      location: 'Madrid, España',
      relationStatus: 'negociando'
    },
    {
      id: '2',
      name: 'Carlos López',
      email: 'carlos@example.com',
      avatar: '👨‍💻',
      specialty: 'Tech & Gaming',
      rating: 4.6,
      location: 'Barcelona, España',
      relationStatus: 'negociando'
    },
    {
      id: '3',
      name: 'María González',
      email: 'maria@example.com',
      avatar: '👩‍🎨',
      specialty: 'Beauty & Wellness',
      rating: 4.9,
      location: 'Valencia, España',
      relationStatus: 'negociando'
    },
    {
      id: '4',
      name: 'Diego Martín',
      email: 'diego@example.com',
      avatar: '👨‍🍳',
      specialty: 'Food & Travel',
      rating: 4.7,
      location: 'Sevilla, España',
      relationStatus: 'negociando'
    },
    {
      id: '5',
      name: 'Laura Sánchez',
      email: 'laura@example.com',
      avatar: '👩‍🏫',
      specialty: 'Education & DIY',
      rating: 4.5,
      location: 'Bilbao, España',
      relationStatus: 'negociando'
    }
  ]);

  const createProject = (projectData: Omit<Project, 'id' | 'assignedCreators' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`,
      assignedCreators: [],
      createdAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (projectId: string, projectData: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, ...projectData } : project
    ));
  };

  const addCreatorsToProject = (projectId: string, creatorIds: string[]) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const newCreators = availableCreators.filter(creator => 
          creatorIds.includes(creator.id) && 
          !project.assignedCreators.some(existing => existing.id === creator.id)
        );
        return {
          ...project,
          assignedCreators: [...project.assignedCreators, ...newCreators]
        };
      }
      return project;
    }));
  };

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      availableCreators, 
      createProject, 
      updateProject,
      addCreatorsToProject 
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
