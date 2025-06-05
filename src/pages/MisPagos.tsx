
import React from 'react';

const MisPagos: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mis Pagos
          </h1>
          <p className="text-gray-600 text-lg">
            Gestiona tus pagos y facturación
          </p>
        </div>
        
        <div className="mt-12 text-center">
          <div className="text-6xl mb-4">💰</div>
          <p className="text-gray-500">
            Esta página está en desarrollo. Pronto podrás gestionar tus pagos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MisPagos;
