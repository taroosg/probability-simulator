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
    <div className="min-h-[calc(100dvh-60px)] p-4 flex flex-col items-center mx-auto max-w-[600px]">
      <h2 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2 w-full text-center text-gray-800 dark:text-white">
        目標確率達成に必要な試行回数計算
      </h2>

      <div className="mb-5 w-full">
        <label
          htmlFor="targetProbability"
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
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
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 w-full text-lg mb-5 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-400/50 dark:focus:ring-gray-200/50 dark:text-white"
        />
      </div>

      <div className="mb-5 w-full">
        <label
          htmlFor="desiredQuantity"
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
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
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 w-full text-lg mb-5 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-400/50 dark:focus:ring-gray-200/50 dark:text-white"
        />
      </div>

      <div className="mb-5 w-full">
        <label
          htmlFor="goalProbability"
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
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
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 w-full text-lg mb-5 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-400/50 dark:focus:ring-gray-200/50 dark:text-white"
        />
      </div>

      {error && (
        <div className="bg-gray-100 dark:bg-gray-700 border-l-4 border-l-gray-800 dark:border-l-gray-300 p-3 mb-4 text-sm">
          {error}
        </div>
      )}

      {result !== null && (
        <div className="mt-6 p-5 bg-white dark:bg-gray-800 rounded-md shadow-sm w-full text-center border border-gray-200 dark:border-gray-700">
          <p className="text-lg mb-2 text-gray-600 dark:text-gray-300">結果:</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {result}回
          </p>
          <p className="text-sm mt-3 text-gray-500 dark:text-gray-400">
            （{(goalProbability * 100).toFixed(1)}%の確率で{desiredQuantity}個の
            {(targetProbability * 100).toFixed(1)}
            %ターゲットを得るために必要な回数）
          </p>
        </div>
      )}
    </div>
  );
};

export default TrialsNeededCalculator;
