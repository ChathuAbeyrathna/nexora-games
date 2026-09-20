import { Link } from 'react-router-dom';
import GameArt from '../GameArt/GameArt.jsx';
import RatingStars from '../RatingStars/RatingStars.jsx';
import WishlistButton from '../WishlistButton/WishlistButton.jsx';
import { formatPrice } from '../../utils/format.js';
import './GameCard.scss';

export default function GameCard({ game, size = 'md' }) {
  return (
    <article className={`game-card game-card--${size}`}>
      <Link to={`/game/${game.id}`} className="game-card__link" aria-label={`View ${game.title}`}>
        <div className="game-card__art">
          <GameArt title={game.title} palette={game.palette} pattern={game.pattern} />
          <div className="game-card__overlay">
            <p className="game-card__overlay-text">{game.tagline}</p>
            <span className="game-card__cta">View Game \u2192</span>
          </div>
          <span className={`status-pill game-card__status status-pill--${game.status === 'Available' ? 'available' : 'upcoming'}`}>
            {game.status}
          </span>
        </div>
        <div className="game-card__body">
          <div className="game-card__heading">
            <h3 className="game-card__title">{game.title}</h3>
            <span className="game-card__price">{formatPrice(game.price)}</span>
          </div>
          <div className="game-card__meta">
            <span className="game-card__genre">{game.genre}</span>
            <span className="game-card__dot" aria-hidden="true">\u2022</span>
            <span className="game-card__platforms">{game.platforms.join(' / ')}</span>
          </div>
          <RatingStars rating={game.rating} reviewCount={game.rating ? game.reviewCount : null} size="sm" />
        </div>
      </Link>
      <div className="game-card__wishlist">
        <WishlistButton gameId={game.id} label={false} />
      </div>
    </article>
  );
}
