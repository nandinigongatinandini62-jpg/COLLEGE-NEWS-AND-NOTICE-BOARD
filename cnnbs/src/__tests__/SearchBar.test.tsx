import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('calls onChange as the user types', async () => {
    const onChange = vi.fn();
    render(<SearchBar placeholder="Search news" onChange={onChange} />);
    const input = screen.getByLabelText('Search news');
    await userEvent.type(input, 'exam');
    expect(onChange).toHaveBeenLastCalledWith('exam');
  });
});
