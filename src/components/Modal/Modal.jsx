import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import './Modal.scss';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
      );
    });

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { opacity: 0, y: 16, scale: 0.98, duration: 0.25, ease: 'power2.in' }, 0);
    tl.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-root">
      <div className="modal-backdrop" ref={backdropRef} onClick={handleClose} />
      <div
        className={`modal-panel modal-panel--${size}`}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button type="button" className="modal-panel__close" onClick={handleClose} aria-label="Close dialog">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        {title && <h3 className="modal-panel__title display-md">{title}</h3>}
        <div className="modal-panel__body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
