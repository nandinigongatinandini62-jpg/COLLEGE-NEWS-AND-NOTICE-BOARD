// CO3: React component model - props contract + memo() for controlled re-renders
import { memo } from 'react';
import type { NoticeItem } from '../types';
import { formatDate } from '../utils/formatDate';

interface Props {
  item: NoticeItem;
}

function NoticeCard({ item }: Props) {
  return (
    <article className={`pin-card priority-${item.priority}`}>
      <div className="pin-card__body">
        <div className="d-flex justify-content-between align-items-start">
          <span className="pin-card__category">{item.category}</span>
          <span className="pin-card__meta">{item.priority} priority</span>
        </div>
        <h3 className="pin-card__title">{item.title}</h3>
        <p className="pin-card__text">{item.description}</p>
        <p className="pin-card__meta">
          Issued by {item.issuedBy} · {formatDate(item.issuedAt)}
          {item.attachmentName && <> · 📎 {item.attachmentName}</>}
        </p>
      </div>
    </article>
  );
}

export default memo(NoticeCard);
