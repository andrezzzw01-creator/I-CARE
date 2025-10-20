
import React from 'react';
import { ChevronLeftIcon } from '../icons';

interface SettingsPageWrapperProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

export const SettingsPageWrapper: React.FC<SettingsPageWrapperProps> = ({ title, onBack, children }) => {
  return (
    <div className="p-4 pb-20">
      <header className="relative flex items-center justify-center mb-6">
        <button onClick={onBack} className="absolute left-0 bg-white p-2 rounded-full shadow-sm hover:bg-stone-50">
          <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </header>
      <div>{children}</div>
    </div>
  );
};
