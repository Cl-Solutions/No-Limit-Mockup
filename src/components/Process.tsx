import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, BookOpen, Car, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Phase {
  icon: LucideIcon;
  num: string;
  title: string;
  desc: string;
  points: string[];
}

const phases: Phase[] = [
  {
    icon: ClipboardList,
    num: '01',
    title: 'Anmeldung & Start',
    desc: 'Anmelden, Unterlagen abgeben und direkt loslegen.',
    points: ['Anmeldung in der Fahrschule', 'Lernmaterial & Lern-App', 'Sehtest & Erste Hilfe'],
  },
  {
    icon: BookOpen,
    num: '02',
    title: 'Theorie',
    desc: 'Grund- und Zusatzstoff in regelmäßigen Kursen.',
    points: ['Theorieunterricht', 'Online lernen mit App', 'Theorieprüfung beim TÜV'],
  },
  {
    icon: Car,
    num: '03',
    title: 'Praxis',
    desc: 'Fahrstunden auf modernen Fahrzeugen bis zur Routine.',
    points: ['Übungs- & Grundfahraufgaben', 'Sonderfahrten (Autobahn, Nacht)', 'Gezielte Prüfungsvorbereitung'],
  },
  {
    icon: Trophy,
    num: '04',
    title: 'Prüfung & Ziel',
    desc: 'Praktische Prüfung bestehen — Führerschein in der Hand.',
    points: ['Praktische Prüfung beim TÜV', 'Führerschein erhalten', 'Endlich frei & mobil'],
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 md:py-32 bg-[#F8F8F8] dark:bg-[#0D0D0D] relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E31E2D]" />
            <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Ausbildungsablauf</span>
            <div className="h-px w-8 bg-[#E31E2D]" />
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#111111] dark:text-white leading-tight tracking-tight">
            In 4 Schritten zum Führerschein
          </h2>
          <p className="text-[#444444] dark:text-white/50 mt-4 max-w-xl mx-auto">
            Von der Anmeldung bis zur bestandenen Prüfung — ein klarer Weg zum Ziel.
          </p>
        </motion.div>

        <div className="relative">
          {/* Verbindungslinie (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#E31E2D]/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={i}
                  className="relative group"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="h-full bg-white dark:bg-[#111] border border-black/8 dark:border-white/8 rounded-sm p-6 md:p-7 transition-[border-color,box-shadow,transform] duration-200 group-hover:border-[#E31E2D]/40 group-hover:shadow-[0_8px_30px_rgba(227,30,45,0.08)] group-hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-full bg-[#E31E2D]/8 border-2 border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-[#E31E2D] group-hover:bg-[#E31E2D]/15 transition-[border-color,background-color] duration-200 relative z-10">
                          <Icon size={22} className="text-[#E31E2D]" />
                        </div>
                        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#E31E2D] flex items-center justify-center z-20">
                          <span className="text-white text-[10px] font-black">{phase.num}</span>
                        </div>
                      </div>
                      <h3 className="text-[#111111] dark:text-white font-black text-lg leading-tight tracking-tight">
                        {phase.title}
                      </h3>
                    </div>

                    <p className="text-[#444444] dark:text-white/55 text-sm leading-relaxed mb-5">
                      {phase.desc}
                    </p>

                    <ul className="space-y-2.5">
                      {phase.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-[#666666] dark:text-white/45 text-[13px] leading-snug">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#E31E2D]/70 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
