import React, { useState, useEffect } from 'react';
import type { Goal, HealthData } from '../types';
import { getAIGoalFeedback } from '../services/geminiService';
import { PlusIcon } from './icons';

interface GoalsProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  healthData: HealthData;
}

const GoalCircularProgress: React.FC<{ goal: Goal; color: string }> = ({ goal, color }) => {
    const progressPercentage = Math.min((goal.current / goal.target) * 100, 100);
    const circumference = 15.9155 * 2 * Math.PI; // 2 * pi * r, where r is 15.9155 for a 36x36 viewbox
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center p-2">
            <div className="relative w-28 h-28">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path className="text-stone-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                    <path
                        className={color}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: `${circumference} ${circumference}`,
                            strokeDashoffset: strokeDashoffset,
                            transition: 'stroke-dashoffset 0.5s ease-out',
                            transform: 'rotate(-90deg)',
                            transformOrigin: 'center'
                        }}
                    ></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-800">{Math.round(progressPercentage)}%</span>
                </div>
            </div>
            <h3 className="font-semibold text-slate-700 mt-3 text-center">{goal.title}</h3>
            <p className="text-sm text-slate-500">{goal.current.toLocaleString()} / {goal.target.toLocaleString()}</p>
        </div>
    );
};

const AIFeedback: React.FC<{ content: string }> = ({ content }) => {
    // Basic markdown parser for bullet points
    const parts = content.split('Guide to Achieve Your Goal');
    const comment = parts[0];
    const guide = parts.length > 1 ? parts[1] : '';

    return (
        <div>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">{comment}</p>
            {guide && (
                <div>
                    <h3 className="font-bold text-slate-700 text-sm mb-2">Guide to Achieve Your Goal</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {guide.split('\n').filter(line => line.trim().startsWith('*')).map((line, index) => (
                            <li key={index} className="text-slate-600 text-sm">{line.substring(line.indexOf('*') + 1).trim()}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export const Goals: React.FC<GoalsProps> = ({ goals, setGoals, healthData }) => {
  const [feedback, setFeedback] = useState('Loading AI feedback...');

  useEffect(() => {
    const fetchFeedback = async () => {
      if(goals.length > 0) {
        const result = await getAIGoalFeedback(goals, healthData);
        setFeedback(result);
      }
    };
    fetchFeedback();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals, healthData]);
  
  const goalColors = ["text-teal-500", "text-sky-500", "text-indigo-500"];

  return (
    <div className="p-4 pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Your Goals</h1>
        <button className="bg-slate-800 text-white p-2 rounded-full shadow-lg hover:bg-slate-700">
            <PlusIcon className="w-6 h-6"/>
        </button>
      </header>

      <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-2">AI Recommendations</h2>
        <AIFeedback content={feedback} />
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Your Progress</h2>
        <div className="grid grid-cols-2 gap-4">
            {goals.map((goal, index) => (
                <GoalCircularProgress key={goal.id} goal={goal} color={goalColors[index % goalColors.length]} />
            ))}
        </div>
      </div>
    </div>
  );
};