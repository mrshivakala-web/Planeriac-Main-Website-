import React, { useState, useEffect } from 'react';
import { NavigationPage } from '../types';
import { Menu, X, ArrowRight, Activity, Terminal } from 'lucide-react';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage, sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: NavigationPage; sectionId?: string }[] = [
    { label: 'Technology', page: 'home', sectionId: 'technology' },
    { label: 'Research', page: 'research', sectionId: 'research' },
    { label: 'Projects', page: 'projects', sectionId: 'featured-project' },
    { label: 'Asmita', page: 'home', sectionId: 'asmita' },
    { label: 'Ventures', page: 'home', sectionId: 'ventures' },
    { label: 'About', page: 'about' },
  ];

  const handleItemClick = (page: NavigationPage, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060709]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-[#060709]/60 backdrop-blur-sm border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo / Monogram */}
          <button
            id="brand-logo"
            onClick={() => handleItemClick('home')}
            className="flex items-center space-x-3 text-left focus:outline-none group"
          >
            {/* Minimalist Geometric Monogram Glyph */}
            <div className="w-8 h-8 rounded border border-white/20 bg-zinc-950 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-400/80 transition-colors">
              <div className="absolute inset-0 bg-radial from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-2.5 h-2.5 border-t border-l border-white group-hover:border-cyan-400 rotate-45 transition-colors" />
            </div>

            <div>
              <span className="font-bold text-lg sm:text-xl tracking-widest text-white block leading-none font-mono">
                PLANERIAC
              </span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase block mt-1">
                Deep Tech &amp; Research
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isCurrent =
                (currentPage === item.page && !item.sectionId) ||
                (currentPage === 'home' && item.page === 'home');

              return (
                <button
                  key={item.label}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  onClick={() => handleItemClick(item.page, item.sectionId)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-mono tracking-wider uppercase transition-all ${
                    currentPage === item.page && (item.page === 'about' || item.page === 'research' || item.page === 'projects')
                      ? 'text-cyan-400 bg-white/5 border border-white/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Contact */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              id="nav-btn-contact"
              onClick={() => handleItemClick('home', 'contact')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all hover:border-cyan-500/40 shadow-sm"
            >
              <span>Contact</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#07080d]/95 backdrop-blur-xl px-4 pt-4 pb-6 mt-3 space-y-2 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              id={`mobile-nav-${item.label.toLowerCase()}`}
              onClick={() => handleItemClick(item.page, item.sectionId)}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="text-zinc-600 text-xs font-mono">→</span>
            </button>
          ))}

          <div className="pt-3 border-t border-white/10">
            <button
              id="mobile-nav-contact"
              onClick={() => handleItemClick('home', 'contact')}
              className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <span>Contact Planeriac</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
