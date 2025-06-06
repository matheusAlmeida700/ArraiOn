
import { useGame } from '@/contexts/GameContext';

const PointsDisplay = () => {
  const { points, level, nickname, avatar, getStreak } = useGame();
  const streak = getStreak();
  const pointsForNextLevel = (level * 100) - points;
  const progressPercentage = ((points % 100) / 100) * 100;

  return (
    <div className="glass-effect-strong rounded-3xl p-6 mb-8 shadow-2xl border-2 border-purple-300/40 neon-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-4xl animate-bounce-gentle">{avatar}</div>
          <div>
            <span className="font-festa text-2xl font-bold text-white text-shadow">{nickname}</span>
            <div className="text-sm text-purple-200 opacity-90">Festeiro Nível {level}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-festa font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent text-shadow">
            {points} XP
          </div>
          <div className="text-xs text-purple-300">⚡ Energia da festa</div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-purple-200 mb-3">
          <span className="font-medium">🎯 Progresso para o próximo nível</span>
          <span className="font-bold text-yellow-300">{pointsForNextLevel} XP restantes</span>
        </div>
        <div className="relative w-full bg-white/10 rounded-full h-4 overflow-hidden border border-purple-400/30">
          <div 
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 h-4 rounded-full transition-all duration-1000 ease-out relative animate-shimmer"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
        </div>
      </div>

      {streak > 0 && (
        <div className="flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-yellow-500/20 rounded-2xl p-4 border-2 border-orange-400/40 animate-pulse-glow">
          <div className="text-3xl animate-bounce">🔥</div>
          <div>
            <span className="text-orange-200 font-festa text-lg font-bold">{streak} sequência!</span>
            <div className="text-xs text-orange-300">Você está pegando fogo! 🚀</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsDisplay;
