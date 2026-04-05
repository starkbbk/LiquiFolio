import React from 'react';
import LiquidGlassWrapper from './LiquidGlassWrapper';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: 0,
      width: '100%',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
    }}>
      <LiquidGlassWrapper
        className="nav-glass-container"
        glassProps={{
          intensity: 0.4,
          blur: 15,
          padding: '16px 80px',
          glassClassName: 'glass-navbar nav-wrapper',
          style: {
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            width: 'max-content'
          }
        }}
      >
        <div style={{
          fontWeight: '800',
          fontSize: '1.2rem',
          background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          SV
        </div>
        
        <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#fff')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
            >
              {link.name}
            </a>
          ))}
        </div>
      </LiquidGlassWrapper>
    </div>
  );
};

export default Navbar;
