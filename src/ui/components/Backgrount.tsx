// src/ui/components/Background.tsx
import { useEffect } from 'react';

const Background = () => {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 6 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 12 + 8}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      const container = document.getElementById('particleContainer');
      if (container) {
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 15000);
      }
    };

    const createPulseEffect = () => {
      const pulse = document.createElement('div');
      pulse.classList.add('pulse-effect');
      
      const size = Math.random() * 350 + 250;
      pulse.style.width = `${size}px`;
      pulse.style.height = `${size}px`;
      pulse.style.left = `${Math.random() * 100}%`;
      pulse.style.top = `${Math.random() * 100}%`;
      
      const container = document.getElementById('pulseContainer');
      if (container) {
        container.appendChild(pulse);
        setTimeout(() => pulse.remove(), 8000);
      }
    };

    const particleInterval = setInterval(createParticle, 250);
    const pulseInterval = setInterval(createPulseEffect, 5000);

    return () => {
      clearInterval(particleInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <div className="music-background fixed inset-0 -z-10">
      <div className="music-overlay" />
      <div id="particleContainer" className="music-particles" />
      <div id="pulseContainer" className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default Background;