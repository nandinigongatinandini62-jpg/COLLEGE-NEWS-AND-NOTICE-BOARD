// CO3: React component model - props contract + memo() for controlled re-renders
import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { NewsItem } from '../types';
import { formatDate } from '../utils/formatDate';

interface Props {
  item: NewsItem;
}

function NewsCard({ item }: Props) {
  return (
    <article className="pin-card">
      <img
        src={item.imageUrl}
        alt={item.title}
        loading="lazy"
        style={{ width: '100%', height: 150, objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
      />
      <div className="pin-card__body">
        <span className="pin-card__category">{item.category}</span>
        <h3 className="pin-card__title">
          <Link to={`/news/${item.id}`}>{item.title}</Link>
        </h3>
        <p className="pin-card__text">{item.summary}</p>
        <p className="pin-card__meta">{item.author} · {formatDate(item.publishedAt)}</p>
      </div>
    </article>
  );
}

export default memo(NewsCard);
