import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bike, Truck, Car, ImageIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Bildplatzhalter — sobald echte Fotos vorliegen, einfach `src` setzen
 * (z. B. "/flotte/standort.jpg"). Ohne `src` wird ein gestalteter
 * Platzhalter mit Icon angezeigt.
 */
function MediaTile({
  icon: Icon,
  label,
  src,
  className = '',
  align = 'center',
  hideTag = false,
}: {
  icon: LucideIcon;
  label: string;
  src?: string;
  className?: string;
  align?: 'center' | 'top';
  hideTag?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-sm ${className}`}>
        <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-gradient-to-br from-[#161616] to-[#0c0c0c] border border-white/8 flex flex-col items-center gap-3 group ${
        align === 'top' ? 'justify-start pt-10' : 'justify-center'
      } ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(227,30,45,0.12),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Icon size={40} className="text-[#E31E2D]/70 relative z-10" strokeWidth={1.5} />
      <span className="text-white/35 text-xs font-medium uppercase tracking-[0.2em] relative z-10">{label}</span>
      {!hideTag && (
        <span className="absolute bottom-2.5 right-3 flex items-center gap-1 text-white/20 text-[10px] uppercase tracking-wider">
          <ImageIcon size={11} /> Foto folgt
        </span>
      )}
    </div>
  );
}

export default function Fleet() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="flotte" className="py-16 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[40rem] h-[40rem] rounded-full bg-[#E31E2D]/5 blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="mb-12 md:mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E31E2D]" />
            <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Flotte</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.05] tracking-tight mb-4">
            Die modernste Flotte
            <span className="text-[#E31E2D]"> der Region.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            Aktuelle Modelle, top gepflegt, für jede Klasse das passende Fahrzeug —
            vom Automatik-Pkw über Motorräder bis zur kompletten Lkw-Flotte.
          </p>
        </motion.div>

        {/* Bento-Grid: 1 großes Flotten-Hero + 3 Detail-Kacheln */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* Großer Flotten-Hero (Auto-Bild später hier) */}
          <motion.div
            className="col-span-2 lg:row-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-full min-h-[280px] lg:min-h-[420px]">
              <MediaTile icon={Car} label="Unsere Pkw-Flotte" className="h-full w-full" align="top" hideTag />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/85 to-transparent pointer-events-none">
                <h3 className="text-white font-black text-xl md:text-2xl tracking-tight">
                  Lernen auf den schönsten Autos
                </h3>
                <p className="text-white/60 text-sm mt-1.5">
                  Aktuelle Pkw-Modelle, viele in Automatik &mdash; komfortabel und sicher.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Zweirad */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <MediaTile icon={Bike} label="Motorräder &amp; Roller" className="h-40 lg:h-[202px] w-full" />
          </motion.div>
          {/* Lkw */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <MediaTile icon={Truck} label="Lkw &amp; Anhänger" className="h-40 lg:h-[202px] w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
