import React from 'react';
import LiquidGlassWrapper from './LiquidGlassWrapper';

const projectsData = [
  {
    title: 'Web-UI-Transformer-Extension',
    description: 'A browser extension for applying high-end Liquid Glass UI effects to any web component with interactive rendering filters.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Web APIs'],
    link: 'https://github.com/starkbbk/Web-UI-Transformer-Extension'
  },
  {
    title: 'Tech-Stack-Analyzer',
    description: 'A full-stack AI-powered application that seamlessly scans and analyzes website technology stacks using OpenRouter API.',
    tech: ['TypeScript', 'React', 'Node.js', 'AI'],
    link: 'https://github.com/starkbbk/Tech-Stack-Analyzer'
  },
  {
    title: 'AI-Code-Vulnerability-Scanner',
    description: 'Python based Code Vulnerability Scanner that automatically detects and resolves vulnerabilities using intelligent static analysis.',
    tech: ['JavaScript', 'Python', 'AI', 'Security'],
    link: 'https://github.com/starkbbk/AI-Code-Vulnerability-Scanner'
  },
  {
    title: 'VoiceAI-Assistant',
    description: 'A RAG-enabled production-ready Voice Assistant using gemma-3-4b-it model, built for high-performance and seamless voice interaction.',
    tech: ['JavaScript', 'RAG', 'Voice AI', 'LLM'],
    link: 'https://github.com/starkbbk/VoiceAI-Assistant'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section-wrapper container">
      <h2 className="section-title gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>Featured Projects</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '3rem',
        alignItems: 'start' // Prevent stretching vertically
      }}>
        {projectsData.map((project, index) => (
          <div
            key={project.title}
            style={{ width: '100%', animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`, opacity: 0 }}
          >
            <LiquidGlassWrapper
              glassProps={{
                intensity: 0.25,
                blur: 12,
                padding: '2.5rem',
                style: {
                  borderRadius: '28px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
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
                  {project.title.replace(/-/g, ' ')}
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
              
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginTop: 'auto',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 0.3s',
                  alignSelf: 'flex-start'
                }}
                onMouseEnter={(e) => e.target.style.borderColor = '#fff'}
                onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                View Repository
              </a>
            </LiquidGlassWrapper>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
