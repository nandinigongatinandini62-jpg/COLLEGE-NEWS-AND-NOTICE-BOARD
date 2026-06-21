import type { EventItem, EventRegistrationForm } from '../types';
import { eventData } from '../data/dummyData';
import { simulateRequest, readCache, writeCache } from './apiClient';

const CACHE_KEY = 'cnnbs.events.cache';
const REG_KEY = 'cnnbs.events.registrations';

export const eventService = {
  async getAll(): Promise<EventItem[]> {
    const cached = readCache<EventItem[]>(CACHE_KEY);
    if (cached) return cached;
    const res = await simulateRequest(eventData);
    writeCache(CACHE_KEY, res.data);
    return res.data;
  },

  async register(form: EventRegistrationForm): Promise<{ success: boolean }> {
    await simulateRequest(form);
    const existing = readCache<EventRegistrationForm[]>(REG_KEY) ?? [];
    writeCache(REG_KEY, [...existing, form]);
    return { success: true };
  },
};
