"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Target,
  Brain,
  Award,
  Clock,
  Headphones,
  TrendingUp,
  Globe,
  Smartphone,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LandingPageProps {
  onStartTrial?: () => void;
}

export function LandingPage({ onStartTrial }: LandingPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  // Refs for GSAP animations
  const globeRef = useRef<HTMLDivElement>(null);
  const purpleRingRef = useRef<HTMLDivElement>(null);
  const globeImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const frenchCardRef = useRef<HTMLDivElement>(null);
  const englishCardRef = useRef<HTMLDivElement>(null);
  const chineseCardRef = useRef<HTMLDivElement>(null);
  const closingLineRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP animations
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set initial states to prevent flash of unstyled content
    gsap.set([globeRef.current, purpleRingRef.current, globeImageRef.current], {
      transformOrigin: "center center"
    });
    
    gsap.set([headlineRef.current, ctaRef.current, closingLineRef.current], {
      transformOrigin: "center center"
    });

    gsap.set([frenchCardRef.current, englishCardRef.current, chineseCardRef.current], {
      transformOrigin: "center center"
    });

    // Globe container animation - smoother with better performance
    gsap.fromTo(globeRef.current,
      {
        yPercent: 0,
        rotation: 0,
        scale: 0.9,
        opacity: 1,
        force3D: true
      },
      {
        yPercent: 20,
        rotation: 25,
        scale: 1.8,
        opacity: 0.8,
        ease: "none", // Use "none" for scrub animations
        force3D: true,
        scrollTrigger: {
          trigger: globeRef.current,
          start: "top 80%",
          end: "bottom+=100% center",
          scrub: 1.5, // Increased scrub value for smoother movement
          invalidateOnRefresh: true
        }
      }
    );

    // Purple ring animation (smoother)
    gsap.fromTo(purpleRingRef.current,
      {
        rotation: 0,
        scale: 0.8,
        force3D: true
      },
      {
        rotation: 120,
        scale: 2.2,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: purpleRingRef.current,
          start: "top center",
          end: "bottom+=100% center",
          scrub: 1.5,
          invalidateOnRefresh: true
        }
      }
    );

    // Globe image rotation and scale (smoother)
    gsap.fromTo(globeImageRef.current,
      {
        rotation: 0,
        scale: 1,
        force3D: true
      },
      {
        rotation: 60,
        scale: 2.2,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: globeImageRef.current,
          start: "top center",
          end: "bottom+=100% center",
          scrub: 1.5,
          invalidateOnRefresh: true
        }
      }
    );

    // Headline fade and move (smoother)
    gsap.fromTo(headlineRef.current, 
      {
        yPercent: 0,
        opacity: 1,
        force3D: true
      },
      {
        yPercent: -15,
        opacity: 0.3,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top",
          end: "bottom+=50% center",
          scrub: 2, // Slower for text elements
          invalidateOnRefresh: true
        }
      }
    );

    // CTA button animation (smoother)
    gsap.fromTo(ctaRef.current,
      {
        yPercent: 0,
        opacity: 1,
        force3D: true
      },
      {
        yPercent: -10,
        opacity: 0,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top center",
          end: "bottom+=80% center",
          scrub: 2,
          invalidateOnRefresh: true
        }
      }
    );

    // Meme cards animations - smoother with proper initial states
    gsap.fromTo(frenchCardRef.current,
      {
        xPercent: 0,
        yPercent: 0,
        rotation: -12,
        scale: 1,
        opacity: 1,
        force3D: true
      },
      {
        xPercent: -70,
        yPercent: 10,
        rotation: -35,
        scale: 1.4,
        opacity: 1,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: frenchCardRef.current,
          start: "top 80%",
          end: "bottom+=50% center",
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      }
    );

    gsap.fromTo(englishCardRef.current,
      {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        force3D: true
      },
      {
        yPercent: -25,
        scale: 1.6,
        opacity: 1,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: englishCardRef.current,
          start: "top 80%",
          end: "bottom+=50% center",
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      }
    );

    gsap.fromTo(chineseCardRef.current,
      {
        xPercent: 0,
        yPercent: 0,
        rotation: 12,
        scale: 1,
        opacity: 1,
        force3D: true
      },
      {
        xPercent: 70,
        yPercent: 15,
        rotation: 35,
        scale: 1.4,
        opacity: 1,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: chineseCardRef.current,
          start: "top 80%",
          end: "bottom+=50% center",
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      }
    );

    // Closing line animation (smoother)
    gsap.fromTo(closingLineRef.current,
      {
        yPercent: 0,
        opacity: 1,
        force3D: true
      },
      {
        yPercent: -8,
        opacity: 0.3,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: closingLineRef.current,
          start: "top center",
          end: "bottom+=100% center",
          scrub: 2,
          invalidateOnRefresh: true
        }
      }
    );

    // Refresh ScrollTrigger after everything is set up
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const languages = ["English", "French", "Chinese"];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleLogin = () => {
    // TODO: Implement login functionality
    console.log("Login clicked");
  };

  const handleSignUp = () => {
    // TODO: Implement sign up functionality
    console.log("Sign up clicked");
  };
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <Image
                src="/logo@3x.png"
                alt="Golden Ear Logo"
                width={36}
                height={36}
              />
              <div>
                <h1 className="text-xl font-bold text-primary">Golden Ear</h1>
                <p className="text-xs text-gray-500 leading-tight">
                  Listen. Dictate. Master Languages
                </p>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">{selectedLanguage}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language}
                      onClick={() => handleLanguageSelect(language)}
                      className={
                        selectedLanguage === language ? "bg-blue-50" : ""
                      }
                    >
                      {language}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Authentication Buttons */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogin}
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={handleSignUp}
                className=" hover:from-blue-600 hover:to-purple-700 text-white"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
        {/* Globe Background Illustration */}
        {/* Animated Globe Background with Purple Stroke */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div
            ref={globeRef}
            className="relative transition-transform duration-100 ease-out will-change-transform"
            style={{
              width: "24rem",
              height: "24rem",
            }}
          >
            {/* Purple stroke ring */}
            <div
              ref={purpleRingRef}
              className="absolute inset-0 rounded-full border-8 border-purple-300/60 animate-spin-slow transition-transform duration-100 ease-out will-change-transform"
              style={{
                boxShadow: "0 0 0 10px rgba(168, 85, 247, 0.15)",
              }}
              aria-hidden="true"
            />
            {/* Globe image */}
            <div ref={globeImageRef} className="relative w-full h-full">
              <Image
                src="/images/globe.png"
                alt="Globe"
                fill
                className="object-cover transition-transform duration-100 ease-out will-change-transform globe-zoom"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12 parallax-container">
          {/* Main Headline */}
          <div 
            ref={headlineRef}
            className="space-y-4 transition-all duration-100  will-change-transform"
          >
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold leading-tight">
              <span className="text-primary">
                You studied the word. <br /> Now it sounds like five words…
                <span className="text-foreground">
                  <br /> and an Adele interview.
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
              <span className="text-sidebar-primary font-bold">Golden Ear</span>{" "}
              – the game that bullies your ears into fluency.
            </p>
          </div>

          {/* CTA Button */}
          <div 
            ref={ctaRef}
            className="flex justify-center transition-all duration-100 ease-out will-change-transform"
          >
            <button
              onClick={onStartTrial}
              className="bg-[#FF6A3D] hover:bg-[#e55a35] text-white font-bold px-8 py-4 rounded-4xl text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Free Today
            </button>
          </div>

          {/* Meme Cards */}
          <div className="relative py-16">
            {/* Desktop Layout - Arc formation */}
            <div className="hidden md:flex items-center justify-center relative h-64">
              {/* French Card - Left */}
              <div 
                ref={frenchCardRef}
                className="absolute left-0 top-2.5 transform shadow-lg -rotate-12 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl aspect-[388/582] w-48 md:w-56 lg:w-64 overflow-hidden will-change-transform"
              >
                <Image
                  src="/images/french_meme.png"
                  alt="French language meme"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, 192px"
                />
              </div>
              {/* English Card - Center (Larger) */}
              <div 
                ref={englishCardRef}
                className="relative z-20 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-[467/514] w-56 md:w-64 lg:w-72 overflow-hidden will-change-transform"
              >
                <Image
                  src="/images/english_meme.png"
                  alt="English language meme"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, 224px"
                />
              </div>
              {/* Chinese Card - Right */}
              <div 
                ref={chineseCardRef}
                className="absolute right-0 top-8 transform rotate-12 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl aspect-[409/471] w-48 md:w-56 lg:w-64 overflow-hidden will-change-transform"
              >
                <Image
                  src="/images/chinese_meme.png"
                  alt="Chinese language meme"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, 192px"
                />
              </div>
            </div>

            {/* Mobile Layout - Vertical Stack */}
            <div className="md:hidden space-y-6">
              <div className="flex justify-center">
                <Image
                  src="/images/french_meme.png"
                  alt="French language meme"
                  width={256}
                  height={160}
                  className="object-cover rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                />
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/english_meme.png"
                  alt="English language meme"
                  width={288}
                  height={176}
                  className="object-cover rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
                />
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/chinese_meme.png"
                  alt="Chinese language meme"
                  width={256}
                  height={160}
                  className="object-cover rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Closing Line */}
          <div 
            ref={closingLineRef}
            className="space-y-4 transition-all duration-100 ease-out will-change-transform"
          >
            <p className="text-2xl font-bold md:text-xl text-gray-700 max-w-2xl mx-auto">
              And stop <em className="italic font-semibold">screaming</em> in{" "}
              <span className="text-accent font-semibold">English</span>,{" "}
              <span className="text-custom-orange font-semibold">French</span> or{" "}
              <span className="text-custom-blue font-semibold">Chinese</span> now
            </p>
          </div>
        </div>
      </section>

      {/* Why It Slaps Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold">
            ✨ Why Goldictate Slaps (and Actually Works)
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don&apos;t do boring flashcards or talking robots. We train your
            ears with real speech, real fast — so you stop guessing and start
            getting it.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              🎧 Our Secret Sauce
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-time Feedback */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  Live Feedback That Actually Helps
                </h3>
                <p className="text-gray-600">
                  Get instant word-by-word corrections as you type. No more
                  waiting until the end to find out you&apos;ve been spelling
                  everything wrong.
                </p>
              </CardContent>
            </Card>

            {/* CEFR Levels */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  CEFR Levels (A1 to C2)
                </h3>
                <p className="text-gray-600">
                  Start where you are, not where some algorithm thinks you
                  should be. Progressive difficulty that actually makes sense.
                </p>
              </CardContent>
            </Card>

            {/* Multi-language */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  English, French, Chinese
                </h3>
                <p className="text-gray-600">
                  Three languages, one app, zero confusion. Switch between
                  languages or focus on one — your choice.
                </p>
              </CardContent>
            </Card>

            {/* Progressive Hints */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  Smart Progressive Hints
                </h3>
                <p className="text-gray-600">
                  Stuck? Our AI reveals just enough to get you unstuck, not
                  spoil the whole answer. Like training wheels that actually
                  come off.
                </p>
              </CardContent>
            </Card>

            {/* Mobile First */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold">Mobile-First Design</h3>
                <p className="text-gray-600">
                  Practice anywhere, anytime. Designed for your phone but works
                  everywhere. No more excuses about not having time.
                </p>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  Progress That Makes Sense
                </h3>
                <p className="text-gray-600">
                  Track streaks, accuracy, and improvement over time. See your
                  progress in real data, not feel-good platitudes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">🧠 How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold">Choose Your Level</h3>
              <p className="text-gray-600">
                {" "}
                Pick your language and CEFR level. Don&apos;t know your level?
                Take our quick assessment and we&apos;ll place you perfectly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold">Listen & Type</h3>
              <p className="text-gray-600">
                Listen to real speech and type what you hear. Get instant
                feedback on every word as you go.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold">Level Up</h3>
              <p className="text-gray-600">
                Master each lesson, build streaks, and watch your listening
                skills improve faster than you thought possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              🧪 Why It Works (Like, Science Stuff)
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Active Listening */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Headphones className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Active Listening Training
                </h3>
                <p className="text-gray-600">
                  Research shows that active transcription improves listening
                  comprehension by 40% compared to passive listening.
                  You&apos;re not just hearing — you&apos;re processing.
                </p>
              </div>
            </div>

            {/* Immediate Feedback */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Immediate Error Correction
                </h3>
                <p className="text-gray-600">
                  Studies prove that immediate feedback prevents error
                  fossilization. Fix mistakes as they happen, not after
                  they&apos;re already habits.
                </p>
              </div>
            </div>

            {/* Spaced Repetition */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Progressive Difficulty
                </h3>
                <p className="text-gray-600">
                  CEFR-aligned content ensures you&apos;re always challenged but
                  never overwhelmed. The sweet spot for optimal learning.
                </p>
              </div>
            </div>

            {/* Metacognition */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Metacognitive Awareness
                </h3>
                <p className="text-gray-600">
                  Real-time progress tracking builds metacognition — awareness
                  of your own learning. Know what you know (and what you
                  don&apos;t).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            🔥 Ready to Stop Guessing and Start Understanding?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of learners who gave up on slow apps and finally
            started getting it.
          </p>

          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl font-semibold"
            onClick={onStartTrial}
          >
            👉 Start Your Dictation Era Now
          </Button>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/20"
            >
              ✨ Free to try
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/20"
            >
              No credit card
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/20"
            >
              No BS
            </Badge>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Product Column */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-blue-600 transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#why-it-works"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Why it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#final-cta"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Start Free
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <span className="text-sm font-bold">T</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
                >
                  <span className="text-sm font-bold">I</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                >
                  <span className="text-sm font-bold">Y</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2025 Golden Ear. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
