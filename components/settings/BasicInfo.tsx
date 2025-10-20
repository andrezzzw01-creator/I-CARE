
import React, { useState, useMemo, useEffect } from 'react';
import { UserProfile } from '../../types';
import { getAIBMIAdvice } from '../../services/geminiService';

interface BasicInfoProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

const InfoRow: React.FC<{ label: string; value: string | number; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; name?: string }> = 
({ label, value, onChange, type = "text", name }) => (
    <div>
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <input 
            type={type} 
            name={name}
            value={value} 
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-white rounded-lg border border-stone-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
    </div>
);

const AIFeedback: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div>
            <h3 className="font-bold text-slate-700 text-sm mb-2">AI Health Guide</h3>
            <ul className="list-disc list-inside space-y-1">
                {content.split('\n').filter(line => line.trim().startsWith('*')).map((line, index) => (
                    <li key={index} className="text-slate-600 text-sm">{line.substring(line.indexOf('*') + 1).trim()}</li>
                ))}
            </ul>
        </div>
    );
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ profile, setProfile }) => {
  const [localProfile, setLocalProfile] = useState(profile);
  const [aiAdvice, setAiAdvice] = useState('Calculating advice...');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setLocalProfile(prev => ({ ...prev, [name]: value }));
  };

  const bmi = useMemo(() => {
    if (localProfile.height > 0 && localProfile.weight > 0) {
      const heightInMeters = localProfile.height / 100;
      return localProfile.weight / (heightInMeters * heightInMeters);
    }
    return 0;
  }, [localProfile.height, localProfile.weight]);

  const bmiCategory = useMemo(() => {
    if (bmi === 0) return { text: "N/A", color: "text-slate-500" };
    if (bmi < 18.5) return { text: "Underweight", color: "text-sky-500" };
    if (bmi < 24.9) return { text: "Healthy", color: "text-emerald-500" };
    if (bmi < 29.9) return { text: "Overweight", color: "text-amber-500" };
    return { text: "Obese", color: "text-red-500" };
  }, [bmi]);
  
  useEffect(() => {
      const fetchAdvice = async () => {
          if (bmi > 0) {
              setAiAdvice('Loading AI advice...');
              const advice = await getAIBMIAdvice(bmi, localProfile);
              setAiAdvice(advice);
          }
      };
      fetchAdvice();
  }, [bmi, localProfile]);

  const handleSaveChanges = () => {
    setProfile(localProfile);
    // In a real app, you would show a success toast here.
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
        <InfoRow label="Full Name" name="name" value={localProfile.name} onChange={handleInputChange} />
        <InfoRow label="Date of Birth" name="dob" type="date" value={localProfile.dob} onChange={handleInputChange} />
        <div>
            <label className="text-sm font-medium text-slate-600">Gender</label>
            <select name="gender" value={localProfile.gender} onChange={handleInputChange} className="w-full mt-1 px-3 py-2 bg-white rounded-lg border border-stone-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
            </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Height (cm)" name="height" type="number" value={localProfile.height} onChange={handleInputChange}/>
            <InfoRow label="Weight (kg)" name="weight" type="number" value={localProfile.weight} onChange={handleInputChange}/>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Your BMI Score</h2>
        <div className="text-center bg-stone-50 p-4 rounded-lg">
            <p className={`text-4xl font-bold ${bmiCategory.color}`}>{bmi.toFixed(1)}</p>
            <p className={`font-semibold ${bmiCategory.color}`}>{bmiCategory.text}</p>
        </div>
        <div className="mt-4">
           <AIFeedback content={aiAdvice} />
        </div>
      </div>
      
      <button 
        onClick={handleSaveChanges} 
        className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-300 shadow-lg"
      >
        Save Changes
      </button>
    </div>
  );
};
