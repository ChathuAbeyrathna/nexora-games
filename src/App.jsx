import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import { WishlistProvider } from './hooks/useWishlist.jsx';
import { ToastProvider } from './components/Toast/Toast.jsx';
import Home from './pages/Home/Home.jsx';
import Marketplace from './pages/Marketplace/Marketplace.jsx';
import GameDetails from './pages/GameDetails/GameDetails.jsx';
import Studio from './pages/Studio/Studio.jsx';
import Discover from './pages/Discover/Discover.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

function PageTransition({ children }) {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.45, ease: 'power2.out' }
    );
    return () => tween.kill();
  }, [location.pathname]);

  return (
    <div ref={ref} key={location.pathname}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <WishlistProvider>
      <ToastProvider>
        <ScrollToTop />
        <Navbar />
        <PageTransition>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/game/:id" element={<GameDetails />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/discover" element={<Discover />} />
              <Route
                path="*"
                element={
                  <div className="page not-found container">
                    <span className="eyebrow">404</span>
                    <h1 className="display-lg">This world hasn&rsquo;t been built yet.</h1>
                  </div>
                }
              />
            </Routes>
          </main>
        </PageTransition>
        <Footer />
      </ToastProvider>
    </WishlistProvider>
  );
}
