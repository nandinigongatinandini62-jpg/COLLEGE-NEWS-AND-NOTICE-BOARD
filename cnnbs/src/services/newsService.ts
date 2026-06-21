import type { NewsItem } from '../types';
import { newsData } from '../data/dummyData';
import { simulateRequest, readCache, writeCache } from './apiClient';

const CACHE_KEY = 'cnnbs.news.cache';

export const newsService = {
  async getAll(): Promise<NewsItem[]> {
    const cached = readCache<NewsItem[]>(CACHE_KEY);
    if (cached) return cached;
    const res = await simulateRequest(newsData);
    writeCache(CACHE_KEY, res.data);
    return res.data;
  },

  async getById(id: string): Promise<NewsItem | undefined> {
    const all = await this.getAll();
    return all.find((item) => item.id === id);
  },

  async search(query: string, category?: string): Promise<NewsItem[]> {
    const all = await this.getAll();
    return all
      .filter((item) => (category && category !== 'All' ? item.category === category : true))
      .filter((item) =>
        query
          ? item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.summary.toLowerCase().includes(query.toLowerCase())
          : true
      );
  },
};
