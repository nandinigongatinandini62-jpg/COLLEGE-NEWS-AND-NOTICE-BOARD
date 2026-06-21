// CO5: Form engineering - validation pipeline, controlled form
import { useState } from 'react';
import { validateContactForm } from '../utils/validators';
import type { ContactForm, FormErrors } from '../types';

const EMPTY: ContactForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setSent(true);
    setForm(EMPTY);
  };

  return (
    <div className="container section" style={{ maxWidth: 640 }}>
      <p className="eyebrow">Get in Touch</p>
      <h1 className="section-title">Contact the Notice Board Office</h1>

      {sent && <div className="alert alert-success" role="status">Thanks — your message has been recorded.</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="c-name" className="form-label">Name</label>
          <input
            id="c-name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="c-email" className="form-label">Email</label>
          <input
            id="c-email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="c-subject" className="form-label">Subject</label>
          <input
            id="c-subject"
            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
          {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="c-message" className="form-label">Message</label>
          <textarea
            id="c-message"
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>
        <button type="submit" className="btn btn-oxblood">Send Message</button>
      </form>
    </div>
  );
}
