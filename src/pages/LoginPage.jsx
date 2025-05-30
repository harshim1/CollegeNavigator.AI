import { default as React, default as React } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            CollegePathAI
          </h2>
        </Link>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your AI-powered college application assistant
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            CollegePathAI
          </h2>
        </Link>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your AI-powered college application assistant
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:p-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;