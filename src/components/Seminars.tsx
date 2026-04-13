import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Truck, RefreshCw, AlertTriangle } from 'lucide-react';

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

export default function Seminars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="seminare" className="py-32 bg-[#F8F8F8] dark:bg-[#0D0D0D] relative overflow-hidden transition-colors duration-300">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E31E2D]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
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
          {seminars.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                className="group relative bg-white dark:bg-white/2 border border-black/8 dark:border-white/8 p-10 rounded-sm hover:border-[#E31E2D]/40 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E31E2D]/0 to-[#E31E2D]/0 group-hover:from-[#E31E2D]/3 group-hover:to-transparent transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#E31E2D]/10 border border-[#E31E2D]/20 rounded-sm flex items-center justify-center mb-8 group-hover:bg-[#E31E2D]/20 group-hover:border-[#E31E2D]/40 transition-all duration-400">
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
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
