
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PointsDisplay from '@/components/PointsDisplay';

const games = [
  {
    id: 'quiz',
    name: 'Quiz Junino',
    description: 'Teste seus conhecimentos sobre Festa Junina!',
    icon: '🎓',
    xp: '10-30 XP',
    category: 'Conhecimento',
    difficulty: 'Fácil',
    status: 'available',
    thumbnail: '🎓📚',
    playTime: '2-3 min',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'memory',
    name: 'Jogo da Memória',
    description: 'Encontre os pares dos símbolos juninos!',
    icon: '🧠',
    xp: '15-25 XP',
    category: 'Memória',
    difficulty: 'Médio',
    status: 'available',
    thumbnail: '🧠🃏',
    playTime: '3-4 min',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'reaction',
    name: 'Reflexo do Fogueteiro',
    description: 'Clique nos fogos de artifício no tempo certo!',
    icon: '🎆',
    xp: '20-40 XP',
    category: 'Reflexo',
    difficulty: 'Difícil',
    status: 'available',
    thumbnail: '🎆⚡',
    playTime: '1-2 min',
    gradient: 'from-red-500 to-pink-600'
  },
  {
    id: 'pin-the-tail',
    name: 'Acerte o Alvo',
    description: 'Mire e acerte o centro do alvo!',
    icon: '🎯',
    xp: '10-50 XP',
    category: 'Precisão',
    difficulty: 'Médio',
    status: 'available',
    thumbnail: '🎯🏹',
    playTime: '2-3 min',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'rhythm',
    name: 'Ritmo Forrozeiro',
    description: 'Siga o ritmo da música junina!',
    icon: '🎵',
    xp: '15-35 XP',
    category: 'Ritmo',
    difficulty: 'Médio',
    status: 'available',
    thumbnail: '🎵🎶',
    playTime: '3-4 min',
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'number',
    name: 'Bingo Caipira',
    description: 'Encontre os números sorteados rapidamente!',
    icon: '🎲',
    xp: '10-30 XP',
    category: 'Sorte',
    difficulty: 'Fácil',
    status: 'available',
    thumbnail: '🎲🔢',
    playTime: '2-5 min',
    gradient: 'from-yellow-500 to-orange-600'
  }
];

const categories = ['Todos', 'Conhecimento', 'Memória', 'Reflexo', 'Precisão', 'Ritmo', 'Sorte'];
const difficulties = ['Todos', 'Fácil', 'Médio', 'Difícil'];

const GamesCatalog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredGames = games.filter(game => {
    const categoryMatch = selectedCategory === 'Todos' || game.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'Todos' || game.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-300 bg-green-500/20 border-green-400/40';
      case 'Médio': return 'text-yellow-300 bg-yellow-500/20 border-yellow-400/40';
      case 'Difícil': return 'text-red-300 bg-red-500/20 border-red-400/40';
      default: return 'text-gray-300 bg-gray-500/20 border-gray-400/40';
    }
  };

  return (
    <div className="min-h-screen festa-bg text-white">
      <div className="max-w-7xl mx-auto p-4">
        <PointsDisplay />
        
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
          <h1 className="font-festa text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent mb-6 text-shadow">
            🎮 Catálogo de Jogos
          </h1>
          <p className="text-2xl text-purple-200 font-medium">Escolha sua aventura e comece a diversão!</p>
          <div className="mt-4 text-4xl animate-bounce-gentle">🎪</div>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-8">
          <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
            <h3 className="font-festa text-2xl font-bold mb-4 text-purple-200">🎯 Categoria</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg neon-glow'
                      : 'glass-effect text-purple-200 hover:bg-white/20 border border-purple-400/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-500 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
            <h3 className="font-festa text-2xl font-bold mb-4 text-purple-200">⚡ Dificuldade</h3>
            <div className="flex flex-wrap gap-3">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-6 py-3 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 ${
                    selectedDifficulty === difficulty
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg neon-glow'
                      : 'glass-effect text-indigo-200 hover:bg-white/20 border border-indigo-400/30'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredGames.map((game, index) => (
            <div
              key={game.id}
              className={`glass-effect-strong rounded-3xl overflow-hidden border-2 border-purple-300/40 hover:border-yellow-400/60 transition-all duration-500 hover-lift cursor-pointer group animate-scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
              onClick={() => navigate(`/games/${game.id}`)}
            >
              {/* Thumbnail */}
              <div className={`bg-gradient-to-br ${game.gradient} p-8 text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                  <div className="text-7xl mb-4 group-hover:animate-tada">{game.thumbnail}</div>
                  <div className="text-3xl group-hover:animate-bounce">{game.icon}</div>
                </div>
                {hoveredGame === game.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                )}
              </div>

              {/* Game Info */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-festa text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                    {game.name}
                  </h3>
                  <span className="text-yellow-300 text-lg font-bold bg-yellow-400/20 px-3 py-1 rounded-full border border-yellow-400/40">
                    {game.xp}
                  </span>
                </div>

                <p className="text-purple-200 text-base mb-6 leading-relaxed">{game.description}</p>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm px-3 py-2 bg-purple-500/30 rounded-full text-purple-200 border border-purple-400/40 font-medium">
                    📂 {game.category}
                  </span>
                  <span className={`text-sm font-bold px-3 py-2 rounded-full border ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-300 font-medium">⏱️ {game.playTime}</span>
                  <Button
                    className="festa-button text-white font-bold px-6 py-3 rounded-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/play/${game.id}`);
                    }}
                  >
                    🎮 Jogar Agora
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className={`flex space-x-4 transition-all duration-700 delay-700 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
          <Button
            onClick={() => navigate('/rewards')}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-festa font-bold py-4 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            🎁 Loja de Prêmios
          </Button>
          <Button
            onClick={() => navigate('/leaderboard')}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-festa font-bold py-4 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            🏆 Ranking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GamesCatalog;
