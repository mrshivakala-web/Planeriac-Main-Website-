import React, { useEffect, useRef } from 'react';

interface InteractiveMiniSimProps {
  type: 'ai' | 'robotics' | 'computing' | 'health' | 'education';
  active?: boolean;
  className?: string;
}

export const InteractiveMiniSim: React.FC<InteractiveMiniSimProps> = ({ type, active = false, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += active ? 0.04 : 0.015;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (type === 'ai') {
        // Neural network node array & dynamic pulse activations
        const layers = [3, 4, 4, 2];
        const layerX = [width * 0.18, width * 0.38, width * 0.62, width * 0.82];
        const nodes: { x: number; y: number; layer: number }[] = [];

        layers.forEach((count, lIdx) => {
          const spacing = height / (count + 1);
          for (let i = 0; i < count; i++) {
            nodes.push({
              x: layerX[lIdx],
              y: spacing * (i + 1),
              layer: lIdx,
            });
          }
        });

        // Draw synapses
        nodes.forEach((n1) => {
          nodes.forEach((n2) => {
            if (n2.layer === n1.layer + 1) {
              const pulse = Math.sin(t * 2 + n1.y * 0.1 + n2.y * 0.05);
              const alpha = active ? 0.25 + 0.2 * pulse : 0.1 + 0.08 * pulse;
              ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0.05, alpha)})`;
              ctx.lineWidth = active ? 1.2 : 0.8;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          });
        });

        // Draw nodes
        nodes.forEach((n, idx) => {
          const pulse = (Math.sin(t * 3 + idx) + 1) / 2;
          ctx.fillStyle = active ? `rgba(56, 189, 248, ${0.4 + 0.5 * pulse})` : 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, active ? 3.5 : 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = active ? 'rgba(56, 189, 248, 0.9)' : 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      } else if (type === 'robotics') {
        // Robotic arm kinematics visualization (base, joint 1, joint 2, end-effector)
        const baseX = width * 0.25;
        const baseY = height * 0.75;

        // Kinematic angles
        const theta1 = -Math.PI / 4 + Math.sin(t) * 0.35;
        const len1 = height * 0.35;
        const j1X = baseX + Math.cos(theta1) * len1;
        const j1Y = baseY + Math.sin(theta1) * len1;

        const theta2 = theta1 + Math.PI / 3 + Math.cos(t * 1.2) * 0.4;
        const len2 = height * 0.3;
        const j2X = j1X + Math.cos(theta2) * len2;
        const j2Y = j1Y + Math.sin(theta2) * len2;

        const theta3 = theta2 - Math.PI / 6 + Math.sin(t * 0.8) * 0.2;
        const len3 = height * 0.15;
        const toolX = j2X + Math.cos(theta3) * len3;
        const toolY = j2Y + Math.sin(theta3) * len3;

        // Base plate
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(baseX - 25, baseY + 6);
        ctx.lineTo(baseX + 25, baseY + 6);
        ctx.stroke();

        // Arm segments
        ctx.strokeStyle = active ? '#34d399' : 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = active ? 2.5 : 1.8;
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.lineTo(j1X, j1Y);
        ctx.lineTo(j2X, j2Y);
        ctx.lineTo(toolX, toolY);
        ctx.stroke();

        // Joint hubs
        [
          [baseX, baseY],
          [j1X, j1Y],
          [j2X, j2Y],
        ].forEach(([x, y]) => {
          ctx.fillStyle = '#090a0f';
          ctx.strokeStyle = active ? '#34d399' : 'rgba(255, 255, 255, 0.7)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });

        // End-effector target indicator
        ctx.strokeStyle = active ? '#38bdf8' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.arc(toolX, toolY, 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (type === 'computing') {
        // Semiconductor circuit traces and silicon bus grid
        const cols = 5;
        const rows = 4;
        const stepX = width / (cols + 1);
        const stepY = height / (rows + 1);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;

        // Grid lines
        for (let i = 1; i <= cols; i++) {
          ctx.beginPath();
          ctx.moveTo(stepX * i, height * 0.15);
          ctx.lineTo(stepX * i, height * 0.85);
          ctx.stroke();
        }
        for (let j = 1; j <= rows; j++) {
          ctx.beginPath();
          ctx.moveTo(width * 0.15, stepY * j);
          ctx.lineTo(width * 0.85, stepY * j);
          ctx.stroke();
        }

        // Logic core center block
        const cx = width / 2;
        const cy = height / 2;
        ctx.fillStyle = 'rgba(129, 140, 248, 0.1)';
        ctx.strokeStyle = active ? '#818cf8' : 'rgba(129, 140, 248, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 24, cy - 20, 48, 40);
        ctx.fillRect(cx - 24, cy - 20, 48, 40);

        // Signal packets moving along circuit traces
        const packetOffset = (t * 40) % (width * 0.7);
        ctx.fillStyle = active ? '#818cf8' : 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(width * 0.15 + packetOffset, stepY * 2 - 2, 6, 4);
        ctx.fillRect(stepX * 3 - 2, height * 0.15 + (packetOffset % (height * 0.7)), 4, 6);
      } else if (type === 'health') {
        // Biological double helix & molecular node lattice
        const points = 16;
        const step = (width * 0.7) / points;
        const startX = width * 0.15;
        const midY = height * 0.5;

        for (let i = 0; i < points; i++) {
          const x = startX + i * step;
          const phase = i * 0.45 + t * 1.5;
          const y1 = midY + Math.sin(phase) * (height * 0.28);
          const y2 = midY - Math.sin(phase) * (height * 0.28);

          // Rung line between strands
          if (i % 2 === 0) {
            ctx.strokeStyle = active ? 'rgba(244, 114, 182, 0.35)' : 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.stroke();
          }

          // Strand 1 node
          ctx.fillStyle = active ? '#f472b6' : 'rgba(255, 255, 255, 0.7)';
          ctx.beginPath();
          ctx.arc(x, y1, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Strand 2 node
          ctx.fillStyle = active ? '#38bdf8' : 'rgba(255, 255, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(x, y2, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === 'education') {
        // Knowledge graph / concept clustering nodes
        const cx = width / 2;
        const cy = height / 2;
        const orbitalCount = 5;

        for (let i = 0; i < orbitalCount; i++) {
          const angle = (i * (Math.PI * 2)) / orbitalCount + t * 0.5;
          const dist = height * 0.32;
          const ox = cx + Math.cos(angle) * dist;
          const oy = cy + Math.sin(angle) * dist;

          // Branch to center
          ctx.strokeStyle = active ? 'rgba(251, 191, 36, 0.35)' : 'rgba(255, 255, 255, 0.12)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ox, oy);
          ctx.stroke();

          // Orbital node
          ctx.fillStyle = active ? '#fbbf24' : 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(ox, oy, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Central hub
        ctx.fillStyle = active ? '#fbbf24' : 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, active]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-md bg-[#090b10] border border-white/5 ${className}`}>
      <canvas ref={canvasRef} width={220} height={120} className="w-full h-full object-contain" />
    </div>
  );
};
