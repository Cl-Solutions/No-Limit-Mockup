import { useRef } from 'react';
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
    desc: 'Pflichtmaßnahme zur Führerscheinerhaltung für Fahranfänger mit einem A-Verstoß oder zwei B-Verstößen in der Probezeit. Jetzt Termin sichern.',
    tag: 'Probezeit',
  },
];

interface SeminarCardProps {
  s: { icon: LucideIcon; title: string; duration: string; desc: string; tag: string };
  animDelay: number;
  inView: boolean;
}

function SeminarCard({ s, animDelay, inView }: SeminarCardProps) {
  const Icon = s.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: animDelay, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-sm overflow-hidden cursor-default bg-white dark:bg-ink-surface border border-black/8 dark:border-white/8 p-6 md:p-10 group transition-[border-color,transform,box-shadow] duration-200 hover:border-brand/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(227,30,45,0.10)]"
    >
      <div className="w-14 h-14 bg-brand/10 border border-brand/20 rounded-sm flex items-center justify-center mb-8 transition-colors duration-200 group-hover:bg-brand/20">
        <Icon size={24} className="text-brand" />
      </div>

      <span className="text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">
        {s.tag}
      </span>

      <h3 className="text-fg-primary dark:text-white font-black text-xl leading-tight tracking-tight mb-3">
        {s.title}
      </h3>

      <div className="text-fg-muted dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-5">
        {s.duration}
      </div>

      <p className="text-fg-secondary dark:text-gray-300 text-sm leading-relaxed">
        {s.desc}
      </p>

      <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
        <button
          onClick={() => {
            const el = document.querySelector('#oeffnungszeiten');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-brand text-xs font-bold uppercase tracking-[0.2em] hover:text-brand-light transition-colors flex items-center gap-2"
        >
          <span>Termin anfragen</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function Seminars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="seminare" className="py-16 md:py-32 bg-paper-subtle dark:bg-ink-subtle relative overflow-hidden transition-colors duration-300">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 rounded-full bg-brand/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-brand" />
            <span className="text-brand text-xs font-bold uppercase tracking-[0.3em]">Seminare</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-fg-primary dark:text-white leading-tight tracking-tight mb-3">
            Mehr als nur der Führerschein
          </h2>
          <p className="text-fg-secondary dark:text-gray-300 text-lg max-w-xl">
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
