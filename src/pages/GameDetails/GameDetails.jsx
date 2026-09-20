import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import GameArt from '../../components/GameArt/GameArt.jsx';
import RatingStars from '../../components/RatingStars/RatingStars.jsx';
import WishlistButton from '../../components/WishlistButton/WishlistButton.jsx';
import ScreenshotGallery from '../../components/ScreenshotGallery/ScreenshotGallery.jsx';
import TrailerModal from '../../components/TrailerModal/TrailerModal.jsx';
import Tabs from '../../components/Tabs/Tabs.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import GameCard from '../../components/GameCard/GameCard.jsx';
import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import { useToast } from '../../components/Toast/Toast.jsx';
import { getGameById, getRelatedGames } from '../../data/games.js';
import { formatPrice } from '../../utils/format.js';
import './GameDetails.scss';

function RatingBreakdown({ game }) {
  const counts = [0, 0, 0, 0, 0];
  game.reviews.forEach((r) => {
    counts[5 - r.rating] += 1;
  });
  const total = game.reviews.length || 1;

  return (
    <div className="rating-breakdown">
      <div className="rating-breakdown__summary">
        <span className="rating-breakdown__score display-xl">{game.rating.toFixed(1)}</span>
        <RatingStars rating={game.rating} reviewCount={game.reviewCount} />
      </div>
      <div className="rating-breakdown__bars">
        {[5, 4, 3, 2, 1].map((star, i) => {
          const pct = Math.round((counts[i] / total) * 100);
          return (
            <div className="rating-breakdown__row" key={star}>
              <span>{star}</span>
              <div className="rating-breakdown__track">
                <div className="rating-breakdown__fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-secondary">{counts[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function GameDetails() {
  const { id } = useParams();
  const game = getGameById(id);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const heroRef = useRef(null);
  const showToast = useToast();

  useEffect(() => {
    if (!game || !heroRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gd-reveal',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [game]);

  if (!game) return <Navigate to="/marketplace" replace />;

  const related = getRelatedGames(game);

  const confirmPurchase = () => {
    setPurchaseOpen(false);
    showToast(`${game.title} added to your library.`);
  };

  return (
    <div className="page game-details">
      <section className="gd-hero" ref={heroRef}>
        <div className="gd-hero__art">
          <GameArt title={game.title} palette={game.palette} pattern={game.pattern} />
        </div>
        <div className="gd-hero__scrim" />
        <div className="container gd-hero__content">
          <span className="eyebrow gd-reveal">{game.category}</span>
          <h1 className="display-xl gd-hero__title gd-reveal">{game.title}</h1>
          <p className="gd-hero__tagline gd-reveal">{game.tagline}</p>

          <div className="gd-hero__meta gd-reveal">
            <span>{game.genre}</span>
            <span className="gd-hero__meta-dot" aria-hidden="true">&bull;</span>
            <span>{game.developer}</span>
            <span className="gd-hero__meta-dot" aria-hidden="true">&bull;</span>
            <span>{game.releaseDate}</span>
            <span className="gd-hero__meta-dot" aria-hidden="true">&bull;</span>
            <span className={`status-pill status-pill--${game.status === 'Available' ? 'available' : 'upcoming'}`}>
              {game.status}
            </span>
          </div>

          <div className="gd-hero__rating gd-reveal">
            <RatingStars rating={game.rating} reviewCount={game.rating ? game.reviewCount : null} />
          </div>

          <div className="gd-hero__actions gd-reveal">
            <span className="gd-hero__price">{formatPrice(game.price)}</span>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setPurchaseOpen(true)}
              disabled={game.status === 'Upcoming'}
            >
              {game.status === 'Upcoming' ? 'Wishlist for Launch' : 'Buy Now'}
            </button>
            <WishlistButton gameId={game.id} />
            <button type="button" className="btn btn--ghost" onClick={() => setTrailerOpen(true)}>
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path d="M6 4.5v15l14-7.5-14-7.5Z" fill="currentColor" />
              </svg>
              Watch Trailer
            </button>
          </div>
        </div>
      </section>

      <TrailerModal game={game} isOpen={trailerOpen} onClose={() => setTrailerOpen(false)} />

      <Modal isOpen={purchaseOpen} onClose={() => setPurchaseOpen(false)} title="Confirm Purchase">
        <div className="purchase-modal">
          <p>
            You&rsquo;re about to add <strong>{game.title}</strong> to your library for{' '}
            <strong>{formatPrice(game.price)}</strong>.
          </p>
          <p className="text-secondary purchase-modal__note">
            This is a demo storefront &mdash; no real payment will be processed.
          </p>
          <div className="purchase-modal__actions">
            <button type="button" className="btn btn--outline" onClick={() => setPurchaseOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn--primary" onClick={confirmPurchase}>
              Confirm &amp; Add to Library
            </button>
          </div>
        </div>
      </Modal>

      <section className="section container">
        <SectionHeading eyebrow="Gallery" title="Screenshots" />
        <ScreenshotGallery game={game} />
      </section>

      <section className="section section--tight container">
        <Tabs
          tabs={[
            {
              label: 'Overview',
              content: (
                <div className="gd-overview">
                  <div className="gd-overview__main">
                    <h3 className="display-md">About This Game</h3>
                    <p>{game.description}</p>
                    <h4 className="gd-overview__subhead">Key Features</h4>
                    <ul className="gd-overview__features">
                      {game.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="gd-overview__aside">
                    <div className="gd-info-block">
                      <h4>Platforms</h4>
                      <p>{game.platforms.join(', ')}</p>
                    </div>
                    <div className="gd-info-block">
                      <h4>Players</h4>
                      <p>{game.players}</p>
                    </div>
                    <div className="gd-info-block">
                      <h4>Languages</h4>
                      <p>{game.languages.join(', ')}</p>
                    </div>
                    <div className="gd-info-block">
                      <h4>Developer</h4>
                      <p>{game.developer}</p>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: 'System Requirements',
              content: (
                <div className="gd-requirements">
                  {['minimum', 'recommended'].map((tier) => (
                    <div className="gd-requirements__block" key={tier}>
                      <h4>{tier === 'minimum' ? 'Minimum' : 'Recommended'}</h4>
                      <dl>
                        {Object.entries(game.systemRequirements[tier]).map(([key, val]) => (
                          <div className="gd-requirements__row" key={key}>
                            <dt>{key}</dt>
                            <dd>{val}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              label: `Reviews (${game.reviews.length})`,
              content: (
                <div className="gd-reviews">
                  {game.reviews.length ? (
                    <>
                      <RatingBreakdown game={game} />
                      <div className="gd-reviews__list">
                        {game.reviews.map((r) => (
                          <article className="review-card" key={r.id}>
                            <div className="review-card__head">
                              <RatingStars rating={r.rating} size="sm" />
                              <span className="review-card__date text-secondary">{r.date}</span>
                            </div>
                            <h4 className="review-card__title">{r.title}</h4>
                            <p className="review-card__body">{r.body}</p>
                            <p className="review-card__author text-secondary">
                              {r.author} &middot; {r.helpful} found this helpful
                            </p>
                          </article>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-secondary">No reviews yet &mdash; this title hasn&rsquo;t released.</p>
                  )}
                </div>
              ),
            },
          ]}
        />
      </section>

      {related.length > 0 && (
        <section className="section container">
          <SectionHeading eyebrow="You Might Also Like" title="Related Games" />
          <div className="gd-related">
            {related.map((g) => (
              <GameCard key={g.id} game={g} size="sm" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
