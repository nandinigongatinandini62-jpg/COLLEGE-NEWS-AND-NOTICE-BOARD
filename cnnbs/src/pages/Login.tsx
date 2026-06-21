// CO5: Form engineering - validation pipeline, controlled form
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validators';
import type { LoginForm as LoginFormType, FormErrors } from '../types';

const EMPTY: LoginFormType = { email: '', password: '' };

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormType>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLoginForm(form);
    setErrors(validation);
    setAuthError('');
    if (Object.keys(validation).length > 0) return;
    setSubmitting(true);
    const success = await login(form.email, form.password);
    setSubmitting(false);
    if (success) navigate('/admin');
    else setAuthError('Invalid email or password.');
  };

  return (
    <div className="container section" style={{ maxWidth: 440 }}>
      <p className="eyebrow">Staff Access</p>
      <h1 className="section-title">Admin Login</h1>
      <p className="text-muted small">Demo credentials: admin@college.edu / admin123</p>

      {authError && <div className="alert alert-danger">{authError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="l-email" className="form-label">Email</label>
          <input
            id="l-email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="username"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="l-password" className="form-label">Password</label>
          <input
            id="l-password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-oxblood w-100" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
