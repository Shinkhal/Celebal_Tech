// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import Charts from './pages/Charts';
import Tables from './pages/Tables';
import Navigation from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100 dark:bg-neutral-900">
        <Navigation />
        <div className="flex flex-col flex-1 overflow-hidden md:ml-64 mt-16">
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/tables" element={<Tables />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
