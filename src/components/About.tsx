import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Award, Star, User, ImageIcon } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Stats + Highlights + Team — alles in einer „Über uns"-Sektion.
   Bewusst entpersonalisiert; Etem erscheint nur in der Inhaber-Karte.
   ───────────────────────────────────────────────────────────── */

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
  'Alle Führerscheinklassen unter einem Dach',
  'Modernste Fahrzeugflotte der Region',
];

interface Member {
  name: string;
  role: string;
  photo?: string;
}

// Team-Mitglieder. Restliche Plätze als Platzhalter bis weitere Fotos vorliegen.
const teamMembers: Member[] = [
  { name: 'Hasan Bardakcioglu', role: 'Fahrlehrer', photo: '/team/hasan.webp' },
  { name: 'Name folgt', role: 'Fahrlehrer' },
  { name: 'Name folgt', role: 'Büro & Anmeldung' },
];

function StatCard({ stat, animDelay, inView }: { stat: typeof stats[0]; animDelay: number; inView: boolean }) {
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
      <div
        className="absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, rgba(227,30,45,0.5), transparent 60%)`,
        }}
      />
      <div className="relative m-[1px] rounded-sm bg-paper-inset dark:bg-ink-inset p-4 sm:p-6 md:p-8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(250px circle at ${mouse.x}px ${mouse.y}px, rgba(227,30,45,0.08), transparent 60%)`,
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(150px circle at ${mouse.x}px 0px, rgba(227,30,45,0.9), transparent 70%)`,
          }}
        />
        <div className="relative z-10">
          <div className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-brand leading-none mb-2 tabular-nums">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-fg-primary dark:text-white font-bold text-base mb-1">{stat.label}</div>
          <div className="text-fg-muted dark:text-gray-400 text-xs">{stat.desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-16 md:py-32 bg-white dark:bg-ink relative overflow-hidden transition-colors duration-300" ref={sectionRef}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-brand/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ─── Block 1: Story + Stats ─── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-brand" />
              <span className="text-brand text-xs font-bold uppercase tracking-[0.3em]">Über uns</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-fg-primary dark:text-white leading-tight tracking-tight mb-8">
              Erfahrung, die dich
              <span className="text-brand"> weiterbringt.</span>
            </h2>
            <p className="text-fg-secondary dark:text-gray-300 text-lg leading-relaxed mb-8">
              Die Fahrschule NoLimit besteht in Mühlacker seit <strong className="text-fg-primary dark:text-white">2008</strong> und
              in Knittlingen seit <strong className="text-fg-primary dark:text-white">2011</strong>. Über 15 Jahre Erfahrung,
              modernste Fahrzeuge und ein Team, das jeden Fahrschüler sicher, effizient und erfolgreich zum Führerschein begleitet.
            </p>

            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-fg-secondary dark:text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <CheckCircle size={18} className="text-brand mt-0.5 shrink-0" />
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

        {/* ─── Block 2: Inhaber + Team ─── */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand" />
            <span className="text-brand text-xs font-bold uppercase tracking-[0.3em]">Dein Team</span>
          </div>
          <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-fg-primary dark:text-white leading-tight tracking-tight">
            Die Menschen hinter NoLimit
          </h3>
        </motion.div>

        {/* Inhaber-Karte */}
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-paper-inset dark:bg-ink-inset border border-black/8 dark:border-white/8 rounded-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative bg-gradient-to-br from-paper-muted to-[#E8E8E8] dark:from-ink-surface dark:to-ink-subtle flex items-center justify-center p-8 md:p-16 min-h-[260px] md:min-h-[360px]">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-2 border-brand" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full border border-brand" />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full border-4 border-brand mb-6 shadow-[0_0_40px_rgba(227,30,45,0.3)] overflow-hidden">
                    <img
                      src="/team/etem.webp"
                      alt="Etem Bardakcioglu, Inhaber der Fahrschule NoLimit"
                      width={144}
                      height={144}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-1" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className="text-brand fill-brand" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} className="text-brand" />
                  <span className="text-brand text-xs font-bold uppercase tracking-[0.3em]">Inhaber & Fahrlehrer</span>
                </div>
                <h4 className="text-fg-primary dark:text-white font-black text-2xl md:text-3xl tracking-tight mb-1">Etem</h4>
                <h4 className="text-fg-primary dark:text-white font-black text-2xl md:text-3xl tracking-tight mb-6">Bardakcioglu</h4>

                <blockquote className="relative mb-8 pl-10">
                  <span aria-hidden="true" className="absolute left-0 top-[-0.1em] text-brand text-5xl font-black leading-none select-none opacity-40">"</span>
                  <p className="text-fg-secondary dark:text-white/70 text-base leading-relaxed italic">
                    Ich freue mich, dich sicher, spaßig und mit Erfolg zum Führerschein zu begleiten.
                  </p>
                </blockquote>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/3 dark:bg-white/3 rounded-sm p-4">
                    <div className="text-brand font-black text-2xl">2005</div>
                    <div className="text-fg-muted dark:text-white/40 text-xs mt-1">Als Fahrlehrer tätig</div>
                  </div>
                  <div className="bg-black/3 dark:bg-white/3 rounded-sm p-4">
                    <div className="text-brand font-black text-2xl">2008</div>
                    <div className="text-fg-muted dark:text-white/40 text-xs mt-1">Fahrschule gegründet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <span className="block sm:hidden text-fg-subtle dark:text-white/55 text-xs uppercase tracking-[0.2em] mt-5 mb-2.5">← Wischen für mehr</span>

        {/* Weitere Team-Mitglieder — Mobile als Swipe-Karussell, Desktop als Grid */}
        <div className="no-scrollbar flex sm:grid sm:grid-cols-3 gap-4 md:gap-5 max-w-5xl sm:mt-4 md:mt-5 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
          {teamMembers.map((m, i) => (
            <motion.div
              key={i}
              className="snap-start shrink-0 w-[78%] sm:w-auto bg-paper-inset dark:bg-ink-inset border border-black/8 dark:border-white/8 rounded-sm overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-paper-muted to-paper-inset dark:from-ink-surface dark:to-ink-subtle flex flex-col items-center justify-center gap-2">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <User size={40} className="text-brand/50" strokeWidth={1.5} />
                    <span className="absolute bottom-2.5 right-3 flex items-center gap-1 text-black/20 dark:text-white/20 text-[10px] uppercase tracking-wider">
                      <ImageIcon size={11} /> Foto folgt
                    </span>
                  </>
                )}
              </div>
              <div className="p-5">
                <h5 className="text-fg-primary dark:text-white font-bold text-base">{m.name}</h5>
                <p className="text-fg-muted dark:text-white/40 text-xs uppercase tracking-wider mt-0.5">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
