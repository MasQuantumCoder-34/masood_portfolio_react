import React, { useEffect, useState } from 'react';

const DemoContent = ({ skill }) => {
  if (!skill) return null;
  const name = skill.name;
  switch (name) {
    case 'React.js':
      return (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg font-mono text-xs animate-slide-up">
          <div className="text-green-400 mb-2">// Live React Component</div>
          <div className="text-purple-400">const</div> <div className="text-blue-400 inline">Component</div> = <div className="text-yellow-400 inline">{'() =>'}</div> {'{'}
          <div className="ml-4 text-white">const [count, setCount] = useState(0);</div>
          <div className="ml-4 text-pink-400">return</div> <div className="text-white inline">{'<button onClick={() => setCount(count + 1)}>'}</div>
          <div className="ml-8 text-cyan-400">Clicked {'{count}'} times</div>
          <div className="ml-4 text-white">{'</button>'}</div>
          <div className="text-white">{'}'}</div>
        </div>
      );
    case 'TypeScript':
      return (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg font-mono text-xs animate-slide-up">
          <div className="text-green-400 mb-2">// TypeScript Interface</div>
          <div className="text-purple-400">interface</div> <div className="text-blue-400 inline">Developer</div> {'{'}
          <div className="ml-4"><span className="text-cyan-400">name</span>: <span className="text-yellow-400">string</span>;</div>
          <div className="ml-4"><span className="text-cyan-400">skills</span>: <span className="text-yellow-400">string[]</span>;</div>
          <div className="ml-4"><span className="text-cyan-400">yearsExp</span>: <span className="text-yellow-400">number</span>;</div>
          <div className="text-white">{'}'}</div>
        </div>
      );
    case 'JavaScript':
      return (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg font-mono text-xs animate-slide-up">
          <div className="text-green-400 mb-2">// Modern JavaScript</div>
          <div className="text-purple-400">const</div> <div className="text-blue-400 inline">data</div> = <div className="text-yellow-400 inline">await</div> <div className="text-white inline">fetch('/api');</div>
          <div className="text-purple-400">const</div> <div className="text-blue-400 inline">result</div> = <div className="text-yellow-400 inline">await</div> <div className="text-white inline">data.json();</div>
          <div className="text-pink-400">console</div><div className="text-white inline">.log(result);</div>
        </div>
      );
    default:
      return null;
  }
};

export default function SkillMeter({ skill, delay }) {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(skill.level);
    }, delay);
    return () => clearTimeout(timeout);
  }, [skill.level, delay]);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => showDemo ? setShowDemo(false) : setShowDemo(true)}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{skill.icon}</span>
          <span className="font-semibold text-white">{skill.name}</span>
          {skill.learning && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full animate-bounce">
              Learning
            </span>
          )}
        </div>
        <span className="text-xl font-bold" style={{ color: skill.color }}>
          {progress}%
        </span>
      </div>
      <div className="relative h-4 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-out relative"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
          }}
        >
          <div className="absolute inset-0 animate-pulse opacity-50 bg-white"></div>
        </div>
        {isHovered && !showDemo && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white bg-black/40 backdrop-blur-sm">
            👆 Click to see live demo
          </div>
        )}
      </div>
      {showDemo && <DemoContent skill={skill} />}
    </div>
  );
}
