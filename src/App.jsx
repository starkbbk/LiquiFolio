import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import MotionCanvas from './components/MotionCanvas';
import CatastropheEngine from './components/CatastropheEngine';

function App() {
  return (
    <>
      <CatastropheEngine />
      <MotionCanvas />

      {/* Vibrant Background Blobs */}
      <div className="blob-container">
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
