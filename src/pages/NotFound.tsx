
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Animated decorative elements */}
        <div className="mb-8 relative">
          <div className="text-8xl animate-bounce delay-100 mb-4">🎪</div>
          <div className="absolute -top-4 -right-8 text-3xl animate-pulse delay-300">🌽</div>
          <div className="absolute -bottom-4 -left-8 text-3xl animate-pulse delay-500">🎭</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            404
          </h1>
          
          <h2 className="text-2xl font-bold mb-4 text-purple-200">
            Página não encontrada, caipira!
          </h2>
          
          <p className="text-lg text-purple-300 mb-6">
            Parece que você se perdeu na festa! 🤠
          </p>
          
          <p className="text-sm text-purple-400 mb-8">
            Essa página decidiu pular quadrilha e sumiu...
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl text-lg"
            >
              🏠 Voltar para Casa
            </Button>
            
            <Button
              onClick={() => navigate('/games')}
              variant="outline"
              className="w-full bg-white/10 border-purple-400/50 text-purple-300 hover:bg-white/20 font-bold py-3 rounded-xl"
            >
              🎮 Ir para os Jogos
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-purple-400 text-sm">
            🎉 A festa continua em outras páginas! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
