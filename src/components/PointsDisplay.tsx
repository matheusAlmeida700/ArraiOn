
import { useGame } from '@/contexts/GameContext';

const PointsDisplay = () => {
  const { points, level, nickname, avatar, getStreak } = useGame();
  const streak = getStreak();
  const pointsForNextLevel = (level * 100) - points;
  const progressPercentage = ((points % 100) / 100) * 100;

  return (
    <div className="glass-effect-ultra rounded-2xl lg:rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8 shadow-xl border border-festa-border/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 festa-texture opacity-20" />
      
      {/* Subtle Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-festa-accent/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-6 lg:mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="text-4xl lg:text-5xl xl:text-6xl bg-festa-accent/10 border border-festa-accent/20 rounded-full p-3 lg:p-4 animate-bounce-gentle">
              {avatar}
            </div>
            <div className="text-center lg:text-left">
              <span className="font-festa text-2xl lg:text-3xl xl:text-4xl font-bold text-festa-text block">
                {nickname}
              </span>
              <div className="text-sm lg:text-base text-festa-text-light font-medium">
                Festeiro Nível {level} ⭐
              </div>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <div className="text-3xl lg:text-4xl xl:text-5xl font-festa font-bold bg-gradient-to-r from-festa-accent to-festa-secondary bg-clip-text text-transparent">
              {points} XP
            </div>
            <div className="text-xs lg:text-sm text-festa-text-muted font-medium">Energia da festa</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6 lg:mb-8">
          <div className="flex justify-between text-sm lg:text-base text-festa-text-light mb-3">
            <span className="font-medium flex items-center">
              🎯 <span className="ml-2">Progresso para o próximo nível</span>
            </span>
            <span className="font-semibold text-festa-accent bg-festa-accent/10 px-3 py-1 rounded-full border border-festa-accent/20">
              {pointsForNextLevel} XP restantes
            </span>
          </div>
          <div className="relative w-full bg-festa-surface/50 rounded-full h-4 lg:h-5 overflow-hidden border border-festa-border/30">
            <div 
              className="bg-gradient-to-r from-festa-accent to-festa-secondary h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Streak Display */}
        {streak > 0 && (
          <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-festa-warning/20 to-festa-accent/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-festa-accent/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-festa-warning/5 to-festa-accent/5 animate-shimmer"></div>
            <div className="text-3xl lg:text-4xl animate-bounce relative z-10">🔥</div>
            <div className="relative z-10 text-center lg:text-left">
              <span className="text-festa-text font-festa text-lg lg:text-xl xl:text-2xl font-bold block">
                {streak} sequência!
              </span>
              <div className="text-xs lg:text-sm text-festa-text-light font-medium">
                Você está pegando fogo!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsDisplay;
