import { useGame } from "@/contexts/GameContext";
import { useUserData } from "@/hooks/useUserData";

const PointsDisplay = () => {
  const { data: userData, error, refetch } = useUserData();

  const { avatar } = useGame();
  const progressPercentage = ((userData?.xp % 100) / 100) * 100;

  if (!userData) {
    return <div className="text-center py-4">Carregando dados...</div>;
  }

  return (
    <div className="glass-effect-ultra rounded-xl lg:rounded-2xl xl:rounded-3xl p-4 lg:p-6 xl:p-8 mb-4 lg:mb-6 xl:mb-8 shadow-xl border border-festa-border/50 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-4 lg:mb-6 xl:mb-8 space-y-3 lg:space-y-0">
          <div className="flex items-center space-x-3 lg:space-x-4 xl:space-x-6">
            <div className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl bg-festa-accent/10 border border-festa-accent/20 rounded-full p-2 lg:p-3 xl:p-4 animate-bounce-gentle">
              {avatar}
            </div>
            <div className="text-center lg:text-left">
              <span className="font-festa text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-festa-text block">
                {userData?.username ?? ""}
              </span>
              <div className="text-xs lg:text-sm xl:text-base text-festa-text-light font-medium">
                Nível {userData?.level ?? 0} ⭐
              </div>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <div className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-festa font-bold bg-gradient-to-r from-festa-accent to-festa-secondary bg-clip-text text-transparent">
              {userData?.coins} Moedas
            </div>
            <div className="text-xs lg:text-sm text-festa-text-muted font-medium">
              Energia da festa
            </div>
          </div>
        </div>

        <div className="mb-4 lg:mb-6 xl:mb-8">
          <div className="relative w-full bg-festa-surface/50 rounded-full h-3 lg:h-4 xl:h-5 overflow-hidden border border-festa-border/30">
            <div
              className="bg-gradient-to-r from-festa-accent to-festa-secondary h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsDisplay;
