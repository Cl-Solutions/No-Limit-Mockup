import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

function CountUp({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const step = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 15, suffix: '+', label: 'Jahre Erfahrung', desc: 'Seit 2008 in Mühlacker' },
  { value: 2, suffix: '', label: 'Standorte', desc: 'Mühlacker & Knittlingen' },
  { value: 8, suffix: '', label: 'Führerscheinklassen', desc: 'Von Mofa bis Lkw' },
  { value: 3, suffix: 'x/W', label: 'Theorieunterricht', desc: 'Regelmäßig & flexibel' },
];

const highlights = [
  'Fahrschule seit 2008 in Mühlacker',
  'Zweiter Standort seit 2011 in Knittlingen',
  'Fahrlehrer Etem Bardakcioglu seit 2005 tätig',
  'Alle Führerscheinklassen unter einem Dach',
];

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32 bg-[#0A0A0A] relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-[#E31E2D]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-[#E31E2D]/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#E31E2D]" />
              <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Über uns</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-tight tracking-tight mb-8">
              Erfahrung, die dich
              <span className="text-[#E31E2D]"> weiterbringt.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Die Fahrschule NoLimit besteht in Mühlacker seit <strong className="text-white">2008</strong> und
              in Knittlingen seit <strong className="text-white">2011</strong>. Inhaber{' '}
              <strong className="text-white">Etem Bardakcioglu</strong> ist seit 2005 als Fahrlehrer tätig —
              mit dem Ziel, jeden Fahrschüler sicher, effizient und erfolgreich zum Führerschein zu begleiten.
            </p>
            <p className="text-gray-300 text-base leading-relaxed mb-10 italic border-l-2 border-[#E31E2D] pl-4">
              "Ob talentiert oder nicht — am Ende wirst auch Du den Führerschein glücklich in den Händen halten."
            </p>

            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <CheckCircle size={18} className="text-[#E31E2D] mt-0.5 shrink-0" />
                  <span className="text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white/3 border border-white/8 p-8 rounded-sm group hover:border-[#E31E2D]/50 hover:bg-[#E31E2D]/5 transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#E31E2D] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-black text-[#E31E2D] leading-none mb-2 tabular-nums">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white font-bold text-base mb-1">{stat.label}</div>
                <div className="text-gray-400 text-xs">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
