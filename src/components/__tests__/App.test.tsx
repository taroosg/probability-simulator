import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Vite + React')).toBeInTheDocument();
  });

  it('displays the correct content', () => {
    render(<App />);
    expect(screen.getByText(/count is/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Click on the Vite and React logos to learn more/i)
    ).toBeInTheDocument();
  });
});
