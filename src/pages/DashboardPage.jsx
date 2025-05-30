import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const { currentUser } = useAuth();
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Dashboard />
      </div>
    </div>
  );
}

export default DashboardPage;