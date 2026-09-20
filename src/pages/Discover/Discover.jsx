import { useRef, useState } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import ArticleCard from '../../components/ArticleCard/ArticleCard.jsx';
import GameCard from '../../components/GameCard/GameCard.jsx';
import useScrollReveal from '../../hooks/useScrollReveal.js';
import { featuredStories, developerSpotlight, communityPicksIds, events } from '../../data/discover.js';
import { games } from '../../data/games.js';
import './Discover.scss';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMsg('Enter an email address to subscribe.');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      setErrorMsg('That doesn\u2019t look like a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 700);
  };

  return (
    <div className="newsletter">
      <div className="newsletter__text">
        <span className="eyebrow">Stay Connected</span>
        <h2 className="display-lg">Get Nexora Dispatches</h2>
        <p>Developer diaries, launch dates, and early access invites &mdash; roughly twice a month, never spam.</p>
      </div>

      {status === 'success' ? (
        <div className="newsletter__success" role="status">
          <span className="newsletter__success-icon" aria-hidden="true" />
          You&rsquo;re subscribed. Watch your inbox for the next dispatch.
        </div>
      ) : (
        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <div className="newsletter__field">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="you@example.com"
              aria-label="Email address"
              aria-invalid={status === 'error'}
              className={status === 'error' ? 'has-error' : ''}
            />
            <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Subscribing\u2026' : 'Subscribe'}
            </button>
          </div>
          {status === 'error' && (
            <p className="newsletter__error" role="alert">
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default function Discover() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef, '.gsap-reveal', []);

  const communityPicks = communityPicksIds.map((id) => games.find((g) => g.id === id)).filter(Boolean);

  return (
    <div className="page discover" ref={pageRef}>
      <header className="discover-header">
        <div className="container discover-header__inner">
          <span className="eyebrow">Discover</span>
          <h1 className="display-xl">Stories From Inside Nexora</h1>
          <p className="discover-header__lede">
            Developer diaries, community highlights, and a look behind every world we build.
          </p>
        </div>
      </header>

      <section className="section container">
        <SectionHeading eyebrow="Featured Stories" title="Behind the Scenes" align="left" />
        <div className="discover-stories gsap-reveal">
          {featuredStories.map((story, i) => (
            <ArticleCard key={story.id} article={story} size={i === 0 ? 'lg' : 'md'} />
          ))}
        </div>
      </section>

      <section className="section section--tight discover-spotlight">
        <div className="container">
          <SectionHeading eyebrow="Developer Spotlight" title="The People Behind the Worlds" align="left" />
          <div className="discover-spotlight__list gsap-reveal">
            {developerSpotlight.map((dev) => (
              <blockquote className="spotlight-card" key={dev.id}>
                <p className="spotlight-card__quote">&ldquo;{dev.quote}&rdquo;</p>
                <footer>
                  <span className="spotlight-card__name">{dev.name}</span>
                  <span className="spotlight-card__role">{dev.role}</span>
                  <span className="spotlight-card__highlight">{dev.highlight}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading eyebrow="Community Picks" title="Chosen by Nexora Players" align="left" />
        <div className="discover-picks gsap-reveal">
          {communityPicks.map((game) => (
            <GameCard key={game.id} game={game} size="sm" />
          ))}
        </div>
      </section>

      <section className="section section--tight discover-events">
        <div className="container">
          <SectionHeading eyebrow="Upcoming Events" title="Showcases, Launches &amp; Streams" align="left" />
          <div className="discover-events__list gsap-reveal">
            {events.map((event) => (
              <div className="event-row" key={event.id}>
                <div className="event-row__date">
                  <span className="tag tag--accent">{event.type}</span>
                  <span>{event.date}</span>
                  <span className="text-secondary">{event.time}</span>
                </div>
                <div className="event-row__body">
                  <h4>{event.title}</h4>
                  <p>{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <Newsletter />
      </section>
    </div>
  );
}
