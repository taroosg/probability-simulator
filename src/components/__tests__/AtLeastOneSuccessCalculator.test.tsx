import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AtLeastOneSuccessCalculator from '../AtLeastOneSuccessCalculator';

describe('AtLeastOneSuccessCalculator', () => {
  it('renders the component correctly', () => {
    render(<AtLeastOneSuccessCalculator />);

    expect(
      screen.getByText('1回以上ターゲットを引ける確率計算')
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/ターゲットの排出確率/)).toBeInTheDocument();
    expect(screen.getByLabelText(/試行回数/)).toBeInTheDocument();
    expect(screen.getByText('計算する')).toBeInTheDocument();
  });

  it('calculates probability correctly', () => {
    render(<AtLeastOneSuccessCalculator />);

    // Input values
    const probabilityInput = screen.getByLabelText(
      /ターゲットの排出確率/
    ) as HTMLInputElement;
    const trialsInput = screen.getByLabelText(/試行回数/) as HTMLInputElement;

    fireEvent.change(probabilityInput, { target: { value: '0.1' } });
    fireEvent.change(trialsInput, { target: { value: '10' } });

    // Click calculate button
    const calculateButton = screen.getByText('計算する');
    fireEvent.click(calculateButton);

    // Check result is approximately 65.13%
    expect(screen.getByText('65.13%')).toBeInTheDocument();
  });

  it('shows error for invalid inputs', () => {
    render(<AtLeastOneSuccessCalculator />);

    // Input invalid values
    const probabilityInput = screen.getByLabelText(
      /ターゲットの排出確率/
    ) as HTMLInputElement;
    const trialsInput = screen.getByLabelText(/試行回数/) as HTMLInputElement;

    fireEvent.change(probabilityInput, { target: { value: '2' } });
    fireEvent.change(trialsInput, { target: { value: '10' } });

    // Click calculate button
    const calculateButton = screen.getByText('計算する');
    fireEvent.click(calculateButton);

    // Check error message
    expect(
      screen.getByText(/ターゲットの排出確率は0から1の間で入力してください/)
    ).toBeInTheDocument();

    // Try another invalid input
    fireEvent.change(probabilityInput, { target: { value: '0.5' } });
    fireEvent.change(trialsInput, { target: { value: '-1' } });

    fireEvent.click(calculateButton);

    // Check error message
    expect(
      screen.getByText(/試行回数は正の整数で入力してください/)
    ).toBeInTheDocument();
  });
});
