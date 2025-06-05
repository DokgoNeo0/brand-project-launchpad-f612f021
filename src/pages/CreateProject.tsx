
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';

const CreateProject: React.FC = () => {
  const { user } = useAuth();
  const { createProject } = useProjects();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    minCreators: '',
    maxCreators: ''
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Redirigir si no es una marca autenticada
  React.useEffect(() => {
    if (!user || user.type !== 'marca') {
      navigate('/login');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del proyecto es obligatorio';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'La fecha de inicio es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      createProject({
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        minCreators: formData.minCreators ? parseInt(formData.minCreators) : undefined,
        maxCreators: formData.maxCreators ? parseInt(formData.maxCreators) : undefined,
        status: 'borrador'
      });
      
      alert('Proyecto creado correctamente');
      navigate('/mis-proyectos');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!user || user.type !== 'marca') {
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Crea tu Proyecto!
          </h1>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre del proyecto */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del proyecto *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingresa el nombre de tu proyecto"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-vertical ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe tu proyecto en detalle"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de inicio *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de finalización
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Número de creadores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="minCreators" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de creadores mínimo
                </label>
                <input
                  type="number"
                  id="minCreators"
                  name="minCreators"
                  min="1"
                  value={formData.minCreators}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="1"
                />
              </div>

              <div>
                <label htmlFor="maxCreators" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de creadores máximo
                </label>
                <input
                  type="number"
                  id="maxCreators"
                  name="maxCreators"
                  min="1"
                  value={formData.maxCreators}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="10"
                />
              </div>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: '#823af3',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6f2db8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#823af3';
                }}
              >
                Crear Proyecto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
