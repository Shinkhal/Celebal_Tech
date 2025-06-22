import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];

const NavLinks = ({ handleClick }) => (
  <nav className="flex flex-col space-y-2 mt-8">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className={({ isActive }) => `group flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
          : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className={`w-5 h-5 mr-3 transition-all duration-300 ${'group-hover:scale-110'}`} />
        <span className="font-medium">{item.name}</span>
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full" />
        </div>
      </NavLink>
    ))}
  </nav>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 sticky top-0">
        <div className="p-6">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg rounded-full opacity-75" />
            </div>
          </div>

          {/* Navigation */}
          <NavLinks />

          {/* Bottom Section */}
          <div className="mt-auto pt-8">
            <div className="glass-card p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <HiOutlineUserGroup className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-white font-bold text-3xl">Music App</h1>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
        onClick={() => setMobileMenuOpen(true)}
        className="p-2 rounded-xl bg-black/40 backdrop-blur-lg border border-white/10 text-white hover:bg-black/60 transition-all duration-300" >
          <HiOutlineMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`md:hidden fixed top-0 left-0 h-screen w-80 max-w-[85vw] bg-black/90 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ease-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 h-full flex flex-col">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <NavLinks handleClick={() => setMobileMenuOpen(false)} />

          {/* Mobile Bottom Section */}
          <div className="mt-auto">
            <div className="glass-card p-4 text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <HiOutlineUserGroup className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;