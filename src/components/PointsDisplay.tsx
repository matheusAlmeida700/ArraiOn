
import { useGame } from '@/contexts/GameContext';

const PointsDisplay = () => {
  const { points, level, nickname, avatar, getStreak } = useGame();
  const streak = getStreak();
  const pointsForNextLevel = (level * 100) - points;
  const progressPercentage = ((points % 100) / 100) * 100;

  return (
    <div 
      className="glass-effect-ultra rounded-3xl lg:rounded-[2rem] p-6 lg:p-8 mb-8 lg:mb-12 shadow-2xl border-2 border-purple-300/50 neon-glow-strong relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1)), url(https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/70 to-pink-900/80 backdrop-blur-sm" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-6 lg:mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="text-5xl lg:text-6xl xl:text-7xl animate-bounce-gentle bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full p-2 lg:p-3 shadow-lg">
              {avatar}
            </div>
            <div className="text-center lg:text-left">
              <span className="font-festa text-2xl lg:text-4xl xl:text-5xl font-bold text-white text-shadow-strong block">
                {nickname}
              </span>
              <div className="text-sm lg:text-lg text-purple-200 opacity-90 font-medium">
                Festeiro Nível {level} 🌟
              </div>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <div className="text-3xl lg:text-5xl xl:text-6xl font-festa font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent text-shadow-strong">
              {points} XP
            </div>
            <div className="text-xs lg:text-base text-purple-300 font-medium">⚡ Energia da festa</div>
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="mb-6 lg:mb-8">
          <div className="flex justify-between text-sm lg:text-base text-purple-200 mb-4">
            <span className="font-medium flex items-center">
              🎯 <span className="ml-2">Progresso para o próximo nível</span>
            </span>
            <span className="font-bold text-yellow-300 bg-yellow-400/20 px-3 py-1 rounded-full border border-yellow-400/40">
              {pointsForNextLevel} XP restantes
            </span>
          </div>
          <div className="relative w-full bg-white/10 rounded-full h-5 lg:h-6 overflow-hidden border-2 border-purple-400/40 shadow-inner">
            <div 
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              <div className="absolute inset-0 animate-pulse-glow"></div>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-white/30 shadow-lg"></div>
          </div>
        </div>

        {/* Enhanced Streak Display */}
        {streak > 0 && (
          <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-orange-500/30 via-red-500/30 to-yellow-500/30 rounded-2xl lg:rounded-3xl p-4 lg:p-6 border-2 border-orange-400/50 animate-pulse-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-red-400/10 to-yellow-400/10 animate-shimmer"></div>
            <div className="text-4xl lg:text-5xl animate-bounce relative z-10">🔥</div>
            <div className="relative z-10 text-center lg:text-left">
              <span className="text-orange-200 font-festa text-lg lg:text-2xl xl:text-3xl font-bold block">
                {streak} sequência!
              </span>
              <div className="text-xs lg:text-base text-orange-300 font-medium">
                Você está pegando fogo! 🚀
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsDisplay;
