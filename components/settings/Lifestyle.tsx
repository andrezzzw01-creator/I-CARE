
import React from 'react';

const LifestyleQuestion: React.FC<{ question: string; options: string[]; name: string; }> = ({ question, options, name }) => (
    <div>
        <label className="text-sm font-medium text-slate-600">{question}</label>
        <select name={name} className="w-full mt-1 px-3 py-2 bg-white rounded-lg border border-stone-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500">
            {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
    </div>
);

export const Lifestyle: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Your Daily Life</h2>
        <LifestyleQuestion 
            question="Which of these best describes you?"
            name="role"
            options={["Student", "Working Professional (Desk Job)", "Working Professional (Active Job)", "Homemaker", "Retired", "Other"]}
        />
        <LifestyleQuestion 
            question="How would you describe your weekly exercise level?"
            name="exercise"
            options={["Sedentary (little to no exercise)", "Lightly Active (1-2 days/week)", "Moderately Active (3-4 days/week)", "Very Active (5+ days/week)"]}
        />
         <LifestyleQuestion 
            question="On average, how many hours do you sleep per night?"
            name="sleep"
            options={["Less than 5 hours", "5-6 hours", "7-8 hours", "More than 8 hours"]}
        />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Daily Schedule</h2>
        <p className="text-sm text-slate-500">Plan your meals, workouts, and reminders here. (Feature coming soon)</p>
        <div className="mt-4 h-48 bg-stone-100 rounded-lg flex items-center justify-center">
            <p className="text-slate-400">Scheduler Placeholder</p>
        </div>
      </div>

       <button className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-300 shadow-lg">
        Save Lifestyle Info
      </button>
    </div>
  );
};
