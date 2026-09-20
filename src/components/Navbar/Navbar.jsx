import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useWishlist } from '../../hooks/useWishlist.jsx';
import './Navbar.scss';

const links = [
  { to: '/', label: 'Home' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/studio', label: 'Studio' },
  { to: '/discover', label: 'Discover' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const { count } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuRef.current) return undefined;

    const ctx = gsap.context(() => {
      if (menuOpen) {
        gsap.set(menuRef.current, { display: 'flex' });
        gsap.fromTo(
          menuRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'power3.inOut' }
        );
        gsap.fromTo(
          linksRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.15, ease: 'power3.out' }
        );
      } else {
        gsap.to(menuRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.4,
          ease: 'power3.inOut',
          onComplete: () => {
            if (menuRef.current) gsap.set(menuRef.current, { display: 'none' });
          },
        });
      }
    });

    return () => ctx.revert();
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar__inner container">
        <NavLink to="/" className="navbar__logo" aria-label="Nexora Games home">
          <span className="navbar__logo-mark">N</span>
          <span className="navbar__logo-text">NEXORA</span>
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <NavLink to="/marketplace" className="navbar__icon-btn" aria-label="Search the marketplace">
            <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <line x1="20" y1="20" x2="15.8" y2="15.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </NavLink>
          <NavLink to="/marketplace?wishlist=1" className="navbar__icon-btn navbar__wishlist" aria-label={`Wishlist, ${count} games`}>
            <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
              <path
                d="M12 20.5s-7.5-4.6-10-9.4C.4 7.7 2 4 5.6 3.4c2-.35 3.9.55 5 2.2 1.1-1.65 3-2.55 5-2.2C19.2 4 20.8 7.7 19.2 11.1c-2.5 4.8-10 9.4-10 9.4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            {count > 0 && <span className="navbar__badge">{count}</span>}
          </NavLink>
          <button
            type="button"
            className={`navbar__burger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="navbar__mobile-menu" ref={menuRef}>
        <nav aria-label="Mobile">
          {links.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              ref={(el) => (linksRef.current[i] = el)}
              className={({ isActive }) => `navbar__mobile-link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
