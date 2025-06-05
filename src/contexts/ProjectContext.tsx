
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  minCreators?: number;
  maxCreators?: number;
  assignedCreators: Creator[];
  createdAt: string;
}

export interface Creator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  specialty: string;
}

interface ProjectContextType {
  projects: Project[];
  availableCreators: Creator[];
  createProject: (projectData: Omit<Project, 'id' | 'assignedCreators' | 'createdAt'>) => void;
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
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Mock de creadores disponibles
  const [availableCreators] = useState<Creator[]>([
    {
      id: '1',
      name: 'Ana García',
      email: 'ana@example.com',
      avatar: '👩‍💼',
      specialty: 'Fashion & Lifestyle'
    },
    {
      id: '2',
      name: 'Carlos López',
      email: 'carlos@example.com',
      avatar: '👨‍💻',
      specialty: 'Tech & Gaming'
    },
    {
      id: '3',
      name: 'María González',
      email: 'maria@example.com',
      avatar: '👩‍🎨',
      specialty: 'Beauty & Wellness'
    },
    {
      id: '4',
      name: 'Diego Martín',
      email: 'diego@example.com',
      avatar: '👨‍🍳',
      specialty: 'Food & Travel'
    },
    {
      id: '5',
      name: 'Laura Sánchez',
      email: 'laura@example.com',
      avatar: '👩‍🏫',
      specialty: 'Education & DIY'
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
      addCreatorsToProject 
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
