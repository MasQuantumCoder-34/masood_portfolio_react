import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Menu, X, Mail, Phone, Linkedin, Github, Terminal, Sparkles, Rocket, Globe, Server, Code, Briefcase, GraduationCap, Award, Star, Layers } from 'lucide-react';
import MobileNav from './components/MobileNav';
import { portfolioData } from './data/portfolioData';
const ParticleBackground = lazy(() => import('./components/ParticleBackground'));
import TypeWriter from './components/TypeWriter';
const LiveTerminal = lazy(() => import('./components/LiveTerminal'));
const SkillOrb = lazy(() => import('./components/SkillOrb'));
const SkillMeter = lazy(() => import('./components/SkillMeter'));
const FloatingBubbles = lazy(() => import('./components/FloatingBubbles'));
const ContactModal = lazy(() => import('./components/ContactModal'));

// Main Portfolio Component
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [modalPrefill, setModalPrefill] = useState({ subject: '', message: '' });
  const nameInputRef = useRef(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form endpoint (use Vite env: VITE_FORM_ENDPOINT) - default to your Formspree endpoint
  const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/xanrjndr';

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

  useEffect(() => {
    if (showContactForm && nameInputRef.current) {
      // focus the name field when modal opens
      setTimeout(() => nameInputRef.current.focus(), 50);
    }
  }, [showContactForm]);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'experience', 'contact'];
      const scrollY = window.scrollY + 100; // offset for nav height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle contact form submission to a free form endpoint (e.g., Formspree)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitSuccess(false);
    setSubmitError('');

    const form = e.target;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok || res.status === 200 || res.status === 201) {
        setSubmitSuccess(true);
        form.reset();
        setTimeout(() => setShowContactForm(false), 1200);
      } else {
        const text = await res.text();
        setSubmitError(`Server responded with ${res.status}: ${text}`);
      }
    } catch (err) {
      setSubmitError(err.message || 'Network error');
    } finally {
      setSubmitLoading(false);
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

      {/* Particle Background (lazy loaded) */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

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
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse hover:opacity-80 transition-opacity"
            aria-label="Return to home"
          >
            {'<MA />'}
          </button>
          <div className="hidden md:flex gap-8">
            {['Home', 'Skills', 'Experience', 'Contact'].map(section => {
              const sectionId = section.toLowerCase();
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={section}
                  onClick={() => scrollToSection(sectionId)}
                  className={`relative group transition-colors ${
                    isActive ? 'text-cyan-400 font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>
                    {section}
                  </span>
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              );
            })}
          </div>
          {/* Mobile hamburger */}
          <MobileNav
            scrollToSection={scrollToSection}
            activeSection={activeSection}
            setShowContactForm={setShowContactForm}
            setModalPrefill={setModalPrefill}
          />
        </div>
      </nav>

      {/* Hero Section - Mind-Blowing */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Glowing Avatar */}
          <div className="mb-12 relative inline-block">
            <div className="absolute inset-0 animate-ping opacity-30">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600"></div>
            </div>
            <div className="relative w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 flex items-center justify-center text-5xl font-bold">
                MA
              </div>
            </div>
          </div>

          {/* Animated Name */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent break-words leading-tight">
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

          <p className="text-base md:text-lg lg:text-xl text-purple-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {portfolioData.personal.tagline}
          </p>

          {/* CTA Buttons with Epic Effects */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <button
              onClick={() => {
                setModalPrefill({
                  subject: "Hiring enquiry — let's collaborate",
                  message: "Hi Mohammed,\n\nI'm interested in hiring you for a project and would like to discuss the details.\n\nRegards,"
                });
                setShowContactForm(true);
              }}
              aria-label="Open contact form to hire Mohammed"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-lg overflow-hidden transform hover:scale-110 transition-all duration-300 shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="group-hover:animate-bounce" /> Hire Me Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
            </button>
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
          <div className="px-4">
            <Suspense fallback={null}>
              <FloatingBubbles />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 3D Skills Visualization */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-6xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Skills Universe
          </h2>

          {/* 3D Rotating Skills Orbs (hidden on small devices) */}
          <div className="relative md:h-[420px] lg:h-[520px] h-[360px] mb-20 hidden md:block">
            <Suspense fallback={null}>
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
            </Suspense>
          </div>

          {/* Fallback skill grid for small devices */}
          <div className="md:hidden grid grid-cols-2 gap-4 mb-12 px-4">
            {allSkills.map((skill) => (
              <div key={skill.name} className="bg-white/6 rounded-xl p-3 flex flex-col items-center text-center">
                <div className="text-2xl mb-2">{skill.icon}</div>
                <div className="font-semibold text-sm text-white break-words">{skill.name}</div>
                <div className="w-full mt-2">
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              </div>
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
            <Suspense fallback={null}>
              <LiveTerminal />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Epic Stats Dashboard */}
      <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-6xl font-black text-center mb-20 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
            Impact Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: <Briefcase size={48} />, value: "5+", label: "Healthcare Projects", color: "from-cyan-500 to-blue-500" },
              { icon: <Code size={48} />, value: "12+", label: "Technologies", color: "from-purple-500 to-pink-500" },
              { icon: <Award size={48} />, value: "1+", label: "Years Experience", color: "from-green-500 to-teal-500" },
              { icon: <GraduationCap size={48} />, value: "B.Sc", label: "Computer Science (First Class With Distinction)", color: "from-yellow-500 to-orange-500" },
              { icon: <Star size={48} />, value: "5", label: "Certifications", color: "from-pink-500 to-red-500" },
              { icon: <Layers size={48} />, value: "3+", label: "Personal Projects", color: "from-indigo-500 to-purple-500" }
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
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent break-words">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-purple-300 break-words">
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
                className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all min-h-[120px]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
                <div className="relative p-8">
                  <div className="mb-4 flex justify-center group-hover:animate-bounce">
                    {contact.icon}
                  </div>
                  <div className="text-sm opacity-80 mb-2">{contact.label}</div>
                  <div className="font-bold text-sm md:text-lg break-words">{contact.value}</div>
                </div>
              </a>
            ))}
          </div>

          <button 
            onClick={() => {
              setModalPrefill({
                subject: "Let's discuss a project opportunity",
                message: "Hi Mohammed,\n\nI came across your portfolio and would like to talk about a potential project/opportunity.\n\nRegards,"
              });
              setShowContactForm(true);
            }}
            className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full font-bold text-2xl overflow-hidden transform hover:scale-110 transition-all duration-300 shadow-2xl"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Sparkles className="group-hover:animate-spin" size={28} />
              Start a Conversation
              <Rocket className="group-hover:animate-bounce" size={28} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </button>

          {/* Contact Form Modal (extracted to component) */}
          <ContactModal
            show={showContactForm}
            onClose={() => setShowContactForm(false)}
            portfolioData={portfolioData}
            nameInputRef={nameInputRef}
            modalPrefill={modalPrefill}
            handleSubmit={handleSubmit}
            emailCopied={emailCopied}
            setEmailCopied={setEmailCopied}
            submitLoading={submitLoading}
            submitSuccess={submitSuccess}
            submitError={submitError}
          />
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