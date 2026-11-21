import React, { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Link, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WriteupsPage } from './pages/WriteupsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToAnchor } from './components/ScrollToAnchor';
import { pageTitles } from './lib/pageTitles';
import { useLenis } from './lib/lenis';

const WriteupDetailPage = React.lazy(() =>
  import('./pages/WriteupDetailPage').then(module => ({ default: module.WriteupDetailPage }))
);

const AppContent: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = pageTitles.get(pathname.replace(/\/+$/, '') || '/') ?? 'Page not found | Mohammad Favas S';
  }, [pathname]);

  useLenis();

  return (
    <div className="min-h-screen bg-[#000000] text-[#F4F1EE] flex flex-col font-display">
      <ScrollToAnchor />
      <a className="skip-link" href="#portfolio-content">Skip navigation</a>
      <Navbar />

      <div id="portfolio-content" tabIndex={-1} className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/writeups" element={<WriteupsPage />} />
          <Route path="/writeups/:slug" element={<React.Suspense fallback={<p className="p-8" role="status">Loading dossier…</p>}><WriteupDetailPage /></React.Suspense>} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={
            <main className="mx-auto max-w-xl px-6 py-24">
              <h1 className="text-3xl font-medium text-white">Page not found</h1>
              <p className="my-4 text-ink-muted">There’s no portfolio page at this address.</p>
              <Link to="/" className="inline-flex min-h-11 items-center font-mono text-sm text-lime underline">Return to homepage</Link>
            </main>
          } />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user"><AppContent /></MotionConfig>
    </BrowserRouter>
  );
};
