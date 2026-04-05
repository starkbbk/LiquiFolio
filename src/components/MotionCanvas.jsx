import React, { useEffect, useRef } from 'react';

const MotionCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // SCROLL PHYSICS
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let scrollVelocity = 0;
    
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initEntities(); // Reinitialize positions on resize
    };
    window.addEventListener('resize', handleResize);

    // COLOR ZONES (Bg Red, Green, Blue | Particle Red, Green, Blue)
    const zones = [
      { br: 13, bg: 27, bb: 42, pr: 200, pg: 255, pb: 255 }, // Deep Blue / Cyan Particles
      { br: 26, bg: 10, bb: 46, pr: 200, pg: 100, pb: 255 }, // Purple Nebula / Violet Particles
      { br: 10, bg: 42, bb: 26, pr: 100, pg: 255, pb: 150 }, // Teal Green / Emerald Particles
      { br: 42, bg: 13, bb: 10, pr: 255, pg: 150, pb: 100 }, // Deep Red / Coral Particles
      { br: 13, bg: 27, bb: 42, pr: 200, pg: 255, pb: 255 }  // Back to Blue
    ];

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const getCurrentColors = () => {
      const docHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight, 
        height * 2
      );
      const maxScroll = docHeight - height;
      let percent = maxScroll > 0 ? currentScrollY / maxScroll : 0;
      percent = Math.max(0, Math.min(1, percent)); // Clamp 0 to 1

      let scaled = percent * (zones.length - 1);
      let index = Math.floor(scaled);
      index = Math.max(0, Math.min(zones.length - 2, index));
      let fraction = scaled - index;

      const z1 = zones[index];
      const z2 = zones[index + 1];

      return {
        bg: `rgb(${lerp(z1.br, z2.br, fraction)}, ${lerp(z1.bg, z2.bg, fraction)}, ${lerp(z1.bb, z2.bb, fraction)})`,
        pColor: `${lerp(z1.pr, z2.pr, fraction)}, ${lerp(z1.pg, z2.pg, fraction)}, ${lerp(z1.pb, z2.pb, fraction)}`
      };
    };

    // --- ENTITY ALLOCATIONS ---
    let particles = [];
    let bokehs = [];
    let waves = [];
    let streaks = [];
    let auroras = [];

    const initEntities = () => {
      particles = [];
      for(let i=0; i<90; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1 + 0.5,
          history: [],
          size: Math.random() * 2 + 1
        });
      }

      bokehs = [];
      for(let i=0; i<25; i++) {
        bokehs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 35 + 5,
          speed: Math.random() * 0.5 + 0.1,
          angle: Math.random() * Math.PI * 2
        });
      }

      waves = [];
      for(let i=0; i<7; i++) {
        waves.push({
          yBase: Math.random() * height * 0.8 + height * 0.1,
          amplitude: Math.random() * 100 + 50,
          frequency: Math.random() * 0.005 + 0.001,
          speed: Math.random() * 0.02 + 0.005,
          offset: Math.random() * Math.PI * 2
        });
      }

      auroras = [];
      for(let i=0; i<5; i++) {
        auroras.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * width * 0.4 + width * 0.2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };
    initEntities();

    let time = 0;

    // --- RENDER LOOP ---
    const render = () => {
      time += 1;
      
      // Determine physics velocities
      // Smoothly catch up currentScroll to targetScroll to evaluate scrollVelocity
      let diff = targetScrollY - currentScrollY;
      currentScrollY += diff * 0.1; 
      scrollVelocity = diff * 0.1; // Represents intensity of movement
      let speedMultiplier = 1 + Math.abs(scrollVelocity) * 0.15; // Speed up when scrolling fast
      
      const colors = getCurrentColors();

      // Clear Canvas fully to background color
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);

      // 1. AURORA BLOBS
      auroras.forEach((aurora, i) => {
        aurora.x += aurora.vx * speedMultiplier * 0.5;
        aurora.y += aurora.vy * speedMultiplier * 0.5;
        // Bounce bounds
        if(aurora.x < -aurora.radius) aurora.vx *= -1;
        if(aurora.x > width + aurora.radius) aurora.vx *= -1;
        if(aurora.y < -aurora.radius) aurora.vy *= -1;
        if(aurora.y > height + aurora.radius) aurora.vy *= -1;

        const grad = ctx.createRadialGradient(aurora.x, aurora.y, 0, aurora.x, aurora.y, aurora.radius);
        grad.addColorStop(0, `rgba(${colors.pColor}, 0.15)`); // Very soft
        grad.addColorStop(1, `rgba(${colors.pColor}, 0)`);
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(aurora.x, aurora.y, aurora.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. WAVE LINES
      ctx.lineWidth = 1.5;
      waves.forEach((wave, i) => {
        wave.offset += wave.speed * speedMultiplier * 0.2;
        ctx.beginPath();
        let scrollDistortion = scrollVelocity * 0.5; // Distort height of wave based on scroll direction
        
        for(let x = 0; x <= width; x += 20) {
          let y = wave.yBase + Math.sin(x * wave.frequency + wave.offset) * (wave.amplitude + scrollDistortion);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${colors.pColor}, 0.08)`;
        ctx.stroke();
      });

      // 3. LIGHT STREAKS (Sporadic shooting stars)
      // spawn randomly, specifically heavily when scrolling fast
      if (Math.random() < 0.01 * speedMultiplier) {
        streaks.push({
          x: Math.random() * width,
          y: -50,
          vx: Math.random() * 10 + 5,
          vy: Math.random() * 10 + 10,
          length: Math.random() * 200 + 100,
          alpha: 0.3
        });
      }
      
      for(let i=streaks.length-1; i>=0; i--) {
        let s = streaks[i];
        s.x += s.vx * speedMultiplier;
        s.y += s.vy * speedMultiplier;
        s.alpha -= 0.005; // fade out

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length * (s.vx/s.vy), s.y - s.length);
        
        const streakGrad = ctx.createLinearGradient(s.x, s.y, s.x - s.length * (s.vx/s.vy), s.y - s.length);
        streakGrad.addColorStop(0, `rgba(${colors.pColor}, ${s.alpha})`);
        streakGrad.addColorStop(1, `rgba(${colors.pColor}, 0)`);
        
        ctx.strokeStyle = streakGrad;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (s.alpha <= 0 || s.y > height + s.length) streaks.splice(i, 1);
      }

      // 4. BOKEH CIRCLES
      bokehs.forEach(bokeh => {
        bokeh.angle += 0.01 * speedMultiplier;
        let bx = bokeh.x + Math.sin(bokeh.angle) * 10;
        let by = bokeh.y + Math.cos(bokeh.angle) * 10;
        // Shift global bokeh based on scroll
        by -= scrollVelocity * 0.2; 

        ctx.beginPath();
        ctx.arc(bx, by, bokeh.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.pColor}, 0.05)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${colors.pColor}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // 5. MOTION BLUR PARTICLES
      ctx.lineWidth = 1;
      particles.forEach(p => {
        // Apply velocity + scroll disruption
        p.x += p.vx * speedMultiplier;
        p.y += (p.vy - scrollVelocity * 0.3) * speedMultiplier; 

        // Wrap around bounds
        if(p.x < 0) p.x = width;
        if(p.x > width) p.x = 0;
        if(p.y < 0) p.y = height;
        if(p.y > height) p.y = 0;

        // Record history for trails
        p.history.push({x: p.x, y: p.y});
        // Trail length scales with scroll speed
        const maxHistory = Math.min(25, 10 + Math.abs(scrollVelocity) * 0.5); 
        if (p.history.length > maxHistory) {
           p.history.shift();
        }

        // Draw trail
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let i=1; i<p.history.length; i++) {
             // If particle wrapped completely around screen, break the path to avoid drawing a giant line
             if (Math.abs(p.history[i].x - p.history[i-1].x) > width/2 || Math.abs(p.history[i].y - p.history[i-1].y) > height/2) {
                 ctx.moveTo(p.history[i].x, p.history[i].y);
             } else {
                 ctx.lineTo(p.history[i].x, p.history[i].y);
             }
          }
          ctx.strokeStyle = `rgba(${colors.pColor}, 0.15)`;
          ctx.stroke();
        }

        // Draw head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${colors.pColor}, 0.4)`;
        ctx.fill();
      });

      // 6. FINAL OVERLAY - To ensure text contrast over glowing areas
      ctx.fillStyle = 'rgba(5, 18, 40, 0.4)'; // Dark tint
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="motionCanvas" ref={canvasRef} />;
};

export default MotionCanvas;
