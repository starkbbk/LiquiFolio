import React, { useEffect, useRef } from 'react';

const ElementalCanvas = ({ theme, isActive, flipComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set to match parent exactly
    let width = canvas.parentElement.offsetWidth;
    let height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width;
        canvas.height = height;
      }
    });
    resizeObserver.observe(canvas.parentElement);

    let animationFrameId;
    let particles = [];
    let sparkles = [];
    let time = 0;

    // --- SPARKLE BURST (Fired once when flip completes) ---
    if (flipComplete) {
      const colors = {
        'lightning': ['#00ffff', '#ffffff', '#7b2fff'],
        'fire': ['#ff4500', '#ff8c00', '#ffd700'],
        'water': ['#00bfff', '#1e90ff', '#87ceeb'],
        'wind': ['#e0e0e0', '#b0c4de', '#ffffff']
      }[theme] || ['#ffffff'];

      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 3;
        sparkles.push({
          x: width / 2,
          y: height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1.0,
          decay: Math.random() * 0.02 + 0.02,
          size: Math.random() * 3 + 1
        });
      }
    }

    // --- THEMING INITIALIZATION ---
    if (theme === 'lightning') {
      // Sparks running edge
      for(let i=0; i<5; i++) {
        particles.push({
          pos: Math.random() * (width*2 + height*2),
          speed: Math.random() * 5 + 3,
          history: []
        });
      }
    } else if (theme === 'fire') {
      // Embers
      for(let i=0; i<30; i++) {
        particles.push({
          x: Math.random() * width,
          y: height + Math.random() * 20,
          vx: (Math.random() - 0.5) * 1,
          vy: -(Math.random() * 2 + 1),
          size: Math.random() * 3 + 1,
          life: Math.random()
        });
      }
    } else if (theme === 'water') {
      // Droplets and bubbles
      for(let i=0; i<15; i++) {
        particles.push({
          type: 'droplet',
          x: Math.random() > 0.5 ? 2 : width - 2, // run down sides
          y: Math.random() * height,
          vy: Math.random() * 2 + 1,
          size: Math.random() * 2 + 1
        });
      }
      for(let i=0; i<20; i++) {
        particles.push({
          type: 'bubble',
          x: Math.random() * width,
          y: height + Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(Math.random() * 1 + 0.5),
          size: Math.random() * 4 + 2
        });
      }
    } else if (theme === 'wind') {
      // Wisps
      for(let i=0; i<25; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.random() * 3 + 1,
          vy: (Math.random() - 0.5) * 2,
          life: Math.random(),
          history: []
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time++;

      // Max opacity 0.7 for readability
      ctx.globalAlpha = 0.7; 

      // --- RENDER SPARKLES ---
      for (let i = sparkles.length - 1; i >= 0; i--) {
        let s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        if (s.life <= 0) {
          sparkles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.life;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color;
      }
      ctx.globalAlpha = 0.7; // reset
      ctx.shadowBlur = 0;

      // --- RENDER LIGHTNING ---
      if (theme === 'lightning') {
        const perimeter = width * 2 + height * 2;
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#7b2fff';

        particles.forEach(p => {
          p.pos += p.speed;
          if (p.pos > perimeter) p.pos = 0;
          
          // Map pos to actual x,y on rectangle border
          let px, py;
          if (p.pos < width) { px = p.pos; py = 2; }
          else if (p.pos < width + height) { px = width - 2; py = p.pos - width; }
          else if (p.pos < width * 2 + height) { px = width - (p.pos - width - height); py = height - 2; }
          else { px = 2; py = height - (p.pos - width * 2 - height); }

          // Jitter
          px += (Math.random() - 0.5) * 6;
          py += (Math.random() - 0.5) * 6;

          p.history.push({x: px, y: py});
          if (p.history.length > 10) p.history.shift();

          if (p.history.length > 1) {
            ctx.beginPath();
            ctx.moveTo(p.history[0].x, p.history[0].y);
            for(let i=1; i<p.history.length; i++) {
              ctx.lineTo(p.history[i].x, p.history[i].y);
            }
            ctx.stroke();
          }
        });

        // Occasional flash
        if (Math.random() < 0.02) {
          ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
          ctx.fillRect(0, 0, width, height);
        }
      }

      // --- RENDER FIRE ---
      if (theme === 'fire') {
        particles.forEach((p, i) => {
          p.x += p.vx + Math.sin(time * 0.05 + i) * 0.5;
          p.y += p.vy;
          p.life -= 0.01;

          if (p.life <= 0 || p.y < 0) {
            p.y = height + 10;
            p.x = Math.random() * width;
            p.life = 1.0;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
          ctx.fillStyle = `rgba(255, 69, 0, ${p.life})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#ff8c00';
          ctx.fill();
        });
        
        // Flicker glow at bottom
        const fireGrad = ctx.createLinearGradient(0, height, 0, height - 50);
        fireGrad.addColorStop(0, `rgba(255, 69, 0, ${0.1 + Math.random() * 0.1})`);
        fireGrad.addColorStop(1, 'rgba(255, 69, 0, 0)');
        ctx.fillStyle = fireGrad;
        ctx.fillRect(0, height - 50, width, 50);
      }

      // --- RENDER WATER ---
      if (theme === 'water') {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#1e90ff';
        particles.forEach(p => {
          if (p.type === 'droplet') {
            p.y += p.vy;
            if (p.y > height) p.y = -10;
            ctx.fillStyle = 'rgba(0, 191, 255, 0.6)';
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.size * 0.5, p.size * 1.5, 0, 0, Math.PI*2);
            ctx.fill();
          } else {
            p.y += p.vy;
            p.x += Math.sin(time * 0.02 + p.size) * 0.3;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
            ctx.strokeStyle = 'rgba(135, 206, 235, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.stroke();
            // Tiny highlight
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.beginPath();
            ctx.arc(p.x - p.size*0.3, p.y - p.size*0.3, p.size*0.2, 0, Math.PI*2);
            ctx.fill();
          }
        });
      }

      // --- RENDER WIND ---
      if (theme === 'wind') {
        ctx.lineCap = 'round';
        particles.forEach((p, i) => {
          // Circular swirling logic
          const cx = width / 2;
          const cy = height / 2;
          const dx = p.x - cx;
          const dy = p.y - cy;
          p.vx += -dy * 0.001; // orthogonal vortex
          p.vy += dx * 0.001;
          
          // Limits pushing it to edges smoothly
          if (p.x < 10) p.vx += 0.2;
          if (p.x > width - 10) p.vx -= 0.2;
          if (p.y < 10) p.vy += 0.2;
          if (p.y > height - 10) p.vy -= 0.2;
          
          // Velocity damping
          p.vx *= 0.98;
          p.vy *= 0.98;

          p.x += p.vx;
          p.y += p.vy;

          p.history.push({x: p.x, y: p.y});
          if (p.history.length > 20) p.history.shift();
          
          if (p.history.length > 1) {
            ctx.beginPath();
            ctx.moveTo(p.history[0].x, p.history[0].y);
            for(let j=1; j<p.history.length; j++) {
              ctx.lineTo(p.history[j].x, p.history[j].y);
            }
            ctx.strokeStyle = `rgba(224, 224, 224, ${p.life * 0.3})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          
          // Random reset occasionally for continuous wind gusts
          if (Math.random() < 0.005) {
             p.x = Math.random() < 0.5 ? 0 : width;
             p.y = Math.random() * height;
             p.history = [];
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isActive, theme, flipComplete]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0, 
        borderRadius: '28px' // perfectly map the card padding bounds so clips nicely
      }}
    />
  );
};

export default ElementalCanvas;
