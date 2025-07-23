'use client';

import { mockUserProfile } from '@/data/mockLessons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { User, Calendar, Target, Trophy, Settings, Globe, Volume2 } from 'lucide-react';

interface ProfileScreenProps {
  selectedLanguage: string;
  selectedLevel: string;
  onShowOnboarding: () => void;
}

export function ProfileScreen({ selectedLanguage, selectedLevel, onShowOnboarding }: ProfileScreenProps) {
  const profile = mockUserProfile;

  // Calculate progress based on current level
  const levelProgress = {
    A1: 16.7,
    A2: 33.3,
    B1: 50,
    B2: 66.7,
    C1: 83.3,
    C2: 100,
  };

  const currentProgress = levelProgress[selectedLevel as keyof typeof levelProgress] || 0;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Mobile-only Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-10 md:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedLanguage}</Badge>
                  <Badge variant="outline">{selectedLevel}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily Streak */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                Daily Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{profile.dailyStreak}</p>
                <p className="text-xs text-muted-foreground">days in a row</p>
              </div>
            </CardContent>
          </Card>

          {/* Lessons Completed */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                Lessons Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{profile.totalLessonsCompleted}</p>
                <p className="text-xs text-muted-foreground">total lessons</p>
              </div>
            </CardContent>
          </Card>

          {/* Level Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-foreground">{Math.round(currentProgress)}%</p>
                <Progress value={currentProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">to next level</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={onShowOnboarding}
              >
                <Globe className="w-4 h-4 mr-2" />
                Change Language & Level
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Volume2 className="w-4 h-4 mr-2" />
                Audio Settings
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                App Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profile.dailyStreak >= 5 && (
                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">5-Day Streak!</p>
                    <p className="text-sm text-muted-foreground">Keep up the great work</p>
                  </div>
                </div>
              )}
              
              {profile.totalLessonsCompleted >= 10 && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Dedicated Learner</p>
                    <p className="text-sm text-muted-foreground">Completed 10+ lessons</p>
                  </div>
                </div>
              )}
              
              {profile.dailyStreak === 0 && profile.totalLessonsCompleted < 5 && (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Complete lessons to earn achievements!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
