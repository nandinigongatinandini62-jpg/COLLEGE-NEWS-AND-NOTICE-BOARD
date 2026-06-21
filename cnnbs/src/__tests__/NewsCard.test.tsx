import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import type { NewsItem } from '../types';

const mockNews: NewsItem = {
  id: 'n1',
  title: 'Test Headline',
  summary: 'A short summary for the test article.',
  content: 'Full content body.',
  category: 'Academics',
  author: 'Test Author',
  publishedAt: '2026-06-01',
  imageUrl: 'https://example.com/image.jpg',
};

describe('NewsCard', () => {
  it('renders the news title and category', () => {
    render(
      <MemoryRouter>
        <NewsCard item={mockNews} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Headline')).toBeInTheDocument();
    expect(screen.getByText('Academics')).toBeInTheDocument();
  });
});
