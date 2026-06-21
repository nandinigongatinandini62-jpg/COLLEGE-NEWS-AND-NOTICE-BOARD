import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationContext';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('Routing', () => {
  it('renders the Home page at "/"', async () => {
    renderAt('/');
    await waitFor(() => expect(screen.getByText(/Everything happening on campus/i)).toBeInTheDocument());
  });

  it('redirects unauthenticated users away from /admin to /login', async () => {
    renderAt('/admin');
    await waitFor(() => expect(screen.getByText(/Admin Login/i)).toBeInTheDocument());
  });

  it('shows a 404 page for unknown routes', async () => {
    renderAt('/some-unknown-route');
    await waitFor(() => expect(screen.getByText(/404/)).toBeInTheDocument());
  });
});
