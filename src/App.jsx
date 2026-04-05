import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import bgImage from './assets/bg.png';

function App() {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  return (
    <>
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      {/* Custom Mouse Cursor */}
      <Cursor />

      {/* Main Content */}
      <Navbar />
      
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}

export default App;
