import { describe, expect, it } from 'vitest';
import {
  calculateAtLeastOneSuccessProbability,
  calculateTrialsNeeded,
} from '../probability';

describe('calculateAtLeastOneSuccessProbability', () => {
  it('correctly calculates probability of at least one success', () => {
    // For a fair coin (p=0.5), probability of at least one heads in 2 flips = 0.75
    expect(calculateAtLeastOneSuccessProbability(0.5, 2)).toBeCloseTo(0.75);

    // For a 10% chance event, probability of at least one success in 10 trials
    expect(calculateAtLeastOneSuccessProbability(0.1, 10)).toBeCloseTo(
      0.6513,
      4
    );

    // For a 100% chance event, probability of at least one success in any number of trials = 1
    expect(calculateAtLeastOneSuccessProbability(1, 1)).toBe(1);

    // For a 0% chance event, probability of at least one success in any number of trials = 0
    expect(calculateAtLeastOneSuccessProbability(0, 100)).toBe(0);
  });

  it('throws error for invalid inputs', () => {
    expect(() => calculateAtLeastOneSuccessProbability(-0.1, 5)).toThrow(
      'Target probability must be between 0 and 1'
    );

    expect(() => calculateAtLeastOneSuccessProbability(1.1, 5)).toThrow(
      'Target probability must be between 0 and 1'
    );

    expect(() => calculateAtLeastOneSuccessProbability(0.5, 0)).toThrow(
      'Number of trials must be a positive integer'
    );

    expect(() => calculateAtLeastOneSuccessProbability(0.5, -1)).toThrow(
      'Number of trials must be a positive integer'
    );

    expect(() => calculateAtLeastOneSuccessProbability(0.5, 1.5)).toThrow(
      'Number of trials must be a positive integer'
    );
  });
});

describe('calculateTrialsNeeded', () => {
  it('correctly calculates trials needed for single item', () => {
    // For a 25% chance, to get 90% probability of at least one success
    expect(calculateTrialsNeeded(0.25, 1, 0.9)).toBe(9);

    // For a 10% chance, to get 95% probability of at least one success
    expect(calculateTrialsNeeded(0.1, 1, 0.95)).toBe(29);

    // For a 1% chance, to get 50% probability of at least one success
    expect(calculateTrialsNeeded(0.01, 1, 0.5)).toBe(69);
  });

  it('correctly calculates trials needed for multiple items', () => {
    // For a 50% chance, to get 2 items with 75% probability
    expect(calculateTrialsNeeded(0.5, 2, 0.75)).toBe(4);

    // For a 10% chance, to get 3 items with 80% probability
    // This should require more trials
    const trials = calculateTrialsNeeded(0.1, 3, 0.8);
    expect(trials).toBeGreaterThan(35);
  });

  it('throws error for invalid inputs', () => {
    expect(() => calculateTrialsNeeded(-0.1, 1, 0.5)).toThrow(
      'Target probability must be between 0 and 1'
    );

    expect(() => calculateTrialsNeeded(1.1, 1, 0.5)).toThrow(
      'Target probability must be between 0 and 1'
    );

    expect(() => calculateTrialsNeeded(0.5, 0, 0.5)).toThrow(
      'Desired quantity must be a positive integer'
    );

    expect(() => calculateTrialsNeeded(0.5, -1, 0.5)).toThrow(
      'Desired quantity must be a positive integer'
    );

    expect(() => calculateTrialsNeeded(0.5, 1.5, 0.5)).toThrow(
      'Desired quantity must be a positive integer'
    );

    expect(() => calculateTrialsNeeded(0.5, 1, 0)).toThrow(
      'Goal probability must be between 0 and 1'
    );

    expect(() => calculateTrialsNeeded(0.5, 1, 1.1)).toThrow(
      'Goal probability must be between 0 and 1'
    );
  });
});
