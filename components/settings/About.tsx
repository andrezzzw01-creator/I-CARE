
import React from 'react';

const AppLogo: React.FC = () => (
    <div className="flex flex-col items-center justify-center">
        <div className="bg-slate-800 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m-3 0h-1m10 0h1" />
            </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mt-4">I-CARE</h1>
    </div>
);

export const About: React.FC = () => {
  return (
    <div className="space-y-6 text-center">
        <div className="bg-white p-6 rounded-xl shadow-md">
            <AppLogo />
            <p className="text-sm text-slate-500 mt-2">Version 1.0.0</p>
        </div>
      
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-slate-800 mb-2">About The App</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
                I-CARE is an AI-Powered Health Guidance application designed for sustainable living. Our mission is to provide accessible and personalized daily health advice, including reminders, lifestyle recommendations, and early warnings to promote proactive wellness. This project aligns with SDG 3 (Good Health and Well-being) by leveraging technology to make healthcare support more inclusive and effective.
            </p>
        </div>

         <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Contact & Support</h2>
            <p className="text-slate-600 text-sm">
                For questions or support, please contact:
                <br />
                <a href="mailto:andrew.jentai@example.com" className="text-slate-800 font-medium hover:underline">
                    andrew.jentai@example.com
                </a>
            </p>
        </div>

        <div className="text-xs text-slate-400">
            &copy; 2024 Andrew Jentai Anak Tony. All Rights Reserved.
        </div>
    </div>
  );
};
