'use client';

import { useState, useRef } from 'react';
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
  Volume2, 
  CheckCircle, 
  XCircle,
  MoreVertical 
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

export function DictationScreen({ lesson, onBack }: DictationScreenProps) {
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [revealedWords, setRevealedWords] = useState<Set<number>>(new Set());
  const audioSettings = {
    autoReplay: false,
    playbackSpeed: 1,
    delay: 1000,
  };

  const audioRef = useRef<HTMLAudioElement>(null);

  // Split transcript into words for progressive reveal
  const words = lesson.transcript.split(' ');

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

  const handleSubmit = () => {
    const normalizedInput = userInput.toLowerCase().trim();
    const normalizedTranscript = lesson.transcript.toLowerCase().trim();
    
    setAttempts(prev => prev + 1);
    setShowResult(true);
    
    const correct = normalizedInput === normalizedTranscript;
    setIsCorrect(correct);
    
    if (!correct) {
      // Reveal some words as hints
      const wordsToReveal = Math.min(3, Math.floor(words.length / 3));
      const newRevealedWords = new Set(revealedWords);
      
      for (let i = 0; i < wordsToReveal; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        newRevealedWords.add(randomIndex);
      }
      
      setRevealedWords(newRevealedWords);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setAttempts(0);
    setShowResult(false);
    setIsCorrect(false);
    setRevealedWords(new Set());
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setUserInput('');
  };

  // Calculate accuracy for progress
  const accuracy = attempts > 0 ? (isCorrect ? 100 : Math.max(0, 100 - (attempts - 1) * 20)) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">{lesson.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{lesson.level}</Badge>
                  <Badge variant="secondary" className="text-xs">{lesson.category}</Badge>
                </div>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Audio Player */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full">
                <Volume2 className="w-10 h-10 text-primary" />
              </div>
              
              <div className="text-center">
                <h2 className="text-lg font-semibold text-foreground mb-2">Listen Carefully</h2>
                <p className="text-sm text-muted-foreground">
                  Play the audio and type what you hear
                </p>
              </div>
              
              <Button
                onClick={handlePlayPause}
                size="lg"
                className="w-32 h-12"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
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
          <CardHeader>
            <CardTitle className="text-lg">Your Transcription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Type what you hear..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="text-lg p-4 h-12"
              disabled={showResult && isCorrect}
            />
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSubmit}
                disabled={!userInput.trim() || (showResult && isCorrect)}
                className="flex-1"
              >
                Check Answer
              </Button>
              
              {showResult && !isCorrect && (
                <Button 
                  onClick={handleTryAgain}
                  variant="outline"
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
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <h3 className="text-lg font-semibold">
                  {isCorrect ? 'Excellent!' : 'Not quite right'}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Correct Answer:</p>
                  <p className="text-foreground bg-background p-3 rounded-lg border">
                    {lesson.transcript}
                  </p>
                </div>
                
                {!isCorrect && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Your Answer:</p>
                    <p className="text-foreground bg-background p-3 rounded-lg border">
                      {userInput}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Attempts: {attempts}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Accuracy: {accuracy}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Word Reveal Hints */}
        {revealedWords.size > 0 && !isCorrect && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-sm ${
                      revealedWords.has(index)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {revealedWords.has(index) ? word : '•'.repeat(Math.max(word.length, 3))}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Accuracy</span>
                <span>{accuracy}%</span>
              </div>
              <Progress value={accuracy} className="h-2" />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Attempts: {attempts}</span>
                <span>Status: {isCorrect ? 'Completed' : 'In Progress'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
