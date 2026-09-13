'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { observeOnce } from '@/lib/observeOnce';

/**
 * Reveals its children once, the first time they scroll into view.
 *
 * Every instance shares a single IntersectionObserver (see lib/observeOnce), so
 * the cost does not scale with the number of reveals on the page. Content starts
 * visible when the observer is unavailable or the reader prefers reduced motion,
 * so it can never be trapped behind an animation that never runs.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 22,
  className = '',
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    return observeOnce(el, () => setShown(true));
  }, []);

  return (
    <Tag
      ref={ref}
      // Hook for the <noscript> override in the layout: without JavaScript the
      // reveal never fires, so the content must not stay at opacity 0.
      data-reveal=""
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: shown ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
