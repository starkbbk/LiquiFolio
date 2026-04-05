import React, { useEffect, useRef, useState } from 'react';
import LiquidGlassWrapper from './LiquidGlassWrapper';
import Matter from 'matter-js';

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r}, ${g}, ${b}`;
};

const SkillPhysicsCard = ({ category }) => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const elementsRef = useRef({});

  // Establish bounds dynamically using ResizeObserver
  useEffect(() => {
    if (!sceneRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    observer.observe(sceneRef.current);
    
    // Initial size
    setDimensions({
       width: sceneRef.current.clientWidth,
       height: sceneRef.current.clientHeight
    });

    return () => observer.disconnect();
  }, []);

  // Initialize and run Physics Engine when dimensions exist
  useEffect(() => {
    if (!sceneRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const Engine = Matter.Engine,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Events = Matter.Events;

    const engine = Engine.create();
    engineRef.current = engine;
    
    // Zero gravity for fluid space anti-gravity effect
    engine.gravity.y = 0; 
    engine.gravity.x = 0;

    const rgbColor = hexToRgb(category.color);
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;

    const walls = [
      // Top
      Bodies.rectangle(cx, -25, dimensions.width * 2, 50, { isStatic: true, render: { visible: false } }),
      // Bottom
      Bodies.rectangle(cx, dimensions.height + 25, dimensions.width * 2, 50, { isStatic: true, render: { visible: false } }),
      // Left
      Bodies.rectangle(-25, cy, 50, dimensions.height * 2, { isStatic: true, render: { visible: false } }),
      // Right
      Bodies.rectangle(dimensions.width + 25, cy, 50, dimensions.height * 2, { isStatic: true, render: { visible: false } })
    ];

    const bubbleBodies = category.skills.map((skill, index) => {
       // Strings natively calculate custom scale bounds
       const baseRadius = 40;
       const dynamicRadius = baseRadius + (skill.length * 2.2);
       
       // Scatter slightly so they pop and collide randomly at start
       const startX = cx + (Math.random() - 0.5) * (dimensions.width * 0.6);
       const startY = cy + (Math.random() - 0.5) * (dimensions.height * 0.6);

       return Bodies.circle(startX, startY, dynamicRadius, {
          restitution: 0.9, // strong bounce back
          frictionAir: 0.05, // minor air resistance so they drag in space
          mass: dynamicRadius * 0.1, // larger -> heavier
          plugin: {
             skill: skill,
             radius: dynamicRadius
          }
       });
    });

    Composite.add(engine.world, [...walls, ...bubbleBodies]);

    // Attach native DOM interactions mapped to bounding bodies
    const mouse = Mouse.create(sceneRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2, // Elastic grab
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);

    // Apply fluid continuous drifting
    Events.on(engine, 'beforeUpdate', () => {
       bubbleBodies.forEach(body => {
          if (Math.random() > 0.94) {
             const maxForce = 0.001 * body.mass;
             Matter.Body.applyForce(body, body.position, {
                 x: (Math.random() - 0.5) * maxForce,
                 y: (Math.random() - 0.5) * maxForce
             });
          }
       });
    });

    // Scroll inertia physics
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
       const currentScrollY = window.scrollY;
       const scrollDelta = currentScrollY - lastScrollY;
       
       if (Math.abs(scrollDelta) > 0) {
          bubbleBodies.forEach(body => {
             // Force is opposite to scroll direction matching inertia
             const forceMagnitude = Math.abs(scrollDelta) * 0.00003 * body.mass;
             const directionY = scrollDelta > 0 ? -1 : 1; 

             Matter.Body.applyForce(body, body.position, {
                 x: 0,
                 y: forceMagnitude * directionY
             });
          });
       }
       lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Custom pure synchronized DOM translation loop avoiding React setStates
    let animationFrame;
    const renderLoop = () => {
       // Fixed time-step
       Engine.update(engine, 1000 / 60);

       bubbleBodies.forEach(body => {
          const domElement = elementsRef.current[body.plugin.skill];
          if (domElement) {
             const x = body.position.x - body.plugin.radius;
             const y = body.position.y - body.plugin.radius;
             domElement.style.transform = `translate(${x}px, ${y}px)`;
          }
       });

       animationFrame = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
       window.removeEventListener('scroll', handleScroll);
       cancelAnimationFrame(animationFrame);
       Engine.clear(engine);
       Mouse.clearSourceEvents(mouse);
    };
  }, [category, dimensions]);

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden' }} ref={sceneRef}>
      {category.skills.map((skill) => {
         const baseRadius = 40;
         const dynamicRadius = baseRadius + (skill.length * 2.2);
         const diameter = dynamicRadius * 2;
         const rgbColor = hexToRgb(category.color);
         
         return (
            <div
              key={skill}
              ref={el => elementsRef.current[skill] = el}
              className="physics-bubble"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${diameter}px`,
                height: `${diameter}px`,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                background: `rgba(${rgbColor}, 0.15)`,
                boxShadow: `inset 0 0 20px rgba(${rgbColor}, 0.2), 0 4px 15px rgba(0,0,0,0.2), 0 0 10px rgba(${rgbColor}, 0.4)`,
                border: `1px solid rgba(${rgbColor}, 0.4)`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#fff',
                fontSize: `${Math.max(0.75, Math.min(1.1, diameter/100))}rem`,
                fontWeight: '600',
                padding: '10px',
                userSelect: 'none',
                cursor: 'grab',
                pointerEvents: 'auto',
                transition: 'box-shadow 0.3s ease, background 0.3s ease',
                zIndex: 10 // sit above the glass
              }}
              onMouseEnter={(e) => {
                 e.currentTarget.style.background = `rgba(${rgbColor}, 0.25)`;
                 e.currentTarget.style.boxShadow = `inset 0 0 25px rgba(${rgbColor}, 0.4), 0 8px 25px rgba(0,0,0,0.3), 0 0 15px rgba(${rgbColor}, 0.6)`;
                 e.currentTarget.style.transform = e.currentTarget.style.transform + ' scale(1.05)';
              }}
              onMouseLeave={(e) => {
                 e.currentTarget.style.background = `rgba(${rgbColor}, 0.15)`;
                 e.currentTarget.style.boxShadow = `inset 0 0 20px rgba(${rgbColor}, 0.2), 0 4px 15px rgba(0,0,0,0.2), 0 0 10px rgba(${rgbColor}, 0.4)`;
                 // Scaling is removed organically down loop cycles via continuous translates, but just safe guard:
              }}
              onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
              onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
            >
              <span style={{ pointerEvents: 'none', lineHeight: 1.2 }}>{skill}</span>
            </div>
         );
      })}
    </div>
  );
}

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

const Skills = () => {
  return (
    <section id="skills" style={{ width: '100%', maxWidth: 'none', margin: '0', padding: '0 2rem', alignItems: 'stretch' }} className="section-wrapper">
      <h2 className="section-title gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>Technical Skills</h2>
      
      <div className="skills-grid-layout">
        {skillsData.map((category, index) => (
          <div
            key={category.category}
            className={index === skillsData.length - 1 && skillsData.length % 2 !== 0 ? 'col-span-2' : ''}
            style={{
              width: '100%',
              display: 'flex',
              animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`,
              opacity: 0
            }}
          >
            <LiquidGlassWrapper
              glassProps={{
                intensity: 0.3,
                blur: 10,
                padding: '2.5rem',
                glassClassName: 'glass-skills',
                style: {
                  borderRadius: '28px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                  display: 'flex',
                  flex: 1
                }
              }}
            >
              <h3 style={{
                color: category.color,
                marginBottom: '0.5rem',
                fontSize: '1.4rem',
                fontWeight: '700',
                position: 'relative',
                zIndex: 20
              }}>
                {category.category}
              </h3>
              
              <SkillPhysicsCard category={category} />
            </LiquidGlassWrapper>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
