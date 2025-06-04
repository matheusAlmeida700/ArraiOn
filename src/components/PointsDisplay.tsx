
import { useGame } from '@/contexts/GameContext';

const PointsDisplay = () => {
  const { points, level, nickname, avatar, getStreak } = useGame();
  const streak = getStreak();
  const pointsForNextLevel = (level * 100) - points;
  const progressPercentage = ((points % 100) / 100) * 100;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-lg border-2 border-yellow-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{avatar}</span>
          <span className="font-bold text-gray-800">{nickname}</span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600">{points} pts</div>
          <div className="text-sm text-gray-600">Nível {level}</div>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progresso</span>
          <span>{pointsForNextLevel} pts para o próximo nível</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {streak > 0 && (
        <div className="flex items-center justify-center space-x-1 text-sm">
          <span>🔥</span>
          <span className="text-orange-600 font-bold">{streak} sequência!</span>
        </div>
      )}
    </div>
  );
};

export default PointsDisplay;
