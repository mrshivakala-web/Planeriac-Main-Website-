import React, { useEffect, useRef, useState } from 'react';
import { Crosshair, ShieldCheck, Cpu, ArrowRight, Activity, Sliders, Layers } from 'lucide-react';

interface SurgicalRoboticsShowcaseProps {
  onViewResearch?: () => void;
}

export const SurgicalRoboticsShowcase: React.FC<SurgicalRoboticsShowcaseProps> = ({ onViewResearch }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeLabel, setActiveLabel] = useState<string>('Kinematics');
  const [armAngleOffset, setArmAngleOffset] = useState<number>(0);
  const [telemetry, setTelemetry] = useState({
    x: '142.38',
    y: '-86.12',
    z: '210.04',
    tremorFiltered: '99.4%',
    torque: '1.42 Nm',
  });

  const TECHNICAL_LABELS = [
    {
      id: 'Kinematics',
      title: 'Kinematics',
      desc: 'Analytical inverse kinematic formulation for 7-DOF redundant articulation, avoiding joint limit singularities in constrained incisions.',
      metric: '7-DOF Redundant',
    },
    {
      id: 'Motion Control',
      title: 'Motion Control',
      desc: '2,000 Hz closed-loop impedance controller with dynamic inertia compensation and predictive tremor filtration.',
      metric: '2.0 kHz Loop',
    },
    {
      id: 'Computer Vision',
      title: 'Computer Vision',
      desc: 'Real-time stereotaxic 3D reconstruction and sub-millimeter tissue deformation tracking via polarized multispectral imaging.',
      metric: '0.05 mm Resolution',
    },
    {
      id: 'Human-Machine Interface',
      title: 'Human-Machine Interface',
      desc: 'Sub-4ms glass-to-glass teleoperation latency with programmable active haptic boundaries to protect sensitive anatomical structures.',
      metric: '< 3.8 ms Latency',
    },
    {
      id: 'Precision Engineering',
      title: 'Precision Engineering',
      desc: 'Custom titanium-alloy harmonic drive transmissions with zero backlash and dual 24-bit absolute optical rotary encoders.',
      metric: '± 0.015 mm Rep.',
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const width = (canvas.width = canvas.parentElement?.clientWidth || 550);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 450);

      ctx.clearRect(0, 0, width, height);

      // Center and scale
      const cx = width * 0.45;
      const cy = height * 0.85;
      const scale = Math.min(width, height) / 480;

      // Base pedestal
      ctx.fillStyle = '#18181b';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - 50 * scale, cy, 100 * scale, 24 * scale);
      ctx.fillRect(cx - 50 * scale, cy, 100 * scale, 24 * scale);

      // Rotating base turret
      const turretWidth = 60 * scale;
      const turretHeight = 35 * scale;
      ctx.strokeRect(cx - turretWidth / 2, cy - turretHeight, turretWidth, turretHeight);
      ctx.fillStyle = '#27272a';
      ctx.fillRect(cx - turretWidth / 2, cy - turretHeight, turretWidth, turretHeight);

      // Joint 1: Shoulder
      const j1X = cx;
      const j1Y = cy - turretHeight;
      const angle1 = -Math.PI / 3 + Math.sin(t * 0.8) * 0.15 + armAngleOffset * 0.3;
      const link1Len = 140 * scale;

      const j2X = j1X + Math.cos(angle1) * link1Len;
      const j2Y = j1Y + Math.sin(angle1) * link1Len;

      // Joint 2: Elbow
      const angle2 = angle1 + Math.PI / 2.2 + Math.cos(t * 1.1) * 0.2;
      const link2Len = 120 * scale;

      const j3X = j2X + Math.cos(angle2) * link2Len;
      const j3Y = j2Y + Math.sin(angle2) * link2Len;

      // Joint 3: Wrist & End-Effector
      const angle3 = angle2 - Math.PI / 3 + Math.sin(t * 1.4) * 0.15;
      const toolLen = 60 * scale;

      const toolTipX = j3X + Math.cos(angle3) * toolLen;
      const toolTipY = j3Y + Math.sin(angle3) * toolLen;

      // Draw ghost motion range arc
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(j1X, j1Y, link1Len + link2Len + toolLen, -Math.PI * 0.8, -Math.PI * 0.1);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw structural arm link 1
      ctx.strokeStyle = '#e4e4e7';
      ctx.lineWidth = 8 * scale;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(j1X, j1Y);
      ctx.lineTo(j2X, j2Y);
      ctx.stroke();

      // Carbon fiber / titanium accent line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(j1X, j1Y);
      ctx.lineTo(j2X, j2Y);
      ctx.stroke();

      // Draw structural arm link 2
      ctx.strokeStyle = '#d4d4d8';
      ctx.lineWidth = 6 * scale;
      ctx.beginPath();
      ctx.moveTo(j2X, j2Y);
      ctx.lineTo(j3X, j3Y);
      ctx.stroke();

      // Draw micro-surgical needle / tool shaft
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.5 * scale;
      ctx.beginPath();
      ctx.moveTo(j3X, j3Y);
      ctx.lineTo(toolTipX, toolTipY);
      ctx.stroke();

      // Joint Hubs
      [
        { x: j1X, y: j1Y, r: 10 * scale, label: 'J1' },
        { x: j2X, y: j2Y, r: 8 * scale, label: 'J2' },
        { x: j3X, y: j3Y, r: 6 * scale, label: 'J3' },
      ].forEach((joint) => {
        ctx.fillStyle = '#090b10';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, joint.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, joint.r * 0.35, 0, Math.PI * 2);
        ctx.fill();
      });

      // Micro surgical incision target crosshair
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.arc(toolTipX, toolTipY, 12 * scale, 0, Math.PI * 2);
      ctx.moveTo(toolTipX - 16 * scale, toolTipY);
      ctx.lineTo(toolTipX + 16 * scale, toolTipY);
      ctx.moveTo(toolTipX, toolTipY - 16 * scale);
      ctx.lineTo(toolTipX, toolTipY + 16 * scale);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update coordinate readout occasionally
      if (Math.floor(t * 10) % 6 === 0) {
        setTelemetry({
          x: (toolTipX - cx).toFixed(2),
          y: (cy - toolTipY).toFixed(2),
          z: (210 + Math.sin(t) * 1.5).toFixed(2),
          tremorFiltered: (99.2 + Math.sin(t * 2) * 0.4).toFixed(1) + '%',
          torque: (1.35 + Math.cos(t) * 0.12).toFixed(2) + ' Nm',
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [armAngleOffset]);

  return (
    <section id="featured-project" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#060709] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Subheading */}
        <div className="flex items-center space-x-3 mb-6 font-mono text-xs text-zinc-500 uppercase tracking-widest">
          <span>FEATURED R&amp;D PROGRAM // 01</span>
          <span>•</span>
          <span className="text-cyan-400">LAB BENCH 04: PRECISION ACTUATION</span>
        </div>

        {/* Title & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-baseline">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              Surgical Robotics
            </h2>
            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
              Exploring robotic systems that can translate precise computational control into precise physical movement.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end items-center space-x-4">
            <button
              onClick={onViewResearch}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-colors"
            >
              <span>View research</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editorial Showcase Frame */}
        <div className="bg-[#090b10] border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          {/* Interactive Visual Canvas (Left Column) */}
          <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[480px] bg-[#07080c] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between p-6">
            {/* Live Telemetry Overlay */}
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-wider border-b border-white/5 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-300 font-medium">END-EFFECTOR KINEMATICS HUD</span>
              </div>
              <div>LOOP FREQ: 2,000 Hz</div>
            </div>

            {/* Canvas Articulating Arm */}
            <div className="relative w-full h-[320px] sm:h-[360px]">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* Bottom Real-time Coordinate Readout */}
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/5 font-mono text-[10px] text-zinc-400">
              <div>
                <span className="text-zinc-600 block">COORD X:</span>
                <span className="text-white font-medium">{telemetry.x} mm</span>
              </div>
              <div>
                <span className="text-zinc-600 block">COORD Y:</span>
                <span className="text-white font-medium">{telemetry.y} mm</span>
              </div>
              <div>
                <span className="text-zinc-600 block">TREMOR FILT:</span>
                <span className="text-emerald-400 font-medium">{telemetry.tremorFiltered}</span>
              </div>
              <div>
                <span className="text-zinc-600 block">TORQUE:</span>
                <span className="text-cyan-400 font-medium">{telemetry.torque}</span>
              </div>
            </div>
          </div>

          {/* Technical Specifications & Interactive Labels (Right Column) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-zinc-950/40">
            <div>
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>SYSTEM ARCHITECTURE ARCHETYPE</span>
                <span className="text-cyan-400">R&amp;D STAGE: PRE-CLINICAL</span>
              </div>

              {/* Technical Labels Selector */}
              <div className="space-y-3 mb-6">
                {TECHNICAL_LABELS.map((item) => {
                  const isSelected = activeLabel === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveLabel(item.id)}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-zinc-900/90 border-cyan-500/50 shadow-sm'
                          : 'bg-zinc-900/30 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                            isSelected ? 'text-cyan-400' : 'text-zinc-300'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
                          {item.metric}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verification Metadata Box */}
            <div className="p-4 rounded-lg bg-zinc-900/60 border border-white/5 text-xs text-zinc-400 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>SAFETY ENVELOPE:</span>
                <span className="text-zinc-200">ISO 13485 / IEC 60601</span>
              </div>
              <div className="flex justify-between">
                <span>BENCHMARK DATASET:</span>
                <span className="text-zinc-200">Sub-Micron Laser Tracker</span>
              </div>
              <div className="flex justify-between">
                <span>FEEDBACK CHANNELS:</span>
                <span className="text-zinc-200">Bilateral Tactile + Optical</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
