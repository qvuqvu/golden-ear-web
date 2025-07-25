'use client';

import { Home, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomTabsProps {
  currentScreen: 'home' | 'profile';
  onNavigateHome?: () => void;
  onNavigateProfile?: () => void;
}

const tabs = [
  {
    name: 'Home',
    screen: 'home' as const,
    icon: Home,
  },
  {
    name: 'Profile',
    screen: 'profile' as const,
    icon: User,
  },
];

export function BottomTabs({ 
  currentScreen, 
  onNavigateHome, 
  onNavigateProfile 
}: BottomTabsProps) {
  const handleTabClick = (screen: 'home' | 'profile') => {
    if (screen === 'home' && onNavigateHome) {
      onNavigateHome();
    } else if (screen === 'profile' && onNavigateProfile) {
      onNavigateProfile();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border md:hidden z-50">
      <div className="flex items-center justify-around h-12 px-2">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.screen;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.screen)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-lg transition-colors",
                isActive 
                  ? "text-accent bg-accent/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 mb-0.5" /> 
              <span className="text-xs font-medium">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
