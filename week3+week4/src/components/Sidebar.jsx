import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  KanbanSquare,
  BarChartBig,
  Table,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-purple-600' },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays, color: 'from-green-500 to-emerald-600' },
  { to: '/kanban', label: 'Kanban', icon: KanbanSquare, color: 'from-orange-500 to-red-600' },
  { to: '/charts', label: 'Charts', icon: BarChartBig, color: 'from-pink-500 to-rose-600' },
  { to: '/tables', label: 'Tables', icon: Table, color: 'from-indigo-500 to-blue-600' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <>
      {/* Animated backdrop with blur */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Floating toggle button */}
      <button
        className="md:hidden fixed top-6 left-6 z-50 bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-6 h-6">
          <Menu 
            className={`absolute inset-0 text-white transition-all duration-300 ${
              isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <X 
            className={`absolute inset-0 text-white transition-all duration-300 ${
              isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
            }`}
          />
        </div>
      </button>

      {/* Glassmorphism Sidebar */}
      <aside
        className={`fixed z-40 w-72 h-full transition-all duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Glass background with gradient border */}
        <div className="relative w-full h-full bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
          
          {/* Header */}
          <div className="relative p-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Admin
                </h1>
                <p className="text-sm text-gray-500">Control Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="relative p-6 space-y-2">
            {links.map(({ to, label, icon: Icon, color }, index) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'bg-white/20 shadow-xl transform scale-105'
                      : 'hover:bg-white/10 hover:shadow-lg hover:transform hover:scale-102'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Animated background gradient */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 transition-opacity duration-300 ${
                        isActive ? 'opacity-10' : hoveredItem === index ? 'opacity-5' : ''
                      }`} 
                    />
                    
                    {/* Icon container with gradient */}
                    <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? `bg-gradient-to-r ${color} shadow-lg` 
                        : 'bg-gray-100/50 group-hover:bg-white/20'
                    }`}>
                      <Icon className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                      }`} />
                    </div>

                    {/* Label */}
                    <span className={`font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-gray-900 font-semibold' 
                        : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {label}
                    </span>

                    {/* Animated chevron */}
                    <ChevronRight className={`ml-auto w-4 h-4 transition-all duration-300 ${
                      isActive 
                        ? 'text-gray-900 opacity-100 transform translate-x-0' 
                        : 'text-gray-400 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`} />

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r-full shadow-lg" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom gradient decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;