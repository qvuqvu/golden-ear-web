export interface Lesson {
  id: string;
  slug?: string;
  title: string;
  category: string;
  level: CEFRLevel;
  language: Language;
  audio_url: string;
  transcript: string;
  duration?: number; // in seconds
  difficulty_badge?: 'Easy' | 'Medium' | 'Hard';
}

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type Language = 'English' | 'French' | 'Chinese';

// Helper function to generate slug from title
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and dashes
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .trim();
};

// Helper function to get lesson slug
export const getLessonSlug = (lesson: Lesson): string => {
  return lesson.slug || createSlug(lesson.title);
};

// Helper function to find lesson by slug
export const findLessonBySlug = (slug: string): Lesson | undefined => {
  return mockLessons.find(lesson => 
    getLessonSlug(lesson) === slug || lesson.id === slug
  );
};

export interface UserProfile {
  id: string;
  name: string;
  selectedLanguage: Language;
  currentLevel: CEFRLevel;
  dailyStreak: number;
  totalLessonsCompleted: number;
  createdAt: string;
}

export interface LessonProgress {
  lessonId: string;
  userId: string;
  completed: boolean;
  accuracy: number; // percentage
  timeSpent: number; // in seconds
  attempts: number;
  lastAttemptAt: string;
}

export const mockLessons: Lesson[] = [
  // A1 Lessons
  {
    id: '1',
    title: 'Counting 1–10',
    category: 'Numbers',
    level: 'A1',
    language: 'English',
    audio_url: 'https://example.com/audio1.mp3',
    transcript: 'One two three four five six seven eight nine ten',
    duration: 15,
    difficulty_badge: 'Easy',
  },
  {
    id: '2',
    title: 'Formal Greetings',
    category: 'Greetings',
    level: 'A1',
    language: 'English',
    audio_url: 'https://example.com/audio2.mp3',
    transcript: 'Good morning. How are you? I am fine, thank you.',
    duration: 20,
    difficulty_badge: 'Easy',
  },
  {
    id: '3',
    title: 'Colors and Shapes',
    category: 'Vocabulary',
    level: 'A1',
    language: 'English',
    audio_url: 'https://example.com/audio3.mp3',
    transcript: 'The ball is red. The box is blue. The star is yellow.',
    duration: 18,
    difficulty_badge: 'Easy',
  },
  
  // A2 Lessons
  {
    id: '4',
    title: 'Daily Routine',
    category: 'Daily Life',
    level: 'A2',
    language: 'English',
    audio_url: 'https://example.com/audio4.mp3',
    transcript: 'I wake up at seven o\'clock. I brush my teeth and have breakfast.',
    duration: 25,
    difficulty_badge: 'Easy',
  },
  {
    id: '5',
    title: 'Shopping for Food',
    category: 'Shopping',
    level: 'A2',
    language: 'English',
    audio_url: 'https://example.com/audio5.mp3',
    transcript: 'I need to buy some milk, bread, and apples from the supermarket.',
    duration: 22,
    difficulty_badge: 'Medium',
  },

  // B1 Lessons
  {
    id: '6',
    title: 'Travel Plans',
    category: 'Travel',
    level: 'B1',
    language: 'English',
    audio_url: 'https://example.com/audio6.mp3',
    transcript: 'We are planning to visit Paris next summer. We will stay there for a week.',
    duration: 30,
    difficulty_badge: 'Medium',
  },
  {
    id: '7',
    title: 'Job Interview',
    category: 'Work',
    level: 'B1',
    language: 'English',
    audio_url: 'https://example.com/audio7.mp3',
    transcript: 'Tell me about your previous experience and why you want this position.',
    duration: 35,
    difficulty_badge: 'Medium',
  },

  // B2 Lessons
  {
    id: '8',
    title: 'Environmental Issues',
    category: 'Environment',
    level: 'B2',
    language: 'English',
    audio_url: 'https://example.com/audio8.mp3',
    transcript: 'Climate change is affecting our planet in numerous ways. We must take action now.',
    duration: 40,
    difficulty_badge: 'Hard',
  },
  {
    id: '9',
    title: 'Technology and Society',
    category: 'Technology',
    level: 'B2',
    language: 'English',
    audio_url: 'https://example.com/audio9.mp3',
    transcript: 'Social media has transformed how we communicate and share information globally.',
    duration: 45,
    difficulty_badge: 'Hard',
  },

  // C1 Lessons
  {
    id: '10',
    title: 'Academic Lecture',
    category: 'Education',
    level: 'C1',
    language: 'English',
    audio_url: 'https://example.com/audio10.mp3',
    transcript: 'The theoretical framework we discussed demonstrates the complexity of human cognition.',
    duration: 50,
    difficulty_badge: 'Hard',
  },

  // C2 Lessons
  {
    id: '11',
    title: 'Legal Documents',
    category: 'Legal',
    level: 'C2',
    language: 'English',
    audio_url: 'https://example.com/audio11.mp3',
    transcript: 'The aforementioned clauses shall be interpreted in accordance with applicable legislation.',
    duration: 55,
    difficulty_badge: 'Hard',
  },

  // French Lessons
  {
    id: '12',
    title: 'Compter de 1 à 10',
    category: 'Nombres',
    level: 'A1',
    language: 'French',
    audio_url: 'https://example.com/audio12.mp3',
    transcript: 'Un deux trois quatre cinq six sept huit neuf dix',
    duration: 15,
    difficulty_badge: 'Easy',
  },
  {
    id: '13',
    title: 'Salutations formelles',
    category: 'Salutations',
    level: 'A1',
    language: 'French',
    audio_url: 'https://example.com/audio13.mp3',
    transcript: 'Bonjour. Comment allez-vous? Je vais bien, merci.',
    duration: 20,
    difficulty_badge: 'Easy',
  },

  // Chinese Lessons
  {
    id: '14',
    title: '数字1到10',
    category: '数字',
    level: 'A1',
    language: 'Chinese',
    audio_url: 'https://example.com/audio14.mp3',
    transcript: '一 二 三 四 五 六 七 八 九 十',
    duration: 15,
    difficulty_badge: 'Easy',
  },
  {
    id: '15',
    title: '正式问候',
    category: '问候',
    level: 'A1',
    language: 'Chinese',
    audio_url: 'https://example.com/audio15.mp3',
    transcript: '你好。你好吗？我很好，谢谢。',
    duration: 20,
    difficulty_badge: 'Easy',
  },
];

export const mockUserProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  selectedLanguage: 'English',
  currentLevel: 'A2',
  dailyStreak: 5,
  totalLessonsCompleted: 12,
  createdAt: '2024-01-15T10:00:00Z',
};
