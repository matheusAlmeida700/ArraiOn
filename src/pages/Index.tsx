
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';

const avatars = ['🌽', '🎪', '🎭', '🔥', '🎵', '⭐', '🎯', '🏆'];

const featuredGames = [
  { id: 'quiz', name: 'Quiz Junino', emoji: '🎓', xp: '10-30 XP', description: 'Teste seus conhecimentos!' },
  { id: 'memory', name: 'Jogo da Memória', emoji: '🧠', xp: '15-25 XP', description: 'Encontre os pares!' },
  { id: 'reaction', name: 'Reflexo do Fogueteiro', emoji: '🎆', xp: '20-40 XP', description: 'Velocidade e precisão!' },
];

const featuredRewards = [
  { name: 'Canjica Doce', emoji: '🥛', cost: '50 XP', description: 'Deliciosa e quentinha' },
  { name: 'Pamonha', emoji: '🌽', cost: '75 XP', description: 'Tradicional da festa' },
  { name: 'Chapéu de Palha', emoji: '👒', cost: '120 XP', description: 'Visual caipira completo' },
];

const Index = () => {
  const navigate = useNavigate();
  const { nickname, avatar, setUserProfile } = useGame();
  const [tempNickname, setTempNickname] = useState(nickname || '');
  const [tempAvatar, setTempAvatar] = useState(avatar || '🌽');
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
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
    <div className="min-h-screen festa-bg text-white overflow-hidden relative">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 text-8xl opacity-20 animate-float"
          style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.02}deg)` }}
        >
          🎪
        </div>
        <div 
          className="absolute top-40 right-20 text-6xl opacity-15 animate-bounce-gentle"
          style={{ transform: `translateY(${scrollY * 0.15}px)`, animationDelay: '1s' }}
        >
          🌽
        </div>
        <div 
          className="absolute bottom-40 left-20 text-7xl opacity-25 animate-float"
          style={{ transform: `translateY(${scrollY * 0.05}px)`, animationDelay: '2s' }}
        >
          🔥
        </div>
        <div 
          className="absolute bottom-20 right-10 text-5xl opacity-20 animate-bounce-gentle"
          style={{ transform: `translateY(${scrollY * 0.2}px)`, animationDelay: '3s' }}
        >
          🎭
        </div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5 animate-pulse"
        >
          🎉
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Main Content */}
        <div className={`glass-effect-strong rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-white/30 neon-glow transition-all duration-1000 ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="text-center mb-8">
            <div className="animate-tada">
              <h1 className="font-festa text-6xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4 text-shadow">
                Fila Junina
              </h1>
            </div>
            <p className="text-xl text-purple-100 mb-6 font-medium">
              🎉 Transforme sua espera em diversão! 🎉
            </p>
            <div className="text-8xl mb-6 animate-bounce-gentle">🎪</div>
            <p className="text-sm text-purple-200 opacity-90">
              Jogue, ganhe pontos e troque por prêmios reais!
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-purple-100 mb-3">
                ✨ Seu apelido na festa:
              </label>
              <Input
                type="text"
                placeholder="Digite seu apelido..."
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="text-center text-lg border-2 border-purple-300/50 bg-white/10 backdrop-blur-sm text-white placeholder-purple-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 rounded-xl h-14 font-medium transition-all duration-300"
                maxLength={15}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-purple-100 mb-3">
                🎭 Escolha seu avatar:
              </label>
              <div className="grid grid-cols-4 gap-3">
                {avatars.map((emojiAvatar) => (
                  <button
                    key={emojiAvatar}
                    onClick={() => setTempAvatar(emojiAvatar)}
                    className={`text-4xl p-4 rounded-2xl border-3 transition-all duration-300 hover:scale-110 ${
                      tempAvatar === emojiAvatar
                        ? 'border-yellow-400 bg-yellow-400/20 scale-110 animate-pulse-glow'
                        : 'border-purple-400/30 hover:border-yellow-400/50 bg-white/5 hover:bg-white/10'
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
              className="w-full text-2xl py-8 festa-button text-white font-festa font-bold rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-gray-600"
            >
              🎪 Começar a Festa! 🎪
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-white/60 text-center">
            <div className="text-2xl mb-2">👇</div>
            <p className="text-sm">Descubra mais</p>
          </div>
        </div>
      </div>

      {/* Featured Games Section */}
      <div className="px-4 py-20 bg-black/20 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-festa text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent mb-4">
              🎮 Jogos em Destaque
            </h2>
            <p className="text-xl text-purple-200">Diversão garantida enquanto você espera!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <div
                key={game.id}
                className={`glass-effect rounded-2xl p-8 border-2 border-purple-300/30 hover:border-yellow-400/60 transition-all duration-500 hover-lift cursor-pointer group animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => navigate(`/games/${game.id}`)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-tada">{game.emoji}</div>
                  <h3 className="font-festa text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-purple-200 text-sm mb-4">{game.description}</p>
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full border border-purple-400/50">
                    <span className="text-yellow-300 font-bold text-sm">{game.xp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Rewards Section */}
      <div className="px-4 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-festa text-5xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-4">
              🎁 Prêmios Incríveis
            </h2>
            <p className="text-xl text-purple-200">Troque seus pontos por recompensas reais!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRewards.map((reward, index) => (
              <div
                key={reward.name}
                className={`glass-effect rounded-2xl p-8 border-2 border-orange-300/30 hover:border-yellow-400/60 transition-all duration-500 hover-lift group animate-slide-up`}
                style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce-gentle">{reward.emoji}</div>
                  <h3 className="font-festa text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                    {reward.name}
                  </h3>
                  <p className="text-orange-200 text-sm mb-4">{reward.description}</p>
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-full border border-orange-400/50">
                    <span className="text-yellow-300 font-bold text-sm">{reward.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-festa text-4xl font-bold text-white mb-6">
            Pronto para a aventura? 🚀
          </h3>
          <p className="text-lg text-purple-200 mb-8">
            Entre na festa e transforme sua espera em momentos inesquecíveis!
          </p>
          <Button
            onClick={() => tempNickname.trim() ? handleEnterFesta() : window.scrollTo({top: 0, behavior: 'smooth'})}
            className="festa-button text-xl py-6 px-12 font-festa font-bold rounded-2xl shadow-2xl"
          >
            {tempNickname.trim() ? '🎪 Entrar na Festa!' : '🎪 Começar Agora!'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
