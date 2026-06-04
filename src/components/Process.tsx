import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ClipboardList, BookOpen, Car, Trophy, Check } from 'lucide-react';
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

/**
 * Progressiv gefüllter Ring-Indikator pro Phase.
 * Phase 1 → 25 %, Phase 2 → 50 %, Phase 3 → 75 %, Phase 4 → 100 % (komplett gefüllt + Häkchen).
 */
function PhaseRing({ index, total, Icon, inView }: { index: number; total: number; Icon: LucideIcon; inView: boolean }) {
  const r = 26;
  const C = 2 * Math.PI * r;
  const progress = (index + 1) / total;
  const isFinal = index === total - 1;

  return (
    <div className="relative shrink-0 w-16 h-16 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
        <circle cx="32" cy="32" r={r} stroke="currentColor" strokeWidth="2.5" fill="none" className="text-white/8" />
        <motion.circle
          cx="32" cy="32" r={r}
          stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
          className="text-brand"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={inView ? { strokeDashoffset: C * (1 - progress) } : { strokeDashoffset: C }}
          transition={{ duration: 1.2, delay: 0.5 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
        isFinal ? 'bg-brand text-white shadow-[0_0_20px_rgba(227,30,45,0.55)]' : 'bg-ink-inset text-brand'
      }`}>
        {isFinal ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
      </div>
    </div>
  );
}

/**
 * Single Phase-Item — sanfter Reveal beim Sichtbarwerden, einzeln getriggert
 * für eine entspannte sequenzielle Bewegung beim Runterscrollen.
 */
function PhaseItem({ phase, index, isMobile }: { phase: Phase; index: number; isMobile: boolean }) {
  const itemRef = useRef(null);
  const inView = useInView(itemRef, { once: true, margin: '-15% 0px -15% 0px' });
  const isFinal = index === phases.length - 1;
  const reduce = useReducedMotion();

  const initialY = reduce ? 0 : 28;

  if (isMobile) {
    return (
      <motion.li
        ref={itemRef}
        className="relative flex gap-4 sm:gap-5 pb-8 last:pb-0"
        initial={{ opacity: 0, y: initialY }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <PhaseRing index={index} total={phases.length} Icon={phase.icon} inView={inView} />

        <div className={`flex-1 bg-white dark:bg-ink-surface border rounded-sm p-5 sm:p-6 transition-[border-color,box-shadow] ${
          isFinal ? 'border-brand/40 shadow-[0_8px_30px_rgba(227,30,45,0.12)]' : 'border-black/8 dark:border-white/8'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 bg-brand/12 dark:bg-brand/15 text-brand dark:text-brand-light text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm">
              Phase {phase.num} <span className="text-brand/50 dark:text-brand-light/50">/</span> 04
            </span>
            {isFinal && (
              <span className="bg-brand text-white text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm shadow-[0_0_14px_rgba(227,30,45,0.4)]">
                Ziel
              </span>
            )}
          </div>
          <h3 className="text-fg-primary dark:text-white font-black text-lg leading-tight tracking-tight mb-2">
            {phase.title}
          </h3>
          <p className="text-fg-secondary dark:text-white/55 text-sm leading-relaxed mb-4">{phase.desc}</p>
          <ul className="space-y-2">
            {phase.points.map((pt, j) => (
              <li key={j} className="flex items-start gap-2.5 text-fg-muted dark:text-white/45 text-[13px] leading-snug">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand/70 shrink-0" aria-hidden="true" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.li>
    );
  }

  // Desktop variant
  return (
    <motion.li
      ref={itemRef}
      className="relative flex flex-col items-center text-center"
      initial={{ opacity: 0, y: initialY }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-5 relative z-10">
        <PhaseRing index={index} total={phases.length} Icon={phase.icon} inView={inView} />
      </div>

      <div className={`w-full bg-white dark:bg-ink-surface border rounded-sm p-6 transition-[border-color,box-shadow,transform] hover:-translate-y-1 ${
        isFinal
          ? 'border-brand/40 shadow-[0_8px_30px_rgba(227,30,45,0.12)] hover:shadow-[0_12px_40px_rgba(227,30,45,0.18)]'
          : 'border-black/8 dark:border-white/8 hover:border-brand/30'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 bg-brand/12 dark:bg-brand/15 text-brand dark:text-brand-light text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm">
            Phase {phase.num} <span className="text-brand/50 dark:text-brand-light/50">/</span> 04
          </span>
          {isFinal && (
            <span className="bg-brand text-white text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm shadow-[0_0_14px_rgba(227,30,45,0.4)]">
              Ziel
            </span>
          )}
        </div>
        <h3 className="text-fg-primary dark:text-white font-black text-lg leading-tight tracking-tight mb-2">
          {phase.title}
        </h3>
        <p className="text-fg-secondary dark:text-white/55 text-sm leading-relaxed mb-4">{phase.desc}</p>
        <ul className="space-y-2 text-left">
          {phase.points.map((pt, j) => (
            <li key={j} className="flex items-start gap-2.5 text-fg-muted dark:text-white/45 text-[13px] leading-snug">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand/70 shrink-0" aria-hidden="true" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export default function Process() {
  const sectionRef = useRef(null);
  const mobileTimelineRef = useRef(null);
  const desktopTimelineRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  // Scroll-driven Vertikallinie (Mobile) — wächst mit dem Scroll
  const { scrollYProgress: mobileScroll } = useScroll({
    target: mobileTimelineRef,
    offset: ['start 80%', 'end 20%'],
  });
  const mobileLineScale = useTransform(mobileScroll, [0, 0.95], [0, 1]);

  // Scroll-driven Horizontallinie (Desktop)
  const { scrollYProgress: desktopScroll } = useScroll({
    target: desktopTimelineRef,
    offset: ['start 85%', 'end 40%'],
  });
  const desktopLineScale = useTransform(desktopScroll, [0, 0.9], [0, 1]);

  return (
    <section id="ablauf" ref={sectionRef} className="py-16 md:py-32 bg-paper-subtle dark:bg-ink-subtle relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-brand" />
            <span className="text-brand text-xs font-bold uppercase tracking-[0.3em]">Ausbildungsablauf</span>
            <div className="h-px w-8 bg-brand" />
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-fg-primary dark:text-white leading-tight tracking-tight">
            In 4 Schritten zum Führerschein
          </h2>
          <p className="text-fg-secondary dark:text-white/55 mt-4 max-w-xl mx-auto">
            Von der Anmeldung bis zur bestandenen Prüfung — ein klarer Weg zum Ziel.
          </p>
        </motion.div>

        {/* ─── Mobile/Tablet: vertikale Timeline mit scroll-driven Linie ─── */}
        <ol ref={mobileTimelineRef} className="relative lg:hidden" aria-label="Ausbildungsphasen">
          <motion.div
            className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-brand via-brand/60 to-brand/15 origin-top"
            style={{ scaleY: reduce ? 1 : mobileLineScale }}
            aria-hidden="true"
          />
          {phases.map((phase, i) => (
            <PhaseItem key={i} phase={phase} index={i} isMobile />
          ))}
        </ol>

        {/* ─── Desktop: horizontale Cards mit scroll-driven Linie ─── */}
        <div className="hidden lg:block">
          <div ref={desktopTimelineRef} className="relative">
            <motion.div
              className="absolute top-[50px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand/15 via-brand/50 to-brand origin-left"
              style={{ scaleX: reduce ? 1 : desktopLineScale }}
              aria-hidden="true"
            />
            <ol className="grid grid-cols-4 gap-6" aria-label="Ausbildungsphasen">
              {phases.map((phase, i) => (
                <PhaseItem key={i} phase={phase} index={i} isMobile={false} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
