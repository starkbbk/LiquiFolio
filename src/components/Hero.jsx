import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import myPicture from '../assets/myPicture.png';

const Hero = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 968);
  const laserCanvasRef = useRef(null);
  const shipContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 968);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Unified animation: orbit ships + shoot lasers
  useEffect(() => {
    const canvas = laserCanvasRef.current;
    const container = shipContainerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    const lasers = [];
    const shipColors = ['#0284c7', '#2563eb', '#059669', '#ea580c', '#3b82f6', '#0ea5e9', '#555', '#f59e0b', '#10b981', '#f97316', '#db2777', '#f1502f', '#764abc', '#f24e1e'];

    const shipConfigs = [
      { angle: 0, radius: 0.30, speed: 0.18 },
      { angle: 26, radius: 0.35, speed: -0.14 },
      { angle: 52, radius: 0.25, speed: 0.22 },
      { angle: 78, radius: 0.33, speed: -0.12 },
      { angle: 104, radius: 0.28, speed: 0.16 },
      { angle: 130, radius: 0.37, speed: -0.20 },
      { angle: 156, radius: 0.31, speed: 0.24 },
      { angle: 182, radius: 0.34, speed: -0.15 },
      { angle: 208, radius: 0.26, speed: 0.19 },
      { angle: 234, radius: 0.36, speed: -0.17 },
      { angle: 260, radius: 0.29, speed: 0.21 },
      { angle: 286, radius: 0.32, speed: -0.13 },
      { angle: 312, radius: 0.38, speed: 0.16 },
      { angle: 338, radius: 0.27, speed: -0.23 }
    ];

    const angles = shipConfigs.map(s => s.angle);
    const shipEls = container.querySelectorAll('.spaceship-orbit');
    let lastSpawn = 0;

    const animate = (ts) => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cw = canvas.width;
      const ch = canvas.height;

      // Update ship orbital positions via direct DOM manipulation
      const positions = [];
      for (let i = 0; i < shipConfigs.length; i++) {
        angles[i] += shipConfigs[i].speed;
        const a = angles[i] * Math.PI / 180;
        const r = shipConfigs[i].radius;
        const px = 50 + r * 100 * Math.cos(a);
        const py = 50 + r * 100 * Math.sin(a);
        positions.push({ x: px, y: py });

        if (shipEls[i]) {
          const tangent = angles[i] + (shipConfigs[i].speed > 0 ? 90 : -90);
          shipEls[i].style.left = `${px}%`;
          shipEls[i].style.top = `${py}%`;
          shipEls[i].style.transform = `translate(-50%, -50%) rotate(${tangent}deg)`;
        }
      }

      // Spawn laser every ~600ms
      if (ts - lastSpawn > 600) {
        const from = Math.floor(Math.random() * 14);
        let to = Math.floor(Math.random() * 14);
        while (to === from) to = Math.floor(Math.random() * 14);

        lasers.push({
          fromX: (positions[from].x / 100) * cw,
          fromY: (positions[from].y / 100) * ch,
          toX: (positions[to].x / 100) * cw,
          toY: (positions[to].y / 100) * ch,
          progress: 0,
          color: shipColors[from],
          life: 1
        });
        lastSpawn = ts;
      }

      // Draw lasers
      for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i];
        laser.progress += 0.05;
        laser.life -= 0.025;

        if (laser.life <= 0) { lasers.splice(i, 1); continue; }

        const hp = Math.min(laser.progress, 1);
        const tp = Math.max(0, laser.progress - 0.3);
        const hx = laser.fromX + (laser.toX - laser.fromX) * hp;
        const hy = laser.fromY + (laser.toY - laser.fromY) * hp;
        const tx = laser.fromX + (laser.toX - laser.fromX) * Math.min(tp, 1);
        const ty = laser.fromY + (laser.toY - laser.fromY) * Math.min(tp, 1);

        // Outer glow beam
        ctx.globalAlpha = laser.life;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.strokeStyle = laser.color;
        ctx.lineWidth = 4;
        ctx.shadowColor = laser.color;
        ctx.shadowBlur = 20;
        ctx.stroke();

        // Inner white core
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Impact flash on hit
        if (laser.progress >= 1 && laser.life > 0.4) {
          ctx.beginPath();
          ctx.arc(laser.toX, laser.toY, 12 * laser.life, 0, Math.PI * 2);
          ctx.fillStyle = laser.color;
          ctx.shadowColor = '#fff';
          ctx.shadowBlur = 30;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section id="home" style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'transparent',
      padding: isMobileView ? '120px 20px 60px' : '0 8%',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Container */}
      <div style={{
        display: 'flex',
        flexDirection: isMobileView ? 'column' : 'row',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        
        {/* LEFT COLUMN */}
        <div style={{ 
          flex: '1', 
          maxWidth: isMobileView ? '100%' : '600px',
          color: '#fff',
          zIndex: 2
        }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#e5e7eb', fontWeight: '400' }}
          >
            Hey, I am <span style={{ color: '#ea580c', fontWeight: '600' }}>Shivanand</span>
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ 
              fontSize: isMobileView ? '3.5rem' : '5.5rem', 
              fontWeight: '700', 
              lineHeight: '1.05',
              marginBottom: '25px',
              letterSpacing: '-1.5px'
            }}
          >
            Software<br />Engineer
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              fontSize: '1.1rem', 
              color: '#9ca3af', 
              lineHeight: '1.6',
              marginBottom: '40px',
              maxWidth: '85%'
            }}
          >
            B.Tech in Computer Science & Engineering (AI/ML). Passionate about building intelligent systems and scalable web applications.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '50px' }}
          >
            <a href="#contact" style={{
              background: '#ea580c',
              color: '#fff',
              padding: '16px 40px',
              borderRadius: '40px',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'transform 0.2s ease, background 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = '#c2410c'}
            onMouseLeave={(e) => e.target.style.background = '#ea580c'}
            >
              Hire me
            </a>
            
            <a href="https://github.com/starkbbk" target="_blank" rel="noreferrer" style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              textDecoration: 'none',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                 <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </motion.div>

          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, transparent 100%)', marginBottom: '40px' }} />

          {/* Glass Quote Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '30px',
              maxWidth: '420px',
              position: 'relative'
            }}
          >
            <div style={{ fontSize: '4rem', color: '#ea580c', opacity: 0.8, position: 'absolute', top: '10px', left: '25px', fontFamily: 'serif', lineHeight: 1 }}>"</div>
            <p style={{ color: '#e5e7eb', fontSize: '0.95rem', lineHeight: '1.6', position: 'relative', zIndex: 1, marginBottom: '25px', marginTop: '15px' }}>
              Bridging the gap between complex AI algorithms and intuitive, user-friendly web interfaces to build the future of tech.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}>
                <img src={myPicture} alt="Shivanand" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: 0, fontWeight: '600' }}>Shivanand Verma</h4>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '2px 0 0 0' }}>AI/ML Enthusiast</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ 
          flex: '1', 
          position: 'relative', 
          height: isMobileView ? '500px' : '750px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isMobileView ? '50px' : '0'
        }}>
          {/* Orbital Rings */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 0
          }}>
            <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', width: '550px', height: '550px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'absolute', width: '750px', height: '750px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)' }} />
          </div>

          {/* Laser Canvas */}
          <canvas 
            ref={laserCanvasRef}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              zIndex: 15,
              pointerEvents: 'none'
            }}
          />

          {/* Orbiting Spaceship Skills */}
          <div ref={shipContainerRef} style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}>
            {[
              { name: 'React', bg: '#0284c7' },
              { name: 'Python', bg: '#2563eb' },
              { name: 'Node.js', bg: '#059669' },
              { name: 'AI/ML', bg: '#ea580c' },
              { name: 'TypeScript', bg: '#3b82f6' },
              { name: 'Docker', bg: '#0ea5e9' },
              { name: 'Next.js', bg: '#555' },
              { name: 'TensorFlow', bg: '#f59e0b' },
              { name: 'MongoDB', bg: '#10b981' },
              { name: 'AWS', bg: '#f97316' },
              { name: 'GraphQL', bg: '#db2777' },
              { name: 'Git', bg: '#f1502f' },
              { name: 'Redux', bg: '#764abc' },
              { name: 'Figma', bg: '#f24e1e' }
            ].map((ship) => (
              <div
                key={ship.name}
                className="spaceship-orbit"
                style={{
                  position: 'absolute',
                  left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  pointerEvents: 'none'
                }}
              >
                <div
                  className="spaceship-skill"
                  style={{
                    '--ship-bg': ship.bg,
                    background: `${ship.bg}35`,
                    color: '#fff',
                    fontWeight: '700',
                    boxShadow: `0 0 10px ${ship.bg}30`
                  }}
                >
                  {ship.name}
                </div>
              </div>
            ))}
          </div>

          {/* Main Avatar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'relative',
              width: isMobileView ? '320px' : '480px',
              height: isMobileView ? '320px' : '480px',
              zIndex: 10,
              cursor: 'crosshair'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(234,88,12,0.1), rgba(0,0,0,0))',
              padding: '10px',
              boxShadow: 'inset 0 0 50px rgba(234,88,12,0.05)'
            }}>
              <div 
              className="galaxy-core"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Empty galaxy core - purely visual */}
              </div>
            </div>
            
            {/* Ambient Glow behind avatar */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '110%',
              height: '110%',
              background: 'radial-gradient(circle, rgba(234,88,12,0.2) 0%, transparent 60%)',
              zIndex: -1,
              filter: 'blur(40px)'
            }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
