import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ThreeHero from '../../components/ThreeHero/ThreeHero.jsx';
import FeaturedGame from '../../components/FeaturedGame/FeaturedGame.jsx';
import GameCard from '../../components/GameCard/GameCard.jsx';
import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import StatCounter from '../../components/StatCounter/StatCounter.jsx';
import TrailerModal from '../../components/TrailerModal/TrailerModal.jsx';
import useScrollReveal from '../../hooks/useScrollReveal.js';
import { getFeaturedGames, getTrendingGames, getUpcomingGames } from '../../data/games.js';
import { studioStats } from '../../data/studio.js';
import './Home.scss';

const featured = getFeaturedGames();
const heroGame = featured[0];
const trending = getTrendingGames();
const upcoming = getUpcomingGames();

export default function Home() {
  const pageRef = useRef(null);
  const [trailerOpen, setTrailerOpen] = useState(false);

  useScrollReveal(pageRef, '.gsap-reveal', []);

  return (
    <div className="page home" ref={pageRef}>
      <section className="home-hero">
        <ThreeHero accent={heroGame.palette[2]} />
        <div className="home-hero__scrim" />
        <div className="container home-hero__content">
          <FeaturedGame game={heroGame} onWatchTrailer={() => setTrailerOpen(true)} />
        </div>
        <div className="home-hero__scroll-cue" aria-hidden="true">
          <span />
        </div>
      </section>

      <TrailerModal game={heroGame} isOpen={trailerOpen} onClose={() => setTrailerOpen(false)} />

      <section className="section container">
        <SectionHeading
          eyebrow="Handpicked"
          title="Featured Games"
          description="The titles our own team can't stop talking about \u2014 across every genre we build for."
          action={
            <Link to="/marketplace" className="btn btn--ghost">
              View All \u2192
            </Link>
          }
        />
        <div className="home-grid gsap-reveal">
          {featured.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="section section--tight home-trending">
        <div className="container">
          <SectionHeading eyebrow="Right Now" title="Trending Games" align="left" />
        </div>
        <div className="home-trending__scroller container">
          {trending.map((game) => (
            <div className="home-trending__item gsap-reveal" key={game.id}>
              <GameCard game={game} size="sm" />
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="On the Horizon"
          title="Upcoming Releases"
          description="Worlds currently in production at Nexora Games."
        />
        <div className="home-grid home-grid--3 gsap-reveal">
          {upcoming.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="section home-studio">
        <div className="container home-studio__inner">
          <div className="home-studio__text gsap-reveal">
            <span className="eyebrow">The Studio</span>
            <h2 className="display-lg">We Build Worlds, Not Just Games.</h2>
            <p>
              Nexora Games is an independent studio of eighty-six developers working across five internal
              teams. Every project starts as a single unresolved question and ends as a world we&rsquo;d want
              to live inside. No genre is off limits &mdash; only worlds worth finishing are.
            </p>
            <Link to="/studio" className="btn btn--outline">
              Meet The Studio
            </Link>
          </div>
          <div className="home-studio__stats gsap-reveal">
            {studioStats.slice(0, 4).map((stat) => (
              <StatCounter key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
