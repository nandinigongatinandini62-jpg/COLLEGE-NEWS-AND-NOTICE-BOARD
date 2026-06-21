import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container section text-center">
      <h1>404 — Page not found</h1>
      <p className="text-muted">The page you're looking for has been moved or doesn't exist.</p>
      <Link to="/" className="btn btn-oxblood">Back to Home</Link>
    </div>
  );
}
