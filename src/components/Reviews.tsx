import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   PLATZHALTER — bei Übergabe mit echten Google-Werten ersetzen:
   - RATING / REVIEW_COUNT: Gesamtbewertung & Anzahl (ehrlich halten)
   - GOOGLE_REVIEWS_URL: Link zum Google-Profil der Fahrschule
   - reviews[]: echte Bewertungstexte/Namen eintragen
   ───────────────────────────────────────────────────────────── */
const RATING = '4,8';
const REVIEW_COUNT = '201';
const GOOGLE_REVIEWS_URL = 'https://share.google/nNvluDwMGCzvPHidI';

interface Review {
  name: string;
  initial: string;
  color: string;
  text: string;
  date: string;
}

// Echte Google-Bewertungen (5★), Stand Mitte 2026 — gekürzt auf den prägnanten Kern.
const reviews: Review[] = [
  {
    name: 'Mariam Esayas',
    initial: 'ME',
    color: '#E31E2D',
    text: 'Ich hatte meine Fahrstunden bei Pablo und es waren wirklich die besten Fahrstunden. Er war immer sehr nett, geduldig und hat alles verständlich erklärt. Er hat mich so gut auf die Prüfung vorbereitet, dass ich sie direkt beim ersten Versuch bestanden habe. Top Fahrlehrer!',
    date: 'vor 4 Monaten',
  },
  {
    name: 'Jan Luca Fest',
    initial: 'JL',
    color: '#2563eb',
    text: 'Ich kann die Fahrschule NoLimit nur weiterempfehlen! Besonders positiv fand ich, dass mir keine unnötigen Fahrstunden aufgezwungen wurden. Es wurde ehrlich und fair eingeschätzt, wie viele Stunden ich wirklich brauche.',
    date: 'vor 3 Monaten',
  },
  {
    name: 'Yulia Zdravkova',
    initial: 'YZ',
    color: '#d946ef',
    text: 'Dank dieser Fahrschule konnte ich meinen Führerschein lösungsorientiert, positiv und stressfrei erwerben. Alle Mitarbeiter waren äußerst freundlich, hilfsbereit und professionell. Besonders Herr Etem war ein großartiger Lehrer.',
    date: 'vor 5 Monaten',
  },
  {
    name: 'Mahmut Sahin',
    initial: 'MS',
    color: '#7c3aed',
    text: 'Die No Limit Fahrschule bietet eine sehr angenehme und motivierende Lernatmosphäre. Die Fahrlehrerinnen und Fahrlehrer bleiben ruhig, erklären verständlich und gehen individuell auf den Lernstand ein.',
    date: 'vor 5 Monaten',
  },
  {
    name: 'Andi To',
    initial: 'AT',
    color: '#059669',
    text: 'Die No Limit Fahrschule bietet alles was man von einer Fahrschule erwartet. Es sind professionelle Fahrlehrer die sehr freundlich und sehr kompetent sind. Ich kann jedem empfehlen einen Führerschein bei No Limit zu machen.',
    date: 'vor 3 Monaten',
  },
  {
    name: 'Moritz Schneider',
    initial: 'MO',
    color: '#d97706',
    text: 'Ich war schon bei 2 Fahrschulen davor angemeldet, doch hier hat alles am besten gepasst 👍 Mit Nico als Fahrlehrer wurde es nie langweilig bei den Fahrstunden.',
    date: 'vor 3 Monaten',
  },
];

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label="5 von 5 Sternen">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className="text-[#E31E2D] fill-[#E31E2D]" />
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section id="bewertungen" className="py-16 md:py-32 bg-white dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-300">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[36rem] h-[36rem] rounded-full bg-[#E31E2D]/5 blur-3xl pointer-events-none -translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8" ref={ref}>
        {/* Kopf mit Gesamtbewertung */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#E31E2D]" />
              <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Bewertungen</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#111111] dark:text-white leading-tight tracking-tight">
              Das sagen unsere Fahrschüler
            </h2>
          </div>

          <div className="flex items-center gap-5 bg-[#F8F8F8] dark:bg-[#111] border border-black/8 dark:border-white/8 rounded-sm px-6 py-5 shrink-0">
            <div className="text-center">
              <div className="text-[#111111] dark:text-white text-5xl font-black leading-none tabular-nums">{RATING}</div>
              <div className="mt-2 flex justify-center"><Stars size={15} /></div>
            </div>
            <div className="h-12 w-px bg-black/10 dark:bg-white/10" />
            <div>
              <div className="flex items-center gap-1.5 text-[#111111] dark:text-white font-bold text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
                Google Bewertungen
              </div>
              <div className="text-[#666666] dark:text-white/45 text-xs mt-1">aus {REVIEW_COUNT} Bewertungen</div>
            </div>
          </div>
        </motion.div>

        {/* Swipe-Hinweis + Desktop-Pfeile */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#999999] dark:text-white/35 text-xs uppercase tracking-[0.2em]">← Wischen für mehr</span>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Vorherige Bewertungen"
              className="w-10 h-10 flex items-center justify-center rounded-sm border border-black/15 dark:border-white/15 text-[#444444] dark:text-white/60 hover:border-[#E31E2D] hover:text-[#E31E2D] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Weitere Bewertungen"
              className="w-10 h-10 flex items-center justify-center rounded-sm border border-black/15 dark:border-white/15 text-[#444444] dark:text-white/60 hover:border-[#E31E2D] hover:text-[#E31E2D] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Swipe-Karussell */}
        <motion.div
          ref={trackRef}
          className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 sm:mx-0 sm:px-0 pb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              data-card
              className="snap-start shrink-0 w-[82%] sm:w-[340px] bg-[#F8F8F8] dark:bg-[#111] border border-black/8 dark:border-white/8 rounded-sm p-6 flex flex-col"
            >
              <Quote size={28} className="text-[#E31E2D]/15 self-end -mb-3" />
              <Stars />
              <p className="text-[#444444] dark:text-white/70 text-sm leading-relaxed mt-4 mb-6 flex-1">
                {r.text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: r.color }}
                >
                  {r.initial}
                </div>
                <div>
                  <div className="text-[#111111] dark:text-white font-bold text-sm">{r.name}</div>
                  <div className="text-[#999999] dark:text-white/35 text-xs">{r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 border border-black/15 dark:border-white/15 text-[#111111] dark:text-white px-7 py-3.5 rounded-sm text-sm font-bold hover:border-[#E31E2D] hover:text-[#E31E2D] transition-colors duration-150"
          >
            Alle Bewertungen auf Google ansehen
            <ExternalLink size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
