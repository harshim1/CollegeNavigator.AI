import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold">CollegePathAI</h1>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white">Home</Link>
                {currentUser ? (
                  <>
                    <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white">Dashboard</Link>
                    <Link to="/colleges" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white">Find Colleges</Link>
                    <Link to="/essays" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white">Essays</Link>
                    <Link to="/applications" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white">Applications</Link>
                    <Link to="/ai-counselor" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white">AI Counselor</Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white">Login</Link>
                    <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {currentUser && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-600 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-blue-800 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">Home</Link>
            {currentUser ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">Dashboard</Link>
                <Link to="/colleges" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">Find Colleges</Link>
                <Link to="/essays" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">Essays</Link>
                <Link to="/applications" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">Applications</Link>
                <Link to="/ai-counselor" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">AI Counselor</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-700 hover:bg-blue-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;