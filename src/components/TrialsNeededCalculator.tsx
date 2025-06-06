import { useCallback, useEffect, useState } from 'react';
import { calculateTrialsNeeded } from '../utils/probability';

const TrialsNeededCalculator = () => {
  const [targetProbability, setTargetProbability] = useState<number>(0.0);
  const [displayTargetProbability, setDisplayTargetProbability] =
    useState<string>('0');
  const [desiredQuantity, setDesiredQuantity] = useState<number>(1);
  const [goalProbability, setGoalProbability] = useState<number>(0.0);
  const [displayGoalProbability, setDisplayGoalProbability] =
    useState<string>('0');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateResult = useCallback(() => {
    setError(null);

    try {
      if (
        Number.isNaN(targetProbability) ||
        targetProbability < 0 ||
        targetProbability > 1
      ) {
        throw new Error(
          'ターゲットの排出確率は0%から100%の間で入力してください'
        );
      }

      if (
        Number.isNaN(desiredQuantity) ||
        desiredQuantity <= 0 ||
        !Number.isInteger(desiredQuantity)
      ) {
        throw new Error('ほしいターゲットの数量は正の整数で入力してください');
      }

      if (
        Number.isNaN(goalProbability) ||
        goalProbability <= 0 ||
        goalProbability > 1
      ) {
        throw new Error('目標確率は0%より大きく100%以下で入力してください');
      }

      const trials = calculateTrialsNeeded(
        targetProbability,
        desiredQuantity,
        goalProbability
      );
      setResult(trials);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '計算中にエラーが発生しました'
      );
      setResult(null);
    }
  }, [targetProbability, desiredQuantity, goalProbability]);

  useEffect(() => {
    calculateResult();
  }, [calculateResult]);

  const handleTargetProbabilityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number.parseFloat(e.target.value);
    setDisplayTargetProbability(e.target.value);
    setTargetProbability(value / 100);
  };

  const handleGoalProbabilityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number.parseFloat(e.target.value);
    setDisplayGoalProbability(e.target.value);
    setGoalProbability(value / 100);
  };

  return (
    <div className="min-h-[calc(100dvh-80px)] p-4 pt-8 flex flex-col items-center mx-auto max-w-[600px]">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2 w-full text-center text-gray-900 dark:text-white transition-colors duration-300">
        回数計算
      </h2>

      <div className="mb-6 w-full">
        <label
          htmlFor="targetProbability"
          className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
        >
          ターゲットの排出確率 (0% ~ 100%)
        </label>
        <input
          id="targetProbability"
          type="number"
          step="0.1"
          min="0"
          max="100"
          value={displayTargetProbability}
          onChange={handleTargetProbabilityChange}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg py-4 px-4 w-full text-xl mb-2 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 text-gray-900 dark:text-white shadow-sm transition-colors duration-300"
        />
      </div>

      <div className="mb-6 w-full">
        <label
          htmlFor="desiredQuantity"
          className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
        >
          ほしいターゲットの数量
        </label>
        <input
          id="desiredQuantity"
          type="number"
          min="1"
          step="1"
          value={desiredQuantity}
          onChange={(e) =>
            setDesiredQuantity(Number.parseInt(e.target.value, 10))
          }
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg py-4 px-4 w-full text-xl mb-2 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 text-gray-900 dark:text-white shadow-sm transition-colors duration-300"
        />
      </div>

      <div className="mb-6 w-full">
        <label
          htmlFor="goalProbability"
          className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
        >
          目標確率 (0% ~ 100%)
        </label>
        <input
          id="goalProbability"
          type="number"
          step="0.1"
          min="0"
          max="100"
          value={displayGoalProbability}
          onChange={handleGoalProbabilityChange}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg py-4 px-4 w-full text-xl mb-2 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 text-gray-900 dark:text-white shadow-sm transition-colors duration-300"
        />
      </div>

      {error && (
        <div className="bg-gray-100 dark:bg-gray-700 border-l-4 border-gray-900 dark:border-gray-300 p-4 rounded-r mb-6 text-base text-gray-700 dark:text-gray-300 w-full transition-colors duration-300">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      {result !== null && (
        <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow w-full text-center border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <p className="text-xl mb-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
            結果:
          </p>
          <p className="text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {result}回
          </p>
          <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 mx-auto my-4 rounded-full transition-colors duration-300" />
          <p className="text-base mt-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">
            <span className="font-semibold">
              {(goalProbability * 100).toFixed(1)}%
            </span>
            の確率で
            <span className="font-semibold">{desiredQuantity}個</span>の
            <span className="font-semibold">
              {(targetProbability * 100).toFixed(1)}%
            </span>
            ターゲットを得るために必要な回数
          </p>
        </div>
      )}
    </div>
  );
};

export default TrialsNeededCalculator;
