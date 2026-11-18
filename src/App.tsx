import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WriteupsPage } from './pages/WriteupsPage';
import { WriteupDetailPage } from './pages/WriteupDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useLenis } from './lib/lenis';

const AppContent: React.FC = () => {
  // Initialize smooth scrolling
  useLenis();

  return (
    <div className="min-h-screen bg-[#000000] text-[#F4F1EE] flex flex-col font-display">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/writeups" element={<WriteupsPage />} />
          <Route path="/writeups/:slug" element={<WriteupDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>

      <Footer />
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
