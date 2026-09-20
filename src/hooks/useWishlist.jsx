import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage('nexora-wishlist', []);

  const toggle = useCallback(
    (gameId) => {
      setWishlist((prev) =>
        prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
      );
    },
    [setWishlist]
  );

  const isWishlisted = useCallback((gameId) => wishlist.includes(gameId), [wishlist]);

  const value = useMemo(
    () => ({ wishlist, toggle, isWishlisted, count: wishlist.length }),
    [wishlist, toggle, isWishlisted]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
