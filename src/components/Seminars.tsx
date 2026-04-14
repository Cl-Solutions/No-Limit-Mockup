import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Truck, RefreshCw, AlertTriangle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const seminars = [
  {
    icon: Truck,
    title: 'Berufskraftfahrer Ausbildung',
    duration: '140 Stunden',
    desc: 'Umfassende Vorbereitung auf die IHK-Prüfung. 140 Stunden à 60 Minuten. Für den professionellen Einstieg in den Transportberuf.',
    tag: 'IHK-Prüfung',
  },
  {
    icon: RefreshCw,
    title: 'Weiterbildung für Kraftfahrer',
    duration: '5 Tage à 7 Std.',
    desc: 'Pflicht alle 5 Jahre für Fahrer ab 3,5 t mit gewerblichem Gütertransport. 5-tägiger Kurs mit je 7 Stunden Trainingsinhalt.',
    tag: 'BKrFQG',
  },
  {
    icon: AlertTriangle,
    title: 'ASF — Aufbauseminar',
    duration: 'Für Fahranfänger',
    desc: 'Pflichtmaßnahme zur Führerscheinerhaltung für Fahranfänger mit A- oder B-Verstößen in der Probezeit. Jetzt Termin sichern.',
    tag: 'Probezeit',
  },
];

interface SeminarCardProps {
  s: { icon: LucideIcon; title: string; duration: string; desc: string; tag: string };
  animDelay: number;
  inView: boolean;
}

function SeminarCard({ s, animDelay, inView }: SeminarCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = s.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: animDelay, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-sm overflow-hidden cursor-default"
    >
      {/* Outer glow border */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mouse.x}px ${mouse.y}px, rgba(227,30,45,0.5), transparent 60%)`,
        }}
      />

      {/* Card body */}
      <div className="relative m-[1px] rounded-sm bg-white dark:bg-[#141414] p-6 md:p-10 overflow-hidden">

        {/* Inner spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, rgba(227,30,45,0.07), transparent 55%)`,
          }}
        />

        {/* Top edge glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(200px circle at ${mouse.x}px 0px, rgba(227,30,45,0.9), transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          <div className="w-14 h-14 bg-[#E31E2D]/10 border border-[#E31E2D]/20 rounded-sm flex items-center justify-center mb-8 transition-all duration-300"
            style={{ background: hovered ? 'rgba(227,30,45,0.2)' : undefined }}>
            <Icon size={24} className="text-[#E31E2D]" />
          </div>

          <span className="text-[#E31E2D] text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">
            {s.tag}
          </span>

          <h3 className="text-[#111111] dark:text-white font-black text-xl leading-tight tracking-tight mb-3">
            {s.title}
          </h3>

          <div className="text-[#666666] dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-5">
            {s.duration}
          </div>

          <p className="text-[#444444] dark:text-gray-300 text-sm leading-relaxed">
            {s.desc}
          </p>

          <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
            <button
              onClick={() => {
                const el = document.querySelector('#kontakt');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.2em] hover:text-red-400 transition-colors flex items-center gap-2 group/btn"
            >
              <span>Termin anfragen</span>
              <span className={`transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`}>→</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Seminars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="seminare" className="py-16 md:py-32 bg-[#F8F8F8] dark:bg-[#0D0D0D] relative overflow-hidden transition-colors duration-300">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 rounded-full bg-[#E31E2D]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E31E2D]" />
            <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Seminare</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#111111] dark:text-white leading-tight tracking-tight mb-3">
            Mehr als nur der Führerschein
          </h2>
          <p className="text-[#444444] dark:text-gray-300 text-lg max-w-xl">
            Professionelle Weiterbildungen und Pflichtmaßnahmen aus einer Hand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {seminars.map((s, i) => (
            <SeminarCard key={i} s={s} animDelay={0.1 + i * 0.15} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
