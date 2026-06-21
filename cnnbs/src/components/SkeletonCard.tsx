// CO3: React component model - props as configuration contract
export default function SkeletonCard() {
  return (
    <div className="pin-card" aria-hidden="true">
      <div className="skeleton" style={{ height: 150, borderRadius: '4px 4px 0 0' }} />
      <div className="pin-card__body">
        <div className="skeleton mb-2" style={{ width: '40%', height: 16 }} />
        <div className="skeleton mb-2" style={{ width: '90%', height: 20 }} />
        <div className="skeleton mb-1" style={{ width: '100%', height: 12 }} />
        <div className="skeleton" style={{ width: '70%', height: 12 }} />
      </div>
    </div>
  );
}
