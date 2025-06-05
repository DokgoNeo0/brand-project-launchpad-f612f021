
import React, { useState } from 'react';
import { useProjects, Creator } from '../contexts/ProjectContext';

interface AddCreatorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
}

const AddCreatorsModal: React.FC<AddCreatorsModalProps> = ({
  isOpen,
  onClose,
  projectId,
  projectName
}) => {
  const { availableCreators, addCreatorsToProject, projects } = useProjects();
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  const project = projects.find(p => p.id === projectId);
  const assignedCreatorIds = project?.assignedCreators.map(c => c.id) || [];
  const availableToAdd = availableCreators.filter(creator => 
    !assignedCreatorIds.includes(creator.id)
  );

  const handleCreatorToggle = (creatorId: string) => {
    setSelectedCreators(prev => 
      prev.includes(creatorId)
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    );
  };

  const handleAddCreators = () => {
    if (selectedCreators.length > 0) {
      addCreatorsToProject(projectId, selectedCreators);
      alert(`${selectedCreators.length} creador(es) añadido(s) al proyecto "${projectName}" correctamente`);
      setSelectedCreators([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Añadir Creadores a "{projectName}"
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {availableToAdd.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Todos los creadores disponibles ya están asignados a este proyecto.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Selecciona los creadores que quieres añadir a este proyecto:
              </p>
              
              <div className="space-y-3">
                {availableToAdd.map((creator) => (
                  <div
                    key={creator.id}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleCreatorToggle(creator.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCreators.includes(creator.id)}
                      onChange={() => handleCreatorToggle(creator.id)}
                      className="h-4 w-4 rounded border-gray-300 mr-4"
                      style={{ accentColor: '#823af3' }}
                    />
                    <div className="flex items-center flex-1">
                      <span className="text-2xl mr-3">{creator.avatar}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{creator.name}</h3>
                        <p className="text-sm text-gray-600">{creator.email}</p>
                        <p className="text-sm font-medium" style={{ color: '#823af3' }}>
                          {creator.specialty}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddCreators}
                disabled={selectedCreators.length === 0}
                className="px-6 py-2 text-white rounded-md font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ 
                  backgroundColor: selectedCreators.length > 0 ? '#823af3' : '#ccc',
                }}
                onMouseEnter={(e) => {
                  if (selectedCreators.length > 0) {
                    e.currentTarget.style.backgroundColor = '#6f2db8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCreators.length > 0) {
                    e.currentTarget.style.backgroundColor = '#823af3';
                  }
                }}
              >
                Añadir {selectedCreators.length > 0 ? `${selectedCreators.length} ` : ''}Creador{selectedCreators.length !== 1 ? 'es' : ''}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddCreatorsModal;
