import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export default function MobileNav({ scrollToSection, activeSection, setShowContactForm, setModalPrefill }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // lock body scroll when mobile menu open
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = original || '';
    return () => { document.body.style.overflow = original || ''; };
  }, [open]);

  const items = ['Home', 'Skills', 'Experience', 'Contact'];

  return (
    <div className="md:hidden">
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition"
      >
        <Menu size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Dark blurred overlay to separate page content from the menu */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          {/* Slide-over panel pinned to the right with an opaque background */}
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-80 lg:w-96 bg-slate-900 text-white p-6 min-h-screen shadow-2xl border-l border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-bold">Menu</div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-white/5">
                <X />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {items.map(item => {
                const id = item.toLowerCase();
                const active = activeSection === id;
                return (
                  <button
                    key={item}
                    onClick={() => { setOpen(false); scrollToSection(id); }}
                    className={`text-left px-4 py-3 rounded-md transition flex items-center w-full ${active ? 'text-cyan-300 bg-white/10 font-semibold' : 'text-white hover:text-white bg-transparent hover:bg-white/5'}`}
                  >
                    {item}
                  </button>
                );
              })}

              <div className="mt-4">
                <button
                  onClick={() => {
                    setOpen(false);
                    if (setModalPrefill) {
                      setModalPrefill({
                        subject: "Hiring enquiry — let's collaborate",
                        message: "Hi Mohammed,\n\nI'm interested in hiring you for a project and would like to discuss the details.\n\nRegards,"
                      });
                    }
                    setShowContactForm(true);
                  }}
                  className="w-full flex items-center gap-2 justify-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold"
                >
                  <Rocket size={16} /> Hire Me
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
