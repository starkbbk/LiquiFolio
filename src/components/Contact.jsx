import React from 'react';
import { motion } from 'framer-motion';
import LiquidGlassWrapper from './LiquidGlassWrapper';

const Contact = () => {
  const socials = [
    {
      name: 'GitHub',
      link: 'https://github.com/starkbbk',
      color: '#ffffff',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      link: 'https://linkedin.com/in/starkbbk',
      color: '#0a66c2',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'LeetCode',
      link: 'https://leetcode.com/u/starkbbk/',
      color: '#ffa116',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 1.558 5.253 5.253 0 0 0 2.059 3.493L12.3 23.784a.954.954 0 0 0 .583.216.892.892 0 0 0 .611-.237.899.899 0 0 0 .252-.619V1.954a.897.897 0 0 0-.252-.618A.896.896 0 0 0 13.483 0zm4.281 7.275a5.558 5.558 0 0 0-1.895-.898v11.026c0 .484-.393.882-.878.882-.486 0-.877-.398-.877-.882V6.26l-5.111-5.11-.282-.284v22.2l5.485-5.321v-4.577a.892.892 0 0 0-.236-.61.89.89 0 0 0-.612-.236c-.244 0-.47.1-.634.283l-2.071 2.228-2.618 2.805a3.253 3.253 0 0 1-1.309-2.193 3.23 3.23 0 0 1 .09-1.261 3.242 3.242 0 0 1 .744-1.322l3.854-4.126 5.405-5.789a3.527 3.527 0 0 1 1.258.625l2.096 1.488a.892.892 0 0 0 .524.168c.49 0 .888-.398.888-.888 0-.276-.127-.523-.327-.69l-3.23-2.298z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      link: 'mailto:shivanand@example.com',
      color: '#ea4335',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    }
  ];

  return (
    <section id="contact" className="section-wrapper container" style={{ paddingBottom: '100px' }}>
      <div style={{ width: '100%', animation: 'fadeIn 1s ease', opacity: 1 }}>
        <LiquidGlassWrapper
          glassProps={{
            intensity: 0.4,
            blur: 20,
            padding: '5rem 3rem',
            glassClassName: 'glass-contact',
            style: {
              borderRadius: '32px',
              textAlign: 'center',
              maxWidth: '1000px',
              margin: '0 auto',
              flexDirection: 'column'
            }
          }}
        >
          <h2 className="section-title gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Let's Connect</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem', fontSize: '1.1rem' }}>
            Open for opportunities and collaborations. Let's build something amazing together.
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: `rgba(${parseInt(social.color.slice(1,3), 16) || 255}, ${parseInt(social.color.slice(3,5), 16) || 255}, ${parseInt(social.color.slice(5,7), 16) || 255}, 0.1)`,
                  padding: '12px 24px',
                  borderRadius: '30px',
                  color: social.color,
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: `1px solid rgba(${parseInt(social.color.slice(1,3), 16) || 255}, ${parseInt(social.color.slice(3,5), 16) || 255}, ${parseInt(social.color.slice(5,7), 16) || 255}, 0.3)`,
                  boxShadow: `0 4px 15px rgba(${parseInt(social.color.slice(1,3), 16) || 255}, ${parseInt(social.color.slice(3,5), 16) || 255}, ${parseInt(social.color.slice(5,7), 16) || 255}, 0.2)`
                }}
              >
                {social.icon}
                {social.name}
              </motion.a>
            ))}
          </div>
          
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '2rem',
            color: 'rgba(255,255,255,0.5)',
            fontStyle: 'italic'
          }}>
            "Code is like humor. When you have to explain it, it’s bad."
          </div>
        </LiquidGlassWrapper>
      </div>
    </section>
  );
};

export default Contact;
