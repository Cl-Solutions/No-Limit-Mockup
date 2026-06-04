import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, BookOpen, Car, Clock, Users, Award, Hand } from 'lucide-react';
import { useModalA11y } from '../hooks/useModalA11y';
import { categories, getClass, type CategoryInfo, type LicenseClass } from '../data/licenseClasses';

/* ─────────────────────────────────────────────────────────────
   Klassen-Detail-Karte (innerhalb des Sheets)
   ───────────────────────────────────────────────────────────── */
function ClassDetail({ cls, onBack }: { cls: LicenseClass; onBack: () => void }) {
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
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-bold uppercase tracking-[0.15em] mb-4 transition-colors"
        >
          <ChevronLeft size={14} /> Zurück
        </button>
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
            const el = document.querySelector('#oeffnungszeiten');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
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
        {/* Grab-Indicator (mobile) */}
        <div className="sm:hidden flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        <div className="h-1 bg-brand" />

        <AnimatePresence mode="wait" initial={false}>
          {activeClass ? (
            <ClassDetail key="detail" cls={activeClass} onBack={() => setActiveId(null)} />
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
   Showcase-Sektion (Bild mit Hotspots + Kategorie-Buttons)
   ───────────────────────────────────────────────────────────── */
export default function VehicleShowcase() {
  const ref = useRef(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCat, setActiveCat] = useState<CategoryInfo | null>(null);
  const reduce = useReducedMotion();

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
        className="py-16 md:py-32 bg-white dark:bg-ink relative overflow-hidden transition-colors duration-300"
        ref={ref}
      >
        {/* Subtile diagonale Akzent-Layer */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[28rem] h-[28rem] rounded-full bg-brand/4 blur-3xl -translate-x-1/2" />
          <div className="absolute bottom-1/4 right-0 w-[28rem] h-[28rem] rounded-full bg-brand/4 blur-3xl translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-brand" />
              <span className="text-brand text-xs font-bold uppercase tracking-[0.3em]">Führerscheine</span>
              <div className="h-px w-8 bg-brand" />
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-fg-primary dark:text-white leading-tight tracking-tight mb-3">
              Welche Klasse passt zu dir?
            </h2>
            <p className="text-fg-secondary dark:text-gray-300 text-base max-w-md mx-auto">
              Wähle deine Fahrzeugklasse und entdecke alle Details — von Mindestalter bis Pflichtstunden.
            </p>
          </motion.div>

          {/* Hotspot-Bild — sanfter Reveal + dezenter Scroll-Parallax */}
          <motion.div
            ref={imageRef}
            className="relative rounded-sm overflow-hidden border border-black/8 dark:border-white/8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imgY }}
          >
            <picture>
              <source srcSet="/showcase.webp" type="image/webp" />
              <img
                src="/showcase.png"
                alt="Fahrschule NoLimit Fahrzeuge"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
                width={1408}
                height={628}
                draggable={false}
              />
            </picture>

            {/* „Tippen!"-Hint — nur Desktop, dezent oben rechts (auf Mobile wären die Buttons darunter primary CTA) */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="hidden sm:flex absolute top-4 right-4 z-10 items-center gap-1.5 bg-brand text-white text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg pointer-events-none"
            >
              <Hand size={12} className="rotate-12" />
              <span>Tippen für Infos</span>
            </motion.div>

            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat)}
                className="absolute group"
                style={{
                  left: `${cat.hotspot.x}%`,
                  top: `${cat.hotspot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                }}
                aria-label={`Führerscheinklassen für ${cat.label} anzeigen`}
              >
                {/* Pulsring */}
                <span
                  className="absolute inset-0 rounded-full bg-brand/40 animate-ping"
                  style={{ animationDelay: `${idx * 250}ms`, animationDuration: '1.8s' }}
                />
                <span
                  className="hidden sm:block absolute -inset-1.5 rounded-full bg-brand/15 animate-ping"
                  style={{ animationDelay: `${idx * 250 + 400}ms`, animationDuration: '2.2s' }}
                />

                {/* Sichtbarer Hotspot — auf Mobile kleiner Dot, auf Desktop großer Kreis mit Emoji */}
                <span className="hotspot-inner relative flex h-5 w-5 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-brand ring-2 ring-white shadow-[0_0_14px_rgba(227,30,45,0.85),0_2px_6px_rgba(0,0,0,0.4)] group-hover:scale-110 group-active:scale-95 transition-[transform] duration-150 ease-out">
                  {/* Emoji NUR auf sm+ — auf Mobile reine Pulsing-Punkte */}
                  <span className="hidden sm:inline text-white text-base sm:text-lg leading-none" aria-hidden="true">
                    {cat.icon}
                  </span>
                </span>

                {/* Label NUR auf Desktop sichtbar — Mobile hat die Buttons direkt darunter */}
                <span className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-white text-fg-primary text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-lg pointer-events-none">
                  {cat.label}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-white" />
                </span>
              </button>
            ))}
          </motion.div>

          {/* Kategorie-Buttons (alternative zum Bild-Klick) */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat)}
                className="flex items-center justify-center gap-2.5 bg-transparent border border-brand hover:bg-brand text-fg-primary dark:text-white hover:text-white px-5 py-3.5 rounded-sm transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] text-sm font-bold group"
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
                <ChevronRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-[opacity,transform]" />
              </button>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
