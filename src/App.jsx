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
    let fadeTimer = null;

    const handleScroll = () => {
      if (!blobRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / maxScroll;
      const hue = scrollPercent * 360;

      // Light up blobs on scroll
      const blobs = blobRef.current.querySelectorAll('.blob');
      blobs.forEach(blob => {
        blob.style.opacity = '0.4';
      });
      blobRef.current.style.filter = `hue-rotate(${hue}deg)`;

      // Fade back to dark after scrolling stops
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => {
        blobs.forEach(blob => {
          blob.style.opacity = '0.05';
        });
      }, 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(fadeTimer);
    };
  }, []);
  return (
    <>
      <CatastropheEngine />
      <MotionCanvas />

      {/* Vibrant Background Blobs */}
      <div className="blob-container" ref={blobRef}>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="blob blob-5"></div>
        <div className="blob blob-6"></div>
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
