
import React from 'react';
import Header from '@/components/Header';
import SecurityDashboard from '@/components/SecurityDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <SecurityDashboard />
      </main>
    </div>
  );
};

export default Index;
