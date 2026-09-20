import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-mark">N</span>
              <span className="footer__logo-text">NEXORA</span>
            </Link>
            <p className="footer__tagline">
              An independent studio and marketplace building worlds worth returning to.
            </p>
          </div>

          <nav className="footer__col" aria-label="Explore">
            <h3 className="footer__col-title">Explore</h3>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/marketplace">New Releases</Link>
            <Link to="/marketplace">Upcoming Games</Link>
            <Link to="/discover">Community Picks</Link>
          </nav>

          <nav className="footer__col" aria-label="Studio">
            <h3 className="footer__col-title">Studio</h3>
            <Link to="/studio">Our Story</Link>
            <Link to="/studio">Careers</Link>
            <Link to="/discover">Developer Diaries</Link>
            <Link to="/discover">Events</Link>
          </nav>

          <nav className="footer__col" aria-label="Support">
            <h3 className="footer__col-title">Support</h3>
            <a href="mailto:support@nexoragames.example">Contact Support</a>
            <a href="mailto:press@nexoragames.example">Press Inquiries</a>
            <a href="mailto:careers@nexoragames.example">Partnerships</a>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Nexora Games. A fictional studio built for demonstration.</p>
          <p className="footer__craft">Designed &amp; built with React, GSAP, and Three.js.</p>
        </div>
      </div>
    </footer>
  );
}
