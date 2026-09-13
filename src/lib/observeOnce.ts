/**
 * One shared IntersectionObserver for every reveal on the page.
 *
 * The page has around forty reveal targets. Giving each its own observer costs
 * forty observer allocations and forty separate callback queues during
 * hydration; a single shared observer does the same work for one.
 */
type Callback = () => void;

const callbacks = new WeakMap<Element, Callback>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cb = callbacks.get(entry.target);
          if (cb) {
            callbacks.delete(entry.target);
            observer?.unobserve(entry.target);
            cb();
          }
        }
      },
      // threshold 0 rather than a ratio: an element taller than ~8x the
      // viewport can never reach a fractional threshold, and would then never
      // reveal at all. The negative bottom margin does the timing instead —
      // the reveal fires as the element's top crosses 92% of the viewport.
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );
  }
  return observer;
}

/** Runs `cb` once, the first time `el` scrolls into view. Returns a cleanup. */
export function observeOnce(el: Element, cb: Callback): () => void {
  const io = getObserver();
  if (!io) {
    // No observer support: show the content rather than trapping it.
    cb();
    return () => {};
  }
  callbacks.set(el, cb);
  io.observe(el);
  return () => {
    callbacks.delete(el);
    io.unobserve(el);
  };
}
