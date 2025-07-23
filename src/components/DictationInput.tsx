'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface DictationInputProps {
  transcript: string;
  onSubmit: (input: string, isCorrect: boolean) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function DictationInput({ 
  transcript, 
  onSubmit, 
  disabled = false,
  placeholder = "Type what you hear..."
}: DictationInputProps) {
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;

    const normalizedInput = input.toLowerCase().trim();
    const normalizedTranscript = transcript.toLowerCase().trim();
    const correct = normalizedInput === normalizedTranscript;
    
    setIsCorrect(correct);
    setShowResult(true);
    onSubmit(input, correct);
  };

  const handleTryAgain = () => {
    setInput('');
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled || (showResult && isCorrect)}
          className="text-lg p-4 h-12 pr-12"
        />
        
        {showResult && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={handleSubmit}
          disabled={!input.trim() || disabled || (showResult && isCorrect)}
          className="flex-1"
        >
          Check Answer
        </Button>
        
        {showResult && !isCorrect && (
          <Button onClick={handleTryAgain} variant="outline">
            Try Again
          </Button>
        )}
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg border ${
          isCorrect 
            ? 'bg-green-50 border-green-200 dark:bg-green-900/20' 
            : 'bg-red-50 border-red-200 dark:bg-red-900/20'
        }`}>
          <div className="space-y-2">
            <p className="font-medium">
              {isCorrect ? 'Correct!' : 'Not quite right'}
            </p>
            <div className="text-sm">
              <p className="text-muted-foreground">Expected:</p>
              <p className="font-mono bg-background p-2 rounded border mt-1">
                {transcript}
              </p>
            </div>
            {!isCorrect && (
              <div className="text-sm">
                <p className="text-muted-foreground">Your answer:</p>
                <p className="font-mono bg-background p-2 rounded border mt-1">
                  {input}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
