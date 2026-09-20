import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import RatingStars from '../RatingStars/RatingStars.jsx';
import { formatPrice } from '../../utils/format.js';
import './FeaturedGame.scss';

export default function FeaturedGame({ game, onWatchTrailer }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'power3.out' } });
      tl.fromTo('.fg-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo('.fg-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
        .fromTo('.fg-meta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.45')
        .fromTo('.fg-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.fg-actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.35');
    }, rootRef);
    return () => ctx.revert();
  }, [game.id]);

  return (
    <div className="featured-game" ref={rootRef}>
      <span className="eyebrow fg-eyebrow">Featured Release</span>
      <h1 className="featured-game__title fg-title">{game.title}</h1>
      <div className="featured-game__meta fg-meta">
        <span className="tag tag--accent">{game.genre}</span>
        <span className={`status-pill status-pill--${game.status === 'Available' ? 'available' : 'upcoming'}`}>
          {game.status}
        </span>
        <RatingStars rating={game.rating} reviewCount={game.rating ? game.reviewCount : null} />
      </div>
      <p className="featured-game__description fg-desc">{game.tagline}</p>
      <div className="featured-game__actions fg-actions">
        <Link to={`/game/${game.id}`} className="btn btn--primary">
          Explore Game
        </Link>
        <button type="button" className="btn btn--outline" onClick={onWatchTrailer}>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M6 4.5v15l14-7.5-14-7.5Z" fill="currentColor" />
          </svg>
          Watch Trailer
        </button>
        <span className="featured-game__price">{formatPrice(game.price)}</span>
      </div>
    </div>
  );
}
