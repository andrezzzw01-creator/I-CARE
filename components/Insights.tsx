import React, { useState, useEffect } from 'react';
import type { DailyHealthData } from '../types';
import { 
  getAIInsightsSummary, 
  getAIStepsInsight, 
  getAICaloriesInsight, 
  getAIHeartRateInsight, 
  getAISleepInsight 
} from '../services/geminiService';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InsightsProps {
  history: DailyHealthData[];
}

interface InsightChartCardProps {
    title: string;
    aiInsight: string;
    data: DailyHealthData[];
    dataKey: keyof DailyHealthData;
    color: string;
    chartType: 'bar' | 'line';
}

const InsightChartCard: React.FC<InsightChartCardProps> = ({ title, aiInsight, data, dataKey, color, chartType }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold text-slate-800 mb-1">{title}</h2>
        <p className="text-teal-700 text-sm font-medium mb-4 h-10">{aiInsight}</p>
        <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
                {chartType === 'bar' ? (
                    <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
                    </BarChart>
                ) : (
                    <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 12 }} />
                        <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fill: '#475569', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
    </div>
);

export const Insights: React.FC<InsightsProps> = ({ history }) => {
  const [summary, setSummary] = useState('Loading AI summary...');
  const [insights, setInsights] = useState({
    steps: 'Loading insight...',
    calories: 'Loading insight...',
    heartRate: 'Loading insight...',
    sleep: 'Loading insight...',
  });
  
  useEffect(() => {
    const fetchInsights = async () => {
      if (history.length > 0) {
        setSummary(await getAIInsightsSummary(history));
        setInsights({
          steps: await getAIStepsInsight(history),
          calories: await getAICaloriesInsight(history),
          heartRate: await getAIHeartRateInsight(history),
          sleep: await getAISleepInsight(history),
        });
      }
    };
    fetchInsights();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <div className="p-4 pb-20">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Insights</h1>
      </header>

      <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-2">AI Summary of the Week</h2>
        <p className="text-slate-600 text-sm leading-relaxed">{summary}</p>
      </div>
      
      <div className="space-y-4">
        <InsightChartCard title="Weekly Steps" aiInsight={insights.steps} data={history} dataKey="steps" color="#14b8a6" chartType="bar" />
        <InsightChartCard title="Calories Burned" aiInsight={insights.calories} data={history} dataKey="calories" color="#f97316" chartType="bar" />
        <InsightChartCard title="Resting Heart Rate" aiInsight={insights.heartRate} data={history} dataKey="heartRate" color="#ef4444" chartType="line" />
        <InsightChartCard title="Sleep Duration" aiInsight={insights.sleep} data={history} dataKey="sleepHours" color="#4f46e5" chartType="line" />
      </div>

    </div>
  );
};