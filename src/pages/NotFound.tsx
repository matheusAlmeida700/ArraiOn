
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
    <div className="min-h-screen festa-bg text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-8xl opacity-20 animate-float">🎪</div>
        <div className="absolute top-40 right-20 text-6xl opacity-15 animate-bounce-gentle" style={{ animationDelay: '1s' }}>🌽</div>
        <div className="absolute bottom-40 left-20 text-7xl opacity-25 animate-float" style={{ animationDelay: '2s' }}>🎭</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-20 animate-bounce-gentle" style={{ animationDelay: '3s' }}>🔥</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-pulse">🎵</div>
        <div className="absolute top-1/4 right-1/4 text-4xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}>🎯</div>
      </div>

      <div className={`text-center max-w-lg mx-auto transition-all duration-1000 ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}>
        {/* Animated decorative elements */}
        <div className="mb-8 relative">
          <div className="text-9xl animate-tada mb-6">🎪</div>
          <div className="absolute -top-4 -right-8 text-4xl animate-bounce delay-300">🌽</div>
          <div className="absolute -bottom-4 -left-8 text-4xl animate-bounce delay-500">🎭</div>
        </div>

        <div className="glass-effect-strong rounded-3xl p-10 border-2 border-purple-300/40 shadow-2xl neon-glow">
          <h1 className="font-festa text-8xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent text-shadow">
            404
          </h1>
          
          <h2 className="font-festa text-3xl font-bold mb-6 text-purple-200">
            Página não encontrada, caipira!
          </h2>
          
          <p className="text-xl text-purple-300 mb-6 font-medium">
            Parece que você se perdeu na festa! 🤠
          </p>
          
          <p className="text-base text-purple-400 mb-8 opacity-90">
            Essa página decidiu pular quadrilha e sumiu no meio da multidão...
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/')}
              className="w-full festa-button text-white font-festa font-bold py-4 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all duration-300"
            >
              🏠 Voltar para Casa
            </Button>
            
            <Button
              onClick={() => navigate('/games')}
              className="w-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-2 border-purple-400/50 text-purple-200 hover:bg-purple-500/30 hover:border-purple-400/70 font-festa font-bold py-4 rounded-2xl text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              🎮 Ir para os Jogos
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-purple-300 text-lg font-medium animate-bounce-gentle">
            🎉 A festa continua em outras páginas! 🎉
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-3xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎵</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎪</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎭</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
