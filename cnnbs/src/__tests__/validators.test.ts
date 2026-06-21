import { describe, it, expect } from 'vitest';
import { validateContactForm, validateLoginForm } from '../utils/validators';

describe('validateContactForm', () => {
  it('flags empty required fields', () => {
    const errors = validateContactForm({ name: '', email: '', subject: '', message: '' });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.subject).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it('flags an invalid email', () => {
    const errors = validateContactForm({ name: 'A', email: 'not-an-email', subject: 'Hi', message: 'A long enough message' });
    expect(errors.email).toMatch(/valid email/i);
  });

  it('passes for a fully valid form', () => {
    const errors = validateContactForm({
      name: 'Asha',
      email: 'asha@college.edu',
      subject: 'Query',
      message: 'This is a sufficiently long message body.',
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

describe('validateLoginForm', () => {
  it('requires email and password', () => {
    const errors = validateLoginForm({ email: '', password: '' });
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
  });
});
