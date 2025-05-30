import React from 'react';
import { Navigate } from 'react-router-dom';
import ProfileSetupForm from '../components/auth/ProfileSetupForm';
import { useAuth } from '../context/AuthContext';

function ProfileSetupPage() {
  const { currentUser } = useAuth();
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="mt-2 text-lg text-gray-600">
            Help us personalize your college application experience
          </p>
        </div>
        
        <ProfileSetupForm />
      </div>
    </div>
  );
}

export default ProfileSetupPage;