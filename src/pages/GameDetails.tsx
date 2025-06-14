import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PointsDisplay from "@/components/PointsDisplay";

const gameDetails = {
  quiz: {
    name: "Quiz Junino",
    description:
      "Teste seus conhecimentos sobre a cultura junina brasileira! Responda perguntas sobre tradições, comidas típicas, danças e muito mais.",
    icon: "🎓",
    xp: "10-30 XP",
    category: "Conhecimento",
    difficulty: "Fácil",
    playTime: "2-3 min",
    thumbnail: "🎓📚",
    howToPlay: [
      "Leia cada pergunta com atenção",
      "Escolha a resposta correta entre as opções",
      "Quanto mais rápido responder, mais XP ganha",
      "Acerte o máximo de perguntas para bonus!",
    ],
    badges: ["🏆 Mestre Cultural", "⚡ Resposta Rápida", "🎯 Precisão Total"],
  },
  memory: {
    name: "Jogo da Memória",
    description:
      "Encontre os pares dos símbolos juninos escondidos! Teste sua memória com elementos tradicionais da festa.",
    icon: "🧠",
    xp: "15-25 XP",
    category: "Memória",
    difficulty: "Médio",
    playTime: "3-4 min",
    thumbnail: "🧠🃏",
    howToPlay: [
      "Clique nas cartas para virá-las",
      "Memorize a posição dos símbolos",
      "Encontre todos os pares no menor tempo",
      "Menos tentativas = mais XP!",
    ],
    badges: ["🧠 Memória de Elefante", "⚡ Velocidade Mental", "🎯 Foco Total"],
  },
  reaction: {
    name: "Reflexo do Fogueteiro",
    description:
      "Clique nos fogos de artifício no momento exato! Teste seus reflexos com uma explosão de cores.",
    icon: "🎆",
    xp: "20-40 XP",
    category: "Reflexo",
    difficulty: "Difícil",
    playTime: "1-2 min",
    thumbnail: "🎆⚡",
    howToPlay: [
      "Aguarde o fogo aparecer na tela",
      "Clique rapidamente quando ele surgir",
      "Não clique muito cedo ou muito tarde",
      "Reflexos perfeitos = XP máximo!",
    ],
    badges: ["⚡ Reflexo Ninja", "🎆 Mestre dos Fogos", "⏱️ Cronômetro Humano"],
  },
  "pin-the-tail": {
    name: "Acerte o Alvo",
    description:
      "Mire com precisão e acerte o centro do alvo! Quanto mais próximo do centro, maior a pontuação.",
    icon: "🎯",
    xp: "10-50 XP",
    category: "Precisão",
    difficulty: "Médio",
    playTime: "2-3 min",
    thumbnail: "🎯🏹",
    howToPlay: [
      "Mire com cuidado no alvo",
      "Clique para disparar sua flecha",
      "Quanto mais próximo do centro, mais pontos",
      "Múltiplos acertos no centro = bonus!",
    ],
    badges: ["🏹 Arqueiro Mestre", "🎯 Olho de Águia", "💎 Precisão Diamante"],
  },
  rhythm: {
    name: "Ritmo Forrozeiro",
    description:
      "Siga o ritmo da música junina! Toque no tempo certo e mantenha o compasso da festa.",
    icon: "🎵",
    xp: "15-35 XP",
    category: "Ritmo",
    difficulty: "Médio",
    playTime: "3-4 min",
    thumbnail: "🎵🎶",
    howToPlay: [
      "Ouça a música junina tocando",
      "Toque na tela seguindo o ritmo",
      "Mantenha o timing perfeito",
      "Sequências perfeitas = mais XP!",
    ],
    badges: ["🎵 Rei do Forró", "🎶 Ritmo Perfeito", "🪗 Sanfoneiro Expert"],
  },
  number: {
    name: "Bingo Caipira",
    description:
      "Encontre os números sorteados o mais rápido possível! Um bingo especial com o sabor da roça.",
    icon: "🎲",
    xp: "10-30 XP",
    category: "Sorte",
    difficulty: "Fácil",
    playTime: "2-5 min",
    thumbnail: "🎲🔢",
    howToPlay: [
      "Observe os números sorteados",
      "Encontre rapidamente em sua cartela",
      "Marque todos os números sorteados",
      "Complete linhas para bonus especiais!",
    ],
    badges: ["🎲 Sortudo da Festa", "⚡ Olho Rápido", "🏆 Bingo Master"],
  },
};

const GameDetails = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const game = gameId ? gameDetails[gameId as keyof typeof gameDetails] : null;

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Jogo não encontrado</h1>
          <Button
            onClick={() => navigate("/games")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Voltar aos Jogos
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "text-green-400 bg-green-400/20";
      case "Médio":
        return "text-yellow-400 bg-yellow-400/20";
      case "Difícil":
        return "text-red-400 bg-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto p-4">
        <PointsDisplay />

        <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl p-8 mb-8 border border-purple-400/30">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl">{game.thumbnail}</div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {game.name}
              </h1>
              <p className="text-xl text-purple-200 mb-6">{game.description}</p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                    game.difficulty
                  )}`}
                >
                  {game.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium text-purple-300 bg-purple-400/20">
                  {game.category}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium text-indigo-300 bg-indigo-400/20">
                  ⏱️ {game.playTime}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium text-yellow-300 bg-yellow-400/20">
                  {game.xp}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-400/30">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">
            Como Jogar
          </h2>
          <ul className="space-y-3">
            {game.howToPlay.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-purple-100">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-400/30">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">
            Conquistas Disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {game.badges.map((badge, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border border-yellow-400/30 text-center"
              >
                <div className="text-2xl mb-2">{badge}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/games")}
            variant="outline"
            className="flex-1 bg-white/10 border-purple-400/50 text-purple-300 hover:bg-white/20"
          >
            ← Voltar aos Jogos
          </Button>
          <Button
            onClick={() => navigate(`/play/${gameId}`)}
            className="flex-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 text-lg"
          >
            🎮 Jogar Agora!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
