import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Check for the existence of navigation elements using a more specific selector
    expect(screen.getByRole('button', { name: /確率計算/i })).toBeInTheDocument();
  });

  it('displays the navigation and default tab', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /確率計算/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /回数計算/i })).toBeInTheDocument();

    // Default tab should be "atLeastOne" - check by seeing if probability inputs are rendered
    expect(screen.getByLabelText(/ターゲットの排出確率/)).toBeInTheDocument();
  });
});
