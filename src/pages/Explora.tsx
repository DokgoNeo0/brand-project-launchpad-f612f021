
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Star, MapPin } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  lastName: string;
  avatar: string;
  rating: number;
  location: string;
  specialty: string;
  description: string;
}

const Explora: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data de creadores
  const creators: Creator[] = [
    {
      id: '1',
      name: 'Ana',
      lastName: 'García',
      avatar: '👩‍💼',
      rating: 4.8,
      location: 'Madrid, España',
      specialty: 'Fashion & Lifestyle',
      description: 'Especialista en moda y estilo de vida con más de 50K seguidores'
    },
    {
      id: '2',
      name: 'Carlos',
      lastName: 'López',
      avatar: '👨‍💻',
      rating: 4.6,
      location: 'Barcelona, España',
      specialty: 'Tech & Gaming',
      description: 'Experto en tecnología y gaming con reviews detallados'
    },
    {
      id: '3',
      name: 'María',
      lastName: 'González',
      avatar: '👩‍🎨',
      rating: 4.9,
      location: 'Valencia, España',
      specialty: 'Beauty & Wellness',
      description: 'Creadora de contenido de belleza y bienestar'
    },
    {
      id: '4',
      name: 'Diego',
      lastName: 'Martín',
      avatar: '👨‍🍳',
      rating: 4.7,
      location: 'Sevilla, España',
      specialty: 'Food & Travel',
      description: 'Apasionado de la gastronomía y los viajes'
    }
  ];

  const handleViewProposals = (creatorId: string) => {
    if (!user || user.type !== 'marca') {
      navigate('/login');
      return;
    }
    navigate(`/propuestas-creador/${creatorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explora
          </h1>
          <p className="text-gray-600 text-lg">
            Descubre creadores y proyectos increíbles
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {creators.map((creator) => (
            <div key={creator.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
                    {creator.avatar}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {creator.name} {creator.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{creator.specialty}</p>
                  
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{creator.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">{creator.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 text-center mb-4">
                  {creator.description}
                </p>
                
                <div className="space-y-2">
                  <Button
                    className="w-full text-white"
                    style={{ backgroundColor: '#823af3' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#6f2db8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#823af3';
                    }}
                  >
                    Ver perfil
                  </Button>
                  
                  {user && user.type === 'marca' && (
                    <Button
                      onClick={() => handleViewProposals(creator.id)}
                      variant="outline"
                      className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      Ver propuestas
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explora;
