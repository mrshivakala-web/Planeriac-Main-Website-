import React from 'react';
import { COMPANY_VALUES } from '../data';
import { Target, Compass, Sparkles, ArrowLeft, ShieldCheck, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onNavigateToContact }) => {
  return (
    <div className="pt-24 pb-32 bg-[#050608] min-h-screen text-zinc-100 tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Overview</span>
        </button>

        {/* Page Header */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded border border-white/10 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Institutional Profile</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            A technology company built around curiosity.
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed mb-6">
            Planeriac operates as a deep-technology and research organization positioned between an advanced engineering laboratory, a foundational science institute, and a technology venture studio.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed">
            We reject the conventional separation of intelligence, computing, mechanics, and biology. The most consequential challenges of our era — from autonomous micro-surgery to zero-energy heterogeneous processors — reside precisely at the interfaces between these traditionally siloed disciplines.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Mission Card */}
          <div className="bg-[#080a10] border border-white/10 rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
              PRIMARY MANDATE
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-zinc-300 text-base leading-relaxed">
              To research, engineer and build technologies that expand what people and machines can do.
            </p>
            <div className="mt-8 pt-6 border-t border-white/5 font-mono text-xs text-zinc-500">
              MANDATE COORD // 01-FOUNDATIONAL
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-[#080a10] border border-white/10 rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
              LONG-RANGE HORIZON
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-zinc-300 text-base leading-relaxed">
              A future where intelligence, computation, machines and biology work together to solve problems once considered impossible.
            </p>
            <div className="mt-8 pt-6 border-t border-white/5 font-mono text-xs text-zinc-500">
              HORIZON VECTOR // MULTIDISCIPLINARY
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12">
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-2">
              GOVERNING PRINCIPLES
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Our Values</h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              The internal scientific ethos that governs our engineering decisions, laboratory methodology, and talent development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="p-6 rounded-xl bg-[#090b10] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-zinc-500">VALUE // 0{idx + 1}</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400/80" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{val.title}</h3>
                  <div className="font-mono text-xs text-cyan-400/90 uppercase tracking-wide mb-3">
                    {val.subtitle}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multidisciplinary Philosophy Detail */}
        <div className="p-8 sm:p-12 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">
              Engineering without artificial domain boundaries.
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              We operate research labs, precision prototyping suites, and venture incubation pipelines under one coordinated scientific leadership.
            </p>
          </div>
          <button
            onClick={onNavigateToContact}
            className="shrink-0 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Start a Conversation →
          </button>
        </div>
      </div>
    </div>
  );
};
