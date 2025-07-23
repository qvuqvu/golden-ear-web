'use client';

import { User, Globe, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TopNavigationProps {
  selectedLanguage?: string;
  selectedLevel?: string;
  onShowOnboarding?: () => void;
  currentScreen?: 'onboarding' | 'home' | 'dictation' | 'profile';
  onNavigateProfile?: () => void;
  onBack?: () => void;
  lessonTitle?: string;
}

export function TopNavigation({ 
  selectedLanguage = 'English', 
  selectedLevel = 'A1',
  onShowOnboarding,
  currentScreen = 'home',
  onNavigateProfile,
  onBack,
  lessonTitle
}: TopNavigationProps) {
  return (
    <nav className="hidden md:block sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">GE</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Golden Ear</h1>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>Learning {selectedLanguage}</span>
                  <span>•</span>
                  <span>Level {selectedLevel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Content - Lesson title for dictation screen */}
          {currentScreen === 'dictation' && lessonTitle && (
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden lg:inline">Back</span>
                </Button>
              )}
              <div className="flex items-center">
                <h2 className="font-semibold text-foreground truncate max-w-md">
                  {lessonTitle}
                </h2>
              </div>
            </div>
          )}

          {/* Right Side - Profile, Language Change, and Settings */}
          <div className="flex items-center space-x-2">
            {/* Profile Button */}
            {currentScreen !== 'dictation' && (
              <Button
                variant={currentScreen === 'profile' ? "default" : "ghost"}
                size="sm"
                onClick={onNavigateProfile}
                className={cn(
                  "flex items-center space-x-2",
                  currentScreen === 'profile' && "bg-primary text-primary-foreground"
                )}
              >
                <User className="w-4 h-4" />
                <span className="hidden lg:inline">Profile</span>
              </Button>
            )}

            {/* Language Change Button */}
            {onShowOnboarding && currentScreen !== 'dictation' && (
              <Button
                variant="outline"
                size="sm"
                onClick={onShowOnboarding}
                className="flex items-center space-x-1"
              >
                <Globe className="w-3 h-3" />
                <span className="hidden lg:inline">Change Language</span>
                <span className="lg:hidden">Change</span>
              </Button>
            )}
            
            {/* Settings Button */}
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
