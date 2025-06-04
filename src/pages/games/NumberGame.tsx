
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

const NumberGame = () => {
  const navigate = useNavigate();
  const { addPoints, incrementStreak, resetStreak } = useGame();
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [playerCard, setPlayerCard] = useState<number[]>([]);
  const [markedNumbers, setMarkedNumbers] = useState<Set<number>>(new Set());
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    generatePlayerCard();
    startDrawing();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, gameEnded]);

  useEffect(() => {
    // Check for bingo (full row)
    const rows = [
      playerCard.slice(0, 5),
      playerCard.slice(5, 10),
      playerCard.slice(10, 15)
    ];
    
    const hasFullRow = rows.some(row => 
      row.every(num => markedNumbers.has(num))
    );
    
    if (hasFullRow && !gameEnded) {
      endGame(true); // Bingo!
    }
  }, [markedNumbers]);

  const generatePlayerCard = () => {
    const numbers: number[] = [];
    while (numbers.length < 15) {
      const num = Math.floor(Math.random() * 75) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setPlayerCard(numbers.sort((a, b) => a - b));
  };

  const startDrawing = () => {
    const interval = setInterval(() => {
      if (drawnNumbers.length >= 30) {
        clearInterval(interval);
        endGame();
        return;
      }

      setIsDrawing(true);
      setTimeout(() => {
        let newNumber;
        do {
          newNumber = Math.floor(Math.random() * 75) + 1;
        } while (drawnNumbers.includes(newNumber));
        
        setDrawnNumbers(prev => [...prev, newNumber]);
        setCurrentNumber(newNumber);
        setIsDrawing(false);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  };

  const markNumber = (number: number) => {
    if (drawnNumbers.includes(number) && !markedNumbers.has(number)) {
      setMarkedNumbers(prev => new Set([...prev, number]));
      setScore(prev => prev + 5);
      incrementStreak();
    }
  };

  const endGame = (bingo = false) => {
    setGameEnded(true);
    let finalPoints = score;
    
    if (bingo) {
      finalPoints += 50; // Bonus for bingo
    }
    
    // Time bonus
    finalPoints += Math.max(0, timeLeft);
    
    addPoints(finalPoints);
  };

  const resetGame = () => {
    setDrawnNumbers([]);
    setPlayerCard([]);
    setMarkedNumbers(new Set());
    setCurrentNumber(null);
    setGameEnded(false);
    setScore(0);
    setRound(1);
    setTimeLeft(60);
    setIsDrawing(false);
    generatePlayerCard();
    startDrawing();
  };

  if (gameEnded) {
    const hadBingo = playerCard.length > 0 && [
      playerCard.slice(0, 5),
      playerCard.slice(5, 10),
      playerCard.slice(10, 15)
    ].some(row => row.every(num => markedNumbers.has(num)));

    const finalPoints = score + (hadBingo ? 50 : 0) + Math.max(0, timeLeft);

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-lg border-2 border-yellow-300 text-center">
          <div className="text-6xl mb-4">🎲</div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            {hadBingo ? 'BINGO! 🎉' : 'Jogo Finalizado!'}
          </h2>
          <p className="text-lg mb-2">Números marcados: {markedNumbers.size}</p>
          {hadBingo && <p className="text-lg mb-2 text-green-600 font-bold">Linha completa! +50 pontos!</p>}
          <p className="text-lg mb-2">Tempo restante: {timeLeft}s</p>
          <p className="text-xl font-bold text-green-600 mb-6">+{finalPoints} pontos ganhos! 🎉</p>
          
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
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              Marcados: {markedNumbers.size} | Pontos: {score}
            </div>
            <div className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-green-500'}`}>
              ⏰ {timeLeft}s
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎲</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Bingo Caipira</h3>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Número atual:</p>
              <div className="text-4xl font-bold text-red-600">
                {isDrawing ? '🎲' : currentNumber || '?'}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2 text-center">Sua cartela (clique nos números sorteados):</p>
            <div className="grid grid-cols-5 gap-1">
              {playerCard.map((number, index) => (
                <button
                  key={index}
                  onClick={() => markNumber(number)}
                  className={`
                    aspect-square rounded-lg border-2 text-sm font-bold transition-all
                    ${markedNumbers.has(number)
                      ? 'bg-green-500 border-green-600 text-white scale-95'
                      : drawnNumbers.includes(number)
                      ? 'bg-yellow-100 border-yellow-500 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 border-gray-300 text-gray-600'
                    }
                  `}
                  disabled={!drawnNumbers.includes(number) || markedNumbers.has(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">
              Números sorteados: {drawnNumbers.join(', ')}
            </p>
            <p className="text-sm text-orange-600 font-bold">
              Complete uma linha para fazer BINGO! 🎯
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberGame;
