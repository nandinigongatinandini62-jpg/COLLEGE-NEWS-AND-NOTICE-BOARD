// CO3: React component model - props as configuration contract
interface Props {
  message: string;
}

export default function EmptyState({ message }: Props) {
  return (
    <div className="text-center py-5 text-muted" role="status">
      <div style={{ fontSize: '2rem' }} aria-hidden="true">🗒️</div>
      <p>{message}</p>
    </div>
  );
}
