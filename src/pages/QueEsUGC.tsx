
import React from 'react';

const QueEsUGC: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Qué es UGC?
          </h1>
          <p className="text-gray-600 text-lg">
            Descubre el poder del User Generated Content
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                User Generated Content (UGC)
              </h2>
              <p className="text-gray-600 leading-relaxed">
                El UGC es contenido creado por usuarios reales que promociona marcas y productos de manera auténtica. 
                Es una estrategia de marketing digital que aprovecha la credibilidad y autenticidad de los creadores 
                para conectar con audiencias de manera más genuina.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Beneficios del UGC
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Mayor autenticidad y confianza
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Mejor engagement con la audiencia
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Contenido más rentable
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Alcance orgánico amplificado
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-gray-500">
                ¡Únete a nuestra plataforma y conecta con los mejores creadores UGC!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueEsUGC;
