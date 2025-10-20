
import React, { useState } from 'react';
import { Page, Goal, SettingsPage, UserProfile } from './types';
import { useHealthData } from './hooks/useHealthData';

import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { Insights } from './components/Insights';
import { Goals } from './components/Goals';
import { Settings } from './components/Settings';

import { SettingsPageWrapper } from './components/settings/SettingsPageWrapper';
import { BasicInfo } from './components/settings/BasicInfo';
import { Lifestyle } from './components/settings/Lifestyle';
import { MedicalInfo } from './components/settings/MedicalInfo';
import { DeviceCompanion } from './components/settings/DeviceCompanion';
import { About } from './components/settings/About';


export default function App() {
  const [appState, setAppState] = useState<'splash' | 'login' | 'main'>('splash');
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);
  const [activeSettingsPage, setActiveSettingsPage] = useState<SettingsPage>(SettingsPage.Main);
  
  const { currentData, history } = useHealthData();
  
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: "Daily Steps", target: 10000, current: currentData.steps, unit: 'steps' },
    { id: 2, title: "Plant-Based Meals", target: 5, current: 3, unit: 'meals this week' },
    { id: 3, title: "Daily Sleep", target: 8, current: currentData.sleepHours, unit: 'hr' },
  ]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Andrew Jentai",
    dob: "1998-07-15",
    gender: "Male",
    height: 175,
    weight: 72,
  });

  const handleGetStarted = () => setAppState('login');
  const handleLogin = () => setAppState('main');

  const renderSettingsPage = () => {
      const pageMap = {
          [SettingsPage.BasicInfo]: { title: "Basic Information", component: <BasicInfo profile={userProfile} setProfile={setUserProfile} /> },
          [SettingsPage.Lifestyle]: { title: "Lifestyle", component: <Lifestyle /> },
          [SettingsPage.MedicalInfo]: { title: "Medical Information", component: <MedicalInfo /> },
          [SettingsPage.DeviceCompanion]: { title: "Device Companion", component: <DeviceCompanion /> },
          [SettingsPage.About]: { title: "About", component: <About /> },
      };

      if (activeSettingsPage === SettingsPage.Main) {
          return <Settings setActiveSettingsPage={setActiveSettingsPage} />;
      }
      
      const { title, component } = pageMap[activeSettingsPage];
      
      return (
          <SettingsPageWrapper title={title} onBack={() => setActiveSettingsPage(SettingsPage.Main)}>
              {component}
          </SettingsPageWrapper>
      );
  };

  const renderPage = () => {
    switch (activePage) {
      case Page.Dashboard:
        return <Dashboard healthData={currentData} livingGoal={goals[1]} setActivePage={setActivePage} />;
      case Page.Insights:
        return <Insights history={history} />;
      case Page.Goals:
        return <Goals goals={goals} setGoals={setGoals} healthData={currentData} />;
      case Page.Settings:
        return renderSettingsPage();
      default:
        return <Dashboard healthData={currentData} livingGoal={goals[1]} setActivePage={setActivePage} />;
    }
  };

  if (appState === 'splash') {
    return <SplashScreen onGetStarted={handleGetStarted} />;
  }

  if (appState === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }
  
  return (
    <div className="bg-stone-100 min-h-screen font-sans">
      <main className="max-w-md mx-auto bg-stone-100">
        {renderPage()}
      </main>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}
