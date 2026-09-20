import './SortDropdown.scss';

const OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select" className="sort-dropdown__label">
        Sort by
      </label>
      <select
        id="sort-select"
        className="sort-dropdown__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
