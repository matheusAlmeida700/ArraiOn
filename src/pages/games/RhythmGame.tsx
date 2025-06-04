
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

const RhythmGame = () => {
  const navigate = useNavigate();
  const { addPoints, incrementStreak, resetStreak } = useGame();
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [displaying, setDisplaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlightedButton, setHighlightedButton] = useState<number | null>(null);

  const buttons = [
    { id: 0, color: 'bg-red-500', activeColor: 'bg-red-300', emoji: '🎵' },
    { id: 1, color: 'bg-blue-500', activeColor: 'bg-blue-300', emoji: '🎶' },
    { id: 2, color: 'bg-green-500', activeColor: 'bg-green-300', emoji: '🎼' },
    { id: 3, color: 'bg-yellow-500', activeColor: 'bg-yellow-300', emoji: '🎤' }
  ];

  useEffect(() => {
    if (sequence.length === 0) {
      startNewRound();
    }
  }, []);

  useEffect(() => {
    if (userSequence.length === sequence.length && sequence.length > 0) {
      const isCorrect = userSequence.every((btn, index) => btn === sequence[index]);
      
      if (isCorrect) {
        setScore(prev => prev + 1);
        incrementStreak();
        setTimeout(() => {
          startNewRound();
        }, 1000);
      } else {
        resetStreak();
        endGame();
      }
    }
  }, [userSequence, sequence]);

  const startNewRound = () => {
    const newButton = Math.floor(Math.random() * 4);
    const newSequence = [...sequence, newButton];
    setSequence(newSequence);
    setUserSequence([]);
    setCurrentIndex(0);
    displaySequence(newSequence);
  };

  const displaySequence = async (seq: number[]) => {
    setDisplaying(true);
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setHighlightedButton(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setHighlightedButton(null);
    }
    
    setDisplaying(false);
  };

  const handleButtonClick = (buttonId: number) => {
    if (displaying || gameOver) return;

    const newUserSequence = [...userSequence, buttonId];
    setUserSequence(newUserSequence);
    
    // Check if this button is correct for current position
    if (buttonId !== sequence[currentIndex]) {
      resetStreak();
      endGame();
      return;
    }
    
    setCurrentIndex(prev => prev + 1);
    
    // Flash the button
    setHighlightedButton(buttonId);
    setTimeout(() => setHighlightedButton(null), 200);
  };

  const endGame = () => {
    setGameOver(true);
    const earnedPoints = score * 5; // 5 points per correct sequence
    addPoints(earnedPoints);
  };

  const resetGame = () => {
    setSequence([]);
    setUserSequence([]);
    setDisplaying(false);
    setGameOver(false);
    setScore(0);
    setCurrentIndex(0);
    setHighlightedButton(null);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-lg border-2 border-yellow-300 text-center">
          <div className="text-6xl mb-4">🎵</div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Ritmo Finalizado!</h2>
          <p className="text-lg mb-2">Você acertou {score} sequências!</p>
          <p className="text-xl font-bold text-green-600 mb-6">+{score * 5} pontos ganhos! 🎉</p>
          
          <div className="space-y-3">
            <Button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl"
            >
              🔄 Jogar Novamente
            </Button>
            <Button
              onClick={() => navigate('/lobby')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl"
            >
              🎪 Voltar ao Lobby
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-yellow-300">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎵</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Ritmo Forrozeiro</h3>
            <p className="text-sm text-gray-600 mb-4">
              {displaying ? 'Memorize a sequência...' : 'Repita a sequência!'}
            </p>
            <div className="text-lg font-bold text-orange-600">
              Sequência: {score} | Pontos: {score * 5}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {buttons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleButtonClick(button.id)}
                disabled={displaying}
                className={`
                  aspect-square rounded-2xl text-4xl font-bold transition-all transform border-4
                  ${highlightedButton === button.id 
                    ? `${button.activeColor} border-white scale-95 shadow-lg` 
                    : `${button.color} border-gray-300 hover:scale-105 hover:shadow-lg`
                  }
                  ${displaying ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {button.emoji}
              </button>
            ))}
          </div>

          <div className="text-center">
            {displaying && (
              <div className="text-orange-600 font-bold animate-pulse">
                🎶 Observe a sequência...
              </div>
            )}
            {!displaying && !gameOver && (
              <div className="text-green-600 font-bold">
                🎵 Sua vez! Clique na sequência!
              </div>
            )}
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Memorize e repita a sequência musical!</p>
            <p>Cada acerto = +5 pontos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RhythmGame;
