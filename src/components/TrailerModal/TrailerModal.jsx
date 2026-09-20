import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Modal from '../Modal/Modal.jsx';
import './TrailerModal.scss';

export default function TrailerModal({ game, isOpen, onClose }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !sceneRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.to('.trailer-shape', {
        x: () => gsap.utils.random(-40, 40),
        y: () => gsap.utils.random(-30, 30),
        rotate: () => gsap.utils.random(-25, 25),
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.4, from: 'random' },
      });
      gsap.fromTo(
        '.trailer-scan',
        { yPercent: -100 },
        { yPercent: 200, duration: 3.2, repeat: -1, ease: 'power1.inOut' }
      );
    }, sceneRef);

    return () => ctx.revert();
  }, [isOpen]);

  if (!game) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${game.title} \u2014 Trailer`} size="lg">
      <div className="trailer-modal">
        <div
          className="trailer-modal__scene"
          ref={sceneRef}
          style={{ '--accent': game.palette?.[2] || '#e2572c', '--bg': game.palette?.[0] || '#0a0a0b' }}
        >
          <div className="trailer-shape trailer-shape--1" />
          <div className="trailer-shape trailer-shape--2" />
          <div className="trailer-shape trailer-shape--3" />
          <div className="trailer-scan" />
          <span className="trailer-modal__label">{game.genre}</span>
        </div>
        <p className="trailer-modal__caption">
          Full cinematic trailer coming soon. In the meantime, here&rsquo;s a taste of {game.title}&rsquo;s visual
          identity.
        </p>
      </div>
    </Modal>
  );
}
