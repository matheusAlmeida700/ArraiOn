import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen festa-bg text-white flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.7)), url(https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=1200)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/60 to-pink-900/70" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-yellow-300/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}

        <div className="absolute top-20 left-10 lg:left-20 text-6xl lg:text-8xl opacity-20 animate-parallax-float">
          🎪
        </div>
        <div
          className="absolute top-40 right-10 lg:right-20 text-4xl lg:text-6xl opacity-15 animate-bounce-gentle"
          style={{ animationDelay: "1s" }}
        >
          🌽
        </div>
        <div
          className="absolute bottom-40 left-10 lg:left-20 text-5xl lg:text-7xl opacity-25 animate-float"
          style={{ animationDelay: "2s" }}
        >
          🎭
        </div>
        <div
          className="absolute bottom-20 right-10 lg:right-10 text-4xl lg:text-5xl opacity-20 animate-bounce-gentle"
          style={{ animationDelay: "3s" }}
        >
          🔥
        </div>
        <div className="absolute top-1/2 left-1/4 text-3xl lg:text-4xl opacity-10 animate-pulse">
          🎵
        </div>
        <div
          className="absolute top-1/4 right-1/4 text-3xl lg:text-4xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          🎯
        </div>
      </div>

      <div
        className={`text-center max-w-lg lg:max-w-2xl mx-auto transition-all duration-1000 z-20 relative ${
          isLoaded ? "animate-scale-in" : "opacity-0"
        }`}
      >
        <div className="mb-8 lg:mb-12 relative">
          <div className="text-7xl lg:text-9xl xl:text-[10rem] animate-tada mb-6 text-shadow-strong">
            🎪
          </div>
          <div className="absolute -top-4 -right-8 lg:-right-12 text-3xl lg:text-4xl animate-bounce delay-300">
            🌽
          </div>
          <div className="absolute -bottom-4 -left-8 lg:-left-12 text-3xl lg:text-4xl animate-bounce delay-500">
            🎭
          </div>
        </div>

        <div className="glass-effect-ultra rounded-3xl lg:rounded-[3rem] p-8 lg:p-16 border-2 border-purple-300/50 shadow-2xl neon-glow-strong relative overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 festa-texture opacity-30" />

          <div className="relative z-10">
            <h1 className="font-festa text-6xl lg:text-8xl xl:text-9xl font-bold mb-6 lg:mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent text-shadow-strong">
              404
            </h1>

            <h2 className="font-festa text-2xl lg:text-4xl xl:text-5xl font-bold mb-6 lg:mb-8 text-purple-200 text-shadow">
              Página não encontrada, caipira!
            </h2>

            <p className="text-lg lg:text-2xl xl:text-3xl text-purple-300 mb-6 lg:mb-8 font-medium">
              Parece que você se perdeu na festa! 🤠
            </p>

            <p className="text-sm lg:text-lg text-purple-400 mb-8 lg:mb-12 opacity-90">
              Essa página decidiu pular quadrilha e sumiu no meio da multidão...
            </p>

            <div className="space-y-4 lg:space-y-6">
              <Button
                onClick={() => navigate("/")}
                className="w-full festa-button text-white font-festa font-bold py-4 lg:py-6 rounded-2xl lg:rounded-3xl text-lg lg:text-2xl shadow-lg hover:scale-105 transition-all duration-300"
              >
                🏠 Voltar para Casa
              </Button>

              <Button
                onClick={() => navigate("/games")}
                className="w-full glass-effect-strong border-2 border-purple-400/50 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-200 hover:bg-purple-500/30 hover:border-purple-400/70 font-festa font-bold py-4 lg:py-6 rounded-2xl lg:rounded-3xl text-lg lg:text-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                🎮 Ir para os Jogos
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-12 text-center">
          <p className="text-purple-300 text-lg lg:text-2xl font-medium animate-bounce-gentle mb-6">
            🎉 A festa continua em outras páginas! 🎉
          </p>
          <div className="flex justify-center space-x-4 lg:space-x-6 text-3xl lg:text-4xl">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              🎵
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
              🎪
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              🎭
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>
              🔥
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
