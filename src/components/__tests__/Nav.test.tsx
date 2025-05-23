import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Nav from '../Nav';

describe('Nav', () => {
  it('renders with correct active tab highlighted', () => {
    const mockOnTabChange = vi.fn();

    render(<Nav activeTab="atLeastOne" onTabChange={mockOnTabChange} />);

    const atLeastOneButton = screen.getByText('確率計算').closest('button');
    const trialsNeededButton = screen.getByText('回数計算').closest('button');

    // More specific checks for active state
    expect(atLeastOneButton).toHaveAttribute('aria-pressed', 'true');
    expect(trialsNeededButton).toHaveAttribute('aria-pressed', 'false');

    // Check className contains active indicators
    expect(atLeastOneButton?.className).toContain('border-t-2');
    expect(trialsNeededButton?.className).not.toContain('border-t-2');
  });

  it('calls onTabChange with correct parameter when clicked', () => {
    const mockOnTabChange = vi.fn();

    render(<Nav activeTab="atLeastOne" onTabChange={mockOnTabChange} />);

    const trialsNeededButton = screen.getByText('回数計算');
    fireEvent.click(trialsNeededButton);

    expect(mockOnTabChange).toHaveBeenCalledWith('trialsNeeded');
  });
});
