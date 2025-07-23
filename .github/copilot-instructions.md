# Copilot Instructions - Golden Ear Dictation App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a **mobile-first Next.js dictation app** designed to help users improve listening and transcription skills in English, French, and Chinese. The app features CEFR level-based lessons, audio playback, and progress tracking.

## Tech Stack
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS v4** with shadcn/ui components
- **Supabase** for backend and authentication
- **OKLCH color system** for consistent theming
- **Lucide React** for icons
- **Mobile-first responsive design**

## Key Features
- Multi-language support (English, French, Chinese)
- CEFR level-based lesson organization (A1-C2)
- Audio playback with sentence-by-sentence transcription
- Progressive word reveal system
- Onboarding flow for language and level selection
- Bottom tab navigation (mobile only)
- Profile tracking with streaks and progress

## Design System Guidelines
- Use OKLCH color variables from `globals.css`
- Mobile-first responsive design principles
- Follow shadcn/ui component patterns
- Maintain consistent spacing with Tailwind CSS
- Use Inter font family
- Border radius: 1.275rem (--radius)
- Implement collage-style and sticker-style visual elements

## Code Structure
- `/src/app` - Next.js App Router pages
- `/src/screens` - Main screen components
- `/src/components` - Reusable UI components
- `/src/navigation` - Navigation components
- `/src/data` - Mock data and types
- `/src/lib` - Utilities and configurations

## Component Guidelines
- All components should be TypeScript with proper type definitions
- Use shadcn/ui components as base building blocks
- Implement responsive design with mobile-first approach
- Follow React best practices with hooks and state management
- Use Tailwind CSS for styling with custom OKLCH variables

## Audio Implementation
- Use HTML5 audio elements for web compatibility
- Implement progressive audio playback controls
- Support sentence-by-sentence audio segments
- Add audio loading states and error handling

## Data Structure
- Lessons organized by CEFR levels (A1-C2)
- Each lesson includes: title, category, level, audio_url, transcript
- User profiles with progress tracking
- Language preference storage
