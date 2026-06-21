// CO1: Component-driven UI structure
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/news', label: 'News' },
  { to: '/notices', label: 'Notices' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { unreadCount, markAllRead } = useNotifications();

  return (
    <nav className="navbar navbar-expand-lg masthead py-2" aria-label="Primary navigation">
      <div className="container">
        <Link className="navbar-brand" to="/">
          The Quad Gazette
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink className="nav-link" to={link.to} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-sm btn-outline-brass position-relative"
              onClick={markAllRead}
              aria-label={`Notifications, ${unreadCount} unread`}
            >
              🔔 Notices
              {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-brass"
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label="Toggle dark mode"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
            {user ? (
              <>
                <Link to="/admin" className="btn btn-sm btn-oxblood">
                  Dashboard
                </Link>
                <button type="button" className="btn btn-sm btn-outline-brass" onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm btn-oxblood">
                Staff Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
