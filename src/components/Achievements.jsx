import React from 'react';
import LiquidGlassWrapper from './LiquidGlassWrapper';

const achievementsData = [
  {
    title: 'AIST Contest – International Rank 1 (2024 & 2025)',
    description: 'Secured 1st place consecutively among global participants in a highly competitive international knowledge & innovation challenge; awarded $3,000 each year, accumulating $6,000 in total merit-based prize money across 2 consecutive editions.',
    color: '#a855f7' // purple
  },
  {
    title: 'Amazon ML Summer School 2025',
    description: 'Selected among top applicants nationwide; trained in ML, NLP, CV, and RL by Amazon scientists.',
    color: '#f59e0b' // orange
  },
  {
    title: 'Competitive Programming',
    description: '600+ problems on LeetCode; HackerRank: 5-Star Problem Solving, 5-Star C++, 4-Star C.',
    color: '#06b6d4' // cyan
  },
  {
    title: 'Salesforce Trailhead',
    description: 'Adventurer & Agentblazer Champion Badge Holder – demonstrated expertise in Salesforce AI Agent ecosystem and CRM automation via hands-on Trailhead modules.',
    color: '#10b981' // green
  },
  {
    title: 'Coursera Certifications',
    description: 'Completed Unsupervised Learning, Recommenders, and Reinforcement Learning.',
    color: '#ec4899' // pink
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="section-wrapper container">
      <h2 className="section-title gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>Achievements & Certifications</h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {achievementsData.map((item, index) => (
          <div
            key={index}
            style={{ width: '100%', animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`, opacity: 0 }}
          >
            <LiquidGlassWrapper
              glassProps={{
                intensity: 0.2,
                blur: 15,
                padding: '2.5rem',
                style: {
                  borderRadius: '28px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'flex-start'
                }
              }}
            >
              <div style={{
                background: `rgba(${parseInt(item.color.slice(1,3), 16)}, ${parseInt(item.color.slice(3,5), 16)}, ${parseInt(item.color.slice(5,7), 16)}, 0.1)`,
                color: item.color,
                padding: '12px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 20px rgba(${parseInt(item.color.slice(1,3), 16)}, ${parseInt(item.color.slice(3,5), 16)}, ${parseInt(item.color.slice(5,7), 16)}, 0.3)`
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 15l-2 5l9-9l-9-9l2 5h-12z" transform="rotate(-90 12 12)"/>
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              
              <div>
                <h3 style={{
                  color: '#fff',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {item.description}
                </p>
              </div>
            </LiquidGlassWrapper>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
