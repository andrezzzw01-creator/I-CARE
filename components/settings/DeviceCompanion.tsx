
import React from 'react';

const DeviceCard: React.FC<{ name: string; icon: string, connected: boolean }> = ({ name, icon, connected }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
        <span className="text-4xl">{icon}</span>
        <div className="flex-grow">
            <p className="font-bold text-slate-800">{name}</p>
            <p className={`text-sm font-medium ${connected ? 'text-emerald-500' : 'text-slate-500'}`}>
                {connected ? 'Connected' : 'Not Connected'}
            </p>
        </div>
        <button className={`px-4 py-1.5 rounded-full text-sm font-semibold ${connected ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
            {connected ? 'Disconnect' : 'Connect'}
        </button>
    </div>
);

export const DeviceCompanion: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center p-4 bg-sky-100 border border-sky-200 rounded-lg">
        <p className="text-sm text-sky-800">Connect your wearable devices to automatically sync your health data like steps, heart rate, and sleep.</p>
      </div>

      <DeviceCard name="Apple Watch" icon="⌚️" connected={true} />
      <DeviceCard name="Fitbit" icon="🏃" connected={false} />
      <DeviceCard name="Garmin" icon="🚴" connected={false} />
    </div>
  );
};
