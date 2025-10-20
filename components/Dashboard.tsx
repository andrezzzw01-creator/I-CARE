import React, { useState, useEffect } from 'react';
// FIX: Import 'Page' as a value, not a type, so it can be used in the onClick handler.
import { Page } from '../types';
import type { HealthData, Goal } from '../types';
import { getAIHealthTip, getAIMetricInsight } from '../services/geminiService';
import { HealthCard } from './HealthCard';
import { HeartIcon, FireIcon, MoonIcon, CheckCircleIcon } from './icons';

interface DashboardProps {
  healthData: HealthData;
  livingGoal: Goal;
  setActivePage: (page: Page) => void;
}

const WalkerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 21a.75.75 0 0 1-.75-.75v-6.375a.75.75 0 0 1 .75-.75h.012a.75.75 0 0 1 .75.75v6.375a.75.75 0 0 1-.75.75Zm-4.5 0a.75.75 0 0 1-.75-.75v-3.375a.75.75 0 0 1 .75-.75h.012a.75.75 0 0 1 .75.75v3.375a.75.75 0 0 1-.75.75Zm8.994-1.233a.75.75 0 0 0 .75-.75V11.25a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 .75.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21a.75.75 0 0 1-.75-.75V15a.75.75 0 0 1 .75-.75h.012a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-.75.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.463 3.422a.75.75 0 0 0-.812-.296l-2.036.68a.75.75 0 0 0-.618.72v2.388a.75.75 0 0 0 .75.75h.012a.75.75 0 0 0 .75-.75v-1.88l1.724-.575a.75.75 0 0 0 .544-.721v-.53Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 1.5 0v-1.5a.75.75 0 0 0-.75-.75Z" />
    </svg>
);

export const Dashboard: React.FC<DashboardProps> = ({ healthData, livingGoal, setActivePage }) => {
  const [aiTip, setAiTip] = useState<string>('Loading AI tip...');
  const [metricInsights, setMetricInsights] = useState({
      steps: 'Loading...',
      calories: 'Loading...',
      heartRate: 'Loading...',
      sleep: 'Loading...',
  });

  useEffect(() => {
    const fetchInsights = async () => {
      setAiTip(await getAIHealthTip(healthData));
      setMetricInsights({
          steps: await getAIMetricInsight('Steps', healthData.steps, 'steps'),
          calories: await getAIMetricInsight('Calories', healthData.calories, 'kcal'),
          heartRate: await getAIMetricInsight('Heart Rate', healthData.heartRate, 'bpm'),
          sleep: await getAIMetricInsight('Sleep', healthData.sleepHours, 'hr'),
      });
    };
    fetchInsights();
  }, [healthData]);

  return (
    <div className="p-4 pb-20">
      <header className="mb-6">
        <p className="text-slate-600">Personal greetings,</p>
        <h1 className="text-3xl font-bold text-slate-800">Andrew Jentai</h1>
      </header>

      <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-slate-600 font-medium">Your Health Score</h2>
                <p className="text-4xl font-bold text-slate-800">{healthData.healthScore}<span className="text-2xl text-slate-500">/100</span></p>
            </div>
            <div className="w-16 h-16">
                 <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path className="text-stone-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8"></path>
                    <path className="text-emerald-500" strokeDasharray={`${healthData.healthScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round"></path>
                </svg>
            </div>
        </div>
        <div className="mt-4 bg-amber-100 border-l-4 border-amber-400 p-3 rounded-lg">
            <p className="text-sm text-amber-800 font-medium">AI Tip</p>
            <p className="text-sm text-amber-700">{aiTip}</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Daily Activity</h2>
        <div className="grid grid-cols-2 gap-4">
            <HealthCard title="Steps" value={healthData.steps.toLocaleString()} unit="steps" icon={<WalkerIcon/>} colorClass="bg-green-100" aiInsight={metricInsights.steps} />
            <HealthCard title="Calories" value={healthData.calories.toLocaleString()} unit="kcal" icon={<FireIcon className="w-6 h-6 text-orange-800"/>} colorClass="bg-orange-100" aiInsight={metricInsights.calories} />
            <HealthCard title="Heart Rate" value={String(healthData.heartRate)} unit="bpm" icon={<HeartIcon className="w-6 h-6 text-red-800"/>} colorClass="bg-red-100" aiInsight={metricInsights.heartRate} />
            <HealthCard title="Sleep" value={String(healthData.sleepHours)} unit="hr" icon={<MoonIcon className="w-6 h-6 text-indigo-800"/>} colorClass="bg-indigo-100" aiInsight={metricInsights.sleep} />
            <div 
                className="col-span-2 bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 cursor-pointer hover:bg-stone-50 transition-colors"
                onClick={() => setActivePage(Page.Goals)}
            >
                <div className="p-3 rounded-full bg-sky-100">
                    <CheckCircleIcon className="w-6 h-6 text-sky-800" />
                </div>
                <div>
                    <p className="text-slate-500 text-sm">Living Goal</p>
                    <p className="text-slate-800 font-bold text-base">{livingGoal.title}</p>
                    <p className="text-sm text-slate-600">{livingGoal.current} / {livingGoal.target} {livingGoal.unit}</p>
                </div>
                <div className="flex-grow text-right">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400 inline-block">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};