
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';

interface FormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  minCreators: string;
  maxCreators: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  startDate?: string;
}

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProject } = useProjects();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    minCreators: '',
    maxCreators: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  React.useEffect(() => {
    if (!user || user.type !== 'marca') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
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
      // Create project
      createProject({
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        minCreators: formData.minCreators ? parseInt(formData.minCreators) : undefined,
        maxCreators: formData.maxCreators ? parseInt(formData.maxCreators) : undefined
      });
      
      alert('Proyecto creado correctamente');
      navigate('/mis-proyectos');
    }
  };

  if (!user || user.type !== 'marca') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ¡Crea tu Proyecto!
          </h1>
          <p className="text-gray-600">
            Define los detalles de tu nuevo proyecto UGC
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
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
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-transparent'
                }`}
                style={{ 
                  focusRingColor: errors.name ? undefined : '#823af3'
                }}
                placeholder="Ej: Campaña Verano 2024"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 resize-none ${
                  errors.description 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-transparent'
                }`}
                style={{ 
                  focusRingColor: errors.description ? undefined : '#823af3'
                }}
                placeholder="Describe los objetivos y detalles de tu proyecto..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
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
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 ${
                    errors.startDate 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-transparent'
                  }`}
                  style={{ 
                    focusRingColor: errors.startDate ? undefined : '#823af3'
                  }}
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                )}
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
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors duration-200"
                  style={{ 
                    focusRingColor: '#823af3'
                  }}
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
                  value={formData.minCreators}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors duration-200"
                  style={{ 
                    focusRingColor: '#823af3'
                  }}
                  placeholder="Ej: 1"
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
                  value={formData.maxCreators}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors duration-200"
                  style={{ 
                    focusRingColor: '#823af3'
                  }}
                  placeholder="Ej: 10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full text-white py-4 px-6 rounded-lg font-medium text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50"
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
