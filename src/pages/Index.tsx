
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';

const avatars = ['🌽', '🎪', '🎭', '🔥', '🎵', '⭐', '🎯', '🏆'];

const featuredGames = [
  { id: 'quiz', name: 'Quiz Junino', emoji: '🎓', xp: '10-30 XP' },
  { id: 'memory', name: 'Jogo da Memória', emoji: '🧠', xp: '15-25 XP' },
  { id: 'reaction', name: 'Reflexo do Fogueteiro', emoji: '🎆', xp: '20-40 XP' },
];

const featuredRewards = [
  { name: 'Canjica Doce', emoji: '🥛', cost: '50 XP' },
  { name: 'Pamonha', emoji: '🌽', cost: '75 XP' },
  { name: 'Chapéu de Palha', emoji: '👒', cost: '120 XP' },
];

const Index = () => {
  const navigate = useNavigate();
  const { nickname, avatar, setUserProfile } = useGame();
  const [tempNickname, setTempNickname] = useState(nickname || '');
  const [tempAvatar, setTempAvatar] = useState(avatar || '🌽');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterFesta = () => {
    if (tempNickname.trim()) {
      setUserProfile(tempNickname.trim(), tempAvatar);
      navigate('/games');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute top-20 left-10 text-6xl animate-bounce delay-100"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            🎪
          </div>
          <div 
            className="absolute top-32 right-20 text-4xl animate-bounce delay-300"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            🌽
          </div>
          <div 
            className="absolute bottom-32 left-20 text-5xl animate-bounce delay-500"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            🔥
          </div>
          <div 
            className="absolute bottom-20 right-10 text-4xl animate-bounce delay-700"
            style={{ transform: `translateY(${scrollY * 0.25}px)` }}
          >
            🎭
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full shadow-2xl border border-purple-300/30">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
              Fila Junina
            </h1>
            <p className="text-xl text-purple-200 mb-6">
              🎉 Transforme sua espera em diversão! 🎉
            </p>
            <div className="text-6xl mb-4 animate-pulse">🎪</div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Seu apelido na festa:
              </label>
              <Input
                type="text"
                placeholder="Digite seu apelido..."
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="text-center text-lg border-2 border-purple-400/50 bg-white/10 backdrop-blur-sm text-white placeholder-purple-300 focus:border-purple-400"
                maxLength={15}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-3">
                Escolha seu avatar:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {avatars.map((emojiAvatar) => (
                  <button
                    key={emojiAvatar}
                    onClick={() => setTempAvatar(emojiAvatar)}
                    className={`text-3xl p-3 rounded-xl border-2 transition-all hover:scale-110 ${
                      tempAvatar === emojiAvatar
                        ? 'border-purple-400 bg-purple-500/30 scale-110'
                        : 'border-purple-500/30 hover:border-purple-400/50 bg-white/5'
                    }`}
                  >
                    {emojiAvatar}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleEnterFesta}
              disabled={!tempNickname.trim()}
              className="w-full text-xl py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              🎪 Começar 🎪
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Games Preview */}
      <div className="px-4 py-16 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Jogos em Destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <div
                key={game.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 hover:border-purple-400/60 transition-all hover:scale-105 cursor-pointer"
              >
                <div className="text-4xl text-center mb-4">{game.emoji}</div>
                <h3 className="text-lg font-bold text-center text-white mb-2">{game.name}</h3>
                <p className="text-purple-300 text-center text-sm">{game.xp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Rewards Preview */}
      <div className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Prêmios Disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRewards.map((reward) => (
              <div
                key={reward.name}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30 hover:border-yellow-400/60 transition-all hover:scale-105"
              >
                <div className="text-4xl text-center mb-4">{reward.emoji}</div>
                <h3 className="text-lg font-bold text-center text-white mb-2">{reward.name}</h3>
                <p className="text-yellow-300 text-center text-sm">{reward.cost}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
