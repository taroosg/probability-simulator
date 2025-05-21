/**
 * Calculate the probability of an event
 * @param favorableOutcomes - Number of favorable outcomes
 * @param totalOutcomes - Total number of possible outcomes
 * @returns Probability as a decimal between 0 and 1
 */
export const calculateProbability = (
  favorableOutcomes: number,
  totalOutcomes: number
): number => {
  if (totalOutcomes <= 0) {
    throw new Error('Total outcomes must be a positive number');
  }

  if (favorableOutcomes < 0) {
    throw new Error('Favorable outcomes cannot be negative');
  }

  if (favorableOutcomes > totalOutcomes) {
    throw new Error('Favorable outcomes cannot exceed total outcomes');
  }

  return favorableOutcomes / totalOutcomes;
};

/**
 * Simulate an event with a given probability
 * @param probability - Probability of the event occurring (0 to 1)
 * @returns boolean indicating whether the event occurred
 */
export const simulateEvent = (probability: number): boolean => {
  if (probability < 0 || probability > 1) {
    throw new Error('Probability must be between 0 and 1');
  }

  return Math.random() <= probability;
};

/**
 * Run multiple simulations of an event
 * @param probability - Probability of the event occurring (0 to 1)
 * @param trials - Number of trials to run
 * @returns Number of successful outcomes
 */
export const runSimulations = (probability: number, trials: number): number => {
  if (trials <= 0 || !Number.isInteger(trials)) {
    throw new Error('Number of trials must be a positive integer');
  }

  let successes = 0;
  for (let i = 0; i < trials; i++) {
    if (simulateEvent(probability)) {
      successes++;
    }
  }

  return successes;
};
