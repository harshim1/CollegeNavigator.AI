import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import DashboardPage from './pages/DashboardPage';
import CollegeBrowserPage from './pages/CollegeBrowserPage';
import EssayManagementPage from './pages/EssayManagementPage';
import ApplicationsPage from './pages/ApplicationsPage';
import AICounselorPage from './pages/AICounselorPage';

// Context Providers
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile-setup" element={<ProfileSetupPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/colleges" element={<CollegeBrowserPage />} />
              <Route path="/essays" element={<EssayManagementPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/ai-counselor" element={<AICounselorPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;