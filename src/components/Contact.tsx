import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Printer, MessageCircle, Navigation as NavIcon, Download } from 'lucide-react';

const contactMethods = [
  { icon: Phone, label: 'Mobil', value: '0176 247 246 35', href: 'tel:017624724635' },
  { icon: Phone, label: 'Festnetz', value: '07041 49 71 35', href: 'tel:07041497135' },
  { icon: Printer, label: 'Fax', value: '07041 146 289 5', href: undefined },
  { icon: Mail, label: 'E-Mail', value: 'info@fahrschule-nolimit.de', href: 'mailto:info@fahrschule-nolimit.de' },
];

const locations = [
  {
    city: 'Mühlacker',
    address: 'Bahnhofstr. 71, 75417 Mühlacker',
    maps: 'https://www.google.com/maps/search/?api=1&query=Bahnhofstr.+71+75417+M%C3%BChlacker',
  },
  {
    city: 'Knittlingen',
    address: 'Bahnhofstr. 4, Knittlingen',
    maps: 'https://www.google.com/maps/search/?api=1&query=Bahnhofstr.+4+Knittlingen',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="kontakt" className="py-16 pb-16 md:py-32 md:pb-28 bg-white dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-300">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#E31E2D]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E31E2D]" />
            <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Kontakt</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#111111] dark:text-white leading-tight tracking-tight">
            Meld dich bei uns
          </h2>
          <p className="text-[#444444] dark:text-gray-300 text-base md:text-lg leading-relaxed mt-4 max-w-xl">
            Fragen, Anmeldung oder einfach Infos gewünscht? Ruf an, schreib uns oder komm direkt vorbei —
            wir antworten schnell.
          </p>
        </motion.div>

        {/* Einladung: einfach vorbeikommen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-[#E31E2D]/5 border border-[#E31E2D]/25 rounded-sm p-6 md:p-8 mb-8 md:mb-10 flex flex-col md:flex-row md:items-center gap-5 md:gap-8"
        >
          <div className="w-12 h-12 bg-[#E31E2D] rounded-sm flex items-center justify-center shrink-0">
            <MapPin size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#111111] dark:text-white font-black text-lg md:text-xl tracking-tight mb-1">
              Am einfachsten: einfach vorbeikommen
            </h3>
            <p className="text-[#444444] dark:text-gray-300 text-sm md:text-base leading-relaxed">
              Komm direkt in unsere Fahrschule in <strong className="text-[#111111] dark:text-white">Mühlacker, Bahnhofstr. 71</strong> —
              dort kannst du dich anmelden und in Ruhe & unverbindlich beraten lassen. Wir freuen uns auf dich!
            </p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Bahnhofstr.+71+75417+M%C3%BChlacker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#E31E2D] text-white px-6 py-3.5 font-bold uppercase tracking-[0.12em] text-sm hover:bg-red-600 transition-[background-color,box-shadow,transform] duration-150 ease-out rounded-sm hover:shadow-[0_0_25px_rgba(227,30,45,0.4)] active:scale-[0.97] shrink-0 whitespace-nowrap"
          >
            <NavIcon size={16} /> Route nach Mühlacker
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Schnellkontakt-Aktionen */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-[#F8F8F8] dark:bg-[#111] border border-black/8 dark:border-white/8 rounded-sm p-6 md:p-8"
          >
            <h3 className="text-[#111111] dark:text-white font-bold text-lg mb-5">Direkt loslegen</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <a
                href="tel:017624724635"
                className="flex items-center justify-center gap-2.5 bg-[#E31E2D] text-white py-4 font-bold uppercase tracking-[0.12em] text-sm hover:bg-red-600 transition-[background-color,box-shadow,transform] duration-150 ease-out rounded-sm hover:shadow-[0_0_25px_rgba(227,30,45,0.4)] active:scale-[0.97]"
              >
                <Phone size={16} /> Jetzt anrufen
              </a>
              <a
                href="https://wa.me/4917624724635"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 border-2 border-black/15 dark:border-white/15 text-[#111111] dark:text-white py-4 font-bold uppercase tracking-[0.12em] text-sm hover:border-[#E31E2D] hover:text-[#E31E2D] transition-colors duration-150 rounded-sm active:scale-[0.97]"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>

            <a
              href="http://fs-nolimit.de/Anmeldeformular.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 bg-[#E31E2D]/5 border border-[#E31E2D]/20 rounded-sm px-5 py-4 mb-8 group hover:border-[#E31E2D]/50 transition-colors"
            >
              <div>
                <div className="text-[#111111] dark:text-white font-bold text-sm">Anmeldeformular (PDF)</div>
                <div className="text-[#666666] dark:text-white/45 text-xs mt-0.5">Ausfüllen & direkt mitbringen</div>
              </div>
              <span className="w-10 h-10 bg-[#E31E2D] text-white rounded-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Download size={16} />
              </span>
            </a>

            <div className="space-y-4 border-t border-black/8 dark:border-white/8 pt-7">
              {contactMethods.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-11 h-11 bg-[#E31E2D]/10 rounded-sm flex items-center justify-center shrink-0 group-hover:bg-[#E31E2D]/20 transition-colors">
                      <Icon size={18} className="text-[#E31E2D]" />
                    </div>
                    <div>
                      <div className="text-[#666666] dark:text-gray-400 text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-[#111111] dark:text-white font-medium hover:text-[#E31E2D] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-[#111111] dark:text-white font-medium">{item.value}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Standorte mit Route-Links */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {locations.map((loc, i) => (
              <a
                key={i}
                href={loc.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#F8F8F8] dark:bg-[#111] border border-black/8 dark:border-white/8 rounded-sm p-6 md:p-7 group hover:border-[#E31E2D]/40 transition-[border-color,transform] duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-[#E31E2D]/10 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={18} className="text-[#E31E2D]" />
                    </div>
                    <div>
                      <h3 className="text-[#111111] dark:text-white font-black text-xl tracking-tight">{loc.city}</h3>
                      <p className="text-[#666666] dark:text-gray-400 text-sm mt-1">{loc.address}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-[#E31E2D] text-xs font-bold uppercase tracking-wider shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                    <NavIcon size={14} /> Route
                  </span>
                </div>
              </a>
            ))}

          </motion.div>
        </div>
      </div>
    </section>
  );
}
