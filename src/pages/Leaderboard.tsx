
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

// Mock leaderboard data - in a real app, this would come from a backend
const generateLeaderboard = (currentPlayer: any) => {
  const mockPlayers = [
    { nickname: 'João do Forró', avatar: '🎵', points: 850 },
    { nickname: 'Maria Bonita', avatar: '⭐', points: 720 },
    { nickname: 'Zé da Roça', avatar: '🌽', points: 680 },
    { nickname: 'Ana Caipira', avatar: '🎪', points: 650 },
    { nickname: 'Pedro Sanfoneiro', avatar: '🎭', points: 590 },
    { nickname: 'Luiza Festeira', avatar: '🔥', points: 540 },
    { nickname: 'Carlos Matuto', avatar: '🎯', points: 480 },
    { nickname: 'Rosa do Campo', avatar: '🏆', points: 420 }
  ];

  // Add current player to the list
  const allPlayers = [...mockPlayers, {
    nickname: currentPlayer.nickname || 'Você',
    avatar: currentPlayer.avatar || '🌽',
    points: currentPlayer.points || 0
  }];

  // Sort by points and return top 10
  return allPlayers
    .sort((a, b) => b.points - a.points)
    .slice(0, 10)
    .map((player, index) => ({
      ...player,
      position: index + 1
    }));
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const { points, nickname, avatar } = useGame();
  
  const leaderboard = generateLeaderboard({ points, nickname, avatar });
  const currentPlayerRank = leaderboard.find(player => 
    player.nickname === (nickname || 'Você') && player.avatar === avatar
  );

  const getRankEmoji = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getRankColor = (position: number, isCurrentPlayer: boolean) => {
    if (isCurrentPlayer) {
      return 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-400';
    }
    
    switch (position) {
      case 1: return 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400';
      case 2: return 'bg-gradient-to-r from-gray-100 to-slate-100 border-gray-400';
      case 3: return 'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-400';
      default: return 'bg-white border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-yellow-300 mb-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-orange-600 mb-2">🏆 Ranking da Festa 🏆</h2>
            <p className="text-sm text-gray-600">Veja quem está mandando bem na fila!</p>
          </div>

          {/* Current Player Stats */}
          {currentPlayerRank && (
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 border-2 border-blue-300 mb-6">
              <div className="text-center">
                <div className="text-2xl mb-2">{currentPlayerRank.avatar}</div>
                <h3 className="font-bold text-gray-800">{currentPlayerRank.nickname}</h3>
                <p className="text-lg text-blue-600 font-bold">
                  {currentPlayerRank.position}º lugar | {currentPlayerRank.points} pontos
                </p>
              </div>
            </div>
          )}

          {/* Leaderboard List */}
          <div className="space-y-3">
            {leaderboard.map((player) => {
              const isCurrentPlayer = player.nickname === (nickname || 'Você') && player.avatar === avatar;
              
              return (
                <div
                  key={`${player.nickname}-${player.avatar}`}
                  className={`p-4 rounded-xl border-2 transition-all ${getRankColor(player.position, isCurrentPlayer)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {getRankEmoji(player.position)}
                      </div>
                      <div className="text-2xl">{player.avatar}</div>
                      <div>
                        <h3 className={`font-bold ${isCurrentPlayer ? 'text-blue-800' : 'text-gray-800'}`}>
                          {player.nickname} {isCurrentPlayer && '(Você)'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {player.position}º lugar
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        player.position === 1 ? 'text-yellow-600' :
                        player.position === 2 ? 'text-gray-600' :
                        player.position === 3 ? 'text-orange-600' :
                        isCurrentPlayer ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {player.points} pts
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>🎮 Continue jogando para subir no ranking!</p>
            <p>🔥 Ranking atualizado em tempo real</p>
          </div>
        </div>

        <Button
          onClick={() => navigate('/lobby')}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl"
        >
          🎪 Voltar ao Lobby
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
