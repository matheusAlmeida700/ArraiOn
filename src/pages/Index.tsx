import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";

const avatars = ["🌽", "🎪", "🎭", "🔥", "🎵", "⭐", "🎯", "🏆"];

const featuredGames = [
  {
    id: "quiz",
    name: "Quiz Junino",
    emoji: "🎓",
    xp: "10-30 XP",
    description: "Teste seus conhecimentos sobre festa junina",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
  },
  {
    id: "memory",
    name: "Jogo da Memória",
    emoji: "🧠",
    xp: "15-25 XP",
    description: "Encontre os pares das tradições juninas",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
  },
  {
    id: "reaction",
    name: "Reflexo do Fogueteiro",
    emoji: "🎆",
    xp: "20-40 XP",
    description: "Teste sua velocidade e precisão",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400",
  },
];

const featuredRewards = [
  {
    name: "Canjica Doce",
    emoji: "🥛",
    cost: "50 XP",
    description: "Deliciosa e quentinha para aquecer o coração",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300",
  },
  {
    name: "Pamonha Tradicional",
    emoji: "🌽",
    cost: "75 XP",
    description: "O sabor autêntico da festa junina",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300",
  },
  {
    name: "Chapéu de Palha",
    emoji: "👒",
    cost: "120 XP",
    description: "Complete seu visual caipira com estilo",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { nickname, avatar, setUserProfile } = useGame();
  const [tempNickname, setTempNickname] = useState(nickname || "");
  const [tempAvatar, setTempAvatar] = useState(avatar || "🌽");
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnterFesta = () => {
    if (tempNickname.trim()) {
      setUserProfile(tempNickname.trim(), tempAvatar);
      navigate("/games");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen festa-bg text-festa-text overflow-hidden relative pt-12">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div
          className="absolute top-20 left-10 lg:top-32 lg:left-20 text-4xl lg:text-6xl opacity-40 animate-float"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          🎪
        </div>
        <div
          className="absolute top-1/3 right-10 lg:right-20 text-3xl lg:text-5xl opacity-30 animate-bounce-gentle"
          style={{
            transform: `translateY(${scrollY * 0.08}px)`,
            animationDelay: "1s",
          }}
        >
          🌽
        </div>
        <div
          className="absolute bottom-1/3 left-10 lg:left-20 text-3xl lg:text-5xl opacity-35 animate-float"
          style={{
            transform: `translateY(${scrollY * 0.03}px)`,
            animationDelay: "2s",
          }}
        >
          🔥
        </div>
        <div
          className="absolute top-1/2 right-1/4 text-2xl lg:text-4xl opacity-25 animate-bounce-gentle"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
            animationDelay: "3s",
          }}
        >
          🎭
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-banner min-h-screen flex items-center justify-center px-4 lg:px-8 xl:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
            {/* Left Column - Content */}
            <div
              className={`space-y-6 lg:space-y-8 xl:space-y-12 transition-all duration-1000 ${
                isLoaded ? "animate-slide-up" : "opacity-0"
              }`}
            >
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-festa-accent/10 border border-festa-accent/30 rounded-full backdrop-blur-sm">
                  <span className="text-festa-accent font-medium text-sm lg:text-base">
                    🎉 Festa Junina 2024
                  </span>
                </div>

                <h1 className="font-festa text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-festa-text leading-tight">
                  Transforme sua espera em{" "}
                  <span className="bg-gradient-to-r from-festa-accent via-festa-secondary to-festa-primary bg-clip-text text-transparent">
                    diversão
                  </span>
                </h1>

                <p className="text-base lg:text-lg xl:text-xl text-festa-text-light leading-relaxed max-w-2xl">
                  Jogue, ganhe pontos e troque por prêmios reais enquanto
                  aproveita a festa junina. Uma experiência única que torna cada
                  momento especial.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2">
                <Button
                  onClick={handleEnterFesta}
                  className="festa-button text-white font-festa font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl text-base lg:text-lg shadow-lg"
                >
                  🎪 Entrar na Festa!
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/games")}
                  className="border-festa-border bg-festa-surface/50 hover:bg-festa-surface text-festa-text font-medium py-3 lg:py-4 px-6 lg:px-8 rounded-xl text-base lg:text-lg backdrop-blur-sm"
                >
                  Ver Jogos
                </Button>
              </div>

              <div className="flex items-center gap-4 lg:gap-6 pt-2 lg:pt-4">
                <div className="flex -space-x-2">
                  {avatars.slice(0, 4).map((emoji, index) => (
                    <div
                      key={emoji}
                      className="w-8 h-8 lg:w-10 lg:h-10 bg-festa-surface border-2 border-festa-border rounded-full flex items-center justify-center text-sm lg:text-base"
                      style={{ zIndex: 4 - index }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-festa-text-muted text-sm lg:text-base">
                  <span className="font-semibold text-festa-text">500+</span>{" "}
                  jogadores ativos
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isLoaded ? "animate-scale-in" : "opacity-0"
              }`}
            >
              <img
                className="rounded-xl"
                src="https://blog.staycharlie.com.br/wp-content/uploads/2025/06/festa-junina.jpg"
                alt="Festa Junina"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Games Section */}
      <section className="py-12 lg:py-16 xl:py-20 px-4 lg:px-8 xl:px-12 bg-festa-surface/30 backdrop-blur-sm relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 lg:mb-12 xl:mb-16">
            <h2 className="font-festa text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-festa-text mb-3 lg:mb-4">
              Jogos em Destaque
            </h2>
            <p className="text-base lg:text-lg xl:text-xl text-festa-text-light max-w-2xl mx-auto">
              Diversão garantida enquanto você espera na fila
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
            {featuredGames.map((game, index) => (
              <div
                key={game.id}
                className={`group glass-effect-strong rounded-xl lg:rounded-2xl border border-festa-border/30 overflow-hidden hover-lift animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="h-40 lg:h-48 xl:h-56 relative overflow-hidden bg-festa-surface"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05)), url(${game.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-3 lg:top-4 right-3 lg:right-4 text-2xl lg:text-3xl xl:text-4xl group-hover:scale-110 transition-transform">
                    {game.emoji}
                  </div>
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4">
                    <span className="inline-flex items-center px-2 lg:px-3 py-1 bg-festa-accent/90 text-festa-surface-dark text-xs lg:text-sm font-semibold rounded-full">
                      {game.xp}
                    </span>
                  </div>
                </div>

                <div className="p-4 lg:p-5 xl:p-6">
                  <h3 className="font-festa text-lg lg:text-xl xl:text-2xl font-bold text-festa-text mb-2 group-hover:text-festa-accent transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-festa-text-light text-sm lg:text-base leading-relaxed">
                    {game.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rewards Section */}
      <section className="py-12 lg:py-16 xl:py-20 px-4 lg:px-8 xl:px-12 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 lg:mb-12 xl:mb-16">
            <h2 className="font-festa text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-festa-text mb-3 lg:mb-4">
              Prêmios Incríveis
            </h2>
            <p className="text-base lg:text-lg xl:text-xl text-festa-text-light max-w-2xl mx-auto">
              Troque seus pontos por recompensas reais da festa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
            {featuredRewards.map((reward, index) => (
              <div
                key={reward.name}
                className={`group glass-effect-strong rounded-xl lg:rounded-2xl border border-festa-border/30 overflow-hidden hover-lift animate-slide-up`}
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <div
                  className="h-40 lg:h-48 xl:h-56 relative overflow-hidden bg-festa-surface"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05)), url(${reward.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-3 lg:top-4 right-3 lg:right-4 text-2xl lg:text-3xl xl:text-4xl group-hover:scale-110 transition-transform">
                    {reward.emoji}
                  </div>
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4">
                    <span className="inline-flex items-center px-2 lg:px-3 py-1 bg-festa-warning/90 text-festa-surface-dark text-xs lg:text-sm font-semibold rounded-full">
                      {reward.cost}
                    </span>
                  </div>
                </div>

                <div className="p-4 lg:p-5 xl:p-6">
                  <h3 className="font-festa text-lg lg:text-xl xl:text-2xl font-bold text-festa-text mb-2 group-hover:text-festa-accent transition-colors">
                    {reward.name}
                  </h3>
                  <p className="text-festa-text-light text-sm lg:text-base leading-relaxed">
                    {reward.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 lg:py-16 xl:py-20 px-4 lg:px-8 xl:px-12 bg-festa-surface-dark/20 backdrop-blur-sm text-center relative">
        <div className="container mx-auto max-w-4xl">
          <h3 className="font-festa text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-festa-text mb-3 lg:mb-4">
            Pronto para a aventura?
          </h3>
          <p className="text-base lg:text-lg xl:text-xl text-festa-text-light mb-6 lg:mb-8 max-w-2xl mx-auto">
            Entre na festa e transforme sua espera em momentos inesquecíveis de
            diversão e descoberta.
          </p>
          <Button
            onClick={handleEnterFesta}
            className="festa-button text-white font-festa font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl text-base lg:text-lg shadow-lg"
          >
            🎪 Entrar na Festa!
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
