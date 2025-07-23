"use client";

import { ReactNode } from "react";
import { TopNavigation } from "@/navigation/TopNavigation";
import { BottomTabs } from "@/navigation/BottomTabs";
import { Language, CEFRLevel } from "@/data/mockLessons";

interface NavigationLayoutProps {
  children: ReactNode;
  currentScreen: "onboarding" | "home" | "dictation" | "profile";
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
  const showBottomTabs =
    showNavigation && (currentScreen === "home" || currentScreen === "profile");
  const showTopNav = showNavigation && currentScreen !== "onboarding";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Desktop/Web Top Navigation */}
      {showTopNav && (
        <TopNavigation
          selectedLanguage={selectedLanguage}
          selectedLevel={selectedLevel}
          onShowOnboarding={onShowOnboarding}
          currentScreen={currentScreen}
          onNavigateProfile={onNavigateProfile}
          onBack={onBack}
          lessonTitle={lessonTitle}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 ${showBottomTabs ? "pb-16 md:pb-0" : ""}`}>
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      {showBottomTabs && (
        <BottomTabs
          currentScreen={currentScreen}
          onNavigateProfile={onNavigateProfile}
          onNavigateHome={onNavigateHome} // Assuming home navigation is handled by profile navigation
          onShowOnboarding={onShowOnboarding}
        />
      )}
    </div>
  );
}
