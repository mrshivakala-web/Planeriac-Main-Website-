import React, { useState } from 'react';
import { RESEARCH_TOPICS } from '../data';
import { ResearchTopic } from '../types';
import { FlaskConical, Search, ArrowLeft, ArrowUpRight, CheckCircle, Clock, Shield } from 'lucide-react';

interface ResearchPageProps {
  onBackToHome: () => void;
  onSelectTopic?: (topic: ResearchTopic) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onBackToHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const categories = ['All', 'Intelligence', 'Robotics', 'Medical Robotics', 'Computing', 'Semiconductors', 'Health & Biology', 'Interaction'];

  const filteredTopics = RESEARCH_TOPICS.filter((topic) => {
    const matchesCategory = activeCategory === 'All' || topic.category === activeCategory;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.relatedTechnologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
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
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            <span>Advanced Research Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
            Research Portfolio
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
            A comprehensive index of Planeriac's active theoretical investigations, experimental laboratory programs, and pre-clinical development tracks.
          </p>
        </div>

        {/* Laboratory Status Bar */}
        <div className="p-4 rounded-xl bg-[#080a10] border border-white/10 flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs">
          <div className="flex items-center space-x-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">9 ACTIVE RESEARCH INQUISITIONS</span>
          </div>
          <div className="text-zinc-500 hidden sm:block">LAB SUITES: ALPHA THROUGH DELTA + BIO-CORE</div>
          <div className="text-cyan-400">OPEN PROTOCOL REVIEW</div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics or technologies..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/80 border border-white/10 rounded-lg text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider whitespace-nowrap border transition-all ${
                  activeCategory === cat
                    ? 'bg-white/15 text-white border-white/30'
                    : 'bg-zinc-950 text-zinc-500 border-white/5 hover:text-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Research Topics List / Cards */}
        <div className="space-y-6">
          {filteredTopics.map((topic, idx) => {
            const isExpanded = expandedTopicId === topic.id;

            return (
              <div
                key={topic.id}
                id={`research-item-${topic.id}`}
                className="bg-[#08090f] border border-white/10 rounded-xl p-6 sm:p-8 transition-all hover:border-white/20"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs text-zinc-500">
                      PROGRAM // 0{idx + 1}
                    </span>
                    <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                      {topic.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="text-zinc-500">STATUS:</span>
                    <span className="text-emerald-400 font-semibold">{topic.currentStatus}</span>
                  </div>
                </div>

                {/* Title & Short Description */}
                <h2 className="text-2xl font-bold text-white mb-2">{topic.title}</h2>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                  {topic.description}
                </p>

                {/* Research Questions Section */}
                <div className="mb-6 p-4 rounded-lg bg-zinc-950/80 border border-white/5">
                  <div className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    Primary Research Questions:
                  </div>
                  <ul className="space-y-2">
                    {topic.researchQuestions.map((q, qIdx) => (
                      <li key={qIdx} className="flex items-start space-x-2 text-sm text-zinc-300">
                        <span className="font-mono text-cyan-400 text-xs mt-0.5">Q0{qIdx + 1}:</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Technologies & Metadata */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1.5">
                      Related Technologies:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {topic.relatedTechnologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-xs text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="font-mono text-xs text-zinc-500 sm:text-right">
                    <div>FACILITY: {topic.facility}</div>
                    <div className="text-zinc-400 mt-0.5">{topic.investigationLead}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredTopics.length === 0 && (
            <div className="text-center py-16 bg-[#08090f] rounded-xl border border-white/10">
              <p className="text-zinc-400 text-sm">No research programs matching current criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
