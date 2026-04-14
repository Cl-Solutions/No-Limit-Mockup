import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Download } from 'lucide-react';

const locations = [
  {
    city: 'KNITTLINGEN',
    address: 'Bahnhofstr. 4',
    days: ['Montag', 'Mittwoch'],
    hours: '18:00 – 19:30 Uhr',
    registration: 'Anmeldung ab 17:45 Uhr',
  },
  {
    city: 'MÜHLACKER',
    address: 'Bahnhofstr. 71',
    days: ['Dienstag', 'Donnerstag'],
    hours: '18:00 – 19:30 Uhr',
    registration: 'Anmeldung ab 16:30 Uhr',
  },
];

export default function Hours() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="oeffnungszeiten" className="py-16 md:py-32 bg-[#F8F8F8] dark:bg-[#0D0D0D] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E31E2D]" />
            <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Öffnungszeiten</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#111111] dark:text-white leading-tight tracking-tight">
            Wann Du uns findest
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-[#111] border border-[#E31E2D]/20 rounded-sm p-6 md:p-10 relative overflow-hidden group hover:border-[#E31E2D]/50 transition-[border-color,box-shadow] duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.15 }}
              style={{ boxShadow: '0 0 40px rgba(227,30,45,0.05)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E31E2D]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#E31E2D]/60 via-[#E31E2D]/20 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-7">
                  <div className="w-10 h-10 bg-[#E31E2D]/10 rounded-sm flex items-center justify-center mt-0.5">
                    <MapPin size={18} className="text-[#E31E2D]" />
                  </div>
                  <div>
                    <h3 className="text-[#111111] dark:text-white font-black text-2xl tracking-tight">{loc.city}</h3>
                    <p className="text-[#666666] dark:text-gray-400 text-sm mt-0.5">{loc.address}</p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-black/5 dark:border-white/5 pt-7">
                  <div className="flex items-start gap-4">
                    <div className="flex gap-2 flex-wrap flex-1">
                      {loc.days.map((day) => (
                        <span key={day} className="bg-[#E31E2D]/10 text-[#E31E2D] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-black/20 dark:text-white/30 shrink-0" />
                    <span className="text-[#111111] dark:text-white font-bold text-lg">{loc.hours}</span>
                  </div>

                  <div className="bg-black/3 dark:bg-white/3 rounded-sm px-4 py-3">
                    <p className="text-[#444444] dark:text-gray-300 text-sm">{loc.registration}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-[#E31E2D]/5 border border-[#E31E2D]/20 rounded-sm p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div>
            <h3 className="text-[#111111] dark:text-white font-bold text-xl mb-2">Vorab anmelden?</h3>
            <p className="text-[#444444] dark:text-gray-300 text-sm max-w-lg">
              Füll das Anmeldeformular aus und bring es direkt mit in die Fahrschule.
            </p>
          </div>
          <a
            href="http://fs-nolimit.de/Anmeldeformular.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#E31E2D] text-white px-5 sm:px-7 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:bg-red-600 transition-[background-color,box-shadow,transform] duration-150 ease-out rounded-sm hover:shadow-[0_0_30px_rgba(227,30,45,0.4)] sm:whitespace-nowrap shrink-0 active:scale-[0.97] w-full sm:w-auto justify-center"
          >
            <Download size={16} />
            Anmeldeformular (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  );
}
