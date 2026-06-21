import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { newsService } from '../services/newsService';
import { formatDate } from '../utils/formatDate';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: item, loading } = useFetch(() => newsService.getById(id ?? ''), [id]);

  if (loading) return <div className="container section">Loading article…</div>;
  if (!item) {
    return (
      <div className="container section">
        <h1>Article not found</h1>
        <Link to="/news">← Back to News</Link>
      </div>
    );
  }

  return (
    <article className="container section" style={{ maxWidth: 760 }}>
      <Link to="/news" className="eyebrow d-inline-block mb-3">← Back to News</Link>
      <span className="pin-card__category">{item.category}</span>
      <h1 className="mt-2">{item.title}</h1>
      <p className="pin-card__meta mb-4">{item.author} · {formatDate(item.publishedAt)}</p>
      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', borderRadius: 8, marginBottom: '1.5rem' }} />
      <p style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>{item.content}</p>
    </article>
  );
}
