
import React from 'react';

interface SplashScreenProps {
  onGetStarted: () => void;
}

const AppLogo: React.FC = () => (
    <div className="flex flex-col items-center justify-center">
        <div className="bg-slate-800 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m-3 0h-1m10 0h1" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mt-4">I-CARE</h1>
    </div>
);


export const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between items-center p-8">
      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <AppLogo />
        <p className="text-slate-600 mt-6 max-w-xs">AI-Powered Health Guidance for Sustainable Living.</p>
      </div>
      <div className="w-full max-w-sm">
         <button onClick={onGetStarted} className="w-full bg-slate-800 text-white py-3 rounded-full font-semibold hover:bg-slate-700 transition-colors duration-300 shadow-lg">
          Get Started
        </button>
      </div>
    </div>
  );
};
