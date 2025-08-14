import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Home page
import LandingPage from './App.jsx'

// NEW: full-list pages
import AllAstro from './pages/AllAstro.jsx'
import AllProjects from './pages/AllProjects.jsx'

// NEW: detail pages
import AstroDetail from './pages/AstroDetail.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/astro" element={<AllAstro />} />
        <Route path="/astro/:id" element={<AstroDetail />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
