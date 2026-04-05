import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: -100,
    y: -100,
  });

  const [followerPosition, setFollowerPosition] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const updateFollower = () => {
      setFollowerPosition((prev) => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateFollower);
    };
    updateFollower();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          pointerEvents: 'none',
          boxShadow: '0 0 10px rgba(255,255,255,0.8)',
          zIndex: 9999,
          translateX: mousePosition.x - 4,
          translateY: mousePosition.y - 4,
        }}
      />
      {/* Glow Follower */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
          zIndex: 9998,
          translateX: followerPosition.x - 20,
          translateY: followerPosition.y - 20,
        }}
      />
    </>
  );
};

export default Cursor;
