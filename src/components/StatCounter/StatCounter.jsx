import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StatCounter.scss';

gsap.registerPlugin(ScrollTrigger);

export default function StatCounter({ value, suffix = '', label }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    const counter = { val: 0 };

    const tween = gsap.to(counter, {
      val: value,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = Math.round(counter.val).toString();
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [value]);

  return (
    <div className="stat-counter">
      <p className="stat-counter__value display-xl">
        <span ref={numRef}>0</span>
        {suffix}
      </p>
      <p className="stat-counter__label">{label}</p>
    </div>
  );
}
