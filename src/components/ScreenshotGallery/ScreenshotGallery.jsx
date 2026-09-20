import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import GameArt from '../GameArt/GameArt.jsx';
import './ScreenshotGallery.scss';

export default function ScreenshotGallery({ game }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const imgRef = useRef(null);
  const total = game.screenshots.length;

  const open = (i) => setActiveIndex(i);
  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((i) => (i + 1) % total);
  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== null && imgRef.current) {
      gsap.fromTo(imgRef.current, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
    }
  }, [activeIndex]);

  return (
    <>
      <div className="screenshot-gallery">
        {game.screenshots.map((shot, i) => (
          <button
            type="button"
            key={shot}
            className="screenshot-gallery__thumb"
            onClick={() => open(i)}
            aria-label={`Open screenshot ${i + 1} of ${total} in fullscreen`}
          >
            <GameArt
              title={`${game.title} ${shot}`}
              palette={game.palette}
              pattern={game.pattern}
              variant="screenshot"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null &&
        createPortal(
          <div className="lightbox" role="dialog" aria-modal="true" aria-label="Screenshot viewer">
            <button type="button" className="lightbox__close" onClick={close} aria-label="Close fullscreen viewer">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous screenshot">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="lightbox__frame" ref={imgRef}>
              <GameArt
                title={`${game.title} ${game.screenshots[activeIndex]}`}
                palette={game.palette}
                pattern={game.pattern}
                variant="lightbox"
              />
            </div>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next screenshot">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="lightbox__counter">
              {activeIndex + 1} / {total}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
