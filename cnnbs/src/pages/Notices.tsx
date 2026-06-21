import { useMemo, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { noticeService } from '../services/noticeService';
import NoticeCard from '../components/NoticeCard';
import SearchBar from '../components/SearchBar';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import type { Category } from '../types';

const CATEGORIES: (Category | 'All')[] = ['All', 'Academics', 'Examination', 'Placement', 'Sports', 'Cultural', 'General'];
const PAGE_SIZE = 6;

export default function Notices() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebouncedValue(query, 300);

  const { data, loading, error, refetch } = useFetch(
    () => noticeService.search(debouncedQuery, category),
    [debouncedQuery, category]
  );

  const totalPages = Math.max(Math.ceil((data?.length ?? 0) / PAGE_SIZE), 1);
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return (data ?? []).slice(start, start + PAGE_SIZE);
  }, [data, page]);

  return (
    <div className="container section">
      <p className="eyebrow">Notice Board</p>
      <h1 className="section-title">Official Notices</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <SearchBar placeholder="Search notices by title..." onChange={(v) => { setQuery(v); setPage(1); }} />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={category}
            aria-label="Filter by category"
            onChange={(e) => { setCategory(e.target.value as Category | 'All'); setPage(1); }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>{error}</span>
          <button className="btn btn-sm btn-outline-danger" onClick={refetch}>Retry</button>
        </div>
      )}

      <div className="row g-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <div className="col-md-4" key={i}><SkeletonCard /></div>)
          : paged.map((item) => <div className="col-md-4" key={item.id}><NoticeCard item={item} /></div>)}
      </div>

      {!loading && !error && paged.length === 0 && <EmptyState message="No notices match your search." />}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
