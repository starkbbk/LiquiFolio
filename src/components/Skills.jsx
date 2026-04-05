import React from 'react';
import LiquidGlassWrapper from './LiquidGlassWrapper';

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
    <section id="skills" className="section-wrapper container">
      <h2 className="section-title gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>Technical Skills</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '3rem',
        alignItems: 'start'
      }}>
        {skillsData.map((category, index) => (
          <div
            key={category.category}
            style={{ width: '100%', animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`, opacity: 0 }}
          >
            <LiquidGlassWrapper
              glassProps={{
                intensity: 0.3,
                blur: 10,
                padding: '2.5rem',
                style: {
                  borderRadius: '28px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.03)', // MORE TRANSLUCENT
                  backdropFilter: 'blur(6px)', // MORE TRANSLUCENT
                  WebkitBackdropFilter: 'blur(6px)',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }
              }}
            >
              <h3 style={{
                color: category.color,
                marginBottom: '1.5rem',
                fontSize: '1.4rem',
                fontWeight: '700'
              }}>
                {category.category}
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {category.skills.map(skill => (
                  <div
                    key={skill}
                    style={{
                      background: `rgba(${parseInt(category.color.slice(1,3), 16)}, ${parseInt(category.color.slice(3,5), 16)}, ${parseInt(category.color.slice(5,7), 16)}, 0.1)`,
                      color: 'rgba(255, 255, 255, 0.9)',
                      padding: '7px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      border: `1px solid rgba(${parseInt(category.color.slice(1,3), 16)}, ${parseInt(category.color.slice(3,5), 16)}, ${parseInt(category.color.slice(5,7), 16)}, 0.3)`,
                      backdropFilter: 'blur(5px)',
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </LiquidGlassWrapper>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
