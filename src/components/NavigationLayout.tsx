"use client";

import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TopNavigation } from "@/navigation/TopNavigation";
import { BottomTabs } from "@/navigation/BottomTabs";
import { Language, CEFRLevel } from "@/data/mockLessons";

interface NavigationLayoutProps {
  children: ReactNode;
  currentScreen?: "onboarding" | "home" | "dictation" | "profile";
  selectedLanguage?: Language;
  selectedLevel?: CEFRLevel;
  onShowOnboarding?: () => void;
  onNavigateProfile?: () => void;
  onNavigateHome?: () => void;
  onBack?: () => void;
  lessonTitle?: string;
  showNavigation?: boolean;
}

export function NavigationLayout({
  children,
  currentScreen,
  selectedLanguage = "English",
  selectedLevel = "A1",
  onShowOnboarding,
  onNavigateProfile,
  onNavigateHome,
  onBack,
  lessonTitle,
  showNavigation = true,
}: NavigationLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine current screen from pathname if not explicitly provided
  const actualCurrentScreen = currentScreen || (() => {
    if (pathname === '/profile') return 'profile';
    if (pathname === '/lessons') return 'home';
    if (pathname.startsWith('/lesson/')) return 'dictation';
    if (pathname.startsWith('/dictation')) return 'dictation';
    if (pathname === '/onboarding') return 'onboarding';
    return 'home';
  })();

  // Navigation handlers using Next.js router
  const handleNavigateProfile = () => {
    router.push('/profile');
  };

  const handleNavigateHome = () => {
    router.push('/lessons');
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const showBottomTabs =
    showNavigation && (actualCurrentScreen === "home" || actualCurrentScreen === "profile");
  const showTopNav = showNavigation && actualCurrentScreen !== "onboarding";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Desktop/Web Top Navigation */}
      {showTopNav && (
        <TopNavigation
          selectedLanguage={selectedLanguage}
          selectedLevel={selectedLevel}
          onShowOnboarding={onShowOnboarding}
          currentScreen={actualCurrentScreen}
          onNavigateProfile={onNavigateProfile || handleNavigateProfile}
          onNavigateHome={onNavigateHome || handleNavigateHome}
          onBack={onBack || (actualCurrentScreen === 'profile' ? handleBack : undefined)}
          lessonTitle={lessonTitle}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 ${showBottomTabs ? "pb-12 md:pb-0" : ""}`}>
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      {showBottomTabs && (
        <BottomTabs
          currentScreen={actualCurrentScreen}
          onNavigateProfile={onNavigateProfile || handleNavigateProfile}
          onNavigateHome={onNavigateHome || handleNavigateHome}
        />
      )}
    </div>
  );
}
