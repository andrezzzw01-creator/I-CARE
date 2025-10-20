
import { useState, useMemo } from 'react';
import type { HealthData, DailyHealthData } from '../types';

const generateMockHistory = (): DailyHealthData[] => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      steps: Math.floor(Math.random() * 8000) + 2000,
      calories: Math.floor(Math.random() * 1000) + 1500,
      heartRate: Math.floor(Math.random() * 20) + 65,
      sleepHours: Math.floor(Math.random() * 3) + 5.5,
      healthScore: Math.floor(Math.random() * 20) + 75,
    };
  });
};

export const useHealthData = () => {
  const [history, setHistory] = useState<DailyHealthData[]>(generateMockHistory());

  const currentData: HealthData = useMemo(() => {
    const latest = history[history.length - 1];
    return {
      steps: latest.steps,
      calories: latest.calories,
      heartRate: latest.heartRate,
      sleepHours: latest.sleepHours,
      healthScore: latest.healthScore,
    };
  }, [history]);

  return { currentData, history };
};
