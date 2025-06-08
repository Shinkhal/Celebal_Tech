import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  KanbanSquare,
  BarChartBig,
  Table,
  Menu,
  X
} from 'lucide-react';
import ThemeToggle from './Themes';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/kanban', label: 'Kanban', icon: KanbanSquare },
  { to: '/charts', label: 'Charts', icon: BarChartBig },
  { to: '/tables', label: 'Tables', icon: Table },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Navbar */}
      <nav className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/30 z-20 flex items-center justify-end px-6">
        <ThemeToggle />
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 w-64 h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200/20 dark:border-gray-700/30 shadow-xl transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Control Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
export default Navigation;