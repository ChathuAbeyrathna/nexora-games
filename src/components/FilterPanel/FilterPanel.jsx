import { allPlatforms } from '../../data/games.js';
import './FilterPanel.scss';

const PRICE_RANGES = [
  { id: 'all', label: 'Any Price' },
  { id: 'under-20', label: 'Under $20' },
  { id: '20-40', label: '$20 \u2013 $40' },
  { id: 'over-40', label: 'Over $40' },
];

const RATINGS = [
  { id: 'all', label: 'Any Rating' },
  { id: '4.5', label: '4.5 &amp; Up'.replace('&amp;', '&') },
  { id: '4', label: '4.0 &amp; Up'.replace('&amp;', '&') },
  { id: '3', label: '3.0 &amp; Up'.replace('&amp;', '&') },
];

const STATUSES = [
  { id: 'all', label: 'All Games' },
  { id: 'Available', label: 'Available Now' },
  { id: 'Upcoming', label: 'Upcoming' },
];

export default function FilterPanel({ filters, setFilters, onReset, resultCount }) {
  const togglePlatform = (platform) => {
    setFilters((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <aside className="filter-panel" aria-label="Filter games">
      <div className="filter-panel__header">
        <h3 className="filter-panel__title">Filters</h3>
        <button type="button" className="filter-panel__reset" onClick={onReset}>
          Reset
        </button>
      </div>

      <p className="filter-panel__count">{resultCount} games found</p>

      <fieldset className="filter-panel__group">
        <legend>Platform</legend>
        {allPlatforms.map((platform) => (
          <label key={platform} className="filter-panel__checkbox">
            <input
              type="checkbox"
              checked={filters.platforms.includes(platform)}
              onChange={() => togglePlatform(platform)}
            />
            <span className="filter-panel__checkbox-box" aria-hidden="true" />
            {platform}
          </label>
        ))}
      </fieldset>

      <fieldset className="filter-panel__group">
        <legend>Price</legend>
        {PRICE_RANGES.map((range) => (
          <label key={range.id} className="filter-panel__radio">
            <input
              type="radio"
              name="price"
              checked={filters.price === range.id}
              onChange={() => setFilters((prev) => ({ ...prev, price: range.id }))}
            />
            <span className="filter-panel__radio-dot" aria-hidden="true" />
            {range.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="filter-panel__group">
        <legend>Rating</legend>
        {RATINGS.map((r) => (
          <label key={r.id} className="filter-panel__radio">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === r.id}
              onChange={() => setFilters((prev) => ({ ...prev, rating: r.id }))}
            />
            <span className="filter-panel__radio-dot" aria-hidden="true" />
            {r.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="filter-panel__group">
        <legend>Release Status</legend>
        {STATUSES.map((s) => (
          <label key={s.id} className="filter-panel__radio">
            <input
              type="radio"
              name="status"
              checked={filters.status === s.id}
              onChange={() => setFilters((prev) => ({ ...prev, status: s.id }))}
            />
            <span className="filter-panel__radio-dot" aria-hidden="true" />
            {s.label}
          </label>
        ))}
      </fieldset>
    </aside>
  );
}

export { PRICE_RANGES, RATINGS, STATUSES };
