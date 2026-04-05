import React, { useEffect, useRef, useState } from 'react';

// ==========================================
// WEATHER CLASSES
// ==========================================

class LightningStorm {
  constructor(w, h) { this.init(w, h); }
  init(w, h) {
    this.w = w; this.h = h;
    this.drops = Array.from({length: 300}, () => ({
      x: Math.random() * w, y: Math.random() * h,
      s: Math.random() * 15 + 10, l: Math.random() * 20 + 10
    }));
    this.flash = 0;
    this.bolts = [];
  }
  generateBolt(x, y, length, angle, branchLen) {
    if (branchLen < 10) return;
    const nx = x + Math.cos(angle) * length;
    const ny = y + Math.sin(angle) * length;
    this.bolts.push({ x1: x, y1: y, x2: nx, y2: ny, alpha: 1 });
    
    // Core continuation
    this.generateBolt(nx, ny, length * 1.0, angle + (Math.random()-0.5)*0.5, branchLen - 1);
    
    // Branching
    if (Math.random() > 0.6) {
      this.generateBolt(nx, ny, length * 0.8, angle + (Math.random()-0.5)*1.2, branchLen * 0.6);
    }
  }
  render(ctx) {
    ctx.fillStyle = 'rgba(10, 10, 26, 0.4)'; // stormy fade
    ctx.fillRect(0, 0, this.w, this.h);

    if (Math.random() < 0.02) {
      this.flash = 1;
      this.bolts = [];
      document.body.classList.add('shake');
      setTimeout(() => document.body.classList.remove('shake'), 200);
      for(let i=0; i< (Math.random()*2+1); i++) {
        this.generateBolt(Math.random()*this.w, 0, Math.random()*20+10, Math.PI/2 + (Math.random()-0.5)*0.5, 20);
      }
    }

    if (this.flash > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.flash * 0.3})`;
      ctx.fillRect(0, 0, this.w, this.h);
      this.flash -= 0.1;
    }

    ctx.strokeStyle = '#fff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00ffff';
    this.bolts.forEach(b => {
      ctx.lineWidth = b.alpha * 3;
      ctx.beginPath(); ctx.moveTo(b.x1, b.y1); ctx.lineTo(b.x2, b.y2);
      ctx.strokeStyle = `rgba(200, 255, 255, ${b.alpha})`;
      ctx.stroke();
      b.alpha -= 0.1;
    });
    this.bolts = this.bolts.filter(b => b.alpha > 0);
    ctx.shadowBlur = 0;

    // Rain
    ctx.strokeStyle = 'rgba(150, 150, 255, 0.4)';
    ctx.lineWidth = 1;
    this.drops.forEach(d => {
      d.y += d.s; d.x -= d.s * 0.2; // 15deg diagonal roughly
      if(d.y > this.h) { d.y = -10; d.x = Math.random() * this.w + this.w*0.2; }
      ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.l*0.2, d.y + d.l); ctx.stroke();
    });
  }
}

class FireTornado {
  constructor(w, h) { this.init(w, h); }
  init(w, h) {
    this.w = w; this.h = h;
    this.tornado = Array.from({length: 400}, () => ({
      a: Math.random() * Math.PI*2,
      y: Math.random() * h,
      r: Math.random(), // percentage of funnel radius at this height
      s: Math.random() * 0.1 + 0.05
    }));
    this.embers = Array.from({length: 200}, () => ({
      x: Math.random()*w, y: Math.random()*h, s: Math.random()*3+1, vy: Math.random()*5+2
    }));
    this.time = 0;
  }
  render(ctx) {
    this.time++;
    ctx.fillStyle = 'rgba(26, 5, 0, 0.3)';
    ctx.fillRect(0, 0, this.w, this.h);

    // Tornado Funnel
    const cx = this.w / 2;
    this.tornado.forEach(p => {
      p.a += p.s;
      p.y -= p.s * 20;
      if (p.y < 0) p.y = this.h;
      // funnel radius narrows at bottom
      const maxR = (1 - p.y/this.h) * 300 + 50; 
      const radius = p.r * maxR;
      const x = cx + Math.cos(p.a) * radius;
      // wobble
      const offset = Math.sin(this.time*0.05 + p.y*0.01) * 50;
      
      ctx.fillStyle = `rgba(255, ${Math.random()*100 + 50}, 0, ${0.8 - (radius/maxR)*0.6})`;
      ctx.fillRect(x + offset, p.y, 4, 4);
    });

    // Embers from bottom
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff4500';
    this.embers.forEach(e => {
      e.y -= e.vy;
      e.x += Math.sin(e.y*0.02 + this.time*0.1) * 2;
      if (e.y < 0) { e.y = this.h + 10; e.x = Math.random()*this.w; }
      ctx.fillStyle = `rgba(255, 100, 0, ${(e.y/this.h)})`;
      ctx.beginPath(); ctx.arc(e.x, e.y, e.s, 0, Math.PI*2); ctx.fill();
    });
    ctx.shadowBlur = 0;
    
    // Side fire columns
    const fGrad = ctx.createLinearGradient(0,0, 100,0);
    fGrad.addColorStop(0, 'rgba(255,69,0,0.5)'); fGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = fGrad; ctx.fillRect(0,0,100,this.h);
    const fGrad2 = ctx.createLinearGradient(this.w,0, this.w-100,0);
    fGrad2.addColorStop(0, 'rgba(255,69,0,0.5)'); fGrad2.addColorStop(1, 'transparent');
    ctx.fillStyle = fGrad2; ctx.fillRect(this.w-100,0,100,this.h);
  }
}

class WaterFlood {
  constructor(w, h) { this.init(w, h); }
  init(w, h) {
    this.w = w; this.h = h;
    this.time = 0;
    this.bubbles = Array.from({length: 150}, () => ({
      x: Math.random()*w, y: Math.random()*h, s: Math.random()*5+2, vy: Math.random()*2+1
    }));
    this.waves = [
      {a: 40, f: 0.003, s: 0.02, o: 0, c: 'rgba(0,105,148,0.4)', h: h*0.5},
      {a: 60, f: 0.002, s: 0.03, o: 2, c: 'rgba(0,191,255,0.3)', h: h*0.6},
      {a: 30, f: 0.005, s: 0.01, o: 4, c: 'rgba(0,31,63,0.6)', h: h*0.7}
    ];
    this.ripples = [];
  }
  render(ctx) {
    this.time++;
    ctx.fillStyle = 'rgba(0, 26, 42, 0.2)';
    ctx.fillRect(0, 0, this.w, this.h);

    if(Math.random() < 0.05) {
      this.ripples.push({x: Math.random()*this.w, y: Math.random()*this.h, r: 0, a: 1});
    }

    this.ripples.forEach(r => {
      r.r += 2; r.a -= 0.02;
      ctx.strokeStyle = `rgba(135,206,235,${r.a})`;
      ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI*2); ctx.stroke();
    });
    this.ripples = this.ripples.filter(r => r.a > 0);

    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00ffff';
    this.bubbles.forEach(b => {
      b.y -= b.vy; b.x += Math.sin(b.y*0.05 + this.time*0.05);
      if(b.y < -10) { b.y = this.h+10; b.x = Math.random()*this.w; }
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath(); ctx.arc(b.x, b.y, b.s, 0, Math.PI*2); ctx.stroke();
    });
    ctx.shadowBlur = 0;

    this.waves.forEach(w => {
      w.o += w.s;
      ctx.fillStyle = w.c;
      ctx.beginPath();
      ctx.moveTo(0, this.h);
      for(let x=0; x<=this.w; x+=20) {
        ctx.lineTo(x, w.h + Math.sin(x*w.f + w.o)*w.a);
      }
      ctx.lineTo(this.w, this.h);
      ctx.fill();
    });
  }
}

class Sandstorm {
  constructor(w, h) { this.init(w, h); }
  init(w, h) {
    this.w = w; this.h = h;
    this.dust = Array.from({length: 400}, () => ({
      x: Math.random()*w, y: Math.random()*h, vx: Math.random()*15+5, s: Math.random()*3+1
    }));
    this.tornado = Array.from({length: 300}, () => ({
      a: Math.random()*Math.PI*2, y: Math.random()*h, r: Math.random(), s: Math.random()*0.2+0.1
    }));
  }
  render(ctx) {
    ctx.fillStyle = 'rgba(42, 33, 20, 0.4)';
    ctx.fillRect(0, 0, this.w, this.h);

    // Tornado cone
    ctx.fillStyle = 'rgba(200, 169, 81, 0.15)';
    const cx = this.w/2;
    this.tornado.forEach(p => {
      p.a += p.s; p.y += p.s*30; if(p.y > this.h) p.y = 0;
      const maxR = (p.y / this.h) * 200 + 50; // inverse funnel
      const x = cx + Math.cos(p.a) * (p.r * maxR);
      ctx.fillRect(x, p.y, Math.random()*4+2, Math.random()*4+2);
    });

    // Horizontal heavy wind streaks
    ctx.fillStyle = 'rgba(139, 105, 20, 0.6)';
    this.dust.forEach(d => {
      d.x += d.vx;
      if(d.x > this.w) { d.x = -10; d.y = Math.random()*this.h; }
      ctx.fillRect(d.x, d.y, d.vx * 3, d.s);
    });
  }
}

// ==========================================
// MAIN ENGINE COMPONENT
// ==========================================

const CatastropheEngine = () => {
  const canvasRef = useRef(null);
  const [activeTheme, setActiveTheme] = useState(null); // lightning, fire, water, wind
  const [globalOpacity, setGlobalOpacity] = useState(0);

  // Hardcode color bounds
  const edgeColors = {
    lightning: 'box-shadow: inset 0 0 150px rgba(0, 255, 255, 0.3)',
    fire: 'box-shadow: inset 0 0 150px rgba(255, 69, 0, 0.5)',
    water: 'box-shadow: inset 0 0 150px rgba(0, 191, 255, 0.4)',
    wind: 'box-shadow: inset 0 0 150px rgba(200, 169, 81, 0.4)'
  };
  
  const bgColors = {
    lightning: 'rgba(10, 10, 26, 0.85)',
    fire: 'rgba(26, 5, 0, 0.85)',
    water: 'rgba(0, 26, 42, 0.85)',
    wind: 'rgba(26, 21, 0, 0.85)'
  };

  useEffect(() => {
    const handleWeather = (e) => {
      if (e.detail.active && e.detail.theme) {
        setActiveTheme(e.detail.theme);
        setGlobalOpacity(1); // fade in global overlay
      } else {
        setGlobalOpacity(0); // fade out
      }
    };
    window.addEventListener('triggerWeather', handleWeather);
    return () => window.removeEventListener('triggerWeather', handleWeather);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !activeTheme) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w; canvas.height = h;

    const resizeObserver = new ResizeObserver(entries => {
      for(let entry of entries) {
        w = entry.contentRect.width; h = entry.contentRect.height;
        canvas.width = w; canvas.height = h;
        if(engine) engine.init(w, h);
      }
    });
    resizeObserver.observe(document.body);

    // Boot specific engine
    let engine;
    if (activeTheme === 'lightning') engine = new LightningStorm(w, h);
    if (activeTheme === 'fire') engine = new FireTornado(w, h);
    if (activeTheme === 'water') engine = new WaterFlood(w, h);
    if (activeTheme === 'wind') engine = new Sandstorm(w, h);

    let afId;
    const render = () => {
      if (engine && globalOpacity > 0) {
        engine.render(ctx);
      }
      afId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(afId);
      resizeObserver.disconnect();
    };
  }, [activeTheme]); // recreate engine on theme switch

  return (
    <div 
      className="weather-overlay"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: -1, // Sits above MotionCanvas (-3) but below Cards
        pointerEvents: 'none',
        opacity: globalOpacity,
        transition: 'opacity 1.5s ease',
        background: activeTheme ? bgColors[activeTheme] : 'transparent',
      }}
    >
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1,
          boxShadow: activeTheme && globalOpacity > 0 ? edgeColors[activeTheme].split(': ')[1] : 'none',
          transition: 'box-shadow 1.5s ease'
        }}
      />
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block' }} 
      />
    </div>
  );
};

export default CatastropheEngine;
