import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import MotionCanvas from './components/MotionCanvas';
import CatastropheEngine from './components/CatastropheEngine';

function App() {
  const blobRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!blobRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / maxScroll;
      const hue = scrollPercent * 360;
      blobRef.current.style.filter = `hue-rotate(${hue}deg) blur(150px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <CatastropheEngine />
      <MotionCanvas />

      {/* Single Background Glow - color shifts on scroll */}
      <div className="blob-container" ref={blobRef}>
        <div className="blob blob-1"></div>
      </div>

      {/* Custom Mouse Cursor */}
      <Cursor />

      {/* Main Content */}
      <Navbar />
      
      <main>
        <Hero />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}

export default App;
