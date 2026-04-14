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

interface StatCardProps {
  stat: typeof stats[0];
  animDelay: number;
  inView: boolean;
}

function StatCard({ stat, animDelay, inView }: StatCardProps) {
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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: animDelay }}
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
          background: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, rgba(227,30,45,0.5), transparent 60%)`,
        }}
      />

      {/* Card body */}
      <div className="relative m-[1px] rounded-sm bg-[#f5f5f5] dark:bg-[#0e0e0e] p-4 sm:p-6 md:p-8 overflow-hidden">

        {/* Inner spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(250px circle at ${mouse.x}px ${mouse.y}px, rgba(227,30,45,0.08), transparent 60%)`,
          }}
        />

        {/* Top edge glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(150px circle at ${mouse.x}px 0px, rgba(227,30,45,0.9), transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          <div className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-[#E31E2D] leading-none mb-2 tabular-nums">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-[#111111] dark:text-white font-bold text-base mb-1">{stat.label}</div>
          <div className="text-[#666666] dark:text-gray-400 text-xs">{stat.desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-16 md:py-32 bg-white dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-300" ref={sectionRef}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-[#E31E2D]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-[#E31E2D]/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#E31E2D]" />
              <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Über uns</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#111111] dark:text-white leading-tight tracking-tight mb-8">
              Erfahrung, die dich
              <span className="text-[#E31E2D]"> weiterbringt.</span>
            </h2>
            <p className="text-[#444444] dark:text-gray-300 text-lg leading-relaxed mb-6">
              Die Fahrschule NoLimit besteht in Mühlacker seit <strong className="text-[#111111] dark:text-white">2008</strong> und
              in Knittlingen seit <strong className="text-[#111111] dark:text-white">2011</strong>. Inhaber{' '}
              <strong className="text-[#111111] dark:text-white">Etem Bardakcioglu</strong> ist seit 2005 als Fahrlehrer tätig —
              mit dem Ziel, jeden Fahrschüler sicher, effizient und erfolgreich zum Führerschein zu begleiten.
            </p>
            <p className="text-[#444444] dark:text-gray-300 text-base leading-relaxed mb-10 italic border-l-2 border-[#E31E2D] pl-4">
              "Ob talentiert oder nicht — am Ende wirst auch Du den Führerschein glücklich in den Händen halten."
            </p>

            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-[#444444] dark:text-gray-300"
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

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} animDelay={0.2 + i * 0.1} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
