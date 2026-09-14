import React from 'react';
import { NavigationPage } from '../types';
import { Terminal, Shield, ArrowUp, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040507] border-t border-white/10 text-zinc-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded border border-white/20 bg-zinc-950 flex items-center justify-center">
                <div className="w-2 h-2 border-t border-l border-cyan-400 rotate-45" />
              </div>
              <span className="font-mono text-base font-bold text-white tracking-widest">
                PLANERIAC
              </span>
            </div>

            <p className="text-sm text-zinc-300 font-light max-w-sm leading-relaxed">
              Deep Technology. Real-World Impact.
            </p>

            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Planeriac operates at the intersection of AI, robotics, computing and semiconductor technology, software engineering, health and biomedical innovation, scientific research, education, and technology ventures.
            </p>

            <div className="flex items-center space-x-2 font-mono text-[11px] text-zinc-500 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LAB INFRASTRUCTURE // ONLINE</span>
            </div>
          </div>

          {/* Column: Multidisciplinary Domains */}
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-white mb-4">
              Domains
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('home', 'technology')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Artificial Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'featured-project')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Robotics &amp; Control
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'technology')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Computing &amp; Silicon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'technology')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Biomedical &amp; Genomics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'asmita')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Asmita Education
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Organization */}
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-white mb-4">
              Organization
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Planeriac
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('research')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Research Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Active Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'ventures')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Venture Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact &amp; Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Divisions & Governance */}
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-white mb-4">
              Education (Asmita)
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-zinc-400">
              <li>
                <span className="text-zinc-500">CA:</span> Chartered Accountancy
              </li>
              <li>
                <span className="text-zinc-500">CS:</span> Company Secretary
              </li>
              <li>
                <span className="text-zinc-500">CWA:</span> Cost &amp; Management
              </li>
              <li>
                <span className="text-zinc-500">TECH:</span> Systems &amp; Computing
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Bottom Rule */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} PLANERIAC. All rights reserved. Deep Technology &amp; Research.
          </div>

          <div className="flex items-center space-x-6">
            <span>COORDINATES: 12.9716° N, 77.5946° E</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
