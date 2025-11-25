import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Phone, Linkedin, Github, Code, Briefcase, GraduationCap, Award, ChevronRight, Database, Server, Globe, Zap, CheckCircle, ExternalLink, Sparkles, Rocket, Brain, Coffee, Terminal, Activity, TrendingUp, Star, Target, Cpu, Layers } from 'lucide-react';

// Enhanced Portfolio Data
const portfolioData = {
  personal: {
    name: "Mohammed Masood Azhar V",
    title: "Associate Software Developer",
    tagline: "Crafting Digital Experiences That Matter",
    email: "mohammed.masood6400@gmail.com",
    phone: "+91 6381653050",
    linkedin: "linkedin.com/in/mohammedmasoodazhar-v",
    summary: "Passionate developer transforming ideas into elegant, scalable solutions. 1+ year of battle-tested experience in healthcare tech, delivering impactful projects that touch thousands of lives."
  },
  stats: {
    experience: 1,
    projects: 8,
    technologies: 15,
    certifications: 5,
    linesOfCode: 50000,
    coffeeConsumed: 500
  },
  skills: {
    frontend: [
      { name: "React.js", level: 90, icon: "⚛️", color: "#61DAFB" },
      { name: "TypeScript", level: 85, icon: "📘", color: "#3178C6" },
      { name: "JavaScript", level: 92, icon: "⚡", color: "#F7DF1E" },
      { name: "HTML/CSS", level: 95, icon: "🎨", color: "#E34F26" },
      { name: "Tailwind CSS", level: 88, icon: "🎯", color: "#06B6D4" }
    ],
    backend: [
      { name: "Node.js", level: 75, icon: "🟢", color: "#339933", learning: true },
      { name: "Express.js", level: 70, icon: "⚡", color: "#000000", learning: true },
      { name: "PHP", level: 80, icon: "🐘", color: "#777BB4" }
    ],
    database: [
      { name: "MySQL", level: 85, icon: "🗄️", color: "#4479A1" },
      { name: "SQL", level: 85, icon: "📊", color: "#CC2927" }
    ],
    tools: [
      { name: "Redux", level: 85, icon: "💜", color: "#764ABC" },
      { name: "RTK Query", level: 80, icon: "🔄", color: "#764ABC" },
      { name: "REST API", level: 88, icon: "🌐", color: "#009688" },
      { name: "Git", level: 90, icon: "📦", color: "#F05032" }
    ]
  }
};

// Particle Background Animation
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i !== j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// 3D Rotating Skill Orb
const SkillOrb = ({ skill, index, total, isHovered, onHover }) => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => (r + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const angle = (index / total) * Math.PI * 2;
  const radius = 150;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const scale = 1 + (z / radius) * 0.5;
  const opacity = 0.5 + (z / radius) * 0.5;

  return (
    <div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
      style={{
        transform: `translate(${x}px, ${z * 0.5}px) scale(${isHovered ? scale * 1.5 : scale})`,
        opacity: isHovered ? 1 : opacity,
        zIndex: Math.floor(z + 100)
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all duration-300 ${
          isHovered ? 'ring-4 ring-white animate-pulse' : ''
        }`}
        style={{ 
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
};

// Animated Typing Effect
const TypeWriter = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

// Live Code Terminal
const LiveTerminal = () => {
  const [commands, setCommands] = useState([]);
  const codeSequence = [
    { cmd: '$ npm install masood-portfolio', delay: 1000 },
    { cmd: '✓ Installing dependencies...', delay: 2000 },
    { cmd: '✓ Building amazing projects...', delay: 3000 },
    { cmd: '✓ Deploying innovation...', delay: 4000 },
    { cmd: '🚀 Ready to impress recruiters!', delay: 5000 }
  ];

  useEffect(() => {
    codeSequence.forEach((item, idx) => {
      setTimeout(() => {
        setCommands(prev => [...prev, item.cmd]);
      }, item.delay);
    });
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm shadow-2xl border border-green-500/30 overflow-hidden">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      {commands.map((cmd, idx) => (
        <div key={idx} className="text-green-400 mb-2 animate-slide-up">
          {cmd}
        </div>
      ))}
      <div className="text-green-400 animate-pulse">▊</div>
    </div>
  );
};

// Interactive Skill Meter with Animation and Live Demo
const SkillMeter = ({ skill, delay }) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(skill.level);
    }, delay);
    return () => clearTimeout(timeout);
  }, [skill.level, delay]);

  const getDemoContent = () => {
    const demos = {
      'React.js': (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg font-mono text-xs animate-slide-up">
          <div className="text-green-400 mb-2">// Live React Component</div>
          <div className="text-purple-400">const</div> <div className="text-blue-400 inline">Component</div> = <div className="text-yellow-400 inline">{'() =>'}</div> {'{'}
          <div className="ml-4 text-white">const [count, setCount] = useState(0);</div>
          <div className="ml-4 text-pink-400">return</div> <div className="text-white inline">{'<button onClick={() => setCount(count + 1)}>'}</div>
          <div className="ml-8 text-cyan-400">Clicked {'{count}'} times</div>
          <div className="ml-4 text-white">{'</button>'}</div>
          <div className="text-white">{'}'}</div>
        </div>
      ),
      'TypeScript': (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg font-mono text-xs animate-slide-up">
          <div className="text-green-400 mb-2">// TypeScript Interface</div>
          <div className="text-purple-400">interface</div> <div className="text-blue-400 inline">Developer</div> {'{'}
          <div className="ml-4"><span className="text-cyan-400">name</span>: <span className="text-yellow-400">string</span>;</div>
          <div className="ml-4"><span className="text-cyan-400">skills</span>: <span className="text-yellow-400">string[]</span>;</div>
          <div className="ml-4"><span className="text-cyan-400">yearsExp</span>: <span className="text-yellow-400">number</span>;</div>
          <div className="text-white">{'}'}</div>
        </div>
      ),
      'JavaScript': (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg font-mono text-xs animate-slide-up">
          <div className="text-green-400 mb-2">// Modern JavaScript</div>
          <div className="text-purple-400">const</div> <div className="text-blue-400 inline">data</div> = <div className="text-yellow-400 inline">await</div> <div className="text-white inline">fetch('/api');</div>
          <div className="text-purple-400">const</div> <div className="text-blue-400 inline">result</div> = <div className="text-yellow-400 inline">await</div> <div className="text-white inline">data.json();</div>
          <div className="text-pink-400">console</div><div className="text-white inline">.log(result);</div>
        </div>
      ),
      'Node.js': (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg font-mono text-xs animate-slide-up">
          <div className="text-green-400 mb-2">// Node.js Server</div>
          <div className="text-purple-400">const</div> <div className="text-blue-400 inline">express</div> = <div className="text-yellow-400 inline">require</div><div className="text-white inline">('express');</div>
          <div className="text-purple-400">const</div> <div className="text-blue-400 inline">app</div> = <div className="text-blue-400 inline">express()</div>;
          <div className="text-white">{`app.listen(3000, () => console.log('Running'));`}</div>
        </div>
      ),
      'PHP': (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg font-mono text-xs animate-slide-up">
          <div className="text-green-400 mb-2">{'<?php // PHP Backend'}</div>
          <div className="text-purple-400">class</div> <div className="text-blue-400 inline">API</div> {'{'}
          <div className="ml-4 text-purple-400">public function</div> <div className="text-yellow-400 inline">getData()</div> {'{'}
          <div className="ml-8 text-pink-400">return</div>
<div className="text-cyan-400 inline">{`$this->db->query();`}</div>
          <div className="ml-4 text-white">{'}'}</div>
          <div className="text-white">{'}'}</div>
        </div>
      ),
      'MySQL': (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg font-mono text-xs animate-slide-up">
          <div className="text-green-400 mb-2">-- SQL Query</div>
          <div className="text-purple-400">SELECT</div> <div className="text-white inline">u.name, COUNT(p.id)</div>
          <div className="text-purple-400">FROM</div> <div className="text-blue-400 inline">users</div> <div className="text-white inline">u</div>
          <div className="text-purple-400">JOIN</div> <div className="text-blue-400 inline">projects</div> <div className="text-white inline">p</div> <div className="text-purple-400">ON</div> <div className="text-white inline">u.id = p.user_id</div>
          <div className="text-purple-400">GROUP BY</div> <div className="text-white inline">u.name;</div>
        </div>
      )
    };
    return demos[skill.name] || null;
  };

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => getDemoContent() && setShowDemo(!showDemo)}
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
        {isHovered && getDemoContent() && !showDemo && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white bg-black/40 backdrop-blur-sm">
            👆 Click to see live demo
          </div>
        )}
      </div>
      {showDemo && getDemoContent()}
    </div>
  );
};

// Floating Action Bubbles
const FloatingBubbles = () => {
  const bubbles = [
    { icon: <Coffee />, label: "Coffee", count: "500+", color: "bg-amber-500" },
    { icon: <Code />, label: "Commits", count: "2K+", color: "bg-green-500" },
    { icon: <Sparkles />, label: "Ideas", count: "∞", color: "bg-purple-500" },
    { icon: <Rocket />, label: "Speed", count: "100x", color: "bg-blue-500" }
  ];

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {bubbles.map((bubble, idx) => (
        <div
          key={idx}
          className={`${bubble.color} text-white p-6 rounded-2xl shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer`}
          style={{
            animation: `float ${3 + idx * 0.5}s ease-in-out infinite`
          }}
        >
          <div className="text-3xl mb-2">{bubble.icon}</div>
          <div className="text-2xl font-bold">{bubble.count}</div>
          <div className="text-sm opacity-90">{bubble.label}</div>
        </div>
      ))}
    </div>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 2000);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const allSkills = [
    ...portfolioData.skills.frontend,
    ...portfolioData.skills.backend,
    ...portfolioData.skills.database,
    ...portfolioData.skills.tools
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      {/* Custom Cursor */}
      <div
        className="fixed w-6 h-6 rounded-full border-2 border-white pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transition: 'transform 0.1s ease',
        }}
      />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Explosion Effect on Load */}
      {showExplosion && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-explode"
              style={{
                left: '50%',
                top: '50%',
                animation: `explode ${1 + Math.random()}s ease-out forwards`,
                transform: `rotate(${i * 12}deg) translateY(-${100 + Math.random() * 200}px)`
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            {'<MA />'}
          </div>
          <div className="hidden md:flex gap-8">
            {['Home', 'Skills', 'Experience', 'Contact'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section.toLowerCase())}
                className="relative group"
              >
                <span className="text-white/80 group-hover:text-white transition-colors">
                  {section}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Mind-Blowing */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Glowing Avatar */}
          <div className="mb-12 relative inline-block">
            <div className="absolute inset-0 animate-ping opacity-30">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600"></div>
            </div>
            <div className="relative w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-5xl font-bold">
                MA
              </div>
            </div>
          </div>

          {/* Animated Name */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            <TypeWriter text={portfolioData.personal.name} delay={100} />
          </h1>

          {/* Glitch Effect Title */}
          <div className="relative mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white relative z-10">
              {portfolioData.personal.title}
            </h2>
            <h2 className="text-3xl md:text-5xl font-bold text-cyan-400 absolute inset-0 animate-glitch" style={{ clipPath: 'inset(0 0 50% 0)' }}>
              {portfolioData.personal.title}
            </h2>
            <h2 className="text-3xl md:text-5xl font-bold text-pink-400 absolute inset-0 animate-glitch-2" style={{ clipPath: 'inset(50% 0 0 0)' }}>
              {portfolioData.personal.title}
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-purple-300 mb-12 max-w-3xl mx-auto">
            {portfolioData.personal.tagline}
          </p>

          {/* CTA Buttons with Epic Effects */}
          <div className="flex flex-wrap gap-6 justify-center mb-16">
            <a 
              href={`mailto:${portfolioData.personal.email}?subject=Let's Work Together!&body=Hi Mohammed, I'd love to discuss a project with you.`}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-lg overflow-hidden transform hover:scale-110 transition-all duration-300 shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="group-hover:animate-bounce" /> Hire Me Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <button 
              onClick={() => scrollToSection('experience')}
              className="px-8 py-4 border-2 border-purple-400 rounded-full font-bold text-lg hover:bg-purple-400 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110"
            >
              <span className="flex items-center gap-2">
                <Terminal /> View Projects
              </span>
            </button>
          </div>

          {/* Floating Stats */}
          <FloatingBubbles />
        </div>
      </section>

      {/* 3D Skills Visualization */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-6xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Skills Universe
          </h2>

          {/* 3D Rotating Skills Orbs */}
          <div className="relative h-96 mb-20">
            {allSkills.map((skill, index) => (
              <SkillOrb
                key={skill.name}
                skill={skill}
                index={index}
                total={allSkills.length}
                isHovered={hoveredSkill === index}
                onHover={setHoveredSkill}
              />
            ))}
          </div>

          {/* Detailed Skill Meters */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Globe className="text-cyan-400" size={32} /> Frontend Mastery
              </h3>
              <div className="space-y-6">
                {portfolioData.skills.frontend.map((skill, idx) => (
                  <SkillMeter key={skill.name} skill={skill} delay={idx * 200} />
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Server className="text-green-400" size={32} /> Backend Power
              </h3>
              <div className="space-y-6">
                {portfolioData.skills.backend.map((skill, idx) => (
                  <SkillMeter key={skill.name} skill={skill} delay={idx * 200 + 100} />
                ))}
              </div>
            </div>
          </div>

          {/* Live Terminal */}
          <div className="max-w-3xl mx-auto">
            <LiveTerminal />
          </div>
        </div>
      </section>

      {/* Epic Stats Dashboard */}
      <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-6xl font-black text-center mb-20 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
            Impact Metrics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { icon: <Activity size={48} />, value: "50K+", label: "Lines of Code", color: "from-cyan-500 to-blue-500" },
              { icon: <Target size={48} />, value: "8", label: "Projects Shipped", color: "from-purple-500 to-pink-500" },
              { icon: <Cpu size={48} />, value: "15+", label: "Technologies", color: "from-green-500 to-teal-500" },
              { icon: <TrendingUp size={48} />, value: "30%", label: "Performance Boost", color: "from-yellow-500 to-orange-500" },
              { icon: <Star size={48} />, value: "100%", label: "Client Satisfaction", color: "from-pink-500 to-red-500" },
              { icon: <Layers size={48} />, value: "5+", label: "Healthcare Apps", color: "from-indigo-500 to-purple-500" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="relative group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 rounded-3xl blur-xl group-hover:opacity-40 transition-opacity`}></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all transform hover:scale-105 hover:-rotate-2">
                  <div className="text-cyan-400 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-black mb-2 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-lg text-purple-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Futuristic */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <p className="text-2xl text-purple-300 mb-12">
            Ready to turn your vision into reality?
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                icon: <Mail size={32} />, 
                label: "Email", 
                value: portfolioData.personal.email, 
                color: "from-blue-500 to-cyan-500",
                href: `mailto:${portfolioData.personal.email}`
              },
              { 
                icon: <Phone size={32} />, 
                label: "Phone", 
                value: portfolioData.personal.phone, 
                color: "from-purple-500 to-pink-500",
                href: `tel:${portfolioData.personal.phone}`
              },
              { 
                icon: <Linkedin size={32} />, 
                label: "LinkedIn", 
                value: "Connect Now", 
                color: "from-green-500 to-teal-500",
                href: `https://${portfolioData.personal.linkedin}`
              }
            ].map((contact, idx) => (
              <a
                key={idx}
                href={contact.href}
                target={contact.label === "LinkedIn" ? "_blank" : undefined}
                rel={contact.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative p-8">
                  <div className="mb-4 flex justify-center group-hover:animate-bounce">
                    {contact.icon}
                  </div>
                  <div className="text-sm opacity-80 mb-2">{contact.label}</div>
                  <div className="font-bold text-lg">{contact.value}</div>
                </div>
              </a>
            ))}
          </div>

          <button 
            onClick={() => setShowContactForm(!showContactForm)}
            className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full font-bold text-2xl overflow-hidden transform hover:scale-110 transition-all duration-300 shadow-2xl"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Sparkles className="group-hover:animate-spin" size={28} />
              Start a Conversation
              <Rocket className="group-hover:animate-bounce" size={28} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Contact Form Modal */}
          {showContactForm && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowContactForm(false)}>
              <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/20" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-3xl font-bold text-white">Send Me a Message</h3>
                  <button onClick={() => setShowContactForm(false)} className="text-white hover:text-red-400 transition-colors">
                    <X size={32} />
                  </button>
                </div>
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const subject = encodeURIComponent(formData.get('subject'));
                  const message = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\nMessage:\n${formData.get('message')}`);
                  window.location.href = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${message}`;
                  setShowContactForm(false);
                }}>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    required
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Your Message"
                    required
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
                  ></textarea>
                  <button type="submit" className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-xl hover:scale-105 transition-transform shadow-xl">
                    Send Message 🚀
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes glitch-2 {
          0% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
          100% { transform: translate(0); }
        }
        @keyframes explode {
          to {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-300px);
          }
        }
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
        .animate-glitch-2 {
          animation: glitch-2 0.3s infinite reverse;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;