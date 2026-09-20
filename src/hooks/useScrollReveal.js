import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals all elements matching `selector` inside `containerRef` as they
 * scroll into view, with a gentle upward fade + stagger.
 */
export default function useScrollReveal(containerRef, selector = '.gsap-reveal', deps = []) {
  useEffect(() => {
    if (!containerRef.current) return undefined;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray(selector);
      if (!els.length) return;

      ScrollTrigger.batch(els, {
        start: 'top 88%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          }),
        once: true,
      });

      gsap.set(els, { y: 28 });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
