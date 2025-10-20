
import React from 'react';

interface HealthCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  colorClass: string;
  aiInsight?: string;
}

export const HealthCard: React.FC<HealthCardProps> = ({ title, value, unit, icon, colorClass, aiInsight }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-full">
      <div className="flex items-start space-x-3">
        <div className={`p-3 rounded-full ${colorClass} self-start`}>
          {icon}
        </div>
        <div>
          <p className="text-slate-500 text-sm">{title}</p>
          <p className="text-slate-800 font-bold text-lg">
            {value} <span className="text-sm font-normal text-slate-600">{unit}</span>
          </p>
        </div>
      </div>
      {aiInsight && (
        <div className="mt-3 pt-2 border-t border-stone-100">
            <p className="text-xs text-teal-700 font-medium">
                <span className="font-bold">AI Insight:</span> {aiInsight}
            </p>
        </div>
      )}
    </div>
  );
};
