import { describe, it, expect, vi } from 'vitest';
import {
  calculateProbability,
  simulateEvent,
  runSimulations,
} from '../probability';

describe('calculateProbability', () => {
  it('correctly calculates probability', () => {
    expect(calculateProbability(1, 2)).toBe(0.5);
    expect(calculateProbability(0, 5)).toBe(0);
    expect(calculateProbability(5, 5)).toBe(1);
  });

  it('throws error for invalid inputs', () => {
    expect(() => calculateProbability(1, 0)).toThrow(
      'Total outcomes must be a positive number'
    );
    expect(() => calculateProbability(-1, 5)).toThrow(
      'Favorable outcomes cannot be negative'
    );
    expect(() => calculateProbability(6, 5)).toThrow(
      'Favorable outcomes cannot exceed total outcomes'
    );
  });
});

describe('simulateEvent', () => {
  it('returns a boolean value', () => {
    const result = simulateEvent(0.5);
    expect(typeof result).toBe('boolean');
  });

  it('throws error for invalid probability', () => {
    expect(() => simulateEvent(-0.1)).toThrow(
      'Probability must be between 0 and 1'
    );
    expect(() => simulateEvent(1.1)).toThrow(
      'Probability must be between 0 and 1'
    );
  });

  it('always returns true for probability of 1', () => {
    expect(simulateEvent(1)).toBe(true);
  });

  it('always returns false for probability of 0', () => {
    expect(simulateEvent(0)).toBe(false);
  });

  it('returns expected distribution of results', () => {
    // Mock Math.random to return predictable values
    const mockMath = vi.spyOn(Math, 'random');

    mockMath.mockReturnValueOnce(0.3).mockReturnValueOnce(0.7);

    expect(simulateEvent(0.5)).toBe(true); // 0.3 <= 0.5
    expect(simulateEvent(0.5)).toBe(false); // 0.7 > 0.5

    mockMath.mockRestore();
  });
});

describe('runSimulations', () => {
  it('runs the correct number of simulations', () => {
    const simulateEventSpy = vi.spyOn(Math, 'random');

    // Force all simulations to succeed
    simulateEventSpy.mockReturnValue(0);

    const result = runSimulations(0.5, 100);

    expect(simulateEventSpy).toHaveBeenCalledTimes(100);
    expect(result).toBe(100);

    simulateEventSpy.mockRestore();
  });

  it('throws error for invalid inputs', () => {
    expect(() => runSimulations(0.5, 0)).toThrow(
      'Number of trials must be a positive integer'
    );
    expect(() => runSimulations(0.5, -1)).toThrow(
      'Number of trials must be a positive integer'
    );
    expect(() => runSimulations(0.5, 1.5)).toThrow(
      'Number of trials must be a positive integer'
    );
  });

  it('returns expected results for controlled simulations', () => {
    // Mock Math.random to return a specific pattern
    const mockMath = vi.spyOn(Math, 'random');

    // Set up a pattern that will give 2 successes out of 5 trials
    mockMath
      .mockReturnValueOnce(0.1) // success (0.1 <= 0.5)
      .mockReturnValueOnce(0.6) // fail (0.6 > 0.5)
      .mockReturnValueOnce(0.7) // fail (0.7 > 0.5)
      .mockReturnValueOnce(0.2) // success (0.2 <= 0.5)
      .mockReturnValueOnce(0.8); // fail (0.8 > 0.5)

    const result = runSimulations(0.5, 5);

    expect(result).toBe(2);

    mockMath.mockRestore();
  });
});
