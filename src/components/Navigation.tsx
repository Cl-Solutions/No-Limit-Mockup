import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'NoLimit', href: '#about' },
  { label: 'Führerscheine', href: '#fuehrerscheine' },
  { label: 'Seminare', href: '#seminare' },
  { label: 'Team', href: '#team' },
  { label: 'Öffnungszeiten', href: '#oeffnungszeiten' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 shadow-2xl' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        <button onClick={() => handleNav('#home')} className="flex flex-col items-start group">
          <span className="text-[#E31E2D] text-xs font-semibold uppercase tracking-[0.2em] leading-none group-hover:text-red-400 transition-colors">
            Fahrschule
          </span>
          <span className="text-white text-2xl font-black tracking-tight leading-tight group-hover:text-[#E31E2D] transition-colors">
            NoLimit
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E31E2D] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <button
            onClick={() => handleNav('#kontakt')}
            className="anmelden-btn bg-[#E31E2D] text-white px-5 py-2 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
          >
            Anmelden
          </button>
        </nav>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A0A0A]/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-white/80 hover:text-white text-base font-medium py-3 text-left border-b border-white/5 hover:pl-2 transition-all"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#kontakt')}
                className="mt-4 bg-[#E31E2D] text-white py-3 font-bold uppercase tracking-wider hover:bg-red-600 transition-colors rounded-sm"
              >
                Jetzt anmelden
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
