import React, { useEffect, useRef, useState } from 'react';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          width = canvas.width = Math.floor(w * window.devicePixelRatio);
          height = canvas.height = Math.floor(h * window.devicePixelRatio);
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let t = 0;
    // Current smoothed mouse offset
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    // Neural nodes
    const neuralNodes = Array.from({ length: 22 }, (_, i) => ({
      angle: (i / 22) * Math.PI * 2,
      dist: 90 + ((i * 37) % 110),
      speed: 0.002 * ((i % 2 === 0 ? 1 : -1) * (1 + (i % 3) * 0.2)),
      size: 2 + (i % 3) * 0.8,
    }));

    const render = () => {
      t += 0.008;
      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + curX * 25;
      const cy = height / 2 + curY * 25;
      const scale = Math.min(width, height) / 640;

      // 1. Fine Technical Radar / Calibration Rings
      ctx.lineWidth = 1;
      [140, 220, 310].forEach((r, idx) => {
        ctx.strokeStyle = idx === 1 ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.035)';
        ctx.beginPath();
        ctx.arc(cx, cy, r * scale, 0, Math.PI * 2);
        ctx.stroke();

        // Technical degree ticks
        const ticks = idx === 1 ? 36 : 18;
        for (let i = 0; i < ticks; i++) {
          const a = (i / ticks) * Math.PI * 2 + (idx % 2 === 0 ? t * 0.1 : -t * 0.07);
          const innerR = (r - (i % 4 === 0 ? 8 : 4)) * scale;
          const outerR = r * scale;
          ctx.strokeStyle = i % 4 === 0 ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.08)';
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * innerR, cy + Math.sin(a) * innerR);
          ctx.lineTo(cx + Math.cos(a) * outerR, cy + Math.sin(a) * outerR);
          ctx.stroke();
        }
      });

      // 2. Semiconductor Silicon Architecture (Orthogonal bus tracks & logic nodes)
      const busRadius = 180 * scale;
      const busLines = 8;
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.18)';
      ctx.lineWidth = 1;

      for (let i = 0; i < busLines; i++) {
        const angle = (i / busLines) * Math.PI * 2 + t * 0.05;
        const x1 = cx + Math.cos(angle) * (60 * scale);
        const y1 = cy + Math.sin(angle) * (60 * scale);
        // Orthogonal corner
        const cornerDist = (120 + (i % 3) * 25) * scale;
        const x2 = cx + Math.cos(angle) * cornerDist;
        const y2 = cy + Math.sin(angle) * (cornerDist * 0.8);
        const x3 = cx + Math.cos(angle) * busRadius;
        const y3 = cy + Math.sin(angle) * busRadius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();

        // Silicon logic contact pads
        ctx.fillStyle = 'rgba(129, 140, 248, 0.35)';
        ctx.fillRect(x2 - 2, y2 - 2, 4, 4);

        // Moving data packet
        const packetProgress = (t * 0.8 + i * 0.3) % 1;
        const px = x1 + (x3 - x1) * packetProgress;
        const py = y1 + (y3 - y1) * packetProgress;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Robotic Mechanisms: Articulated Kinematic Linkages & Joint Crosshairs
      const armLength1 = 110 * scale;
      const armLength2 = 90 * scale;
      const baseArmAngle = t * 0.4 + curX * 0.5;
      const elbowAngle = baseArmAngle + Math.sin(t * 0.8) * 0.8 + Math.PI / 4;
      const j1X = cx + Math.cos(baseArmAngle) * armLength1;
      const j1Y = cy + Math.sin(baseArmAngle) * armLength1;
      const j2X = j1X + Math.cos(elbowAngle) * armLength2;
      const j2Y = j1Y + Math.sin(elbowAngle) * armLength2;

      // Primary linkage
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.45)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(j1X, j1Y);
      ctx.lineTo(j2X, j2Y);
      ctx.stroke();

      // Joint gimbal rings
      [
        { x: cx, y: cy, r: 12 * scale },
        { x: j1X, y: j1Y, r: 8 * scale },
        { x: j2X, y: j2Y, r: 6 * scale },
      ].forEach((joint) => {
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, joint.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#090b10';
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, joint.r * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Kinematic trajectory ghost arc
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.15)';
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, armLength1 + armLength2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. Biological Double Helix & Macromolecular Resonance
      const helixRadius = 150 * scale;
      const helixSteps = 28;
      for (let i = 0; i < helixSteps; i++) {
        const prog = i / helixSteps;
        const theta = prog * Math.PI * 2 + t * 0.7;
        const strandDist = (helixRadius - 30 * scale) + Math.sin(prog * Math.PI * 4 + t) * (20 * scale);

        const hx1 = cx + Math.cos(theta) * strandDist;
        const hy1 = cy + Math.sin(theta) * strandDist;
        const hx2 = cx + Math.cos(theta + Math.PI) * (strandDist * 0.85);
        const hy2 = cy + Math.sin(theta + Math.PI) * (strandDist * 0.85);

        // Base-pair ladder rung
        if (i % 3 === 0) {
          ctx.strokeStyle = 'rgba(244, 114, 182, 0.18)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(hx1, hy1);
          ctx.lineTo(hx2, hy2);
          ctx.stroke();
        }

        ctx.fillStyle = 'rgba(244, 114, 182, 0.6)';
        ctx.beginPath();
        ctx.arc(hx1, hy1, 1.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.beginPath();
        ctx.arc(hx2, hy2, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. AI Neural Network Nodes & Interconnecting Synapses
      const calculatedNodes = neuralNodes.map((node) => {
        node.angle += node.speed;
        const r = node.dist * scale;
        return {
          x: cx + Math.cos(node.angle) * r,
          y: cy + Math.sin(node.angle) * r,
          size: node.size * scale,
        };
      });

      // Neural edges
      for (let i = 0; i < calculatedNodes.length; i++) {
        for (let j = i + 1; j < calculatedNodes.length; j++) {
          const dx = calculatedNodes[i].x - calculatedNodes[j].x;
          const dy = calculatedNodes[i].y - calculatedNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 * scale) {
            const alpha = (1 - dist / (100 * scale)) * 0.25;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(calculatedNodes[i].x, calculatedNodes[i].y);
            ctx.lineTo(calculatedNodes[j].x, calculatedNodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Render neural nodes
      calculatedNodes.forEach((node) => {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 1.8, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 6. Central Convergence Nexus (Core Mathematical Kernel)
      ctx.fillStyle = '#060709';
      ctx.beginPath();
      ctx.arc(cx, cy, 34 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 34 * scale, 0, Math.PI * 2);
      ctx.stroke();

      // Precision crosshair at dead center
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 10 * scale, cy);
      ctx.lineTo(cx + 10 * scale, cy);
      ctx.moveTo(cx, cy - 10 * scale);
      ctx.lineTo(cx, cy + 10 * scale);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x;
      targetY = y;
      setMousePos({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[620px] flex items-center justify-center select-none"
    >
      {/* Background ambient radial shadow */}
      <div className="absolute inset-0 bg-radial from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Real-time high-fidelity canvas simulation */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

      {/* Precision Engineering Telemetry Overlays */}
      <div className="absolute top-4 left-4 font-mono text-[10px] tracking-wider text-zinc-500 uppercase pointer-events-none space-y-1">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-zinc-400">SYS.NEXUS // ONLINE</span>
        </div>
        <div>LATENCY: 1.2ms [DETERMINISTIC]</div>
        <div>TOPOLOGY: 5-DOMAIN CONVERGENCE</div>
      </div>

      <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wider text-zinc-500 uppercase pointer-events-none hidden sm:block">
        <div className="text-zinc-400">KINEMATICS // INVERSE_SOLVE = TRUE</div>
        <div>PRECISION TOLERANCE: ± 0.015mm</div>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-wider text-zinc-500 uppercase pointer-events-none text-right hidden sm:block">
        <div className="text-zinc-400">GRID CALIBRATION: 2026.Q3</div>
        <div>
          CURSOR: [{mousePos.x}, {mousePos.y}]
        </div>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-wider text-zinc-500 uppercase pointer-events-none text-right">
        <div className="text-zinc-400">PLANERIAC R&amp;D ENGINE</div>
        <div className="text-cyan-400/80">CORE MATRIX v4.2</div>
      </div>

      {/* Subtle corner reticle brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-700 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-700 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-700 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-700 pointer-events-none" />
    </div>
  );
};
