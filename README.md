# Golden Ear - Daily Dictation App

A **mobile-first Next.js dictation app** designed to help users improve listening and transcription skills in English, French, and Chinese. The app features CEFR level-based lessons, audio playback, and progress tracking.

## ✨ Features

- 🌍 **Multi-language support** - English, French, and Chinese
- 📊 **CEFR level organization** - Lessons from A1 to C2
- 🎵 **Audio playback** - Sentence-by-sentence transcription practice
- 💡 **Progressive hints** - Word reveal system for learning
- 🚀 **Onboarding flow** - Language and level selection
- 📱 **Mobile-first design** - Responsive with bottom tab navigation
- 📈 **Progress tracking** - Streaks, accuracy, and achievements

## 🛠 Tech Stack

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS v4** with shadcn/ui components
- **Supabase** ready for backend integration
- **OKLCH color system** for consistent theming
- **Lucide React** for icons
- **Mobile-first responsive design**

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd golden-ear-fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Usage

1. **Onboarding**: Choose your language (English, French, Chinese) and CEFR level (A1-C2)
2. **Home Screen**: Browse lessons organized by difficulty level
3. **Dictation Practice**: 
   - Listen to audio clips
   - Type what you hear
   - Get progressive hints if needed
   - Track your accuracy and progress
4. **Profile**: View your stats, streaks, and achievements

## 🏗 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout with Inter font
│   ├── page.tsx        # Main app router and screen management
│   └── globals.css     # OKLCH color theme and styles
├── screens/            # Main screen components
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   ├── DictationScreen.tsx
│   └── ProfileScreen.tsx
├── components/         # Reusable UI components
│   ├── LanguageSelector.tsx
│   ├── LessonCard.tsx
│   ├── LevelSection.tsx
│   └── ui/            # shadcn/ui components
├── navigation/         # Navigation components
│   └── BottomTabs.tsx
├── data/              # Mock data and types
│   └── mockLessons.ts
└── lib/               # Utilities
    └── utils.ts
```

## 🎨 Design System

- **Colors**: OKLCH color system with light/dark mode support
- **Typography**: Inter font family
- **Spacing**: Consistent spacing with Tailwind CSS
- **Border Radius**: 1.275rem (--radius)
- **Components**: shadcn/ui component library
- **Mobile-first**: Responsive design for all screen sizes

## 🎯 Lesson Structure

Lessons are organized by:
- **Language**: English, French, Chinese
- **CEFR Level**: A1 (Beginner) to C2 (Proficient)
- **Category**: Numbers, Greetings, Travel, etc.
- **Difficulty**: Easy, Medium, Hard

Each lesson includes:
- Audio URL (placeholder)
- Transcript for validation
- Duration and difficulty metadata

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Future Enhancements

- [ ] Supabase integration for user data
- [ ] Real audio file integration
- [ ] Speech recognition for pronunciation
- [ ] Offline mode support
- [ ] Social features and leaderboards
- [ ] Advanced analytics and insights

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
