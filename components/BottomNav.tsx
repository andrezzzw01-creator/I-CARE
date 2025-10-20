
import React from 'react';
import { Page } from '../types';
import { HomeIcon, ChartBarIcon, CheckCircleIcon, Cog6ToothIcon } from './icons';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
    const activeClass = isActive ? 'text-slate-800' : 'text-slate-400';
    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${activeClass} hover:text-slate-600`}>
            {icon}
            <span className={`text-xs mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
        </button>
    );
};

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { page: Page.Dashboard, label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
    { page: Page.Insights, label: 'Insights', icon: <ChartBarIcon className="w-6 h-6" /> },
    { page: Page.Goals, label: 'Goals', icon: <CheckCircleIcon className="w-6 h-6" /> },
    { page: Page.Settings, label: 'Settings', icon: <Cog6ToothIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-t border-stone-200 shadow-t-lg">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map(item => (
          <NavItem 
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activePage === item.page}
            onClick={() => setActivePage(item.page)}
          />
        ))}
      </div>
    </div>
  );
};
