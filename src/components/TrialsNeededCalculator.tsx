import { useState } from 'react';
import { calculateTrialsNeeded } from '../utils/probability';

const TrialsNeededCalculator = () => {
  const [targetProbability, setTargetProbability] = useState<number>(0.0);
  const [desiredQuantity, setDesiredQuantity] = useState<number>(1);
  const [goalProbability, setGoalProbability] = useState<number>(0.0);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);

    try {
      if (
        Number.isNaN(targetProbability) ||
        targetProbability < 0 ||
        targetProbability > 1
      ) {
        throw new Error('ターゲットの排出確率は0から1の間で入力してください');
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
        throw new Error('目標確率は0より大きく1以下で入力してください');
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
  };

  return (
    <div className="page-container">
      <h2 className="text-xl font-bold mb-4">
        目標確率達成に必要な試行回数計算
      </h2>

      <div className="form-group">
        <label htmlFor="targetProbability" className="form-label">
          ターゲットの排出確率 (0.0 ~ 1.0)
        </label>
        <input
          id="targetProbability"
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={targetProbability}
          onChange={(e) =>
            setTargetProbability(Number.parseFloat(e.target.value))
          }
          className="mb-4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="desiredQuantity" className="form-label">
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
          className="mb-4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="goalProbability" className="form-label">
          目標確率 (0.0 ~ 1.0)
        </label>
        <input
          id="goalProbability"
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={goalProbability}
          onChange={(e) =>
            setGoalProbability(Number.parseFloat(e.target.value))
          }
          className="mb-4"
        />
      </div>

      <button type="button" onClick={handleCalculate} className="mb-6">
        計算する
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {result !== null && (
        <div className="result-box">
          <p className="text-lg mb-2">結果:</p>
          <p className="text-2xl font-bold">{result}回</p>
          <p className="text-sm mt-2">
            （{goalProbability * 100}%の確率で{desiredQuantity}個の
            {targetProbability * 100}%ターゲットを得るために必要な回数）
          </p>
        </div>
      )}
    </div>
  );
};

export default TrialsNeededCalculator;
