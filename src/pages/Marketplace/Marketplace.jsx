import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import SortDropdown from '../../components/SortDropdown/SortDropdown.jsx';
import FilterPanel from '../../components/FilterPanel/FilterPanel.jsx';
import GameCard from '../../components/GameCard/GameCard.jsx';
import { games, categories } from '../../data/games.js';
import { useWishlist } from '../../hooks/useWishlist.jsx';
import './Marketplace.scss';

const DEFAULT_FILTERS = { platforms: [], price: 'all', rating: 'all', status: 'all' };

function matchesPrice(price, range) {
  if (range === 'all') return true;
  if (range === 'under-20') return price < 20;
  if (range === '20-40') return price >= 20 && price <= 40;
  if (range === 'over-40') return price > 40;
  return true;
}

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const wishlistOnly = searchParams.get('wishlist') === '1';
  const { wishlist } = useWishlist();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredGames = useMemo(() => {
    let list = [...games];

    if (wishlistOnly) {
      list = list.filter((g) => wishlist.includes(g.id));
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.genre.toLowerCase().includes(q) ||
          g.developer.toLowerCase().includes(q)
      );
    }

    if (category !== 'All') {
      list = list.filter((g) => g.category === category);
    }

    if (filters.platforms.length) {
      list = list.filter((g) => filters.platforms.some((p) => g.platforms.includes(p)));
    }

    list = list.filter((g) => matchesPrice(g.price, filters.price));

    if (filters.rating !== 'all') {
      list = list.filter((g) => g.rating >= parseFloat(filters.rating));
    }

    if (filters.status !== 'all') {
      list = list.filter((g) => g.status === filters.status);
    }

    switch (sort) {
      case 'newest':
        list.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      default:
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return list;
  }, [search, category, filters, sort, wishlistOnly, wishlist]);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setCategory('All');
    setSearch('');
  };

  const clearWishlistView = () => {
    searchParams.delete('wishlist');
    setSearchParams(searchParams);
  };

  return (
    <div className="page marketplace">
      <header className="marketplace-header container">
        <span className="eyebrow">Game Marketplace</span>
        <h1 className="display-lg">
          {wishlistOnly ? 'Your Wishlist' : 'Every World We\u2019ve Built, In One Place'}
        </h1>
        {wishlistOnly && (
          <button type="button" className="btn btn--ghost marketplace-header__clear" onClick={clearWishlistView}>
            \u2190 Back to full marketplace
          </button>
        )}
      </header>

      <div className="marketplace-toolbar container">
        <SearchBar value={search} onChange={setSearch} />
        <div className="marketplace-toolbar__right">
          <SortDropdown value={sort} onChange={setSort} />
          <button
            type="button"
            className="btn btn--outline marketplace-toolbar__filter-btn"
            onClick={() => setMobileFiltersOpen(true)}
          >
            Filters
          </button>
        </div>
      </div>

      <div className="marketplace-categories container" role="tablist" aria-label="Category">
        <button
          type="button"
          className={`marketplace-categories__pill ${category === 'All' ? 'is-active' : ''}`}
          onClick={() => setCategory('All')}
        >
          All Genres
        </button>
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            className={`marketplace-categories__pill ${category === cat ? 'is-active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="container marketplace-layout">
        <div className={`marketplace-layout__sidebar ${mobileFiltersOpen ? 'is-open' : ''}`}>
          <button
            type="button"
            className="marketplace-layout__sidebar-close"
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Close filters"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onReset={resetFilters}
            resultCount={filteredGames.length}
          />
        </div>
        {mobileFiltersOpen && (
          <div className="marketplace-layout__backdrop" onClick={() => setMobileFiltersOpen(false)} />
        )}

        <div className="marketplace-layout__results">
          {filteredGames.length === 0 ? (
            <div className="marketplace-empty">
              <h3 className="display-md">No games match those filters</h3>
              <p className="text-secondary">Try widening your search or resetting filters below.</p>
              <button type="button" className="btn btn--primary" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="marketplace-grid">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
