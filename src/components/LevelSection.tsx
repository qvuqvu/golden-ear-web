'use client';

import { CEFRLevel, Lesson } from '@/data/mockLessons';
import { LessonCard } from './LessonCard';

interface LevelSectionProps {
  level: CEFRLevel;
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
}

const levelColors = {
  A1: 'bg-green-100 text-green-800 border-green-200',
  A2: 'bg-blue-100 text-blue-800 border-blue-200',
  B1: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  B2: 'bg-orange-100 text-orange-800 border-orange-200',
  C1: 'bg-red-100 text-red-800 border-red-200',
  C2: 'bg-purple-100 text-purple-800 border-purple-200',
};

const levelDescriptions = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Proficient',
};

export function LevelSection({ level, lessons, onLessonClick }: LevelSectionProps) {
  if (lessons.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Level Header */}
      <div className="flex items-center gap-3">
        <div className={`px-3 py-1 rounded-lg border font-bold text-sm ${levelColors[level]}`}>
          {level}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{levelDescriptions[level]}</h2>
          <p className="text-sm text-muted-foreground">{lessons.length} lessons available</p>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onClick={() => onLessonClick(lesson)}
          />
        ))}
      </div>
    </div>
  );
}
