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
    <div className="page-container">
      <h2 className="page-title">
        目標確率達成に必要な試行回数計算
      </h2>

      <div className="form-group">
        <label htmlFor="targetProbability" className="form-label">
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
        />
      </div>

      <div className="form-group">
        <label htmlFor="goalProbability" className="form-label">
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
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      {result !== null && (
        <div className="result-box">
          <p className="result-title">結果:</p>
          <p className="result-value">{result}回</p>
          <p className="result-description">
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
