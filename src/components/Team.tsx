import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Award, Users } from 'lucide-react';

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#E31E2D]/5 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#E31E2D]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E31E2D]" />
            <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Team</span>
            <div className="h-px w-8 bg-[#E31E2D]" />
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-tight tracking-tight">
            Dein Fahrlehrer
          </h2>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white/2 border border-white/8 rounded-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] flex items-center justify-center p-16 min-h-[360px]">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-2 border-[#E31E2D]" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full border border-[#E31E2D]" />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full border-4 border-[#E31E2D] bg-gradient-to-br from-[#E31E2D]/20 to-[#E31E2D]/5 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(227,30,45,0.3)]">
                    <Users size={60} className="text-[#E31E2D]/60" />
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={14} className="text-[#E31E2D] fill-[#E31E2D]" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} className="text-[#E31E2D]" />
                  <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Inhaber</span>
                </div>
                <h3 className="text-white font-black text-3xl tracking-tight mb-1">Etem</h3>
                <h3 className="text-white font-black text-3xl tracking-tight mb-2">Bardakcioglu</h3>
                <p className="text-white/40 text-sm font-medium uppercase tracking-wider mb-6">
                  Inhaber &amp; Fahrschullehrer
                </p>

                <blockquote className="border-l-2 border-[#E31E2D] pl-5 mb-8">
                  <p className="text-white/70 text-base leading-relaxed italic">
                    "Ich freue mich, dich sicher, spaßig und mit Erfolg zum Führerschein zu begleiten."
                  </p>
                </blockquote>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/3 rounded-sm p-4">
                    <div className="text-[#E31E2D] font-black text-2xl">2005</div>
                    <div className="text-white/40 text-xs mt-1">Als Fahrlehrer tätig</div>
                  </div>
                  <div className="bg-white/3 rounded-sm p-4">
                    <div className="text-[#E31E2D] font-black text-2xl">2008</div>
                    <div className="text-white/40 text-xs mt-1">Fahrschule gegründet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
