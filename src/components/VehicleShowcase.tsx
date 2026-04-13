import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

interface HotspotInfo {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  badge?: string;
  title: string;
  classes: {
    name: string;
    items: string[];
  }[];
}

const hotspots: HotspotInfo[] = [
  {
    id: 'car',
    label: 'PKW',
    icon: '🚗',
    x: 13.5,
    y: 67,
    badge: 'Am beliebtesten',
    title: 'Klasse B — Dein PKW-Führerschein',
    classes: [
      {
        name: 'Klasse B & B Automatik',
        items: [
          'Kraftfahrzeuge bis 3.500 kg zulässige Gesamtmasse',
          'Bis zu 8 Sitzplätze (außer Fahrer)',
          'Anhänger bis 750 kg erlaubt',
          'Mindestalter: 18 Jahre | BF17 möglich ab 17 Jahren',
          'Neu: Automatikausbildung auf modernem AMG verfügbar',
        ],
      },
    ],
  },
  {
    id: 'moto-large',
    label: 'Motorrad',
    icon: '🏍️',
    x: 35,
    y: 61,
    title: 'Klasse A & A2 — Das richtige Motorrad',
    classes: [
      {
        name: 'Klasse A2 (ab 18)',
        items: [
          'Motorräder bis 35 kW',
          'Leistung/Gewicht-Verhältnis max. 0,2 kW/kg',
        ],
      },
      {
        name: 'Klasse A (ab 24 oder nach 2 Jahren A2)',
        items: [
          'Alle Krafträder ohne Leistungsbeschränkung',
          'Direkteinstieg ab 24 Jahren',
        ],
      },
    ],
  },
  {
    id: 'scooter',
    label: 'Moped / Roller',
    icon: '🛵',
    x: 62.5,
    y: 67,
    title: 'MOFA, AM & A1 — Klein, aber mobil',
    classes: [
      {
        name: 'MOFA (ab 15)',
        items: ['Bis 25 km/h', 'Nur Theorieprüfung erforderlich'],
      },
      {
        name: 'AM (ab 16)',
        items: ['Bis 45 km/h', 'Max. 50 ccm oder 4 kW', 'Leichtkraftfahrzeuge & Roller'],
      },
      {
        name: 'A1 (ab 16)',
        items: ['Bis 125 ccm, max. 11 kW', 'Leichtkrafträder & größere Roller'],
      },
    ],
  },
  {
    id: 'truck',
    label: 'LKW',
    icon: '🚛',
    x: 82,
    y: 46,
    title: 'C-Klassen — Für schwere Lasten',
    classes: [
      {
        name: 'Klassen im Überblick',
        items: [
          'C1 (ab 18): 3.500–7.500 kg | Voraussetzung: Klasse B',
          'C1E (ab 18): C1 + Anhänger, bis 12.000 kg gesamt',
          'C (ab 21): Über 3.500 kg | Voraussetzung: Klasse B',
          'CE (ab 21): C + Sattelanhänger über 750 kg',
        ],
      },
      {
        name: 'Berufskraftfahrer Ausbildung',
        items: ['140 Stunden à 60 Minuten', 'Vorbereitung auf die IHK-Prüfung'],
      },
    ],
  },
];

function Modal({ spot, onClose }: { spot: HotspotInfo; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 w-full max-w-lg bg-white dark:bg-[#1a1a1a] rounded-sm overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-[#E31E2D]" />

        <div className="p-7 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{spot.icon}</span>
              <div>
                {spot.badge && (
                  <span className="bg-[#E31E2D] text-white text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm block w-fit mb-1.5">
                    {spot.badge}
                  </span>
                )}
                <h3 className="text-[#111111] dark:text-white font-black text-xl leading-tight tracking-tight">
                  {spot.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-black/30 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-sm transition-colors shrink-0 ml-4 mt-0.5"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5">
            {spot.classes.map((cls, i) => (
              <div key={i}>
                <h4 className="text-[#E31E2D] text-xs font-black uppercase tracking-[0.2em] mb-3">
                  {cls.name}
                </h4>
                <ul className="space-y-2">
                  {cls.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[#444444] dark:text-white/70 text-sm leading-relaxed">
                      <ChevronRight size={14} className="text-[#E31E2D] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-black/8 dark:border-white/8">
            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                  const el = document.querySelector('#kontakt');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 250);
              }}
              className="w-full bg-[#E31E2D] text-white py-3.5 font-bold uppercase tracking-[0.15em] text-sm hover:bg-red-600 transition-all duration-300 rounded-sm hover:shadow-[0_0_25px_rgba(227,30,45,0.4)] active:scale-[0.99]"
            >
              Jetzt anmelden
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function VehicleShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<HotspotInfo | null>(null);

  return (
    <>
      <AnimatePresence>
        {active && <Modal spot={active} onClose={() => setActive(null)} />}
      </AnimatePresence>

      <section className="py-20 bg-white dark:bg-[#0A0A0A] relative transition-colors duration-300" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#E31E2D]" />
              <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Interaktiv</span>
              <div className="h-px w-8 bg-[#E31E2D]" />
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-[#111111] dark:text-white leading-tight tracking-tight mb-3">
              Klick auf dein Fahrzeug
            </h2>
            <p className="text-[#444444] dark:text-gray-300 text-base max-w-md mx-auto">
              Tippe auf ein Fahrzeug und entdecke die passenden Führerscheinklassen.
            </p>
          </motion.div>

          <motion.div
            className="relative rounded-sm overflow-hidden border border-black/8 dark:border-white/8"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/Gemini_Generated_Image_fvyunyfvyunyfvyu.png"
              alt="Fahrschule NoLimit Fahrzeuge"
              className="w-full h-auto block"
              draggable={false}
            />

            {hotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActive(spot)}
                className="absolute group"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                }}
                aria-label={`Führerscheinklasse für ${spot.label} anzeigen`}
              >
                <span className="absolute inset-0 rounded-full bg-[#E31E2D]/30 animate-ping" />
                <span className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#E31E2D] shadow-[0_0_14px_rgba(227,30,45,0.8)] group-hover:scale-125 group-hover:shadow-[0_0_22px_rgba(227,30,45,1)] transition-all duration-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                </span>

                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 whitespace-nowrap bg-white dark:bg-[#1a1a1a] text-[#111111] dark:text-white text-xs sm:text-sm font-bold px-2.5 py-1.5 rounded-sm border border-[#E31E2D]/30 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-y-1 group-hover:translate-y-0 shadow-lg">
                  {spot.label}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-[#1a1a1a]" />
                </span>
              </button>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActive(spot)}
                className="flex items-center gap-2.5 bg-transparent border border-[#E31E2D] hover:bg-[#E31E2D] text-[#111111] dark:text-white hover:text-white px-6 py-3 rounded-sm transition-all duration-300 text-sm font-semibold group"
              >
                <span className="text-base">{spot.icon}</span>
                <span>{spot.label}</span>
                <ChevronRight size={14} className="text-current opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
