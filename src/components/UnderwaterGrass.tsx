'use client';

import { useEffect, useRef, useCallback } from 'react';

interface GrassStrand {
  x: number;
  baseY: number;
  height: number;
  width: number;
  wave: number;
  waveSpeed: number;
  waveAmount: number;
  color: string;
  opacity: number;
}

export default function UnderwaterGrass() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grassRef = useRef<GrassStrand[]>([]);
  const animFrameRef = useRef<number>(0);

  const colors = [
    'rgba(34, 139, 34, 0.7)',     // Dark green
    'rgba(50, 160, 50, 0.65)',    // Medium green
    'rgba(60, 180, 60, 0.6)',     // Bright green
    'rgba(76, 191, 76, 0.65)',    // Lime green
    'rgba(30, 130, 76, 0.7)',     // Teal green
  ];

  const initGrass = useCallback((width: number, height: number) => {
    const count = Math.floor(width / 45);
    grassRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      baseY: height * 0.75,
      height: Math.random() * 100 + 80,
      width: Math.random() * 4 + 2,
      wave: Math.random() * Math.PI * 2,
      waveSpeed: Math.random() * 0.008 + 0.003,
      waveAmount: Math.random() * 20 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.3 + 0.4,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (grassRef.current.length === 0) {
        initGrass(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const drawGrassStrand = (x: number, baseY: number, height: number, width: number, wave: number, waveAmount: number, color: string) => {
      ctx.beginPath();
      ctx.moveTo(x, baseY);

      const points = 30;
      for (let i = 0; i <= points; i++) {
        const progress = i / points;
        const waveOffset = Math.sin(wave + i * 0.15) * waveAmount;
        const y = baseY - height * progress;
        const bendX = x + waveOffset * (1 - progress * 0.5);
        
        if (i === 0) {
          ctx.moveTo(bendX, y);
        } else {
          ctx.quadraticCurveTo(
            x + Math.sin(wave + (i - 1) * 0.15) * waveAmount * (1 - (i - 1) / points * 0.5),
            baseY - height * ((i - 1) / points),
            bendX,
            y
          );
        }
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Add subtle highlight on left side
      ctx.beginPath();
      ctx.moveTo(x - width * 0.3, baseY);
      for (let i = 0; i <= points; i++) {
        const progress = i / points;
        const waveOffset = Math.sin(wave + i * 0.15) * waveAmount;
        const y = baseY - height * progress;
        const bendX = x - width * 0.3 + waveOffset * (1 - progress * 0.5);
        
        if (i === 0) {
          ctx.moveTo(bendX, y);
        } else {
          ctx.quadraticCurveTo(
            x - width * 0.3 + Math.sin(wave + (i - 1) * 0.15) * waveAmount * (1 - (i - 1) / points * 0.5),
            baseY - height * ((i - 1) / points),
            bendX,
            y
          );
        }
      }
      ctx.strokeStyle = color.replace('0.7', '0.2').replace('0.65', '0.15').replace('0.6', '0.1').replace('0.4', '0.15');
      ctx.lineWidth = width * 0.4;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      grassRef.current.forEach((g) => {
        g.wave += g.waveSpeed;
        drawGrassStrand(g.x, g.baseY, g.height, g.width, g.wave, g.waveAmount, g.color);
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initGrass]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.55 }}
    />
  );
}
