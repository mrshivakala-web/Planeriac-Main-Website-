import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';

const CONVERGENCE_NODES = [
  { id: 'ai', name: 'AI', label: 'Artificial Intelligence', color: '#38bdf8' },
  { id: 'comp', name: 'Computing', label: 'Silicon Architecture', color: '#818cf8' },
  { id: 'robotics', name: 'Robotics', label: 'Embodied Actuation', color: '#34d399' },
  { id: 'bio', name: 'Biology', label: 'Computational Genomics', color: '#f472b6' },
  { id: 'human', name: 'Human Intelligence', label: 'Cognition & Education', color: '#fbbf24' },
];

export const ConvergenceSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStream, setActiveStream] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.015;
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 450);

      ctx.clearRect(0, 0, width, height);

      const targetX = width / 2;
      const targetY = height * 0.78;
      const streamCount = CONVERGENCE_NODES.length;
      const startY = height * 0.15;

      // Draw converging stream lines
      CONVERGENCE_NODES.forEach((node, idx) => {
        const startX = width * (0.12 + (idx / (streamCount - 1)) * 0.76);
        const isHovered = activeStream === node.id;

        // Control point for smooth bezier curve to center
        const cp1X = startX;
        const cp1Y = height * 0.45;
        const cp2X = targetX;
        const cp2Y = height * 0.55;

        // Stream trajectory line
        ctx.strokeStyle = isHovered ? node.color : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = isHovered ? 2.5 : 1.2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, targetX, targetY);
        ctx.stroke();

        // Flowing particles along the bezier stream
        const particleCount = 4;
        for (let p = 0; p < particleCount; p++) {
          const u = ((t * 0.4 + (p / particleCount) + (idx * 0.18)) % 1);
          // Cubic bezier formula: B(u) = (1-u)^3 P0 + 3(1-u)^2 u P1 + 3(1-u) u^2 P2 + u^3 P3
          const invU = 1 - u;
          const px =
            invU * invU * invU * startX +
            3 * invU * invU * u * cp1X +
            3 * invU * u * u * cp2X +
            u * u * u * targetX;
          const py =
            invU * invU * invU * startY +
            3 * invU * invU * u * cp1Y +
            3 * invU * u * u * cp2Y +
            u * u * u * targetY;

          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(px, py, isHovered ? 3.5 : 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Top origin node
        ctx.fillStyle = '#060709';
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(startX, startY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(startX, startY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Target PLANERIAC convergence nucleus
      ctx.fillStyle = '#060709';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Outer ripple
      const ripple = (t * 20) % 35;
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 - ripple / 35 * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 28 + ripple, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeStream]);

  return (
    <section className="py-24 sm:py-32 relative border-t border-white/5 bg-[#07080c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded border border-white/10 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cross-Disciplinary Unity</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            The next breakthrough rarely belongs to one field.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
            Breakthrough systems emerge when advanced machine perception, spatial kinematics, silicon compiler fabrics, and cellular biology converge into unified architecture.
          </p>
        </div>

        {/* Visual Convergence Stage */}
        <div className="relative bg-[#08090f] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl">
          {/* Top Node Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-4 relative z-10">
            {CONVERGENCE_NODES.map((node) => (
              <button
                key={node.id}
                onMouseEnter={() => setActiveStream(node.id)}
                onMouseLeave={() => setActiveStream(null)}
                className={`p-3 rounded-lg border text-center transition-all ${
                  activeStream === node.id
                    ? 'bg-zinc-900 border-white/30 scale-105'
                    : 'bg-zinc-950/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div
                  className="font-mono text-xs font-bold uppercase tracking-wider mb-0.5"
                  style={{ color: node.color }}
                >
                  {node.name}
                </div>
                <div className="text-[10px] text-zinc-400 truncate">{node.label}</div>
              </button>
            ))}
          </div>

          {/* Canvas Stream Flow */}
          <div className="relative w-full h-[320px] sm:h-[380px]">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Central Target Label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <div className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">
                CONVERGENT HUB
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-widest text-white uppercase mt-1">
                PLANERIAC
              </div>
            </div>
          </div>

          {/* Micro Telemetry Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 pt-4 border-t border-white/5">
            <span>MULTIDISCIPLINARY COUPLING // ACTIVE</span>
            <span>VECTOR FIELD // MONOLITHIC EQUILIBRIUM</span>
          </div>
        </div>
      </div>
    </section>
  );
};
