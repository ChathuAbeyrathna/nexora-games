import { Link } from 'react-router-dom';
import GameArt from '../GameArt/GameArt.jsx';
import './ArticleCard.scss';

export default function ArticleCard({ article, size = 'md' }) {
  return (
    <article className={`article-card article-card--${size}`}>
      <Link to={article.gameId ? `/game/${article.gameId}` : '/discover'} className="article-card__link">
        <div className="article-card__art">
          <GameArt title={article.title} palette={article.palette} pattern="fog" variant="article" />
        </div>
        <div className="article-card__body">
          <span className="tag tag--accent">{article.category}</span>
          <h3 className="article-card__title">{article.title}</h3>
          <p className="article-card__excerpt">{article.excerpt}</p>
          <div className="article-card__meta">
            <span>{article.author}</span>
            <span aria-hidden="true">\u2022</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
