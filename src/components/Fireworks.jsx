import React, { useEffect, useRef } from 'react';

export default function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateSize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    updateSize();

    let particles = [];
    let animationId;

    const colors = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#f59e0b', '#fb7185'];

    class Particle {
      constructor(x, y, vx, vy, color, size, decay) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.alpha = 1;
        this.decay = decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.03; // gravity
        this.alpha -= this.decay;
      }
    }

    const createBurst = (x, y, isHeart) => {
      const particleCount = isHeart ? 40 : 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 2 + 1.5;

      for (let i = 0; i < particleCount; i++) {
        let vx, vy;
        if (isHeart) {
          const t = (Math.PI * 2 / particleCount) * i;
          const scale = Math.random() * 0.8 + 1.8;
          vx = scale * (16 * Math.pow(Math.sin(t), 3)) / 10;
          vy = -scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) / 10;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 1;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
        }

        particles.push(new Particle(x, y, vx, vy, color, size, Math.random() * 0.015 + 0.01));
      }
    };

    let frameCount = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (frameCount % 25 === 0) {
        const x = Math.random() * (canvas.width - 80) + 40;
        const y = Math.random() * (canvas.height * 0.5) + 50;
        const isHeart = Math.random() > 0.3; // 70% chance for heart shape
        createBurst(x, y, isHeart);
      }

      particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) {
          particles.splice(index, 1);
        }
      });

      frameCount++;
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}