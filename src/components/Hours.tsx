import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Download, DoorOpen } from 'lucide-react';

// Optional pro Standort: `image: "/standorte/muehlacker.jpg"` setzen, sobald
// Gebäudefotos vorliegen — ohne Bild bleibt die Karte kompakt wie bisher.
interface Location {
  city: string;
  address: string;
  days: string[];
  hours: string;
  registration: string;
  image?: string;
}

const locations: Location[] = [
  {
    city: 'MÜHLACKER',
    address: 'Bahnhofstr. 71',
    days: ['Dienstag', 'Donnerstag'],
    hours: '18:00 – 19:30 Uhr',
    registration: 'Anmeldung ab 16:30 Uhr',
    image: '/flotte/standort-muehlacker.webp',
  },
  {
    city: 'KNITTLINGEN',
    address: 'Bahnhofstr. 4',
    days: ['Montag', 'Mittwoch'],
    hours: '18:00 – 19:30 Uhr',
    registration: 'Anmeldung ab 17:45 Uhr',
  },
];

export default function Hours() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="oeffnungszeiten" className="py-16 md:py-32 bg-paper-subtle dark:bg-ink-subtle relative overflow-hidden transition-colors duration-300">
      {/* Atmosphärischer Akzent für „Final-Sektion" */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 w-[34rem] h-[34rem] rounded-full bg-brand/8 blur-3xl translate-x-1/3" />
        <div className="absolute -bottom-32 left-0 w-[24rem] h-[24rem] rounded-full bg-brand/5 blur-3xl -translate-x-1/3" />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="mb-12 md:mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-brand" />
            <span className="text-brand text-xs font-bold uppercase tracking-[0.3em]">Anmelden</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-fg-primary dark:text-white leading-tight tracking-tight mb-4">
            Komm einfach vorbei.
          </h2>
          <p className="text-fg-secondary dark:text-white/60 text-base md:text-lg leading-relaxed">
            Anmeldung am einfachsten persönlich vor Ort — wir nehmen uns Zeit, beraten dich in Ruhe und unverbindlich.
            Die genauen Öffnungszeiten je Standort findest du direkt unten.
          </p>
        </motion.div>

        {/* Vorbeikommen-Highlight (kompakt — Details stehen in den Karten darunter) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-brand to-brand-dark text-white rounded-sm p-6 md:p-8 mb-6 md:mb-8 relative overflow-hidden shadow-[0_12px_40px_rgba(227,30,45,0.25)]"
        >
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/15 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/15 backdrop-blur-sm rounded-sm flex items-center justify-center shrink-0">
              <DoorOpen size={28} className="text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-xl md:text-2xl tracking-tight mb-1.5 text-white">Vorbeikommen &amp; anmelden</h3>
              <p className="text-white text-sm md:text-[15px] leading-relaxed font-medium">
                Kein Termin nötig — komm während der Öffnungszeiten in einen unserer Standorte
                und melde dich direkt an.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Bahnhofstr.+71+75417+M%C3%BChlacker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-brand px-5 py-3 font-bold uppercase tracking-[0.12em] text-sm hover:bg-white/90 transition-[background-color,transform] duration-150 ease-out rounded-sm shrink-0 active:scale-[0.97]"
            >
              <MapPin size={16} /> Route
            </a>
          </div>
        </motion.div>

        {/* Standort-Karten — beide gleichwertig */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-6 md:mb-8">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-ink-surface border border-brand/20 rounded-sm relative overflow-hidden group hover:border-brand/50 transition-[border-color,box-shadow] duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              style={{ boxShadow: '0 0 40px rgba(227,30,45,0.05)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Optionaler Gebäude-Foto-Slot — wird angezeigt, sobald `image` gesetzt ist */}
              {loc.image && (
                <div className="aspect-[16/10] overflow-hidden bg-black/3 dark:bg-white/3 border-b border-brand/15">
                  <img src={loc.image} alt={`Fahrschule NoLimit ${loc.city}`} loading="lazy" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand/60 via-brand/20 to-transparent" />

              <div className="relative z-10 p-6 md:p-10">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-10 h-10 bg-brand/10 rounded-sm flex items-center justify-center mt-0.5">
                    <MapPin size={18} className="text-brand" />
                  </div>
                  <div>
                    <h3 className="text-fg-primary dark:text-white font-black text-2xl tracking-tight">{loc.city}</h3>
                    <p className="text-fg-muted dark:text-gray-400 text-sm mt-0.5">{loc.address}</p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-black/5 dark:border-white/5 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex gap-2 flex-wrap flex-1">
                      {loc.days.map((day) => (
                        <span key={day} className="bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-black/40 dark:text-white/55 shrink-0" aria-hidden="true" />
                    <span className="text-fg-primary dark:text-white font-bold text-lg">{loc.hours}</span>
                  </div>

                  <div className="bg-black/3 dark:bg-white/3 rounded-sm px-4 py-3">
                    <p className="text-fg-secondary dark:text-gray-300 text-sm">{loc.registration}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Anmeldeformular-PDF */}
        <motion.div
          className="bg-brand/5 border border-brand/20 rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div>
            <h3 className="text-fg-primary dark:text-white font-bold text-lg md:text-xl mb-1.5">Anmeldeformular vorab ausfüllen</h3>
            <p className="text-fg-secondary dark:text-gray-300 text-sm max-w-lg">
              Spart Zeit beim Vorbeikommen — Formular runterladen, ausfüllen und direkt mitbringen.
            </p>
          </div>
          <a
            href="http://fs-nolimit.de/Anmeldeformular.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-brand text-white px-5 sm:px-7 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:bg-red-600 transition-[background-color,box-shadow,transform] duration-150 ease-out rounded-sm hover:shadow-[0_0_30px_rgba(227,30,45,0.4)] sm:whitespace-nowrap shrink-0 active:scale-[0.97] w-full sm:w-auto justify-center"
          >
            <Download size={16} />
            Anmeldeformular (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  );
}
