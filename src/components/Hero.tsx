import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Video shrinks and gets rounded corners as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 0.72]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.85], [0, 28]);

  // Content fades up and out early in the scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.28], [0, -48]);

  // Overlay darkens slightly as it shrinks for a cinematic feel
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.85], [0.52, 0.72]);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Tall container — extra height gives the scroll animation room to breathe
    <section id="home" ref={containerRef} className="relative h-[200vh]">
      {/* Sticky inner — stays pinned at top while scrolling through the container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        {/* ── Video background (lokal, kein YouTube — sofortiger Start) ── */}
        <motion.div
          style={{ scale, borderRadius }}
          className="absolute inset-0 overflow-hidden bg-black"
        >
          {/* Fallback gradient (sichtbar bis/falls kein Video lädt) */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_30%,rgba(227,30,45,0.22),transparent_60%),radial-gradient(80%_60%_at_15%_90%,rgba(227,30,45,0.12),transparent_55%)] bg-[#0A0A0A]" />

          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-poster.jpg"
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black"
          />

          {/* Subtle red vignette bottom-left */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(227,30,45,0.18)_0%,transparent_60%)] pointer-events-none" />
        </motion.div>

        {/* ── Hero content ── */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 pb-16"
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="h-px w-12 bg-[#E31E2D]" />
              <span className="text-[#E31E2D] text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
                Fahrschule NoLimit
              </span>
            </motion.div>

            <h1 className="text-[clamp(2.5rem,11vw,8rem)] font-black leading-[0.95] tracking-tighter mb-8">
              <div className="mb-1">
                <WordReveal text="Dein" className="text-white" baseDelay={0.25} />
              </div>
              <div className="mb-1">
                <WordReveal text="Führerschein." className="text-[#E31E2D]" baseDelay={0.4} />
              </div>
              <div className="mb-1">
                <WordReveal text="Deine Freiheit." className="text-white" baseDelay={0.55} />
              </div>
              <div>
                <WordReveal text="Keine Grenzen." className="text-white/30" baseDelay={0.75} />
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="text-white/70 text-base md:text-xl max-w-xl mb-7 leading-relaxed"
            >
              Mühlacker &amp; Knittlingen — seit 2008 sicher zum Führerschein.
            </motion.p>

            {/* Social proof direkt im Hero */}
            <motion.button
              onClick={() => handleScroll('#bewertungen')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              className="flex items-center gap-2.5 mb-9 group"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="text-[#E31E2D] fill-[#E31E2D]" />
                ))}
              </div>
              <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                <strong className="text-white font-bold">4,8</strong> · 201 Bewertungen auf Google
              </span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => handleScroll('#oeffnungszeiten')}
                className="bg-[#E31E2D] text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:bg-red-600 transition-[background-color,box-shadow,transform] duration-150 ease-out hover:shadow-[0_0_30px_rgba(227,30,45,0.5)] active:scale-[0.97] rounded-sm"
              >
                Jetzt anmelden
              </button>
              <button
                onClick={() => handleScroll('#fuehrerscheine')}
                className="border-2 border-white/30 text-white px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:border-white hover:bg-white/10 transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] rounded-sm"
              >
                Führerscheine entdecken
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.button
          onClick={() => handleScroll('#about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{ opacity: contentOpacity }}
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
