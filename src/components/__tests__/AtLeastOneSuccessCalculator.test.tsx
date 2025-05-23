import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AtLeastOneSuccessCalculator from '../AtLeastOneSuccessCalculator';

describe('AtLeastOneSuccessCalculator', () => {
  it('renders the component correctly', () => {
    render(<AtLeastOneSuccessCalculator />);

    expect(screen.getByText('確率計算')).toBeInTheDocument();
    expect(screen.getByLabelText(/ターゲットの排出確率/)).toBeInTheDocument();
    expect(screen.getByLabelText(/試行回数/)).toBeInTheDocument();
    // Check button is no longer present
    expect(screen.queryByText('計算する')).not.toBeInTheDocument();
  });

  it('calculates probability correctly on input change', () => {
    render(<AtLeastOneSuccessCalculator />);

    // Input values
    const probabilityInput = screen.getByLabelText(
      /ターゲットの排出確率/
    ) as HTMLInputElement;
    const trialsInput = screen.getByLabelText(/試行回数/) as HTMLInputElement;

    fireEvent.change(probabilityInput, { target: { value: '10' } });
    fireEvent.change(trialsInput, { target: { value: '10' } });

    // Check result is approximately 65.1% (with one decimal place)
    expect(screen.getByText('65.1%')).toBeInTheDocument();
  });

  it('shows error for invalid inputs', () => {
    render(<AtLeastOneSuccessCalculator />);

    // Input invalid values
    const probabilityInput = screen.getByLabelText(
      /ターゲットの排出確率/
    ) as HTMLInputElement;
    const trialsInput = screen.getByLabelText(/試行回数/) as HTMLInputElement;

    fireEvent.change(probabilityInput, { target: { value: '200' } });
    fireEvent.change(trialsInput, { target: { value: '10' } });

    // Check error message
    expect(
      screen.getByText(/ターゲットの排出確率は0%から100%の間で入力してください/)
    ).toBeInTheDocument();

    // Try another invalid input
    fireEvent.change(probabilityInput, { target: { value: '50' } });
    fireEvent.change(trialsInput, { target: { value: '-1' } });

    // Check error message
    expect(
      screen.getByText(/試行回数は正の整数で入力してください/)
    ).toBeInTheDocument();
  });
});
