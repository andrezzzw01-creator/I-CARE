
export enum Page {
  Dashboard = 'DASHBOARD',
  Insights = 'INSIGHTS',
  Goals = 'GOALS',
  Settings = 'SETTINGS',
}

export enum SettingsPage {
    Main = 'MAIN',
    BasicInfo = 'BASIC_INFO',
    Lifestyle = 'LIFESTYLE',
    MedicalInfo = 'MEDICAL_INFO',
    DeviceCompanion = 'DEVICE_COMPANION',
    About = 'ABOUT',
}

export interface UserProfile {
    name: string;
    dob: string; // YYYY-MM-DD
    gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
    height: number; // in cm
    weight: number; // in kg
}

export interface HealthData {
  steps: number;
  calories: number;
  heartRate: number;
  sleepHours: number;
  healthScore: number;
}

export interface DailyHealthData extends HealthData {
  date: string;
}

export interface Goal {
  id: number;
  title: string;
  target: number;
  current: number;
  unit: string;
}
