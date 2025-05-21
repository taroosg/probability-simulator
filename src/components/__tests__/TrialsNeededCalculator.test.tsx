import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TrialsNeededCalculator from '../TrialsNeededCalculator';

describe('TrialsNeededCalculator', () => {
  it('renders the component correctly', () => {
    render(<TrialsNeededCalculator />);

    expect(
      screen.getByText('目標確率達成に必要な試行回数計算')
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/ターゲットの排出確率/)).toBeInTheDocument();
    expect(screen.getByLabelText(/ほしいターゲットの数量/)).toBeInTheDocument();
    expect(screen.getByLabelText(/目標確率/)).toBeInTheDocument();
    // Check button is no longer present
    expect(screen.queryByText('計算する')).not.toBeInTheDocument();
  });

  it('calculates trials needed correctly for single item on input change', () => {
    render(<TrialsNeededCalculator />);

    // Input values
    const probabilityInput = screen.getByLabelText(
      /ターゲットの排出確率/
    ) as HTMLInputElement;
    const quantityInput = screen.getByLabelText(
      /ほしいターゲットの数量/
    ) as HTMLInputElement;
    const goalProbabilityInput = screen.getByLabelText(
      /目標確率/
    ) as HTMLInputElement;

    fireEvent.change(probabilityInput, { target: { value: '25' } });
    fireEvent.change(quantityInput, { target: { value: '1' } });
    fireEvent.change(goalProbabilityInput, { target: { value: '90' } });

    // Check result is 9 trials (based on our implementation)
    expect(screen.getByText('9回')).toBeInTheDocument();
  });

  it('shows error for invalid inputs', () => {
    render(<TrialsNeededCalculator />);

    // Input invalid values
    const probabilityInput = screen.getByLabelText(
      /ターゲットの排出確率/
    ) as HTMLInputElement;
    const quantityInput = screen.getByLabelText(
      /ほしいターゲットの数量/
    ) as HTMLInputElement;
    const goalProbabilityInput = screen.getByLabelText(
      /目標確率/
    ) as HTMLInputElement;

    fireEvent.change(probabilityInput, { target: { value: '200' } });
    fireEvent.change(quantityInput, { target: { value: '1' } });
    fireEvent.change(goalProbabilityInput, { target: { value: '90' } });

    // Check error message
    expect(
      screen.getByText(/ターゲットの排出確率は0%から100%の間で入力してください/)
    ).toBeInTheDocument();

    // Try another invalid input
    fireEvent.change(probabilityInput, { target: { value: '50' } });
    fireEvent.change(quantityInput, { target: { value: '0' } });

    // Check error message
    expect(
      screen.getByText(/ほしいターゲットの数量は正の整数で入力してください/)
    ).toBeInTheDocument();

    // Try invalid goal probability
    fireEvent.change(quantityInput, { target: { value: '1' } });
    fireEvent.change(goalProbabilityInput, { target: { value: '110' } });

    // Check error message
    expect(
      screen.getByText(/目標確率は0%より大きく100%以下で入力してください/)
    ).toBeInTheDocument();
  });
});
