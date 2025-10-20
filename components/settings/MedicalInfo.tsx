
import React from 'react';

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="font-bold text-slate-700 text-md mb-2">{title}</h3>
        <div className="space-y-3">{children}</div>
    </div>
);

const TextAreaInput: React.FC<{ label: string; placeholder: string; name: string; }> = ({ label, placeholder, name }) => (
    <div>
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <textarea
            name={name}
            rows={3}
            placeholder={placeholder}
            className="w-full mt-1 px-3 py-2 bg-white rounded-lg border border-stone-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
        ></textarea>
    </div>
);

export const MedicalInfo: React.FC = () => {
  return (
    <div className="space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-md space-y-6">
            <FormSection title="Allergies">
                <TextAreaInput name="allergies" label="Do you have any allergies?" placeholder="e.g., Peanuts, Penicillin, Pollen" />
            </FormSection>

            <FormSection title="Past Medical History">
                <TextAreaInput name="history" label="Please list any significant past illnesses or surgeries." placeholder="e.g., Appendectomy (2015), Chickenpox (2005)" />
            </FormSection>

            <FormSection title="Current Medications">
                <TextAreaInput name="medications" label="Please list any medications or supplements you are currently taking." placeholder="e.g., Vitamin D (1000 IU, daily), Ibuprofen (as needed)" />
            </FormSection>

            <FormSection title="Lifestyle & Social History">
                 <TextAreaInput name="social" label="Do you use tobacco, alcohol, or recreational drugs?" placeholder="e.g., Non-smoker, Social drinker" />
            </FormSection>

            <FormSection title="Legal & Consent">
                <div className="flex items-start space-x-3">
                    <input type="checkbox" id="consent" className="mt-1 h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-500" />
                    <label htmlFor="consent" className="text-sm text-slate-600">
                        I authorize this application to use my health data to provide personalized recommendations and consent to the terms of service.
                    </label>
                </div>
            </FormSection>
        </div>

        <button className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-300 shadow-lg">
            Save Medical Info
        </button>
    </div>
  );
};
