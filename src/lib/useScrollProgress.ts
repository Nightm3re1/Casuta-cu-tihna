'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Reports how far a sticky track has been scrolled, as 0→1.
 *
 * This replaces a scroll-linked animation library for the one place the site
 * needs one. It costs a passive scroll listener and a rAF loop that stops as
 * soon as the value settles, and it never touches React state — the subscriber
 * writes straight to the DOM, so a scroll never triggers a re-render.
 *
 * The value is eased towards its target rather than snapped, which gives the
 * same damped feel a spring would without the machinery.
 */
export function useScrollProgress(
  trackRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  { smoothing = 0.16, disabled = false }: { smoothing?: number; disabled?: boolean } = {},
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Reduced motion: pin to the finished frame and never animate.
    if (disabled) {
      onProgress(1);
      return;
    }

    let current = 0;
    let target = 0;
    let frame = 0;
    let running = false;

    const measure = () => {
      const rect = track.getBoundingClientRect();
      // Distance the sticky child stays pinned for.
      const span = track.offsetHeight - window.innerHeight;
      target = span <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / span));
    };

    const tick = () => {
      const delta = target - current;
      // Snap once the remainder is smaller than a pixel of visual difference.
      current = Math.abs(delta) < 0.0004 ? target : current + delta * smoothing;
      onProgress(current);
      if (current !== target) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const schedule = () => {
      measure();
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    measure();
    current = target;
    onProgress(current);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [trackRef, onProgress, smoothing, disabled]);
}

/** 0 before `a`, 1 after `b`, linear between. */
export const seg = (p: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));

/** Fades in over a→b, holds, then fades out over c→d. */
export const hold = (p: number, a: number, b: number, c: number, d: number) =>
  Math.min(seg(p, a, b), 1 - seg(p, c, d));
