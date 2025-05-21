import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Nav from '../Nav';

describe('Nav', () => {
  it('renders with correct active tab highlighted', () => {
    const mockOnTabChange = vi.fn();

    render(<Nav activeTab="atLeastOne" onTabChange={mockOnTabChange} />);

    const atLeastOneButton = screen.getByText('確率計算');
    const trialsNeededButton = screen.getByText('回数計算');

    expect(atLeastOneButton.className).toContain('active');
    expect(trialsNeededButton.className).not.toContain('active');
  });

  it('calls onTabChange with correct parameter when clicked', () => {
    const mockOnTabChange = vi.fn();

    render(<Nav activeTab="atLeastOne" onTabChange={mockOnTabChange} />);

    const trialsNeededButton = screen.getByText('回数計算');
    fireEvent.click(trialsNeededButton);

    expect(mockOnTabChange).toHaveBeenCalledWith('trialsNeeded');
  });
});
