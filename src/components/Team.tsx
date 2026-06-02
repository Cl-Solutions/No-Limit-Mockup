import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Award, User, ImageIcon } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   PLATZHALTER-Team — bei Übergabe ersetzen:
   - Foto: `photo` auf z. B. "/team/name.jpg" setzen
   - `name` und `role` mit echten Daten füllen
   ───────────────────────────────────────────────────────────── */
interface Member {
  name: string;
  role: string;
  photo?: string;
}

const members: Member[] = [
  { name: 'Name folgt', role: 'Fahrlehrer' },
  { name: 'Name folgt', role: 'Fahrlehrer' },
  { name: 'Name folgt', role: 'Büro & Anmeldung' },
];

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="py-16 md:py-32 bg-white dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-300">
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[600px] md:h-[600px] rounded-full border border-[#E31E2D]/5 pointer-events-none" />
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-[400px] md:h-[400px] rounded-full border border-[#E31E2D]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E31E2D]" />
            <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Team</span>
            <div className="h-px w-8 bg-[#E31E2D]" />
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#111111] dark:text-white leading-tight tracking-tight">
            Unser Team
          </h2>
          <p className="text-[#444444] dark:text-white/50 mt-4 max-w-xl mx-auto">
            Erfahrene Fahrlehrer, die dich persönlich und mit Geduld zum Führerschein begleiten.
          </p>
        </motion.div>

        {/* Inhaber — Lead-Karte */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-black/2 dark:bg-white/2 border border-black/8 dark:border-white/8 rounded-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative bg-gradient-to-br from-[#F0F0F0] to-[#E8E8E8] dark:from-[#1a1a1a] dark:to-[#0D0D0D] flex items-center justify-center p-8 md:p-16 min-h-[260px] md:min-h-[360px]">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-2 border-[#E31E2D]" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full border border-[#E31E2D]" />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  {/* Foto-Platzhalter — `photo` später einsetzen */}
                  <div className="w-36 h-36 rounded-full border-4 border-[#E31E2D] bg-gradient-to-br from-[#E31E2D]/20 to-[#E31E2D]/5 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(227,30,45,0.3)]">
                    <User size={56} className="text-[#E31E2D]/60" strokeWidth={1.5} />
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className="text-[#E31E2D] fill-[#E31E2D]" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} className="text-[#E31E2D]" />
                  <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Inhaber</span>
                </div>
                <h3 className="text-[#111111] dark:text-white font-black text-2xl md:text-3xl tracking-tight mb-1">Etem</h3>
                <h3 className="text-[#111111] dark:text-white font-black text-2xl md:text-3xl tracking-tight mb-2">Bardakcioglu</h3>
                <p className="text-[#666666] dark:text-white/40 text-sm font-medium uppercase tracking-wider mb-6">
                  Inhaber &amp; Fahrschullehrer
                </p>

                <blockquote className="relative mb-8 pl-10">
                  <span aria-hidden="true" className="absolute left-0 top-[-0.1em] text-[#E31E2D] text-5xl font-black leading-none select-none opacity-40">"</span>
                  <p className="text-[#444444] dark:text-white/70 text-base leading-relaxed italic">
                    Ich freue mich, dich sicher, spaßig und mit Erfolg zum Führerschein zu begleiten.
                  </p>
                </blockquote>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/3 dark:bg-white/3 rounded-sm p-4">
                    <div className="text-[#E31E2D] font-black text-2xl">2005</div>
                    <div className="text-[#666666] dark:text-white/40 text-xs mt-1">Als Fahrlehrer tätig</div>
                  </div>
                  <div className="bg-black/3 dark:bg-white/3 rounded-sm p-4">
                    <div className="text-[#E31E2D] font-black text-2xl">2008</div>
                    <div className="text-[#666666] dark:text-white/40 text-xs mt-1">Fahrschule gegründet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Weitere Team-Mitglieder (Platzhalter) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto mt-4 md:mt-5">
          {members.map((m, i) => (
            <motion.div
              key={i}
              className="bg-black/2 dark:bg-white/2 border border-black/8 dark:border-white/8 rounded-sm overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
            >
              {/* Foto-Slot */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#F0F0F0] to-[#E4E4E4] dark:from-[#181818] dark:to-[#0d0d0d] flex flex-col items-center justify-center gap-2">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <User size={40} className="text-[#E31E2D]/50" strokeWidth={1.5} />
                    <span className="absolute bottom-2.5 right-3 flex items-center gap-1 text-black/20 dark:text-white/20 text-[10px] uppercase tracking-wider">
                      <ImageIcon size={11} /> Foto folgt
                    </span>
                  </>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-[#111111] dark:text-white font-bold text-base">{m.name}</h3>
                <p className="text-[#666666] dark:text-white/40 text-xs uppercase tracking-wider mt-0.5">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
