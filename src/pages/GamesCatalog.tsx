
import { useState } from 'react';
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
    playTime: '2-3 min'
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
    playTime: '3-4 min'
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
    playTime: '1-2 min'
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
    playTime: '2-3 min'
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
    playTime: '3-4 min'
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
    playTime: '2-5 min'
  }
];

const categories = ['Todos', 'Conhecimento', 'Memória', 'Reflexo', 'Precisão', 'Ritmo', 'Sorte'];
const difficulties = ['Todos', 'Fácil', 'Médio', 'Difícil'];

const GamesCatalog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  const filteredGames = games.filter(game => {
    const categoryMatch = selectedCategory === 'Todos' || game.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'Todos' || game.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400';
      case 'Médio': return 'text-yellow-400';
      case 'Difícil': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <PointsDisplay />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            🎮 Catálogo de Jogos
          </h1>
          <p className="text-purple-200">Escolha seu jogo e comece a diversão!</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-200">Categoria</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-purple-300 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-200">Dificuldade</h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDifficulty === difficulty
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/10 text-indigo-300 hover:bg-white/20'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 cursor-pointer group"
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
              onClick={() => navigate(`/games/${game.id}`)}
            >
              {/* Thumbnail */}
              <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 p-8 text-center">
                <div className="text-6xl mb-4">{game.thumbnail}</div>
                <div className="text-2xl">{game.icon}</div>
              </div>

              {/* Game Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {game.name}
                  </h3>
                  <span className="text-purple-400 text-sm font-medium">{game.xp}</span>
                </div>

                <p className="text-purple-200 text-sm mb-4">{game.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs px-2 py-1 bg-purple-600/30 rounded-full text-purple-300">
                    {game.category}
                  </span>
                  <span className={`text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-purple-300">⏱️ {game.playTime}</span>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm px-4 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/play/${game.id}`);
                    }}
                  >
                    Jogar Agora
                  </Button>
                </div>
              </div>

              {/* Hover Effect */}
              {hoveredGame === game.id && (
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex space-x-2">
          <Button
            onClick={() => navigate('/rewards')}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl"
          >
            🎁 Loja de Prêmios
          </Button>
          <Button
            onClick={() => navigate('/leaderboard')}
            className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 rounded-xl"
          >
            🏆 Ranking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GamesCatalog;
