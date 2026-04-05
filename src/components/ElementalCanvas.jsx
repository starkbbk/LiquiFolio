import React, { useEffect, useRef } from 'react';

const ElementalCanvas = ({ theme, isActive, flipComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
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

    // --- SPARKLE BURST ---
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
          x: width / 2, y: height / 2,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1.0, decay: Math.random() * 0.02 + 0.02, size: Math.random() * 3 + 1
        });
      }
    }

    // --- THEMING INITIALIZATION ---
    if (theme === 'lightning') {
      // Bouncing sparks
      for(let i=0; i<15; i++) {
        particles.push({
          type: 'spark', x: Math.random()*width, y: Math.random()*height,
          vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4, s: Math.random()*2+1
        });
      }
      // Orbs
      for(let i=0; i<5; i++) {
        particles.push({
          type: 'orb', x: Math.random()*width, y: Math.random()*height, 
          a: Math.random()*Math.PI*2, s: Math.random()*4+2
        });
      }
    } else if (theme === 'fire') {
      // Embers
      for(let i=0; i<40; i++) {
        particles.push({
          x: Math.random() * width, y: height + Math.random() * 50,
          vx: (Math.random() - 0.5) * 1, vy: -(Math.random() * 2 + 1),
          size: Math.random() * 3 + 1, life: Math.random()
        });
      }
    } else if (theme === 'water') {
      // Bubbles
      for(let i=0; i<25; i++) {
        particles.push({
          type: 'bubble', x: Math.random() * width, y: height + Math.random() * 100,
          vy: -(Math.random() * 1 + 0.5), size: Math.random() * 4 + 2
        });
      }
      // Caustics
      for(let i=0; i<10; i++) {
        particles.push({
          type: 'caustic', x: Math.random() * width, y: Math.random() * height,
          a: Math.random()*Math.PI*2, r: Math.random()*50+20
        });
      }
    } else if (theme === 'wind') {
      // Dust swirling
      for(let i=0; i<30; i++) {
        particles.push({
          type: 'dust', a: Math.random()*Math.PI*2, r: Math.random()*(width/2),
          y: Math.random()*height, s: Math.random()*0.02+0.01
        });
      }
      // Streaks
      for(let i=0; i<10; i++) {
        particles.push({
          type: 'streak', x: Math.random()*width, y: Math.random()*height, vx: Math.random()*5+5
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time++;
      ctx.globalAlpha = 0.7; 

      // --- SPARKLES ---
      for (let i = sparkles.length - 1; i >= 0; i--) {
        let s = sparkles[i];
        s.x += s.vx; s.y += s.vy; s.life -= s.decay;
        if (s.life <= 0) { sparkles.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color; ctx.globalAlpha = s.life; ctx.fill();
        ctx.shadowBlur = 10; ctx.shadowColor = s.color;
      }
      ctx.globalAlpha = 0.7;
      ctx.shadowBlur = 0;

      // --- LIGHTNING ---
      if (theme === 'lightning') {
        particles.forEach(p => {
          if (p.type === 'spark') {
            p.x += p.vx; p.y += p.vy;
            if(p.x<0 || p.x>width) p.vx *= -1;
            if(p.y<0 || p.y>height) p.vy *= -1;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2); ctx.fill();
          } else {
            p.a += 0.05;
            p.x += Math.cos(p.a) * 2; p.y += Math.sin(p.a) * 2;
            ctx.fillStyle = 'rgba(123, 47, 255, 0.4)';
            ctx.shadowBlur = 15; ctx.shadowColor = '#00ffff';
            ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2); ctx.fill();
            ctx.shadowBlur = 0;
            if (p.x < -20 || p.x > width+20 || p.y < -20 || p.y > height+20) {
              p.x = width/2; p.y = height/2;
            }
          }
        });
        // Mini bolt
        if (Math.random() < 0.02) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2; ctx.shadowBlur = 10; ctx.shadowColor = '#00ffff';
          ctx.beginPath(); ctx.moveTo(Math.random()*width, 0);
          ctx.lineTo(Math.random()*width, height/2);
          ctx.lineTo(Math.random()*width, height); ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // --- FIRE ---
      if (theme === 'fire') {
        const pulse = 0.05 + Math.sin(time*0.1)*0.03;
        ctx.fillStyle = `rgba(255, 69, 0, ${pulse})`;
        ctx.fillRect(0, 0, width, height);

        particles.forEach((p, i) => {
          p.x += p.vx + Math.sin(time * 0.05 + i) * 0.5;
          p.y += p.vy; p.life -= 0.01;
          if (p.life <= 0 || p.y < 0) {
            p.y = height + 10; p.x = Math.random() * width; p.life = 1.0;
          }
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
          ctx.fillStyle = `rgba(255, 140, 0, ${p.life})`;
          ctx.shadowBlur = 8; ctx.shadowColor = '#ff4500'; ctx.fill();
        });
      }

      // --- WATER ---
      if (theme === 'water') {
        particles.forEach(p => {
          if (p.type === 'caustic') {
            p.a += 0.02;
            ctx.fillStyle = `rgba(0, 255, 255, ${0.05 + Math.sin(p.a)*0.02})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
          } else {
            p.y += p.vy; p.x += Math.sin(time * 0.02 + p.size) * 0.3;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.stroke();
          }
        });
        // Bottom wave
        ctx.fillStyle = 'rgba(0, 191, 255, 0.4)';
        ctx.beginPath(); ctx.moveTo(0, height);
        for(let x=0; x<=width; x+=10) ctx.lineTo(x, height - 30 + Math.sin(x*0.02 + time*0.05)*10);
        ctx.lineTo(width, height); ctx.fill();
      }

      // --- WIND ---
      if (theme === 'wind') {
        particles.forEach((p) => {
          if (p.type === 'streak') {
            p.x += p.vx;
            if (p.x > width) { p.x = -50; p.y = Math.random()*height; }
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillRect(p.x, p.y, p.vx*4, 1);
          } else {
            p.a += p.s;
            const px = width/2 + Math.cos(p.a) * p.r;
            const py = p.y + Math.sin(p.a) * 20;
            ctx.fillStyle = 'rgba(200, 169, 81, 0.6)';
            ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI*2); ctx.fill();
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
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, borderRadius: '28px'
      }}
    />
  );
};

export default ElementalCanvas;
