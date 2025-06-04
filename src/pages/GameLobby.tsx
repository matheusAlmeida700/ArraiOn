
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PointsDisplay from '@/components/PointsDisplay';

const games = [
  {
    id: 'quiz',
    name: 'Quiz Junino',
    description: 'Teste seus conhecimentos sobre Festa Junina!',
    icon: '🎓',
    points: '10-30 pts',
    route: '/games/quiz'
  },
  {
    id: 'memory',
    name: 'Jogo da Memória',
    description: 'Encontre os pares dos símbolos juninos!',
    icon: '🧠',
    points: '15-25 pts',
    route: '/games/memory'
  },
  {
    id: 'reaction',
    name: 'Reflexo do Fogueteiro',
    description: 'Clique nos fogos de artifício no tempo certo!',
    icon: '🎆',
    points: '20-40 pts',
    route: '/games/reaction'
  },
  {
    id: 'pin-the-tail',
    name: 'Acerte o Alvo',
    description: 'Mire e acerte o centro do alvo!',
    icon: '🎯',
    points: '10-50 pts',
    route: '/games/pin-the-tail'
  },
  {
    id: 'rhythm',
    name: 'Ritmo Forrozeiro',
    description: 'Siga o ritmo da música junina!',
    icon: '🎵',
    points: '15-35 pts',
    route: '/games/rhythm'
  },
  {
    id: 'number',
    name: 'Bingo Caipira',
    description: 'Encontre os números sorteados rapidamente!',
    icon: '🎲',
    points: '10-30 pts',
    route: '/games/number'
  }
];

const GameLobby = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4">
      <div className="max-w-md mx-auto">
        <PointsDisplay />
        
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-yellow-300">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
            🎪 Escolha seu Jogo! 🎪
          </h2>
          
          <div className="grid gap-4">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => navigate(game.route)}
                className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border-2 border-orange-300 hover:border-orange-500 transition-all hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{game.icon}</div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-gray-800">{game.name}</h3>
                    <p className="text-sm text-gray-600">{game.description}</p>
                    <p className="text-xs text-orange-600 font-medium">{game.points}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button
            onClick={() => navigate('/rewards')}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-xl"
          >
            🎁 Loja de Prêmios
          </Button>
          <Button
            onClick={() => navigate('/leaderboard')}
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 rounded-xl"
          >
            🏆 Ranking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
