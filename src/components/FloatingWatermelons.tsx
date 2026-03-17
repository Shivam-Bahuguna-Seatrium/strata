'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Watermelon {
  x: number;
  y: number;
  size: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleAmount: number;
  rotation: number;
  rotationSpeed: number;
}

export default function FloatingWatermelons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const watermelonsRef = useRef<Watermelon[]>([]);
  const animFrameRef = useRef<number>(0);

  const initWatermelons = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / 120000);
    watermelonsRef.current = Array.from({ length: Math.min(count, 8) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height,
      size: Math.random() * 25 + 15,
      speed: Math.random() * 0.15 + 0.05,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.008 + 0.003,
      wobbleAmount: Math.random() * 40 + 20,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.01 + 0.002,
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
      if (watermelonsRef.current.length === 0) {
        initWatermelons(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const drawWatermelon = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Main body - red/pink hemisphere (top)
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.8, 0, 0, Math.PI);
      ctx.fillStyle = 'rgba(220, 20, 60, 0.85)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(180, 10, 40, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Green rind (bottom)
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.8, 0, Math.PI, Math.PI * 2);
      ctx.fillStyle = 'rgba(34, 139, 34, 0.85)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(20, 100, 20, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Seeds - black dots on red part
      ctx.fillStyle = 'rgba(20, 20, 20, 0.8)';
      const seedPositions = [
        [-size * 0.3, -size * 0.2],
        [size * 0.3, -size * 0.25],
        [0, -size * 0.05],
        [-size * 0.15, -size * 0.4],
        [size * 0.2, -size * 0.35],
      ];
      seedPositions.forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.arc(sx, sy, size * 0.08, 0, Math.PI * 2);
        ctx.fill();
      });

      // Highlight shine
      ctx.beginPath();
      ctx.ellipse(-size * 0.3, -size * 0.3, size * 0.35, size * 0.25, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      watermelonsRef.current.forEach((w) => {
        w.y -= w.speed;
        w.wobble += w.wobbleSpeed;
        w.rotation += w.rotationSpeed;
        const wx = Math.sin(w.wobble) * w.wobbleAmount;

        if (w.y < -w.size * 2) {
          w.y = canvas.height + w.size;
          w.x = Math.random() * canvas.width;
        }

        drawWatermelon(w.x + wx, w.y, w.size, w.rotation);
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initWatermelons]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.4 }}
    />
  );
}
