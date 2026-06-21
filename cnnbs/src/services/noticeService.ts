import type { NoticeItem } from '../types';
import { noticeData } from '../data/dummyData';
import { simulateRequest, readCache, writeCache } from './apiClient';

const CACHE_KEY = 'cnnbs.notices.cache';

export const noticeService = {
  async getAll(): Promise<NoticeItem[]> {
    const cached = readCache<NoticeItem[]>(CACHE_KEY);
    if (cached) return cached;
    const res = await simulateRequest(noticeData);
    writeCache(CACHE_KEY, res.data);
    return res.data;
  },

  async search(query: string, category?: string): Promise<NoticeItem[]> {
    const all = await this.getAll();
    return all
      .filter((item) => (category && category !== 'All' ? item.category === category : true))
      .filter((item) => (query ? item.title.toLowerCase().includes(query.toLowerCase()) : true))
      .sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
  },
};
