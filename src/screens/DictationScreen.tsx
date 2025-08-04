'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Lesson } from '@/data/mockLessons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight,
  Volume2, 
  CheckCircle, 
  XCircle,
  MoreVertical,
  AlertCircle,
  Zap,
  ZapOff,
  FileText,
  Edit3
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DictationScreenProps {
  lesson: Lesson;
  onBack: () => void;
}

interface WordStatus {
  word: string;
  status: 'correct' | 'incorrect' | 'current' | 'pending';
  userInput?: string;
}

type TabType = 'dictation' | 'transcript';

export function DictationScreen({ lesson, onBack }: DictationScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dictation');
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorWordIndex, setErrorWordIndex] = useState<number | null>(null);
  const [isLiveFeedbackEnabled, setIsLiveFeedbackEnabled] = useState(true);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const audioSettings = {
    autoReplay: false,
    playbackSpeed: 1,
    delay: 1000,
  };

  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Split transcript into words for progressive reveal
  const words = lesson.transcript.split(' ');
  
  // Split transcript into sentences for Full Transcript mode
  const sentences = useMemo(() => {
    return lesson.transcript
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map((sentence, index) => ({
        id: index,
        text: sentence + (index < lesson.transcript.split(/[.!?]+/).length - 1 ? '.' : ''),
        startTime: index * 3, // Mock timing - 3 seconds per sentence
        endTime: (index + 1) * 3,
      }));
  }, [lesson.transcript]);
  
  // Real-time word analysis
  const wordAnalysis = useMemo(() => {
    const userWords = userInput.trim().split(/\s+/).filter(word => word.length > 0);
    const analysis: WordStatus[] = [];
    
    let firstErrorIndex: number | null = null;
    
    words.forEach((correctWord, index) => {
      const userWord = userWords[index];
      
      if (!userWord) {
        // No user input for this word yet
        analysis.push({
          word: correctWord,
          status: index === userWords.length ? 'current' : 'pending'
        });
      } else {
        // Compare user input with correct word (case-insensitive)
        const isMatch = userWord.toLowerCase() === correctWord.toLowerCase();
        
        if (isMatch) {
          analysis.push({
            word: correctWord,
            status: 'correct',
            userInput: userWord
          });
        } else {
          analysis.push({
            word: correctWord,
            status: 'incorrect',
            userInput: userWord
          });
          
          // Mark first error for cursor positioning
          if (firstErrorIndex === null) {
            firstErrorIndex = index;
          }
        }
      }
    });
    
    return { analysis, firstErrorIndex };
  }, [userInput, words]);

  // Update error tracking when word analysis changes (only if live feedback is enabled)
  useEffect(() => {
    if (isLiveFeedbackEnabled) {
      setErrorWordIndex(wordAnalysis.firstErrorIndex);
    } else {
      setErrorWordIndex(null);
    }
  }, [wordAnalysis.firstErrorIndex, isLiveFeedbackEnabled]);

  const handleSubmit = useCallback(() => {
    const normalizedInput = userInput.toLowerCase().trim();
    const normalizedTranscript = lesson.transcript.toLowerCase().trim();
    
    setAttempts(prev => prev + 1);
    setShowResult(true);
    
    const correct = normalizedInput === normalizedTranscript;
    setIsCorrect(correct);
    
    if (!correct) {
      // After showing result, move cursor to the end of the first incorrect word
      const firstError = wordAnalysis.firstErrorIndex;
      if (firstError !== null && inputRef.current) {
        setTimeout(() => {
          if (inputRef.current) {
            const wordsBeforeError = userInput.trim().split(/\s+/).slice(0, firstError);
            const wordAtError = userInput.trim().split(/\s+/)[firstError] || '';
            // Position cursor at the end of the incorrect word
            const cursorPosition = wordsBeforeError.join(' ').length + 
              (wordsBeforeError.length > 0 ? 1 : 0) + 
              wordAtError.length;
            
            inputRef.current.focus();
            inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
          }
        }, 200);
      }
      
      // Reveal some words as hints - removed as hints section is removed
    }
  }, [userInput, lesson.transcript, wordAnalysis.firstErrorIndex]);

  // Focus management for error correction (only in live feedback mode)
  useEffect(() => {
    // Remove automatic cursor movement during typing - only highlight errors
    // Cursor will only move when user submits (Enter or Check Answer)
  }, [errorWordIndex, userInput, isLiveFeedbackEnabled]);

  // Keyboard shortcuts for Enter key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.target instanceof HTMLInputElement && userInput.trim() && !showResult) {
        e.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [userInput, showResult, handleSubmit]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setAttempts(0);
    setShowResult(false);
    setIsCorrect(false);
    setErrorWordIndex(null);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setUserInput('');
    setErrorWordIndex(null);
  };

  const toggleLiveFeedback = () => {
    setIsLiveFeedbackEnabled(!isLiveFeedbackEnabled);
    // Reset error tracking when toggling
    if (!isLiveFeedbackEnabled) {
      setErrorWordIndex(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    
    // Reset result when user continues typing
    if (showResult) {
      setShowResult(false);
    }
  };

  // Full Transcript navigation functions
  const handlePreviousSentence = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    }
  };

  const handleNextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    }
  };

  const handlePlaySentence = (index: number) => {
    setCurrentSentenceIndex(index);
    // In a real implementation, this would seek to the sentence's timestamp
    if (audioRef.current) {
      audioRef.current.currentTime = sentences[index].startTime;
      audioRef.current.play();
    }
  };

  // Calculate accuracy for progress
  const correctWordsCount = userInput.trim() && isLiveFeedbackEnabled
    ? wordAnalysis.analysis.filter((w: WordStatus) => w.status === 'correct').length
    : 0;
  const accuracy = isLiveFeedbackEnabled && userInput.trim() && words.length > 0 
    ? Math.round((correctWordsCount / words.length) * 100)
    : attempts > 0 ? (isCorrect ? 100 : Math.max(0, 100 - (attempts - 1) * 20)) : 0;

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-10 flex-shrink-0">
        <div className="container mx-auto px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-base font-semibold text-foreground">{lesson.title}</h1>
                <div className="flex items-center gap-1 mt-0.5">
                  <Badge variant="outline" className="text-xs h-5 px-1.5">{lesson.level}</Badge>
                  <Badge variant="secondary" className="text-xs h-5 px-1.5">{lesson.category}</Badge>
                  {activeTab === 'dictation' && isLiveFeedbackEnabled && (
                    <Badge variant="default" className="text-xs h-5 px-1.5">
                      <Zap className="w-3 h-3 mr-0.5" />
                      Live
                    </Badge>
                  )}
                  {activeTab === 'dictation' && userInput.trim() && (
                    <Badge variant="outline" className="text-xs h-5 px-1.5">
                      {correctWordsCount}/{words.length}
                    </Badge>
                  )}
                  {activeTab === 'dictation' && errorWordIndex !== null && (
                    <Badge variant="destructive" className="text-xs h-5 px-1.5">
                      <AlertCircle className="w-3 h-3 mr-0.5" />
                      Error {errorWordIndex + 1}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {activeTab === 'dictation' && (
                  <DropdownMenuItem onClick={toggleLiveFeedback}>
                    {isLiveFeedbackEnabled ? <ZapOff className="w-4 h-4 mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                    {isLiveFeedbackEnabled ? 'Disable Live' : 'Enable Live'}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Lesson
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Auto Replay: {audioSettings.autoReplay ? 'On' : 'Off'}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Speed: {audioSettings.playbackSpeed}x
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-border">
          <div className="container mx-auto px-3">
            <div className="flex">
              <button
                onClick={() => setActiveTab('dictation')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'dictation'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Edit3 className="w-4 h-4 mr-1.5 inline" />
                Dictation
              </button>
              <button
                onClick={() => setActiveTab('transcript')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'transcript'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <FileText className="w-4 h-4 mr-1.5 inline" />
                Full Transcript
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'dictation' ? (
          <DictationTabContent />
        ) : (
          <FullTranscriptTabContent />
        )}
      </div>
    </div>
  );

  // Dictation Tab Component
  function DictationTabContent() {
    return (
      <div className="container mx-auto px-2 py-2 space-y-2 h-full">
        {/* Audio Player */}
        <Card>
          <CardContent className="p-2">
            <div className="flex flex-col items-center space-y-1">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                <Volume2 className="w-5 h-5 text-primary" />
              </div>
              
              <div className="text-center">
                <h2 className="text-xs font-semibold text-foreground mb-0.5">Listen Carefully</h2>
                <p className="text-xs text-muted-foreground">
                  Play the audio and type what you hear
                </p>
              </div>
              
              <Button
                onClick={handlePlayPause}
                size="sm"
                className="w-20 h-7 text-xs"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 mr-1" />
                    Play
                  </>
                )}
              </Button>
              
              {/* Hidden audio element - using placeholder since we don't have real audio */}
              <audio
                ref={audioRef}
                src={lesson.audio_url}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          </CardContent>
        </Card>

       

        {/* Input Section */}
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm">Your Transcription</CardTitle>
            {userInput.trim() && isLiveFeedbackEnabled && (
              <p className="text-xs text-muted-foreground">
                {errorWordIndex !== null 
                  ? '⚠️ Incorrect word - press Enter' 
                  : '✅ All correct!'}
              </p>
            )}
            {!isLiveFeedbackEnabled && (
              <p className="text-xs text-muted-foreground">
                📝 Manual mode: Type and press Enter
              </p>
            )}
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {/* Custom styled input with underlined errors */}
            <div className="relative">
              <Input
                ref={inputRef}
                placeholder="Type what you hear..."
                value={userInput}
                onChange={handleInputChange}
                className={`text-sm p-2 h-8 transition-all duration-200 ${
                  isLiveFeedbackEnabled && errorWordIndex !== null 
                    ? 'ring-2 ring-yellow-400 border-yellow-400' 
                    : ''
                } ${userInput.trim() && showResult ? 'text-transparent' : ''}`}
                disabled={showResult && isCorrect}
              />
              {userInput.trim() && showResult && (
                <div className="absolute inset-0 p-2 pointer-events-none text-sm leading-4 overflow-hidden">
                  <div className="flex flex-wrap">
                    {userInput.trim().split(/\s+/).map((userWord, index) => {
                      const correctWord = words[index];
                      const isIncorrect = correctWord && userWord.toLowerCase() !== correctWord.toLowerCase();
                      const isExcess = index >= words.length;
                      
                      return (
                        <span key={index} className="flex">
                          <span
                            className={`${
                              isExcess
                                ? 'underline decoration-red-500 decoration-2 text-red-600'
                                : isIncorrect
                                ? 'underline decoration-yellow-500 decoration-2 text-yellow-600'
                                : 'text-foreground'
                            }`}
                          >
                            {userWord}
                          </span>
                          {index < userInput.trim().split(/\s+/).length - 1 && (
                            <span className="text-foreground">&nbsp;</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSubmit}
                disabled={!userInput.trim() || (showResult && isCorrect)}
                className="flex-1 h-7 text-xs"
                size="sm"
              >
                Check Answer
              </Button>
              
              {showResult && !isCorrect && (
                <Button 
                  onClick={handleTryAgain}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                >
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

  

        {/* Result Section */}
        {showResult && (
          <Card className={isCorrect ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:bg-red-900/20'}>
            <CardContent className="p-2">
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <h3 className="text-sm font-semibold">
                  {isCorrect ? 'Excellent!' : 'Not quite right'}
                </h3>
              </div>
              
              <div className="space-y-2">
                {!isCorrect && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Progressive Answer Reveal:</p>
                    <div className="p-2 bg-background rounded-lg border">
                      <div className="flex flex-wrap gap-0.5 mb-1">
                        {words.map((word, index) => {
                          const userWords = userInput.trim().split(/\s+/).filter(w => w.length > 0);
                          const userWord = userWords[index];
                          const isCurrentWord = index === userWords.length;
                          // Only show words up to the next word after user input, hide all words behind
                          const showWord = index <= userWords.length;
                          const isIncorrect = userWord && userWord.toLowerCase() !== word.toLowerCase();
                          
                          if (!showWord) {
                            return (
                              <span
                                key={index}
                                className="px-1 py-0.5 rounded text-xs bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                              >
                                {'•'.repeat(Math.max(word.length, 2))}
                              </span>
                            );
                          }
                          
                          return (
                            <span
                              key={index}
                              className={`px-1 py-0.5 rounded text-xs font-medium transition-all duration-200 ${
                                isIncorrect
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 underline decoration-yellow-500 decoration-2'
                                  : isCurrentWord
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 ring-1 ring-blue-400'
                                  : userWord && userWord.toLowerCase() === word.toLowerCase()
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                              }`}
                            >
                              {word}
                            </span>
                          );
                        })}
                        
                        {/* Show excess words in red underline */}
                        {userInput.trim().split(/\s+/).slice(words.length).map((excessWord, index) => (
                          <span
                            key={`excess-${index}`}
                            className="px-1 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 underline decoration-red-500 decoration-2"
                          >
                            {excessWord}
                          </span>
                        ))}
                      </div>
                      
                      {errorWordIndex !== null && (
                        <div className="text-xs text-muted-foreground">
                          💡 Error at word {errorWordIndex + 1}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-1 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Attempts: {attempts}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Accuracy: {isCorrect ? 100 : accuracy}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}



        {/* Live Feedback Section - Real-time word analysis */}
        {userInput.trim() && isLiveFeedbackEnabled && (
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-3 h-3" />
                Live Feedback
                <Badge variant="outline" className="text-xs h-4 px-1">
                  {correctWordsCount}/{words.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {/* Word-by-word comparison */}
                <div className="flex flex-wrap gap-0.5 p-2 bg-muted/30 rounded-lg">
                  {wordAnalysis.analysis.map((wordStatus, index) => (
                    <span
                      key={index}
                      className={`px-1 py-0.5 rounded text-xs font-medium transition-all duration-200 ${
                        wordStatus.status === 'correct'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : wordStatus.status === 'incorrect'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 ring-1 ring-yellow-400 underline decoration-yellow-500 decoration-2'
                          : wordStatus.status === 'current'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 ring-1 ring-blue-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                    >
                      {wordStatus.word}
                    </span>
                  ))}
                </div>

                {/* Error details */}
                {errorWordIndex !== null && (
                  <div className="p-1.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-1 mb-0.5">
                      <AlertCircle className="w-3 h-3 text-yellow-600" />
                      <span className="text-xs font-medium text-yellow-800 dark:text-yellow-300">
                        Error at word {errorWordIndex + 1}
                      </span>
                    </div>
                    <div className="text-xs space-y-0.5">
                      <div>
                        <span className="text-yellow-700 dark:text-yellow-400">
                          You: <span className="font-mono bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded underline decoration-yellow-500 decoration-2">
                            {wordAnalysis.analysis[errorWordIndex]?.userInput}
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="text-yellow-700 dark:text-yellow-400">
                          Correct: <span className="font-mono bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">
                            {wordAnalysis.analysis[errorWordIndex]?.word}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress indicator */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{correctWordsCount}/{words.length} words</span>
                  <span>{accuracy}%</span>
                </div>
                <Progress value={accuracy} className="h-1" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Section */}
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm">Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Accuracy</span>
                <span>{accuracy}%</span>
              </div>
              <Progress value={accuracy} className="h-1" />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Attempts: {attempts}</span>
                <span>{isCorrect ? 'Completed' : 'In Progress'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Full Transcript Tab Component
  function FullTranscriptTabContent() {
    return (
      <div className="container mx-auto px-2 py-2 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Left: Audio Controls */}
          <Card className="h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Audio Playback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Main Audio Player */}
              <div className="flex flex-col items-center space-y-2">
                <Button
                  onClick={handlePlayPause}
                  size="lg"
                  className="w-16 h-16 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>
                
                <div className="text-center">
                  <p className="text-sm font-medium">
                    Sentence {currentSentenceIndex + 1} of {sentences.length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sentences[currentSentenceIndex]?.text}
                  </p>
                </div>
              </div>

              {/* Sentence Navigation */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousSentence}
                  disabled={currentSentenceIndex === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                
                <Badge variant="outline" className="px-3 py-1">
                  {currentSentenceIndex + 1} / {sentences.length}
                </Badge>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextSentence}
                  disabled={currentSentenceIndex === sentences.length - 1}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Audio element */}
              <audio
                ref={audioRef}
                src={lesson.audio_url}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </CardContent>
          </Card>

          {/* Right: Sentence List */}
          <Card className="h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Transcript
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {sentences.map((sentence, index) => (
                  <div
                    key={sentence.id}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      index === currentSentenceIndex
                        ? 'bg-primary/10 border-primary'
                        : 'bg-background hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs h-5 px-1.5">
                            {index + 1}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {sentence.startTime}s - {sentence.endTime}s
                          </span>
                        </div>
                        <p className={`text-sm ${
                          index === currentSentenceIndex
                            ? 'font-medium text-primary'
                            : 'text-foreground'
                        }`}>
                          {sentence.text}
                        </p>
                      </div>
                      
                      <Button
                        variant={index === currentSentenceIndex ? "default" : "ghost"}
                        size="sm"
                        className="h-7 w-7 p-0 flex-shrink-0"
                        onClick={() => handlePlaySentence(index)}
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
