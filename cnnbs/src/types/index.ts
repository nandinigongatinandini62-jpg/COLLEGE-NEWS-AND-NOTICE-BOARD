// Central type definitions for the College News & Notice Board System (CO2: TypeScript engineering)

export type Category = 'Academics' | 'Examination' | 'Placement' | 'Sports' | 'Cultural' | 'General';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: Category;
  author: string;
  publishedAt: string; // ISO date
  imageUrl: string;
  featured?: boolean;
}

export interface NoticeItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  issuedBy: string;
  issuedAt: string;
  priority: 'High' | 'Medium' | 'Low';
  attachmentName?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  organizer: string;
  category: Category;
  seatsAvailable: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'faculty';
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  icon: string;
}

// Generic API response wrapper (CO2: Generics)
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface EventRegistrationForm {
  name: string;
  email: string;
  rollNumber: string;
  eventId: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
