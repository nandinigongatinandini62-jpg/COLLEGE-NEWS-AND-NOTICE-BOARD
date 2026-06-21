import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { eventService } from '../services/eventService';
import EventCard from '../components/EventCard';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { validateRegistrationForm } from '../utils/validators';
import type { EventItem, EventRegistrationForm, FormErrors } from '../types';

const EMPTY_FORM: EventRegistrationForm = { name: '', email: '', rollNumber: '', eventId: '' };

export default function Events() {
  const { data: events, loading } = useFetch(() => eventService.getAll(), []);
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const [form, setForm] = useState<EventRegistrationForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const openModal = (event: EventItem) => {
    setActiveEvent(event);
    setForm({ ...EMPTY_FORM, eventId: event.id });
    setErrors({});
    setSubmitted(false);
  };

  const closeModal = () => setActiveEvent(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateRegistrationForm(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setSubmitting(true);
    await eventService.register(form);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="container section">
      <p className="eyebrow">Campus Calendar</p>
      <h1 className="section-title">Upcoming Events</h1>

      <div className="row g-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <div className="col-md-4" key={i}><SkeletonCard /></div>)
          : (events ?? []).map((item) => (
              <div className="col-md-4" key={item.id}>
                <EventCard item={item} onRegister={openModal} />
              </div>
            ))}
      </div>
      {!loading && (events ?? []).length === 0 && <EmptyState message="No upcoming events right now." />}

      <Modal isOpen={!!activeEvent} title={`Register: ${activeEvent?.title ?? ''}`} onClose={closeModal}>
        {submitted ? (
          <div className="alert alert-success" role="status">
            You're registered for <strong>{activeEvent?.title}</strong>! A confirmation has been noted.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="reg-name" className="form-label">Full name</label>
              <input
                id="reg-name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                aria-required="true"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="reg-email" className="form-label">Email</label>
              <input
                id="reg-email"
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                aria-required="true"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="reg-roll" className="form-label">Roll number</label>
              <input
                id="reg-roll"
                className={`form-control ${errors.rollNumber ? 'is-invalid' : ''}`}
                value={form.rollNumber}
                onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
                aria-required="true"
              />
              {errors.rollNumber && <div className="invalid-feedback">{errors.rollNumber}</div>}
            </div>
            <button type="submit" className="btn btn-oxblood w-100" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Confirm Registration'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
