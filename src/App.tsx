import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WriteupsPage } from './pages/WriteupsPage';
import { WriteupDetailPage } from './pages/WriteupDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AdminPage } from './pages/AdminPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { useLenis } from './lib/lenis';

const AppContent: React.FC = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const location = useLocation();

  // Initialize smooth scrolling
  useLenis();

  // Secret shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#000000] text-[#F4F1EE] flex flex-col font-display">
      {!isAdminRoute && <Navbar onOpenAdmin={() => setIsAdminModalOpen(true)} />}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/writeups" element={<WriteupsPage />} />
          <Route path="/writeups/:slug" element={<WriteupDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}

      {/* Hidden Admin Login Modal */}
      <AdminLoginModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
