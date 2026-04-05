import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import LiquidGlassWrapper from './LiquidGlassWrapper';
import myPicture from '../assets/myPicture.png';

const skillsData = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'C++', 'SQL', 'JavaScript (ES6+)', 'TypeScript', 'PHP'],
    color: '#3b82f6', // blue
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['React Native', 'React.js', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    color: '#8b5cf6', // purple
  },
  {
    category: 'Frontend & Mobile',
    skills: ['HTML5', 'CSS3', 'Responsive Design', 'Cross-Platform Dev'],
    color: '#ec4899', // pink
  },
  {
    category: 'Backend & Databases',
    skills: ['MySQL', 'RESTful APIs', 'API Integration', 'PHP'],
    color: '#10b981', // green
  },
  {
    category: 'Data & BI',
    skills: ['Tableau', 'Advanced Excel', 'Data Cleaning', 'Data Visualization', 'Predictive Modeling'],
    color: '#f59e0b', // amber
  },
  {
    category: 'Tools & Practices',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Render', 'CI/CD', 'Agile/Scrum', 'Testing', 'Debugging'],
    color: '#06b6d4', // cyan
  },
  {
    category: 'Core CS',
    skills: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'System Design'],
    color: '#ef4444', // red
  }
];

const allSkills = skillsData.flatMap(cat => cat.skills.map(skill => ({ skill, color: cat.color })));

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r}, ${g}, ${b}`;
};

const HeroFloatingSkills = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Generate random properties strictly once
    const bubbles = useMemo(() => {
        // Shuffle and pick a smaller subset (18) to massively reduce render pipeline lag
        const sampled = [...allSkills].sort(() => 0.5 - Math.random()).slice(0, 18);
        return sampled.map((item, index) => {
            const size = 50 + Math.random() * 60; // 50px to 110px (smaller)
            const top = 2 + Math.random() * 95; // 2% to 97%
            const left = 2 + Math.random() * 95; // 2% to 97%
            const duration = 20 + Math.random() * 30; // 20s to 50s
            const delay = Math.random() * -40; // Random starting point of animation
            const parallaxFactor = 0.15 + Math.random() * 0.35; // How much it shifts on scroll

            // Random drift distances back and forth
            const driftY = 20 + Math.random() * 50;
            const driftX = 20 + Math.random() * 50;

            return {
                ...item,
                id: index,
                size,
                top,
                left,
                duration,
                delay,
                parallaxFactor,
                driftY,
                driftX
            };
        });
    }, []);

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
            {bubbles.map(bubble => {
                const rgbColor = hexToRgb(bubble.color);
                // Shift up when scrolling down (parallax effect)
                const transformY = -(scrollY * bubble.parallaxFactor);
                
                return (
                    <div 
                        key={bubble.id}
                        style={{
                            position: 'absolute',
                            top: `${bubble.top}%`,
                            left: `${bubble.left}%`,
                            transform: `translate(-50%, calc(-50% + ${transformY}px))`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        <motion.div
                            animate={{
                                y: [-bubble.driftY, bubble.driftY, -bubble.driftY],
                                x: [-bubble.driftX, bubble.driftX, -bubble.driftX],
                            }}
                            transition={{
                                duration: bubble.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: bubble.delay
                            }}
                            style={{
                                width: `${bubble.size}px`,
                                height: `${bubble.size}px`,
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                background: `rgba(${rgbColor}, 0.15)`,
                                boxShadow: `inset 0 0 20px rgba(${rgbColor}, 0.2), 0 4px 15px rgba(0,0,0,0.1), 0 0 10px rgba(${rgbColor}, 0.3)`,
                                border: `1px solid rgba(${rgbColor}, 0.4)`,
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: `${Math.max(0.65, bubble.size / 100)}rem`,
                                fontWeight: '600',
                                padding: '8px',
                            }}
                        >
                            <span style={{ lineHeight: 1.1 }}>{bubble.skill}</span>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
};

const Hero = () => {
  return (
    <section id="home" className="section-wrapper" style={{ alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      
      <HeroFloatingSkills />
      
      <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto', opacity: 1, animation: 'fadeIn 1s ease', position: 'relative', zIndex: 10 }}>
        <LiquidGlassWrapper
          glassProps={{
            intensity: 0.5,
            blur: 20,
            padding: '4rem 2rem',
            glassClassName: 'glass-hero',
            style: {
              borderRadius: '32px',
              textAlign: 'center',
              flexDirection: 'column'
            }
          }}
        >
          {/* Profile Photo */}
          <div className="hero-pic" style={{
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            border: '3px solid rgba(255, 255, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem auto',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(6, 182, 212, 0.2)',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(6,182,212,0.3))',
          }}>
            <img
              src={myPicture}
              alt="Shivanand Verma"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                borderRadius: '50%',
              }}
            />
          </div>

          <motion.h1 
            className="gradient-text hero-title"
            style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '0.75rem' }}
          >
            Shivanand Verma
          </motion.h1>
          
          <p className="hero-subtitle" style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '1.5rem',
            fontWeight: '500'
          }}>
            B.Tech in Computer Science & Engineering (AI/ML)
          </p>

          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '1.5rem'
          }}>
            {['AI/ML Enthusiast', 'Full Stack Developer', 'Competitive Programmer'].map((tag, i) => (
              <span key={i} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="hero-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                padding: '12px 32px',
                borderRadius: '30px',
                fontWeight: '600',
                color: '#fff',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Contact Me
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/starkbbk"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '12px 32px',
                borderRadius: '30px',
                fontWeight: '600',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </motion.a>
          </div>
        </LiquidGlassWrapper>
      </div>
    </section>
  );
};

export default Hero;
