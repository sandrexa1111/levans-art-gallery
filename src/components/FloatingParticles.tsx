import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

const Particle = ({ x, y, size, color, speed }: ParticleProps) => {
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: (prev.x + speed) % window.innerWidth,
        y: prev.y + Math.sin(Date.now() * 0.001) * 0.5
      }));
    }, 16);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <motion.div
      className="absolute rounded-full opacity-20"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        backgroundColor: color,
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export const FloatingParticles = ({ count = 50 }: { count?: number }) => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
      speed: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
    </div>
  );
};