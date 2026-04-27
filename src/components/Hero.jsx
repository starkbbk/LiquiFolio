import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import myPicture from '../assets/myPicture.png';

const Hero = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 968);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 968);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

          {/* Floating Skill Icons on Orbits */}
          {[
            // Primary (Always visible)
            { name: 'React', bg: '#0284c7', top: '20%', left: '10%', delay: 0, isPrimary: true, rotate: -10 },
            { name: 'Node.js', bg: '#059669', top: '30%', right: '5%', delay: 1, isPrimary: true, rotate: 15 },
            { name: 'JS', bg: '#eab308', bottom: '25%', left: '15%', delay: 2, isPrimary: true, rotate: -5 },
            { name: 'AI/ML', bg: '#ea580c', bottom: '15%', right: '20%', delay: 0.5, isPrimary: true, rotate: 10 },
            // Secondary (Visible on hover)
            { name: 'Python', bg: '#2563eb', top: '5%', right: '35%', delay: 0.2, rotate: -15 },
            { name: 'TensorFlow', bg: '#f59e0b', bottom: '5%', left: '35%', delay: 0.4, rotate: 12 },
            { name: 'TypeScript', bg: '#3b82f6', top: '45%', left: '-5%', delay: 0.6, rotate: -8 },
            { name: 'Docker', bg: '#0ea5e9', top: '50%', right: '-5%', delay: 0.8, rotate: 20 },
            { name: 'MongoDB', bg: '#10b981', bottom: '45%', right: '-10%', delay: 0.3, rotate: -25 },
            { name: 'AWS', bg: '#f97316', bottom: '40%', left: '-10%', delay: 0.7, rotate: 5 },
            { name: 'GraphQL', bg: '#db2777', top: '10%', left: '40%', delay: 0.5, rotate: 22 },
            { name: 'Next.js', bg: '#333333', bottom: '10%', right: '40%', delay: 0.9, rotate: -18 }
          ].map((skill, idx) => {
            const isVisible = skill.isPrimary || isHoveringAvatar;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: skill.isPrimary ? 1 : 0, scale: skill.isPrimary ? 1 : 0 }}
                animate={{ 
                  y: isVisible ? [0, idx % 2 === 0 ? -15 : 15, 0] : 0, 
                  rotate: isVisible ? [skill.rotate, skill.rotate + 5, skill.rotate] : skill.rotate,
                  opacity: isVisible ? 1 : 0,
                  scale: isVisible ? 1 : 0.5
                }}
                transition={{ 
                  y: { duration: 4 + (idx % 3), repeat: Infinity, ease: 'easeInOut', delay: skill.delay },
                  rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.4 },
                  scale: { type: "spring", stiffness: 200, damping: 15 }
                }}
                style={{ 
                  position: 'absolute', 
                  top: skill.top, 
                  bottom: skill.bottom, 
                  left: skill.left, 
                  right: skill.right, 
                  background: skill.bg, 
                  padding: '12px 18px', 
                  borderRadius: '12px', 
                  zIndex: skill.isPrimary ? 5 : 4, 
                  boxShadow: `0 10px 20px ${skill.bg}50`, 
                  color: '#fff', 
                  fontWeight: 'bold', 
                  fontSize: '1.2rem',
                  pointerEvents: 'none'
                }}
              >
                {skill.name}
              </motion.div>
            );
          })}

          {/* Main Avatar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onMouseEnter={() => setIsHoveringAvatar(true)}
            onMouseLeave={() => setIsHoveringAvatar(false)}
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
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(20, 25, 40, 0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(234, 88, 12, 0.2)'
              }}>
                <div style={{
                  fontSize: isMobileView ? '2.5rem' : '3.5rem',
                  fontWeight: '800',
                  lineHeight: '1.1',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  background: 'linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'
                }}>
                  Technical<br/>Skills
                </div>
                <div style={{
                  marginTop: '1rem',
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Hover to Expand
                </div>
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
