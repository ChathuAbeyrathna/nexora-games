import './RatingStars.scss';

export default function RatingStars({ rating = 0, reviewCount, size = 'md' }) {
  if (!rating) {
    return <span className="rating-stars rating-stars--empty text-secondary">Not yet rated</span>;
  }

  const full = Math.round(rating * 2) / 2;

  return (
    <span className={`rating-stars rating-stars--${size}`} aria-label={`Rated ${rating} out of 5`}>
      <span className="rating-stars__track" aria-hidden="true">
        <span className="rating-stars__fill" style={{ width: `${(full / 5) * 100}%` }} />
      </span>
      <span className="rating-stars__value">{rating.toFixed(1)}</span>
      {reviewCount != null && (
        <span className="rating-stars__count text-secondary">({reviewCount.toLocaleString()})</span>
      )}
    </span>
  );
}
