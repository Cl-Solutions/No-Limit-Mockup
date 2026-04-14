import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Category = 'Alle' | 'Zweirad' | 'Auto' | 'Lkw';

const classes = [
  {
    id: 'mofa',
    name: 'Mofa',
    title: 'Kleinkraftrad',
    desc: 'Ab 15 Jahren. Nur Theorieprüfung erforderlich. Bis 25 km/h.',
    category: 'Zweirad' as Category,
    badge: 'Ab 15',
  },
  {
    id: 'am',
    name: 'AM',
    title: 'Leichtkraftfahrzeug',
    desc: 'Ab 16 Jahren. Bis 45 km/h, max. 50 ccm. Moped & Roller.',
    category: 'Zweirad' as Category,
    badge: 'Ab 16',
  },
  {
    id: 'a1',
    name: 'A1',
    title: 'Leichtkraftrad',
    desc: 'Ab 16 Jahren. Bis 125 ccm, max. 11 kW. Erste große Klasse.',
    category: 'Zweirad' as Category,
    badge: 'Ab 16',
  },
  {
    id: 'a2',
    name: 'A2',
    title: 'Kraftrad',
    desc: 'Ab 18 Jahren. Motorräder bis 35 kW. Mittelstufe Motorrad.',
    category: 'Zweirad' as Category,
    badge: 'Ab 18',
  },
  {
    id: 'a',
    name: 'A',
    title: 'Alle Krafträder',
    desc: 'Ab 24 Jahren (Direkteinstieg) oder nach 2 Jahren A2. Ohne Beschränkung.',
    category: 'Zweirad' as Category,
    badge: 'Ab 24',
  },
  {
    id: 'b',
    name: 'B',
    title: 'PKW',
    desc: 'Ab 18 Jahren oder 17 mit BF17. PKW bis 3.500 kg inkl. Anhänger.',
    category: 'Auto' as Category,
    badge: 'Ab 17/18',
  },
  {
    id: 'b-auto',
    name: 'B Automatik',
    title: 'PKW Automatik',
    desc: 'Jetzt neu! Ausbildung auf modernem AMG-Automatikfahrzeug. Auch Anhänger.',
    category: 'Auto' as Category,
    badge: 'NEU',
  },
  {
    id: 'c1',
    name: 'C1',
    title: 'Mittelschwerer Lkw',
    desc: 'PKW über 3.500 kg bis 7.500 kg. Ab 18 Jahren mit B-Schein.',
    category: 'Lkw' as Category,
    badge: 'Ab 18',
  },
  {
    id: 'c1e',
    name: 'C1E',
    title: 'C1 + Anhänger',
    desc: 'Kombination C1 mit Anhänger über 750 kg. Bis 12.000 kg Gesamtgewicht.',
    category: 'Lkw' as Category,
    badge: 'Ab 18',
  },
  {
    id: 'c',
    name: 'C',
    title: 'Schwerer Lkw',
    desc: 'Lkw über 3.500 kg. Ab 21 Jahren mit gültigem B-Schein.',
    category: 'Lkw' as Category,
    badge: 'Ab 21',
  },
  {
    id: 'ce',
    name: 'CE',
    title: 'Lkw + Sattelanhänger',
    desc: 'Lkw mit Sattelanhänger über 750 kg. Ab 21 Jahren mit C-Schein.',
    category: 'Lkw' as Category,
    badge: 'Ab 21',
  },
];

const filters: Category[] = ['Alle', 'Zweirad', 'Auto', 'Lkw'];

interface GlowCardProps {
  cls: typeof classes[0];
  index: number;
}

function GlowCard({ cls, index }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-sm overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: 'transparent',
      }}
    >
      {/* Outer glow border layer */}
      <div
        className="absolute inset-0 rounded-sm transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mouse.x}px ${mouse.y}px, rgba(227,30,45,0.5), transparent 60%)`,
        }}
      />

      {/* Card body */}
      <div className="relative m-[1px] rounded-sm bg-[#f5f5f5] dark:bg-[#0e0e0e] flex flex-col flex-1 p-7 overflow-hidden">

        {/* Inner spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, rgba(227,30,45,0.08), transparent 55%)`,
          }}
        />

        {/* Top edge glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(200px circle at ${mouse.x}px 0px, rgba(227,30,45,0.8), transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="text-[clamp(2rem,4vw,3rem)] font-black text-[#E31E2D] leading-none tracking-tighter">
                {cls.name}
              </div>
              <div className="text-[#444444] dark:text-gray-300 text-sm font-medium mt-1">{cls.title}</div>
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm shrink-0 ${
              cls.badge === 'NEU'
                ? 'bg-[#E31E2D] text-white'
                : 'border border-black/15 dark:border-white/15 text-[#444444] dark:text-gray-300'
            }`}>
              {cls.badge}
            </span>
          </div>

          <p className="text-[#444444] dark:text-gray-300 text-sm leading-relaxed mb-6 flex-1">{cls.desc}</p>

          <div className="flex items-center gap-2 text-[#E31E2D] text-xs font-bold uppercase tracking-wider mt-auto">
            <span>Mehr erfahren</span>
            <ArrowRight size={14} className={`transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Classes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<Category>('Alle');

  const filtered = active === 'Alle' ? classes : classes.filter((c) => c.category === active);

  return (
    <section id="fuehrerscheine" className="py-16 md:py-32 bg-white dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E31E2D]" />
            <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Klassen</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#111111] dark:text-white leading-tight tracking-tight mb-3">
                Deine Führerscheinklasse
              </h2>
              <p className="text-[#444444] dark:text-gray-300 text-lg">Von Mofa bis Lkw — wir bilden alle Klassen aus.</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-300 ${
                    active === f
                      ? 'bg-[#E31E2D] text-white shadow-[0_0_20px_rgba(227,30,45,0.4)]'
                      : 'border border-black/15 dark:border-white/15 text-[#444444] dark:text-white/60 hover:border-black/40 dark:hover:border-white/40 hover:text-[#111111] dark:hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          <AnimatePresence mode="popLayout">
            {filtered.map((cls, i) => (
              <GlowCard key={cls.id} cls={cls} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
