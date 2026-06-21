// CO2: Pure functions for validation logic
import type { FormErrors, ContactForm, LoginForm, EventRegistrationForm } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(form: ContactForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_REGEX.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.message.trim() || form.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';
  return errors;
}

export function validateLoginForm(form: LoginForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_REGEX.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.password.trim()) errors.password = 'Password is required.';
  return errors;
}

export function validateRegistrationForm(form: EventRegistrationForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_REGEX.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.rollNumber.trim()) errors.rollNumber = 'Roll number is required.';
  return errors;
}
