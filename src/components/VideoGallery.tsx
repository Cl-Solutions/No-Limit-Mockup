import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Clip-Galerie im Coverflow: der mittlere Clip steht vorne und
   läuft, die Nachbarn stehen kleiner und gedimmt daneben.
   Teil der Fahrzeug-Sektion, ohne eigene Überschrift.
   Die Dateien haben keine Tonspur.
   ───────────────────────────────────────────────────────────── */

interface Clip {
  src: string;
  poster: string;
  /** Ohne Titel bleibt die Karte unbeschriftet — fuer Clips, die
   *  sich nicht sinnvoll voneinander unterscheiden lassen. */
  title?: string;
  caption?: string;
}

const clips: Clip[] = [
  {
    src: '/videos/flotte.mp4',
    poster: '/videos/flotte-poster.webp',
    title: 'Am Standort',
    caption: 'Die Flotte in Mühlacker',
  },
  { src: '/videos/fahrt.mp4', poster: '/videos/fahrt-poster.webp' },
  { src: '/videos/vorbeifahrt.mp4', poster: '/videos/vorbeifahrt-poster.webp' },
];

export default function VideoGallery({ inView }: { inView: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const reduce = useReducedMotion();

  // Abstand zur Track-Mitte bestimmt Größe und Deckkraft jeder Karte.
  // Gemessen per Bounding-Rect: offsetLeft bezieht sich auf den nächsten
  // positionierten Vorfahren, nicht auf den Track selbst.
  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;

    let nearest = 0;
    let nearestDist = Infinity;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = Math.abs(rect.left + rect.width / 2 - center);
      if (px < nearestDist) {
        nearestDist = px;
        nearest = i;
      }
      const t = Math.min(px / rect.width, 1);
      el.style.transform = reduce ? 'none' : `scale(${(1 - t * 0.16).toFixed(3)})`;
      el.style.opacity = `${(1 - t * 0.5).toFixed(3)}`;
    });

    setActiveIdx(nearest);
  }, [reduce]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    update();
    track.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => {
      track.removeEventListener('scroll', onScroll);
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [update]);

  // Nur der vorderste Clip läuft — die anderen bleiben stehen.
  useEffect(() => {
    if (!inView || reduce) return;
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIdx) {
        video.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
      } else {
        video.pause();
      }
    });
  }, [activeIdx, inView, reduce]);

  const scrollTo = (idx: number) => {
    const el = cardRefs.current[Math.min(Math.max(idx, 0), clips.length - 1)];
    const track = trackRef.current;
    if (!el || !track) return;
    const trackRect = track.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const delta = rect.left + rect.width / 2 - (trackRect.left + trackRect.width / 2);
    track.scrollTo({ left: track.scrollLeft + delta, behavior: 'smooth' });
  };

  const playActive = () => {
    const video = videoRefs.current[activeIdx];
    if (!video) return;
    video.play().then(() => setBlocked(false)).catch(() => undefined);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollTo(activeIdx + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); scrollTo(activeIdx - 1); }
  };

  return (
    <div className="mb-10 md:mb-14">
      {/* Steuerzeile — bewusst ohne eigene Überschrift, die Sektion hat schon eine */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-white/55 text-xs uppercase tracking-[0.2em]" aria-hidden="true">
          ← Wischen für mehr
        </span>
        <div className="hidden sm:flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            aria-label="Vorheriger Clip"
            className="w-10 h-10 flex items-center justify-center rounded-sm border border-white/15 text-white/65 hover:border-brand hover:text-brand disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white/65 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollTo(activeIdx + 1)}
            disabled={activeIdx === clips.length - 1}
            aria-label="Nächster Clip"
            className="w-10 h-10 flex items-center justify-center rounded-sm border border-white/15 text-white/65 hover:border-brand hover:text-brand disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white/65 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="Karussell"
        aria-label="Clips aus dem Fuhrpark — Pfeiltasten zum Wechseln"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="no-scrollbar flex items-center gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-[21vw] sm:mx-0 sm:px-[calc(50%-7.5rem)] py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm"
      >
        {clips.map((clip, i) => (
          <div
            key={clip.src}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="snap-center shrink-0 w-[58vw] sm:w-[15rem] aspect-[9/16] relative rounded-sm overflow-hidden bg-ink-surface border border-white/10 transition-[transform,opacity] duration-200 ease-out will-change-transform"
          >
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={clip.src}
              poster={clip.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-label={clip.title ? `${clip.title} — ${clip.caption}` : `Clip ${i + 1} aus dem Fuhrpark`}
              onClick={() => (i === activeIdx ? playActive() : scrollTo(i))}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {i === activeIdx && blocked && (
              <button
                type="button"
                onClick={playActive}
                aria-label={clip.title ? `${clip.title} abspielen` : `Clip ${i + 1} abspielen`}
                className="absolute inset-0 flex items-center justify-center bg-black/25 group"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-transform duration-150 group-hover:scale-105 group-active:scale-95">
                  <Play size={22} className="translate-x-0.5" fill="currentColor" />
                </span>
              </button>
            )}

            {clip.title && (
              <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
                <h4 className="text-white font-black text-sm tracking-tight">{clip.title}</h4>
                {clip.caption && <p className="text-white/70 text-xs mt-0.5">{clip.caption}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Clip wählen">
        {clips.map((clip, i) => (
          <button
            key={clip.src}
            role="tab"
            aria-label={clip.title ? `Zu ${clip.title} springen` : `Zu Clip ${i + 1} springen`}
            aria-selected={i === activeIdx}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-200 ${
              i === activeIdx ? 'w-6 bg-brand' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
