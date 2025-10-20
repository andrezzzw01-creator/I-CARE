
import React from 'react';
import { SettingsPage } from '../types';

interface SettingsProps {
    setActiveSettingsPage: (page: SettingsPage) => void;
}

const SettingsItem: React.FC<{ icon: string; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 w-full text-left hover:bg-stone-50 transition-colors">
        <span className="text-2xl">{icon}</span>
        <p className="text-slate-700 font-medium flex-grow">{label}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    </button>
);


export const Settings: React.FC<SettingsProps> = ({ setActiveSettingsPage }) => {
  return (
    <div className="p-4 pb-20">
      <header className="mb-6 text-center">
        <div className="relative inline-block">
            <img src="https://picsum.photos/100" alt="Profile" className="w-24 h-24 rounded-full mx-auto shadow-lg border-4 border-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mt-4">Andrew Jentai</h1>
        <p className="text-slate-500">bcs23090009@student.uts.edu.my</p>
      </header>

      <div className="space-y-3">
        <SettingsItem icon="👤" label="Basic Information" onClick={() => setActiveSettingsPage(SettingsPage.BasicInfo)} />
        <SettingsItem icon="🌿" label="Lifestyle" onClick={() => setActiveSettingsPage(SettingsPage.Lifestyle)} />
        <SettingsItem icon="💊" label="Medical Information" onClick={() => setActiveSettingsPage(SettingsPage.MedicalInfo)} />
        <SettingsItem icon="⌚️" label="Device Companion" onClick={() => setActiveSettingsPage(SettingsPage.DeviceCompanion)} />
        <SettingsItem icon="ℹ️" label="About" onClick={() => setActiveSettingsPage(SettingsPage.About)} />
      </div>

      <div className="mt-8 text-center">
        <button className="text-red-500 font-semibold bg-red-50 border border-red-200 px-6 py-2 rounded-lg hover:bg-red-100 transition-colors">
            Log Out
        </button>
      </div>
    </div>
  );
};
