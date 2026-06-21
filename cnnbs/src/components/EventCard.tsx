// CO3: React component model - props contract + memo() for controlled re-renders
import { memo } from 'react';
import type { EventItem } from '../types';
import { formatDate } from '../utils/formatDate';

interface Props {
  item: EventItem;
  onRegister?: (event: EventItem) => void;
}

function EventCard({ item, onRegister }: Props) {
  return (
    <article className="pin-card">
      <div className="pin-card__body">
        <span className="pin-card__category">{item.category}</span>
        <h3 className="pin-card__title">{item.title}</h3>
        <p className="pin-card__text">{item.description}</p>
        <p className="pin-card__meta">
          📍 {item.venue} · 🗓 {formatDate(item.date)} at {item.time}
        </p>
        <p className="pin-card__meta">Organized by {item.organizer} · {item.seatsAvailable} seats left</p>
        {onRegister && (
          <button type="button" className="btn btn-sm btn-oxblood mt-2" onClick={() => onRegister(item)}>
            Register
          </button>
        )}
      </div>
    </article>
  );
}

export default memo(EventCard);
