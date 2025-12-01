import React, { useEffect, useState } from 'react';

export default function SkillOrb({ skill, index, total, isHovered, onHover }) {
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(() => {
    if (typeof window === 'undefined') return 150;
    return Math.max(140, Math.min(window.innerWidth, 1400) * 0.18);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => (r + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setRadius(Math.max(120, Math.min(window.innerWidth, 1400) * 0.18));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const depthMultiplier = 0.28; // reduce depth so items don't crowd vertically
  const scale = 1 + (z / radius) * 0.45;
  const opacity = 0.55 + (z / radius) * 0.45;

  return (
    <div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
      style={{
        transform: `translate(${x}px, ${z * depthMultiplier}px) scale(${isHovered ? scale * 1.45 : scale})`,
        opacity: isHovered ? 1 : opacity,
        zIndex: Math.floor(z + radius + 100)
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative">
        <div className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-2xl transition-all duration-300 ${
          isHovered ? 'ring-4 ring-white animate-pulse' : ''
        }`} style={{
          background: `linear-gradient(135deg, ${skill.color}dd, ${skill.color}44)`,
          boxShadow: isHovered ? `0 0 40px ${skill.color}` : `0 10px 30px rgba(0,0,0,0.3)`
        }}>
          {skill.icon}
        </div>
        {isHovered && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold">
            {skill.name} - {skill.level}%
          </div>
        )}
      </div>
    </div>
  );
}
