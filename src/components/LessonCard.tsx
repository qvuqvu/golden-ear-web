'use client';

import { Lesson } from '@/data/mockLessons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Volume2 } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  onClick: () => void;
}

export function LessonCard({ lesson, onClick }: LessonCardProps) {
  const getBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'default';
      case 'Medium':
        return 'secondary';
      case 'Hard':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] bg-card border-border"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-card-foreground line-clamp-2">
                {lesson.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {lesson.category}
              </p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full ml-3">
              <Play className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Badges and Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {lesson.level}
              </Badge>
              {lesson.difficulty_badge && (
                <Badge variant={getBadgeVariant(lesson.difficulty_badge)} className="text-xs">
                  {lesson.difficulty_badge}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {lesson.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{lesson.duration}s</span>
                </div>
              )}
              <Volume2 className="w-3 h-3" />
            </div>
          </div>

          {/* Language indicator */}
          <div className="pt-2 border-t border-border">
            <span className="text-xs font-medium text-muted-foreground">
              {lesson.language}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
