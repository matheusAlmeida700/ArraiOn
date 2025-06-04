
import { useGame } from '@/contexts/GameContext';

const PointsDisplay = () => {
  const { points, level, nickname, avatar, getStreak } = useGame();
  const streak = getStreak();
  const pointsForNextLevel = (level * 100) - points;
  const progressPercentage = ((points % 100) / 100) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg border border-purple-400/30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{avatar}</span>
          <span className="font-bold text-white">{nickname}</span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            {points} XP
          </div>
          <div className="text-sm text-purple-300">Nível {level}</div>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm text-purple-200 mb-2">
          <span>Progresso</span>
          <span>{pointsForNextLevel} XP para o próximo nível</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {streak > 0 && (
        <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-2 border border-orange-400/30">
          <span className="text-xl">🔥</span>
          <span className="text-orange-300 font-bold">{streak} sequência!</span>
        </div>
      )}
    </div>
  );
};

export default PointsDisplay;
