// CO3: React component model - props as configuration contract
interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center mt-4">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page - 1)} aria-label="Previous page">
            Previous
          </button>
        </li>
        {pages.map((p) => (
          <li className={`page-item ${p === page ? 'active' : ''}`} key={p}>
            <button className="page-link" onClick={() => onPageChange(p)} aria-current={p === page ? 'page' : undefined}>
              {p}
            </button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page + 1)} aria-label="Next page">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
