import React from 'react';
import { Code, Briefcase, Award, GraduationCap } from 'lucide-react';

export default function FloatingBubbles() {
  const bubbles = [
    { icon: <Code />, label: "Projects", count: "5+", color: "bg-green-500" },
    { icon: <Briefcase />, label: "Experience", count: "1+ Yr", color: "bg-purple-500" },
    { icon: <Award />, label: "Certifications", count: "5", color: "bg-blue-500" },
    { icon: <GraduationCap />, label: "Education", count: "B.Sc", color: "bg-amber-500" }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 justify-items-center">
      {bubbles.map((bubble, idx) => (
        <div
          key={idx}
          className={`${bubble.color} text-white p-6 md:p-8 lg:p-10 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer w-full max-w-xs flex flex-col items-center`}
          style={{
            animation: `float ${3 + idx * 0.5}s ease-in-out infinite`
          }}
        >
          <div className="text-4xl md:text-5xl mb-3">{bubble.icon}</div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-1">{bubble.count}</div>
          <div className="text-sm md:text-base opacity-90 text-center">{bubble.label}</div>
        </div>
      ))}
    </div>
  );
}
