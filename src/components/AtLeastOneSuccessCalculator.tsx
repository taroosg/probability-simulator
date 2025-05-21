import { useState, useEffect } from 'react';
import { calculateAtLeastOneSuccessProbability } from '../utils/probability';

const AtLeastOneSuccessCalculator = () => {
  const [targetProbability, setTargetProbability] = useState<number>(0.0);
  const [displayTargetProbability, setDisplayTargetProbability] = useState<string>('0');
  const [trials, setTrials] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    calculateResult();
  }, [targetProbability, trials]);

  const calculateResult = () => {
    setError(null);

    try {
      if (
        Number.isNaN(targetProbability) ||
        targetProbability < 0 ||
        targetProbability > 1
      ) {
        throw new Error('ターゲットの排出確率は0%から100%の間で入力してください');
      }

      if (Number.isNaN(trials) || trials <= 0 || !Number.isInteger(trials)) {
        throw new Error('試行回数は正の整数で入力してください');
      }

      const probability = calculateAtLeastOneSuccessProbability(
        targetProbability,
        trials
      );
      setResult(probability);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '計算中にエラーが発生しました'
      );
      setResult(null);
    }
  };

  const handleTargetProbabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    setDisplayTargetProbability(e.target.value);
    setTargetProbability(value / 100);
  };

  return (
    <div className="page-container">
      <h2 className="text-xl font-bold mb-4">
        1回以上ターゲットを引ける確率計算
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
          className="mb-4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="trials" className="form-label">
          試行回数 (回)
        </label>
        <input
          id="trials"
          type="number"
          min="1"
          step="1"
          value={trials}
          onChange={(e) => setTrials(Number.parseInt(e.target.value, 10))}
          className="mb-4"
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {result !== null && (
        <div className="result-box">
          <p className="text-lg mb-2">結果:</p>
          <p className="text-2xl font-bold">{(result * 100).toFixed(1)}%</p>
          <p className="text-sm mt-2">
            （{trials}回引いた場合に1回以上{(targetProbability * 100).toFixed(1)}
            %のターゲットを引ける確率）
          </p>
        </div>
      )}
    </div>
  );
};

export default AtLeastOneSuccessCalculator;
