// CO3: React component model - props contract + memo() for controlled re-renders
import { memo } from 'react';
import type { StatItem } from '../types';

const ICONS: Record<string, string> = {
  pin: '📌',
  calendar: '🗓',
  newspaper: '📰',
  building: '🏛',
};

function StatisticsCard({ stat }: { stat: StatItem }) {
  return (
    <div className="stat-card">
      <div style={{ fontSize: '1.6rem' }} aria-hidden="true">{ICONS[stat.icon] ?? '•'}</div>
      <div className="stat-card__value">{stat.value}</div>
      <div className="stat-card__label">{stat.label}</div>
    </div>
  );
}

export default memo(StatisticsCard);
