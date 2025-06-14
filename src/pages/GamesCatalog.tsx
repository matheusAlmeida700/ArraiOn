import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PointsDisplay from "@/components/PointsDisplay";

const games = [
  {
    id: "quiz",
    name: "Quiz Junino",
    description:
      "Você sabe mesmo tudo sobre festa junina? Teste seus conhecimentos nesse quiz arretado, com perguntas de múltipla escolha! Acertou, dançou! Ops... Ganhou!",
    icon: "🎓",
    xp: "10-30 XP",
    category: "Conhecimento",
    difficulty: "Fácil",
    status: "available",
    playTime: "2-3 min",
    gradient: "from-yellow-700 to-red-600",
    image: "/quiz-arraia.png",
    popularity: 95,
  },
  {
    id: "memory",
    name: "Jogo da Memória",
    description:
      "Combine imagens de bandeirinhas, pamonha, paçoca, fogueira, balão e muito mais! Vai dizer que você não lembra onde viu o milho agora há pouco?",
    icon: "🧠",
    xp: "15-25 XP",
    category: "Memória",
    difficulty: "Médio",
    status: "available",
    playTime: "3-4 min",
    gradient: "from-green-500 to-teal-600",
    image: "/quebra-cabeca.png",
    popularity: 87,
  },
  {
    id: "reaction",
    name: "Reflexo do Fogueteiro",
    description:
      "O desafio aqui é ser rápido no gatilho, sô! Apareceu? Clique! Sumiu? Já era! Teste seus reflexos com objetos da roça pulando na tela!",
    icon: "🎆",
    xp: "20-40 XP",
    category: "Reflexo",
    difficulty: "Difícil",
    status: "available",
    playTime: "1-2 min",
    gradient: "from-red-500 to-pink-600",
    image: "/rojao.png",
    popularity: 92,
  },
  {
    id: "pin-the-tail",
    name: "Acerte o Alvo",
    description:
      "Pegue sua espingarda de brinquedo (de mentirinha, claro!) e tente acertar os alvos da festa!Balões, espigas de milho, bandeirinhas voando… Mire com cuidado e acerte o centro!",
    icon: "🎯",
    xp: "10-50 XP",
    category: "Precisão",
    difficulty: "Médio",
    status: "available",
    playTime: "2-3 min",
    gradient: "from-orange-500 to-red-600",
    image: "/alvo.png",
    popularity: 78,
  },
  {
    id: "rhythm",
    name: "Ritmo Forrozeiro",
    description:
      "Sanfona tocou, as cores brilharam!Você consegue repetir a sequência de luzes no ritmo do forró?Use a memória e o ouvido pra seguir o compasso!",
    icon: "🎵",
    xp: "15-35 XP",
    category: "Ritmo",
    difficulty: "Médio",
    status: "available",
    playTime: "3-4 min",
    gradient: "from-purple-500 to-indigo-600",
    image: "/ritmo-forrozeiro.png",
    popularity: 83,
  },
  {
    id: "number",
    name: "Bingo Caipira",
    description:
      "Complete a cartela com elementos juninos sorteados: milho, canjica, fogueira, balão, e muito mais.Quem fechar a cartela primeiro grita: “BINGOOO DO ARRAIÁ!",
    icon: "🎲",
    xp: "10-30 XP",
    category: "Sorte",
    difficulty: "Fácil",
    status: "available",
    playTime: "2-5 min",
    gradient: "from-yellow-500 to-orange-600",
    image: "/bingoTop.png",
    popularity: 74,
  },
];

const categories = [
  "Todos",
  "Conhecimento",
  "Memória",
  "Reflexo",
  "Precisão",
  "Ritmo",
  "Sorte",
];
const difficulties = ["Todos", "Fácil", "Médio", "Difícil"];

const GamesCatalog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos");
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredGames = games.filter((game) => {
    const categoryMatch =
      selectedCategory === "Todos" || game.category === selectedCategory;
    const difficultyMatch =
      selectedDifficulty === "Todos" || game.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "text-green-300 bg-green-500/20 border-green-400/40";
      case "Médio":
        return "text-yellow-300 bg-yellow-500/20 border-yellow-400/40";
      case "Difícil":
        return "text-red-300 bg-red-500/20 border-red-400/40";
      default:
        return "text-gray-300 bg-gray-500/20 border-gray-400/40";
    }
  };

  return (
    <div className="min-h-screen bg-[#ffd390] text-[#5e1c00]">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <PointsDisplay />

        <div
          className={`hero-banner rounded-3xl lg:rounded-[3rem] p-8 lg:p-16 mb-12 lg:mb-16 text-center transition-all duration-1000 ${
            isLoaded ? "animate-slide-up" : "opacity-0"
          }`}
          style={{
            backgroundImage: "url('/bannerCatalogo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="font-festa text-4xl lg:text-7xl xl:text-8xl font-bold text-orange-900 mb-6 lg:mb-8 text-shadow-strong">
            Catálogo de Jogos
          </h1>
          <p className="text-lg lg:text-3xl xl:text-2xl text-orange-900 font-medium mb-6  font-[Poppins]">
            Escolha um dos nossos jogos e se divirta que é bão demais da conta!
          </p>
        </div>

        <div className="mb-12 lg:mb-16 space-y-8 lg:space-y-12">
          <div
            className={`transition-all duration-700 delay-300 ${
              isLoaded ? "animate-slide-up" : "opacity-0"
            }`}
          >
            <div className="glass-effect-strong rounded-2xl lg:rounded-3xl px-6 lg:px-8 border-2 border-purple-300/40">
              <h3 className="font-festa text-xl lg:text-3xl font-bold mb-6 text-orange-800 flex items-center">
                🎯 <span className="ml-3">Categoria</span>
              </h3>
              <div className="flex flex-wrap gap-3 lg:gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 lg:px-8 py-3 lg:py-4 rounded-2xl lg:rounded-3xl text-sm lg:text-lg font-bold transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg neon-glow"
                        : "glass-effect text-black-300 hover:bg-white/20 border border-purple-400/30"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-500 ${
              isLoaded ? "animate-slide-up" : "opacity-0"
            }`}
          >
            <div className="glass-effect-strong rounded-2xl lg:rounded-3xl px-6 lg:px-8 border-2 border-indigo-300/40">
              <h3 className="font-festa text-xl lg:text-3xl font-bold mb-6 text-[#5e1c00] flex items-center">
                ⚡ <span className="ml-3">Dificuldade</span>
              </h3>
              <div className="flex flex-wrap gap-3 lg:gap-4">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 lg:px-8 py-3 lg:py-4 rounded-2xl lg:rounded-3xl text-sm lg:text-lg font-bold transition-all duration-300 hover:scale-105 ${
                      selectedDifficulty === difficulty
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg neon-glow"
                        : "glass-effect text-[#5e1c00] hover:bg-white/20 border border-indigo-400/30"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {filteredGames.map((game, index) => (
            <div
              key={game.id}
              className={`group relative overflow-hidden bg-orange-700/80 rounded-3xl lg:rounded-[2rem] border-2 border-purple-300/40 hover:border-yellow-400/60 transition-all duration-500 hover-lift cursor-pointer animate-scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
              onClick={() => navigate(`/games/${game.id}`)}
            >
              <div
                className={`h-48 lg:h-56 xl:h-64 bg-gradient-to-br ${game.gradient} relative overflow-hidden`}
                style={{
                  backgroundImage: `url(${game.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm rounded-full px-3 py-1 border border-yellow-400/50">
                  <span className="text-white font-bold text-xs lg:text-sm">
                    ⭐ {game.popularity}% popular
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 text-2xl lg:text-3xl group-hover:animate-bounce">
                  {game.icon}
                </div>

                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-orange-500/70 to-pink-600/80 rounded-full border border-purple-400/50 backdrop-blur-sm">
                    <span className="text-yellow-300 font-bold text-sm lg:text-base">
                      {game.xp}
                    </span>
                  </div>
                </div>

                {hoveredGame === game.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/70 via-transparent to-transparent animate-slide-up">
                    <div className="absolute bottom-6 left-6 right-6 text-center">
                      <p className="text-white font-medium text-sm lg:text-base font-[Poppins]">
                        Clique para jogar!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 lg:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-festa text-lg lg:text-2xl xl:text-3xl font-bold text-white group-hover:text-orange-300 transition-colors">
                    {game.name}
                  </h3>
                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`text-xs lg:text-sm font-bold px-3 py-1 rounded-full border ${getDifficultyColor(
                        game.difficulty
                      )}`}
                    >
                      {game.difficulty}
                    </span>
                  </div>
                </div>
                <p className="text-purple-200 text-sm lg:text-base mb-6 leading-relaxed font-poppins">
                  {game.description}
                </p>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm lg:text-base px-3 py-2 bg-purple-600/30 rounded-full text-purple-200 border border-purple-400/40 font-medium">
                    📂 {game.category}
                  </span>
                  <span className="text-sm lg:text-base text-purple-400 font-medium">
                    ⏱️ {game.playTime}
                  </span>
                </div>

                <Button
                  className="w-full festa-button text-white font-bold px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-sm lg:text-base"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/play/${game.id}`);
                  }}
                >
                  🎮 Jogar Agora
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 transition-all duration-700 delay-700 ${
            isLoaded ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <Button
            onClick={() => navigate("/rewards")}
            className="bg-orange-600 bg-gradient-to-r hover:from-green-500/40 hover:to-emerald-500/40 text-white font-festa font-bold py-4 lg:py-6 rounded-2xl lg:rounded-3xl text-lg lg:text-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            🎁 Loja de Prêmios
          </Button>
          <Button
            onClick={() => navigate("/leaderboard")}
            className="bg-orange-600 bg-gradient-to-r hover:from-yellow-500/40 hover:to-orange-500/40 text-white font-festa font-bold py-4 lg:py-6 rounded-2xl lg:rounded-3xl text-lg lg:text-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            🏆 Ranking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GamesCatalog;
