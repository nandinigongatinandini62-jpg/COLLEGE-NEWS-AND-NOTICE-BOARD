// CO3: React component model - props as configuration contract
import { memo } from 'react';
import type { NoticeItem } from '../types';

interface Props {
  notices: NoticeItem[];
}

function NewsTicker({ notices }: Props) {
  if (!notices.length) return null;
  const loopItems = [...notices, ...notices]; // duplicate for seamless scroll

  return (
    <div className="news-ticker" role="marquee" aria-label="Latest notices ticker">
      <div className="news-ticker__track">
        {loopItems.map((notice, idx) => (
          <span className="news-ticker__item" key={`${notice.id}-${idx}`}>
            📌 {notice.title}
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(NewsTicker);
