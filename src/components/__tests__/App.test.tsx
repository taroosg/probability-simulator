import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(
      screen.getByText('1回以上ターゲットを引ける確率計算')
    ).toBeInTheDocument();
  });

  it('displays the navigation and default tab', () => {
    render(<App />);
    expect(screen.getByText('確率計算')).toBeInTheDocument();
    expect(screen.getByText('回数計算')).toBeInTheDocument();

    // Default tab should be "atLeastOne"
    expect(
      screen.getByText('1回以上ターゲットを引ける確率計算')
    ).toBeInTheDocument();
  });
});
