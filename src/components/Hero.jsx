import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import myPicture from '../assets/myPicture.png';

const Hero = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 968);

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
          <motion.div animate={{ y: [0, -15, 0], rotate: [-10, -10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '20%', left: '10%', background: '#0284c7', padding: '12px 18px', borderRadius: '12px', zIndex: 5, boxShadow: '0 10px 20px rgba(2,132,199,0.3)', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
            React
          </motion.div>
          
          <motion.div animate={{ y: [0, 15, 0], rotate: [15, 15, 15] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} style={{ position: 'absolute', top: '30%', right: '5%', background: '#059669', padding: '12px 18px', borderRadius: '12px', zIndex: 5, boxShadow: '0 10px 20px rgba(5,150,105,0.3)', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
            Node.js
          </motion.div>

          <motion.div animate={{ y: [0, -10, 0], rotate: [-5, -5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }} style={{ position: 'absolute', bottom: '25%', left: '15%', background: '#eab308', padding: '12px 18px', borderRadius: '12px', zIndex: 5, boxShadow: '0 10px 20px rgba(234,179,8,0.3)', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
            JS
          </motion.div>

          <motion.div animate={{ y: [0, 20, 0], rotate: [10, 10, 10] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} style={{ position: 'absolute', bottom: '15%', right: '20%', background: '#ea580c', padding: '12px 18px', borderRadius: '12px', zIndex: 5, boxShadow: '0 10px 20px rgba(234,88,12,0.3)', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
            AI/ML
          </motion.div>

          {/* Main Avatar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'relative',
              width: isMobileView ? '320px' : '480px',
              height: isMobileView ? '320px' : '480px',
              zIndex: 2
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
              <img 
                src={myPicture} 
                alt="Shivanand Verma" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  borderRadius: '50%',
                  filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.6))'
                }} 
              />
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
