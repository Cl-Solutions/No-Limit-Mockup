import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, BookOpen, GraduationCap, Eye, FileCheck, Car, Route, Target, Trophy } from 'lucide-react';

const steps = [
  { icon: ClipboardList, num: '01', title: 'Anmeldung', desc: 'In der Fahrschule anmelden und alle Unterlagen einreichen.' },
  { icon: BookOpen, num: '02', title: 'Lehrmaterial', desc: 'Lernmaterialien und Zugang zur Lern-App erhalten.' },
  { icon: GraduationCap, num: '03', title: 'Theorieunterricht', desc: 'Grundstoff + Zusatzstoff in regelmäßigen Kursen.' },
  { icon: Eye, num: '04', title: 'Sehtest & Erste Hilfe', desc: 'Pflichtnachweis vor der Theorieprüfung ablegen.' },
  { icon: FileCheck, num: '05', title: 'Theorieprüfung', desc: 'Amtliche Prüfung beim TÜV bestehen.' },
  { icon: Car, num: '06', title: 'Übungsfahrten', desc: 'Grundfahraufgaben und Verkehrsverhalten trainieren.' },
  { icon: Route, num: '07', title: 'Sonderfahrten', desc: 'Überland, Autobahn und Nachtfahrten absolvieren.' },
  { icon: Target, num: '08', title: 'Prüfungsvorbereitung', desc: 'Gezieltes Training für die praktische Prüfung.' },
  { icon: Trophy, num: '09', title: 'Praktische Prüfung', desc: 'Abschlussprüfung beim TÜV — Ziel erreicht!' },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 md:py-32 bg-[#F8F8F8] dark:bg-[#0D0D0D] relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-20"
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
            Was dich erwartet
          </h2>
          <p className="text-[#444444] dark:text-white/50 mt-4 max-w-xl mx-auto">
            Von der Anmeldung bis zur bestandenen Prüfung — ein klarer Weg zum Ziel.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#E31E2D]/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-6 lg:gap-2">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  className="relative flex flex-col items-center text-center group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative mb-5">
                    <div className="w-16 h-16 lg:w-14 lg:h-14 rounded-full bg-white dark:bg-[#111] border-2 border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-[#E31E2D] group-hover:bg-[#E31E2D]/10 transition-[border-color,background-color] duration-200 relative z-10">
                      <Icon size={20} className="text-black/30 dark:text-white/50 group-hover:text-[#E31E2D] transition-colors duration-150" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#E31E2D] flex items-center justify-center z-20">
                      <span className="text-white text-[9px] font-black">{step.num}</span>
                    </div>
                  </div>

                  <h3 className="text-[#111111] dark:text-white font-bold text-xs lg:text-[10px] uppercase tracking-wide lg:tracking-normal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#666666] dark:text-white/35 text-[11px] lg:text-[9px] leading-relaxed hidden md:block">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
