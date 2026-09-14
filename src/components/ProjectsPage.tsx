import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { ProjectItem, ProjectStatus } from '../types';
import { Layers, ArrowLeft, ArrowUpRight, Cpu, CheckCircle2, SlidersHorizontal } from 'lucide-react';

interface ProjectsPageProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
}

const STATUS_STYLES: Record<ProjectStatus, { text: string; bg: string; border: string }> = {
  Research: { text: 'text-purple-300', bg: 'bg-purple-950/40', border: 'border-purple-800/40' },
  Prototype: { text: 'text-amber-300', bg: 'bg-amber-950/40', border: 'border-amber-800/40' },
  Development: { text: 'text-cyan-300', bg: 'bg-cyan-950/40', border: 'border-cyan-800/40' },
  Product: { text: 'text-emerald-300', bg: 'bg-emerald-950/40', border: 'border-emerald-800/40' },
};

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBackToHome, onNavigateToContact }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const statuses: ('All' | ProjectStatus)[] = ['All', 'Research', 'Prototype', 'Development', 'Product'];
  const categories = ['All', 'Robotics & Health', 'Artificial Intelligence', 'Computing & Hardware', 'Biomedical & Genomics', 'Robotics', 'Education Technology'];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchStatus = selectedStatus === 'All' || proj.status === selectedStatus;
    const matchCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    return matchStatus && matchCategory;
  });

  return (
    <div className="pt-24 pb-32 bg-[#050608] min-h-screen text-zinc-100 tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Overview</span>
        </button>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded border border-white/10 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Active Engineering Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
            Projects &amp; Systems
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
            Translating research into working prototypes, high-performance computing hardware, and industrial-grade software engines.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-[#080a10] border border-white/10 rounded-xl p-4 sm:p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mr-2 shrink-0">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider whitespace-nowrap border transition-all ${
                  selectedStatus === st
                    ? 'bg-white text-black font-semibold border-white'
                    : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/20'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider shrink-0">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-cyan-400"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, idx) => {
            const style = STATUS_STYLES[project.status];

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="bg-[#08090e] border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all group"
              >
                <div>
                  {/* Top Bar: Category & Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-zinc-400 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                      {project.category}
                    </span>
                    <span
                      className={`font-mono text-xs px-2.5 py-0.5 rounded border uppercase tracking-wider ${style.text} ${style.bg} ${style.border}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Project Name & One-Liner */}
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-sm font-mono text-zinc-400 mb-4">
                    {project.oneLiner}
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technical Specifications */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 bg-zinc-950/80 rounded-lg border border-white/5 mb-6">
                    {project.specs.map((spec, sIdx) => (
                      <div key={sIdx}>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">{spec.label}</div>
                        <div className="text-xs font-mono font-medium text-white">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack Pills */}
                <div className="pt-4 border-t border-white/5">
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-2">
                    Technology Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologyStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-[11px] font-mono text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inquire CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Interested in technical evaluation or licensing our systems?
            </h3>
            <p className="text-sm text-zinc-400">
              We collaborate with research institutions, clinical systems, and specialized hardware manufacturers.
            </p>
          </div>
          <button
            onClick={onNavigateToContact}
            className="shrink-0 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Initiate Collaboration →
          </button>
        </div>
      </div>
    </div>
  );
};
