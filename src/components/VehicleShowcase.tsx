import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, BookOpen, Car, Clock, Users, Award } from 'lucide-react';
import { useModalA11y } from '../hooks/useModalA11y';
import { categories, getClass, type CategoryInfo, type LicenseClass } from '../data/licenseClasses';
import Fleet from './Fleet';

/* ─────────────────────────────────────────────────────────────
   Klassen-Detail-Karte (innerhalb des Sheets)
   ───────────────────────────────────────────────────────────── */
function ClassDetail({ cls, onBack, onClose }: { cls: LicenseClass; onBack: () => void; onClose: () => void }) {
  const sf = cls.praxis.sonderfahrten;
  const totalSF = sf ? sf.ueberland + sf.autobahn + sf.nacht : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 min-h-0 flex flex-col"
    >
      {/* Detail-Kopf */}
      <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-white/8 shrink-0">
        {/* Top row: Zurück links, Schließen rechts — beide klar erkennbar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/65 hover:text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors"
          >
            <ChevronLeft size={14} /> Übersicht
          </button>
          <button
            onClick={onClose}
            aria-label="Schließen"
            className="w-8 h-8 -mr-2 flex items-center justify-center text-white/65 hover:text-white hover:bg-white/8 rounded-sm transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[clamp(2.5rem,8vw,4rem)] font-black text-brand leading-none tracking-tighter">
              {cls.name}
            </div>
            <div className="text-white/85 font-bold text-base mt-1">{cls.title}</div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-sm border border-white/15 text-white/70 shrink-0 mt-1">
            {cls.badge}
          </span>
        </div>
        <p className="text-white/65 text-sm leading-relaxed mt-4">{cls.summary}</p>
      </div>

      {/* Detail-Inhalt */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-7">
        {/* Quick facts */}
        <div className="grid grid-cols-2 gap-3">
          <FactCard icon={Users} label="Mindestalter" value={cls.mindestalter} />
          {cls.voraussetzung && <FactCard icon={Award} label="Voraussetzung" value={cls.voraussetzung} />}
        </div>

        {/* Fahrzeuge */}
        <DetailSection icon={Car} title="Was du fahren darfst">
          <ul className="space-y-2">
            {cls.fahrzeuge.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-white/75 text-sm leading-relaxed">
                <ChevronRight size={14} className="text-brand mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </DetailSection>

        {/* Theorie */}
        <DetailSection icon={BookOpen} title="Theorie">
          <div className="space-y-2 text-sm">
            <div className="flex items-start justify-between gap-3 text-white/75">
              <span>Grundstoff</span>
              <span className="text-white font-medium text-right">{cls.theorie.grundstoff}</span>
            </div>
            <div className="flex items-start justify-between gap-3 text-white/75">
              <span>Klassenspezifisch</span>
              <span className="text-white font-medium text-right">{cls.theorie.klassenspezifisch}</span>
            </div>
          </div>
        </DetailSection>

        {/* Praxis */}
        <DetailSection icon={Clock} title="Praxis">
          <p className="text-white/75 text-sm leading-relaxed">{cls.praxis.pflicht}</p>
          {sf && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <SFBox value={sf.ueberland} label="Überland" />
              <SFBox value={sf.autobahn} label="Autobahn" />
              <SFBox value={sf.nacht} label="Nacht" />
              <div className="col-span-3 text-[11px] text-white/45 mt-1 text-center">
                {totalSF} Pflicht-Sonderfahrten · je 45 min
              </div>
            </div>
          )}
        </DetailSection>

        {/* Besonderheiten */}
        {cls.besonderheiten && cls.besonderheiten.length > 0 && (
          <DetailSection icon={Award} title="Gut zu wissen">
            <ul className="space-y-2">
              {cls.besonderheiten.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-white/75 text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </DetailSection>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 sm:px-8 py-5 border-t border-white/8 bg-ink-inset shrink-0">
        <button
          onClick={() => {
            onClose();
            // Kurzer Delay damit das Sheet-Exit-Animate sauber durchläuft, bevor wir scrollen
            setTimeout(() => {
              const el = document.querySelector('#oeffnungszeiten');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 220);
          }}
          className="w-full bg-brand text-white py-3.5 font-bold uppercase tracking-[0.15em] text-sm hover:bg-red-600 transition-[background-color,box-shadow,transform] duration-150 ease-out rounded-sm hover:shadow-[0_0_25px_rgba(227,30,45,0.4)] active:scale-[0.97]"
        >
          Für {cls.name} anmelden
        </button>
      </div>
    </motion.div>
  );
}

function FactCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="bg-white/3 border border-white/8 rounded-sm p-3.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/45 mb-1.5">
        <Icon size={11} />
        <span>{label}</span>
      </div>
      <div className="text-white text-sm font-medium leading-snug">{value}</div>
    </div>
  );
}

function DetailSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Car;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-brand text-xs font-black uppercase tracking-[0.2em] mb-3">
        <Icon size={13} />
        {title}
      </h4>
      {children}
    </div>
  );
}

function SFBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white/3 border border-white/8 rounded-sm p-3 text-center">
      <div className="text-white text-xl font-black tabular-nums">{value}</div>
      <div className="text-white/45 text-[10px] uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Kategorie-Sheet (Liste der Klassen-Kacheln einer Kategorie)
   ───────────────────────────────────────────────────────────── */
function CategorySheet({
  cat,
  onClose,
}: {
  cat: CategoryInfo;
  onClose: () => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeClass = activeId ? getClass(activeId) : null;

  useModalA11y(true, onClose);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Führerscheinklassen für ${cat.label}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 w-full sm:max-w-xl bg-ink-surface text-white rounded-t-2xl sm:rounded-sm overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-brand" />

        <AnimatePresence mode="wait" initial={false}>
          {activeClass ? (
            <ClassDetail key="detail" cls={activeClass} onBack={() => setActiveId(null)} onClose={onClose} />
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 min-h-0 flex flex-col"
            >
              {/* Kategorie-Kopf */}
              <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-white/8 relative shrink-0">
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-white/45 hover:text-white hover:bg-white/8 rounded-sm transition-colors"
                  aria-label="Schließen"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-3 mb-3 pr-10">
                  <span className="text-4xl leading-none">{cat.icon}</span>
                  <div>
                    {cat.badge && (
                      <span className="bg-brand text-white text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm block w-fit mb-1.5">
                        {cat.badge}
                      </span>
                    )}
                    <h3 className="text-white font-black text-2xl leading-tight tracking-tight">
                      Klasse {cat.label}
                    </h3>
                  </div>
                </div>
                <p className="text-white/65 text-sm leading-relaxed">{cat.intro}</p>
              </div>

              {/* Klassen-Kacheln */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.classIds.map((id) => {
                  const cls = getClass(id);
                  if (!cls) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveId(id)}
                      className="text-left bg-white/3 border border-white/8 rounded-sm p-5 hover:border-brand/60 hover:bg-brand/5 transition-[border-color,background-color,transform] duration-150 group active:scale-[0.99]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-[clamp(1.5rem,5vw,2rem)] font-black text-brand leading-none tracking-tighter">
                            {cls.name}
                          </div>
                          <div className="text-white/85 text-sm font-medium mt-1">{cls.title}</div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm shrink-0 ${
                          cls.badge.startsWith('Schl') ? 'bg-brand text-white' : 'border border-white/15 text-white/65'
                        }`}>
                          {cls.badge}
                        </span>
                      </div>
                      <p className="text-white/55 text-[13px] leading-relaxed mb-4">{cls.summary}</p>
                      <div className="flex items-center gap-1.5 text-brand text-[11px] font-bold uppercase tracking-[0.15em]">
                        <span>Alle Details</span>
                        <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Showcase-Sektion (Klassen-Karten + Fahrzeug-Block)
   ───────────────────────────────────────────────────────────── */
export default function VehicleShowcase() {
  const ref = useRef(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCat, setActiveCat] = useState<CategoryInfo | null>(null);
  const reduce = useReducedMotion();

  // Klassen-Karussell: wie viele Positionen anfahrbar sind, haengt davon ab,
  // wie viele Slides gleichzeitig ins Sichtfeld passen.
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [lastIdx, setLastIdx] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId = 0;

    const measure = () => {
      const slide = track.querySelector<HTMLElement>('[data-slide]');
      if (!slide) return;
      const stride = slide.offsetWidth + 16;
      if (stride <= 0) return;
      const maxIdx = Math.max(0, Math.round((track.scrollWidth - track.clientWidth) / stride));
      setLastIdx(maxIdx);
      setActiveIdx(Math.min(Math.max(Math.round(track.scrollLeft / stride), 0), maxIdx));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => {
      track.removeEventListener('scroll', onScroll);
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSlide = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>('[data-slide]');
    const stride = slide ? slide.offsetWidth + 16 : 320;
    track.scrollTo({ left: Math.min(Math.max(idx, 0), lastIdx) * stride, behavior: 'smooth' });
  };

  const handleTrackKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollToSlide(activeIdx + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToSlide(activeIdx - 1); }
    else if (e.key === 'Home') { e.preventDefault(); scrollToSlide(0); }
    else if (e.key === 'End') { e.preventDefault(); scrollToSlide(lastIdx); }
  };

  // Dezenter Scroll-Parallax aufs Hotspot-Bild — Hauch von Bewegung beim Scroll
  const { scrollYProgress: imgProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(imgProgress, [0, 1], reduce ? [0, 0] : [-12, 12]);

  return (
    <>
      <AnimatePresence>
        {activeCat && <CategorySheet cat={activeCat} onClose={() => setActiveCat(null)} />}
      </AnimatePresence>

      <section
        id="fuehrerscheine"
        className="py-16 md:py-32 bg-ink relative overflow-hidden"
        ref={ref}
      >
        {/* Subtile diagonale Akzent-Layer */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[28rem] h-[28rem] rounded-full bg-brand/4 blur-3xl -translate-x-1/2" />
          <div className="absolute bottom-1/4 right-0 w-[28rem] h-[28rem] rounded-full bg-brand/4 blur-3xl translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 md:mb-14 max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-brand" />
              <span className="text-brand text-xs font-bold uppercase tracking-[0.3em]">Führerscheine</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.05] tracking-tight mb-4">
              Welchen Führerschein
              <span className="text-brand"> willst du machen?</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              Drei Wege, zwölf Klassen — von der Mofa-Bescheinigung bis zum Sattelzug.
              Tippe auf eine Karte für Mindestalter, Pflichtstunden und Details.
            </p>
          </motion.div>

          {/* Klassen-Karten â ein echtes Foto plus die enthaltenen Klassen */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imgY }}
          >
            <div
              ref={trackRef}
              role="region"
              aria-roledescription="Karussell"
              aria-label="Fahrzeugklassen — Pfeiltasten zum Wechseln"
              tabIndex={0}
              onKeyDown={handleTrackKeyDown}
              className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 sm:mx-0 sm:px-0 pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  data-slide
                  onClick={() => setActiveCat(cat)}
                  aria-label={`Führerscheinklassen für ${cat.label} anzeigen`}
                  className="group flex flex-col text-left snap-start shrink-0 w-[82%] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] rounded-sm overflow-hidden bg-ink-surface border border-white/10 hover:border-brand/60 transition-colors duration-200"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={`${cat.label} der Fahrschule NoLimit`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-surface via-ink-surface/10 to-transparent" />
                    {cat.badge && (
                      <span className="absolute top-3 left-3 bg-brand text-white text-[10px] font-black uppercase tracking-[0.14em] px-2.5 py-1 rounded-full">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl" aria-hidden="true">{cat.icon}</span>
                      <h3 className="text-white font-black text-lg md:text-xl tracking-tight">{cat.label}</h3>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.classIds.map((id) => {
                        const cls = getClass(id);
                        return cls ? (
                          <span
                            key={id}
                            className="text-[11px] font-bold tracking-wider text-white/75 bg-white/8 border border-white/10 rounded-sm px-2 py-0.5"
                          >
                            {cls.name}
                          </span>
                        ) : null;
                      })}
                    </div>

                    <p className="text-white/55 text-sm leading-relaxed flex-1">{cat.intro}</p>

                    <span className="flex items-center gap-1 text-brand text-xs font-black uppercase tracking-wider mt-auto">
                      Alle Details
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Wisch-Hinweis + Punkte — nur wenn es wirklich etwas zu scrollen gibt */}
            <div className={`flex items-center justify-between gap-3 mt-3 ${lastIdx === 0 ? 'hidden' : ''}`}>
              <span className="text-white/55 text-xs uppercase tracking-[0.2em]" aria-hidden="true">
                ← Wischen für mehr
              </span>
              <div className="flex gap-2" role="tablist" aria-label="Fahrzeugklasse wählen">
                {Array.from({ length: lastIdx + 1 }, (_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-label={`Zu Position ${i + 1} springen`}
                    aria-selected={i === activeIdx}
                    onClick={() => scrollToSlide(i)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      i === activeIdx ? 'w-6 bg-brand' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fahrzeug-Block + Video-Galerie — gleiche Sektion, eigener Anker */}
        <Fleet />
      </section>
    </>
  );
}
