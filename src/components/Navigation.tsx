import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Reihenfolge folgt dem neuen Sektions-Flow auf der Seite (Trust → Service → Story → CTA).
const navLinks = [
  { label: 'Bewertungen', href: '#bewertungen' },
  { label: 'Führerscheine', href: '#fuehrerscheine' },
  { label: 'Fahrzeuge', href: '#flotte' },
  { label: 'Über uns', href: '#about' },
  { label: 'Anmelden', href: '#oeffnungszeiten' },
];

const mobileNavLinks = [
  { label: 'Bewertungen', href: '#bewertungen' },
  { label: 'Führerscheine', href: '#fuehrerscheine' },
  { label: 'Fahrzeuge', href: '#flotte' },
  { label: 'Über uns & Team', href: '#about' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Seminare', href: '#seminare' },
  { label: 'Anmelden', href: '#oeffnungszeiten' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? 'bg-ink/95 backdrop-blur-md border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <button
          onClick={() => handleNav('#home')}
          aria-label="Fahrschule NoLimit — zur Startseite"
          className="flex items-center group transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img
              src="/logo.png"
              alt="Fahrschule NoLimit"
              className="h-9 sm:h-11 w-auto select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              width={600}
              height={258}
              draggable={false}
            />
          </picture>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, -1).map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-150 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-[width] duration-200" />
            </button>
          ))}

          <button
            onClick={() => handleNav('#oeffnungszeiten')}
            className="anmelden-btn bg-brand text-white px-5 py-2 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
          >
            Anmelden
          </button>
        </nav>

        <div className="lg:hidden flex items-center gap-3">
          <button
            className="text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-ink/98 backdrop-blur-md border-t border-white/10 max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {mobileNavLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-white/80 hover:text-white text-base font-medium py-3 text-left border-b border-white/5 transition-colors duration-150"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#oeffnungszeiten')}
                className="mt-4 bg-brand text-white py-3 font-bold uppercase tracking-wider hover:bg-red-600 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] rounded-sm"
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
