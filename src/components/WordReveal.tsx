'use client';

interface WordRevealProps {
  transcript: string;
  revealedWords: Set<number>;
  userInput: string;
  showResult: boolean;
}

export function WordReveal({ 
  transcript, 
  revealedWords, 
  userInput, 
  showResult 
}: WordRevealProps) {
  const words = transcript.split(' ');
  const userWords = userInput.toLowerCase().split(' ');
  const transcriptWords = transcript.toLowerCase().split(' ');

  const getWordStatus = (index: number) => {
    if (revealedWords.has(index)) {
      return 'revealed'; // Hint word
    }
    
    if (showResult && userWords[index]) {
      const userWord = userWords[index].toLowerCase();
      const correctWord = transcriptWords[index];
      
      if (userWord === correctWord) {
        return 'correct';
      } else {
        return 'incorrect';
      }
    }
    
    return 'hidden';
  };

  const getWordDisplay = (index: number, word: string, status: string) => {
    switch (status) {
      case 'revealed':
        return word; // Show hint word
      case 'correct':
        return userWords[index] || word;
      case 'incorrect':
        return userWords[index] || word;
      case 'hidden':
        return '•'.repeat(Math.max(word.length, 3));
      default:
        return word;
    }
  };

  const getWordStyles = (status: string) => {
    switch (status) {
      case 'revealed':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300';
      case 'correct':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300';
      case 'incorrect':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300';
      case 'hidden':
        return 'bg-muted text-muted-foreground border-muted';
      default:
        return 'bg-background text-foreground border-border';
    }
  };

  if (revealedWords.size === 0 && !showResult) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-foreground">
        {showResult ? 'Result' : 'Hints'}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {words.map((word, index) => {
          const status = getWordStatus(index);
          const display = getWordDisplay(index, word, status);
          const styles = getWordStyles(status);
          
          return (
            <span
              key={index}
              className={`px-2 py-1 rounded border text-sm font-mono transition-colors ${styles}`}
            >
              {display}
            </span>
          );
        })}
      </div>
      
      {showResult && (
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-200 rounded border border-green-300"></div>
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-200 rounded border border-red-300"></div>
              <span>Incorrect</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-200 rounded border border-blue-300"></div>
              <span>Hint</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
