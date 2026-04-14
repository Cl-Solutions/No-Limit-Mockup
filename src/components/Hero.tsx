import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface WordRevealProps {
  text: string;
  className?: string;
  baseDelay?: number;
  stagger?: number;
}

function WordReveal({ text, className = '', baseDelay = 0, stagger = 0.12 }: WordRevealProps) {
  const words = text.split(' ');
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.7,
            delay: baseDelay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="rg1" cx="70%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#E31E2D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rg2" cx="20%" cy="80%" r="40%">
              <stop offset="0%" stopColor="#E31E2D" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#rg1)" />
          <rect width="1440" height="900" fill="url(#rg2)" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              x1={`${-10 + i * 25}%`} y1="0"
              x2={`${20 + i * 25}%`} y2="100%"
              stroke="#E31E2D"
              strokeWidth="1"
              strokeOpacity="0.08"
            />
          ))}
          <path d="M0 450 Q360 400 720 450 Q1080 500 1440 450" stroke="#E31E2D" strokeWidth="2" fill="none" strokeOpacity="0.12" />
          <path d="M0 480 Q360 430 720 480 Q1080 530 1440 480" stroke="white" strokeWidth="1" fill="none" strokeOpacity="0.04" />
          <circle cx="1100" cy="200" r="300" fill="none" stroke="#E31E2D" strokeWidth="1" strokeOpacity="0.06" />
          <circle cx="1100" cy="200" r="200" fill="none" stroke="#E31E2D" strokeWidth="1" strokeOpacity="0.06" />
          <circle cx="1100" cy="200" r="100" fill="none" stroke="#E31E2D" strokeWidth="1" strokeOpacity="0.1" />
        </svg>

        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#E31E2D]/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#E31E2D]/8 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-[#E31E2D]" />
            <span className="text-[#E31E2D] text-sm font-bold uppercase tracking-[0.25em]">
              Fahrschule NoLimit
            </span>
          </motion.div>

          <h1 className="text-[clamp(2rem,9vw,8rem)] font-black leading-[0.95] tracking-tighter mb-10">
            <div className="mb-1">
              <WordReveal
                text="Dein"
                className="text-[#111111] dark:text-white"
                baseDelay={0.25}
              />
            </div>
            <div className="mb-1">
              <WordReveal
                text="Führerschein."
                className="text-[#E31E2D]"
                baseDelay={0.4}
              />
            </div>
            <div className="mb-1">
              <WordReveal
                text="Deine Freiheit."
                className="text-[#111111] dark:text-white"
                baseDelay={0.55}
              />
            </div>
            <div>
              <WordReveal
                text="Keine Grenzen."
                className="text-black/20 dark:text-white/30"
                baseDelay={0.75}
              />
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="text-[#444444] dark:text-white/60 text-base md:text-xl max-w-xl mb-8 md:mb-10 leading-relaxed"
          >
            Fahrschule NoLimit — Mühlacker &amp; Knittlingen seit 2008
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => handleScroll('#kontakt')}
              className="bg-[#E31E2D] text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:bg-red-600 transition-[background-color,box-shadow,transform] duration-150 ease-out hover:shadow-[0_0_30px_rgba(227,30,45,0.5)] active:scale-[0.97] rounded-sm"
            >
              Jetzt anmelden
            </button>
            <button
              onClick={() => handleScroll('#fuehrerscheine')}
              className="border-2 border-black/20 dark:border-white/30 text-[#111111] dark:text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/5 transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] rounded-sm"
            >
              Führerscheine entdecken
            </button>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => handleScroll('#about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black/40 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors flex flex-col items-center gap-2 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
