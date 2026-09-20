import { useRef } from 'react';
import gsap from 'gsap';
import { useWishlist } from '../../hooks/useWishlist.jsx';
import './WishlistButton.scss';

export default function WishlistButton({ gameId, label = true, className = '' }) {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(gameId);
  const iconRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(gameId);
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0.7 },
        { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' }
      );
    }
  };

  return (
    <button
      type="button"
      className={`wishlist-btn ${active ? 'is-active' : ''} ${className}`}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg ref={iconRef} className="wishlist-btn__icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 20.5s-7.5-4.6-10-9.4C.4 7.7 2 4 5.6 3.4c2-.35 3.9.55 5 2.2 1.1-1.65 3-2.55 5-2.2C19.2 4 20.8 7.7 19.2 11.1c-2.5 4.8-10 9.4-10 9.4Z"
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      {label && <span>{active ? 'Wishlisted' : 'Wishlist'}</span>}
    </button>
  );
}
