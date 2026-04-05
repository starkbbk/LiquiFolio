import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LiquidGlassWrapper from './LiquidGlassWrapper';
import ElementalCanvas from './ElementalCanvas';
import ReactMarkdown from 'react-markdown';

const projectsData = [
  {
    title: 'Web-UI-Transformer-Extension',
    theme: 'lightning',
    emoji: '🪄',
    description: 'A browser extension for applying high-end Liquid Glass UI effects to any web component with interactive rendering filters.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Web APIs'],
    link: 'https://github.com/starkbbk/Web-UI-Transformer-Extension',
    sound: '/sounds/Lightning.mp3',
    features: [
      'Injects realistic glassmorphism dynamically',
      'Customizable blur and refraction levels',
      'Optimized performance using CSS filters'
    ],
    installation: 'Clone and load unpacked extension in Chrome.',
    usage: 'Click extension icon and select elements to transform.'
  },
  {
    title: 'Tech-Stack-Analyzer',
    theme: 'fire',
    emoji: '🔍',
    description: 'A full-stack AI-powered application that seamlessly scans and analyzes website technology stacks using OpenRouter API.',
    tech: ['TypeScript', 'React', 'Node.js', 'AI'],
    link: 'https://github.com/starkbbk/Tech-Stack-Analyzer',
    sound: '/sounds/Fire.mp3',
    features: [
      'Automatic technology stack detection',
      'AI-driven alternative suggestions',
      'Exportable comprehensive technical reports'
    ],
    installation: 'npm install && npm run dev',
    usage: 'Paste a target URL in the field, hit Scan.'
  },
  {
    title: 'AI-Code-Vulnerability-Scanner',
    theme: 'water',
    emoji: '🛡️',
    description: 'Python based Code Vulnerability Scanner that automatically detects and resolves vulnerabilities using intelligent static analysis.',
    tech: ['JavaScript', 'Python', 'AI', 'Security'],
    link: 'https://github.com/starkbbk/AI-Code-Vulnerability-Scanner',
    sound: '/sounds/Water.mp3',
    features: [
      'Static codebase analysis',
      'LLM integration to patch vulnerabilities automatically',
      'Generates detailed vulnerability reports'
    ],
    installation: 'pip install -r requirements.txt',
    usage: 'python scanner.py --target /path/to/code'
  },
  {
    title: 'VoiceAI-Assistant',
    theme: 'wind',
    emoji: '🎙️',
    description: 'A RAG-enabled production-ready Voice Assistant using gemma-3-4b-it model, built for high-performance and seamless voice interaction.',
    tech: ['JavaScript', 'RAG', 'Voice AI', 'LLM'],
    link: 'https://github.com/starkbbk/VoiceAI-Assistant',
    sound: '/sounds/Sand.mp3',
    features: [
      'Low latency voice-to-voice interaction',
      'RAG pipeline for specialized domain knowledge',
      'Interruption handling and stt/tts streaming'
    ],
    installation: 'npm run setup:backend && npm run start',
    usage: 'Grant microphone access and say Hello.'
  }
];

const currentAudioRef = { current: null }; // Module-level ref — shared across all cards

const ProjectCard = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipComplete, setFlipComplete] = useState(false);
  const [readmeContent, setReadmeContent] = useState('');
  const [loadingReadme, setLoadingReadme] = useState(false);
  const [readmeFailed, setReadmeFailed] = useState(false);

  const playSound = (soundPath) => {
    // Stop any currently playing audio first
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    
    console.log(`[Audio] Attempting to play: ${soundPath}`);
    const audio = new Audio(soundPath);
    audio.volume = 0.15;
    audio.currentTime = 0;
    audio.play()
      .then(() => console.log(`[Audio] Playing: ${soundPath}`))
      .catch((err) => {
        console.warn(`[Audio] Playback blocked or failed for ${soundPath}:`, err);
      });
    currentAudioRef.current = audio;
  };

  useEffect(() => {
    if (isFlipped && !readmeContent && !loadingReadme && !readmeFailed) {
      setLoadingReadme(true);
      const repoName = project.link.split('/').pop();
      fetch(`https://raw.githubusercontent.com/starkbbk/${repoName}/main/README.md`)
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.text();
        })
        .then(text => {
          setReadmeContent(text);
          setLoadingReadme(false);
        })
        .catch(() => {
          // Fallback to master if main fails
          fetch(`https://raw.githubusercontent.com/starkbbk/${repoName}/master/README.md`)
            .then(res => {
               if (!res.ok) throw new Error('Not found');
               return res.text();
            })
            .then(text => {
               setReadmeContent(text);
               setLoadingReadme(false);
            })
            .catch(() => {
               setReadmeFailed(true);
               setLoadingReadme(false);
            });
        });
    }
  }, [isFlipped, project.link, readmeContent, loadingReadme, readmeFailed]);

  const flipCard = (e) => {
    // Stop propagation so clicking the button inside doesn't trigger parent click
    if (e) e.stopPropagation();
    
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    if (!newFlippedState) {
      setFlipComplete(false); // reset instantly when flipping back
      
      // STOP audio on unflip
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
      }
    } else {
      // PLAY audio only on flip to back
      if (project.sound) playSound(project.sound);
    }
    
    // Broadcast Catastrophe Engine Signal globally
    window.dispatchEvent(
      new CustomEvent('triggerWeather', { 
        detail: { theme: project.theme, active: newFlippedState } 
      })
    );
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`, 
        opacity: 0,
        perspective: '1200px', // Crucial for 3D flip effect
        height: '460px' // Fixed height so absolute children don't collapse the layout
      }}
    >
      <motion.div
        layout
        initial={false}
        animate={{ rotateY: isFlipped ? 900 : 0 }} 
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }} // smooth coin-spin flip (2.5 spins)
        onAnimationComplete={() => {
          if (isFlipped) setFlipComplete(true);
        }}
        style={{
          width: '100%',
          height: '100%', // Match container height perfectly
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          position: 'relative',
          cursor: isFlipped ? 'default' : 'pointer'
        }}
        onClick={!isFlipped ? flipCard : undefined} // Only click front side to flip
      >
        
        {/* FRONT FACE */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(1px)',
          WebkitTransform: 'translateZ(1px)',
          height: '100%'
        }}>
          <LiquidGlassWrapper
            glassProps={{
              intensity: 0.25,
              blur: 12,
              padding: '2.5rem',
              glassClassName: 'glass-projects mobile-glass-padding',
              style: {
                borderRadius: '28px',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                height: '100%',
                boxSizing: 'border-box'
              }
            }}
          >
            <div>
              <h3 style={{
                color: '#fff',
                marginBottom: '1rem',
                fontSize: '1.4rem',
                fontWeight: '700'
              }}>
                {project.emoji} {project.title.replace(/-/g, ' ')}
              </h3>
              
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {project.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
                {project.tech.map(tech => (
                  <div
                    key={tech}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#a855f7',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 'auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              
              {/* Blinking Arrow pointing down */}
              <div style={{ animation: 'bounceBlink 1.5s infinite ease-in-out' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </div>

              {/* Action Button */}
              <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  color: '#fff',
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(168,85,247,0.2))',
                  border: '1px solid rgba(236,72,153,0.3)',
                  padding: '14px 24px',
                  borderRadius: '20px',
                  width: '100%',
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 20px rgba(236, 72, 153, 0.15)',
                  transition: 'all 0.3s ease'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21L21.5 8"/>
                </svg>
                <span style={{ color: '#ec4899' }}>Click to Flip</span>
              </div>
            </div>
          </LiquidGlassWrapper>
        </div>

        {/* BACK FACE */}
        <div 
          onClick={flipCard} // Click anywhere on back face to flip back
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(1px)',
            WebkitTransform: 'rotateY(180deg) translateZ(1px)',
            height: '100%',
            cursor: 'pointer' // Indicate interactivity
          }}
        >
          <LiquidGlassWrapper
            glassProps={{
              intensity: 0.25,
              blur: 12,
              padding: '2rem',
              glassClassName: `glass-projects theme-${project.theme} mobile-glass-padding`,
              style: {
                borderRadius: '28px',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                height: '100%',
                boxSizing: 'border-box'
              }
            }}
          >
            <ElementalCanvas theme={project.theme} isActive={isFlipped} flipComplete={flipComplete} />
            <h3 style={{
              color: '#fff',
              marginBottom: '1rem',
              fontSize: '1.2rem',
              fontWeight: '700'
            }}>
              {project.emoji} README.md
            </h3>
            
            <div style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.85rem',
              lineHeight: '1.5',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
              overflowY: 'auto',
              flexGrow: 1, // take remaining space so buttons stay at bottom
              paddingRight: '5px' // prevent scrollbar from hitting text
            }}>
              {loadingReadme && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#06b6d4', flexDirection: 'column', gap: '8px' }}>
                  <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="4.93" x2="19.07" y2="7.76"></line>
                  </svg>
                  <span>Fetching README...</span>
                </div>
              )}
              
              {!loadingReadme && !readmeFailed && readmeContent && (
                <div style={{ cursor: 'text', position: 'relative', zIndex: 5, fontSize: '1rem', lineHeight: '1.6' }} onClick={(e) => e.stopPropagation()}>
                  <ReactMarkdown
                    components={{
                       h1: ({node, ...props}) => <h1 style={{fontSize: '1.6rem', color: '#fff', margin: '0.75rem 0'}} {...props}/>,
                       h2: ({node, ...props}) => <h2 style={{fontSize: '1.4rem', color: '#fff', margin: '0.75rem 0'}} {...props}/>,
                       h3: ({node, ...props}) => <h3 style={{fontSize: '1.2rem', color: '#fff', margin: '0.75rem 0'}} {...props}/>,
                       p: ({node, ...props}) => <p style={{margin: '0.75rem 0', fontSize: '1.05rem'}} {...props}/>,
                       ul: ({node, ...props}) => <ul style={{paddingLeft: '1.5rem', margin: '0.75rem 0', fontSize: '1.05rem'}} {...props}/>,
                       li: ({node, ...props}) => <li style={{margin: '0.4rem 0'}} {...props}/>,
                       a: ({node, ...props}) => <a style={{color: '#06b6d4', textDecoration: 'underline', fontSize: '1.05rem'}} target="_blank" rel="noopener noreferrer" {...props}/>,
                       code: ({node, ...props}) => <code style={{background: 'rgba(0,0,0,0.3)', padding: '3px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.95rem'}} {...props}/>,
                       pre: ({node, ...props}) => <pre style={{background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', overflowX: 'auto', margin: '0.75rem 0'}} {...props}/>,
                    }}
                  >
                    {readmeContent}
                  </ReactMarkdown>
                </div>
              )}

              {readmeFailed && (
                <>
                  <div>
                    <strong style={{ color: '#fff' }}>✅ Key Features:</strong>
                    <ul style={{ paddingLeft: '1.5rem', marginTop: '4px' }}>
                      {project.features.map(f => <li key={f} style={{marginBottom: "2px"}}>{f}</li>)}
                    </ul>
                  </div>
                  
                  <div>
                    <strong style={{ color: '#fff' }}>📦 Installation:</strong>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '4px', fontFamily: 'monospace', marginTop: '4px', color: '#06b6d4', wordBreak: 'break-word', cursor: 'text' }} onClick={(e) => e.stopPropagation()}>
                      {project.installation}
                    </div>
                  </div>

                  <div>
                    <strong style={{ color: '#fff' }}>🚀 Usage:</strong>
                    <p style={{ marginTop: '4px' }}>{project.usage}</p>
                  </div>
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', width: '100%', position: 'relative' }}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Safe link click
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '10px 20px',
                  borderRadius: '24px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '600',
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
              </a>

              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '10px',
                fontSize: '11px',
                opacity: 0.4,
                color: 'white',
                pointerEvents: 'none'
              }}>
                tap anywhere to go back
              </div>
            </div>
          </LiquidGlassWrapper>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section-wrapper container">
      <h2 className="section-title gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>Featured Projects</h2>
      
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
