import React from 'react';

export const PhilosophySection: React.FC = () => {
  return (
    <section className="py-28 sm:py-40 relative border-t border-white/5 bg-[#050608] overflow-hidden">
      {/* Subtle radial ambient center background */}
      <div className="absolute inset-0 bg-radial from-cyan-950/10 via-transparent to-transparent pointer-events-none" />

      {/* Fine technical grid lines */}
      <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Subtle Section Marker */}
        <div className="inline-block font-mono text-[11px] text-zinc-500 uppercase tracking-widest px-3 py-1 rounded border border-white/5 bg-white/[0.02] mb-10">
          Core Operating Creed
        </div>

        {/* Large Powerful Typography */}
        <div className="space-y-4 mb-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.1]">
            Curiosity creates the question.
          </h2>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-cyan-400/90 leading-[1.1]">
            Engineering creates the answer.
          </h2>
        </div>

        {/* Subordinate Philosophy Statement */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
          Planeriac believes meaningful technological progress happens when scientific curiosity and engineering discipline work together.
        </p>

        {/* Scientific Precision Decorator Lines */}
        <div className="mt-16 flex items-center justify-center space-x-6 text-zinc-600 font-mono text-xs">
          <div className="w-12 h-px bg-zinc-800" />
          <span className="tracking-widest uppercase text-zinc-500 text-[10px]">
            SYNTHESIS // THEORY &amp; FABRICATION
          </span>
          <div className="w-12 h-px bg-zinc-800" />
        </div>
      </div>
    </section>
  );
};
