import { useEffect } from 'react';

/**
 * Sperrt das Hintergrund-Scrollen, solange ein Modal offen ist, und schließt
 * es per Escape-Taste. Verhindert außerdem den Layout-Sprung durch die
 * verschwindende Scrollbar.
 */
export function useModalA11y(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);
}
