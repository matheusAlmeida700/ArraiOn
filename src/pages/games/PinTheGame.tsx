
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

const PinTheGame = () => {
  const navigate = useNavigate();
  const { addPoints, incrementStreak, resetStreak } = useGame();
  const [shots, setShots] = useState(0);
  const [totalShots] = useState(5);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [lastShotScore, setLastShotScore] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleTargetClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (gameEnded || shots >= totalShots) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    const distance = Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2));
    const maxDistance = Math.min(centerX, centerY);
    
    let points = 0;
    if (distance <= maxDistance * 0.2) { // Bull's eye (20% of radius)
      points = 50;
      incrementStreak();
    } else if (distance <= maxDistance * 0.4) { // Inner ring (40% of radius)
      points = 30;
      incrementStreak();
    } else if (distance <= maxDistance * 0.6) { // Middle ring (60% of radius)
      points = 20;
      incrementStreak();
    } else if (distance <= maxDistance * 0.8) { // Outer ring (80% of radius)
      points = 10;
    } else if (distance <= maxDistance) { // Edge (100% of radius)
      points = 5;
    } else {
      points = 0;
      resetStreak();
    }

    setLastShotScore(points);
    setScore(prev => prev + points);
    setShots(prev => prev + 1);

    // Create visual feedback
    const dot = document.createElement('div');
    dot.style.position = 'absolute';
    dot.style.left = `${clickX - 5}px`;
    dot.style.top = `${clickY - 5}px`;
    dot.style.width = '10px';
    dot.style.height = '10px';
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = points > 30 ? '#ef4444' : points > 10 ? '#f97316' : '#eab308';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '10';
    event.currentTarget.appendChild(dot);

    if (shots + 1 >= totalShots) {
      setTimeout(() => {
        setGameEnded(true);
        addPoints(score + points);
      }, 1000);
    }
  };

  const resetGame = () => {
    setShots(0);
    setScore(0);
    setGameEnded(false);
    setLastShotScore(null);
    // Clear all shot markers
    if (targetRef.current) {
      const dots = targetRef.current.querySelectorAll('div[style*="position: absolute"]');
      dots.forEach(dot => dot.remove());
    }
  };

  if (gameEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-lg border-2 border-yellow-300 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Tiro ao Alvo Finalizado!</h2>
          <p className="text-lg mb-2">Tiros: {shots}/{totalShots}</p>
          <p className="text-lg mb-2">Pontuação total: {score}</p>
          <p className="text-xl font-bold text-green-600 mb-6">+{score} pontos ganhos! 🎉</p>
          
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
              Tiros: {shots}/{totalShots}
            </div>
            <div className="text-lg font-bold text-orange-600">
              {score} pontos
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Acerte o Alvo!</h3>
            <p className="text-sm text-gray-600">Clique o mais próximo do centro possível</p>
          </div>

          <div className="flex justify-center mb-6">
            <div 
              ref={targetRef}
              onClick={handleTargetClick}
              className="relative w-64 h-64 rounded-full border-4 border-gray-800 cursor-crosshair"
              style={{
                background: `
                  radial-gradient(circle at center, 
                    #ef4444 0%, #ef4444 20%, 
                    #f97316 20%, #f97316 40%, 
                    #eab308 40%, #eab308 60%, 
                    #22c55e 60%, #22c55e 80%, 
                    #3b82f6 80%, #3b82f6 100%
                  )
                `
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg pointer-events-none">
                🎯
              </div>
            </div>
          </div>

          {lastShotScore !== null && (
            <div className="text-center mb-4">
              <p className="text-lg font-bold text-green-600">
                +{lastShotScore} pontos!
                {lastShotScore >= 50 ? ' 🎯 BULL\'S EYE!' : 
                 lastShotScore >= 30 ? ' 🔥 Excelente!' :
                 lastShotScore >= 20 ? ' 👍 Bom tiro!' :
                 lastShotScore >= 10 ? ' 👌 No alvo!' :
                 lastShotScore > 0 ? ' 📍 Quase!' : ' ❌ Errou!'}
              </p>
            </div>
          )}

          <div className="text-center text-sm text-gray-600">
            <p>🎯 Centro: 50 pts</p>
            <p>🔥 Próximo: 30 pts | 👍 Médio: 20 pts | 👌 Longe: 10 pts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinTheGame;
