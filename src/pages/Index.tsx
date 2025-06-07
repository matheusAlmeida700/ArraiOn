
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';

const avatars = ['🌽', '🎪', '🎭', '🔥', '🎵', '⭐', '🎯', '🏆'];

const featuredGames = [
  { 
    id: 'quiz', 
    name: 'Quiz Junino', 
    emoji: '🎓', 
    xp: '10-30 XP', 
    description: 'Teste seus conhecimentos!',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400',
    gradient: 'from-blue-500 to-purple-600'
  },
  { 
    id: 'memory', 
    name: 'Jogo da Memória', 
    emoji: '🧠', 
    xp: '15-25 XP', 
    description: 'Encontre os pares!',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400',
    gradient: 'from-green-500 to-teal-600'
  },
  { 
    id: 'reaction', 
    name: 'Reflexo do Fogueteiro', 
    emoji: '🎆', 
    xp: '20-40 XP', 
    description: 'Velocidade e precisão!',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400',
    gradient: 'from-red-500 to-pink-600'
  },
];

const featuredRewards = [
  { 
    name: 'Canjica Doce', 
    emoji: '🥛', 
    cost: '50 XP', 
    description: 'Deliciosa e quentinha',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300'
  },
  { 
    name: 'Pamonha', 
    emoji: '🌽', 
    cost: '75 XP', 
    description: 'Tradicional da festa',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300'
  },
  { 
    name: 'Chapéu de Palha', 
    emoji: '👒', 
    cost: '120 XP', 
    description: 'Visual caipira completo',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300'
  },
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
      {/* Animated Background Decorations with Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-10 left-10 lg:top-20 lg:left-20 text-6xl lg:text-8xl opacity-20 animate-parallax-float"
          style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.02}deg)` }}
        >
          🎪
        </div>
        <div 
          className="absolute top-40 right-10 lg:right-20 text-4xl lg:text-6xl opacity-15 animate-bounce-gentle"
          style={{ transform: `translateY(${scrollY * 0.15}px)`, animationDelay: '1s' }}
        >
          🌽
        </div>
        <div 
          className="absolute bottom-40 left-10 lg:left-20 text-5xl lg:text-7xl opacity-25 animate-float"
          style={{ transform: `translateY(${scrollY * 0.05}px)`, animationDelay: '2s' }}
        >
          🔥
        </div>
        <div 
          className="absolute bottom-20 right-10 lg:right-10 text-4xl lg:text-5xl opacity-20 animate-bounce-gentle"
          style={{ transform: `translateY(${scrollY * 0.2}px)`, animationDelay: '3s' }}
        >
          🎭
        </div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl lg:text-9xl opacity-5 animate-rotate-slow"
        >
          🎉
        </div>
        
        {/* Floating Image Elements */}
        <div 
          className="absolute top-32 right-1/4 w-16 h-16 lg:w-24 lg:h-24 opacity-10 animate-float"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100)',
            backgroundSize: 'cover',
            borderRadius: '50%',
            animationDelay: '4s'
          }}
        />
        <div 
          className="absolute bottom-1/3 left-1/4 w-12 h-12 lg:w-20 lg:h-20 opacity-10 animate-bounce-gentle"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100)',
            backgroundSize: 'cover',
            borderRadius: '50%',
            animationDelay: '6s'
          }}
        />
      </div>

      {/* Hero Section with Rich Background */}
      <div className="hero-banner min-h-screen flex flex-col items-center justify-center px-4 lg:px-8">
        {/* Floating Particles */}
        <div className="particle-bg">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className={`glass-effect-ultra rounded-3xl lg:rounded-[3rem] p-6 lg:p-12 max-w-md lg:max-w-2xl w-full shadow-2xl border-2 border-white/40 neon-glow-strong transition-all duration-1000 ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="text-center mb-8 lg:mb-12">
            <div className="animate-tada">
              <h1 className="font-festa text-4xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent mb-6 text-shadow-strong">
                Fila Junina
              </h1>
            </div>
            <p className="text-lg lg:text-2xl xl:text-3xl text-purple-100 mb-6 lg:mb-8 font-medium">
              🎉 Transforme sua espera em diversão! 🎉
            </p>
            <div className="text-6xl lg:text-8xl xl:text-9xl mb-6 lg:mb-8 animate-bounce-gentle">🎪</div>
            <p className="text-sm lg:text-lg text-purple-200 opacity-90">
              Jogue, ganhe pontos e troque por prêmios reais!
            </p>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <label className="block text-sm lg:text-lg font-semibold text-purple-100 mb-3">
                ✨ Seu apelido na festa:
              </label>
              <Input
                type="text"
                placeholder="Digite seu apelido..."
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="text-center text-lg lg:text-xl border-2 border-purple-300/50 bg-white/10 backdrop-blur-sm text-white placeholder-purple-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 rounded-xl lg:rounded-2xl h-12 lg:h-16 font-medium transition-all duration-300"
                maxLength={15}
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm lg:text-lg font-semibold text-purple-100 mb-3">
                🎭 Escolha seu avatar:
              </label>
              <div className="grid grid-cols-4 gap-3 lg:gap-4">
                {avatars.map((emojiAvatar) => (
                  <button
                    key={emojiAvatar}
                    onClick={() => setTempAvatar(emojiAvatar)}
                    className={`text-3xl lg:text-5xl p-4 lg:p-6 rounded-2xl lg:rounded-3xl border-3 transition-all duration-300 hover:scale-110 ${
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
              className="w-full text-xl lg:text-3xl py-6 lg:py-10 festa-button text-white font-festa font-bold rounded-2xl lg:rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-gray-600"
            >
              🎪 Começar a Festa! 🎪
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
          <div className="text-white/60 text-center">
            <div className="text-3xl mb-2">👇</div>
            <p className="text-lg">Descubra mais</p>
          </div>
        </div>
      </div>

      {/* Featured Games Section with Rich Visuals */}
      <div className="px-4 lg:px-8 py-16 lg:py-32 bg-black/30 backdrop-blur-sm relative festa-texture">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-24">
            <h2 className="font-festa text-3xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent mb-6 text-shadow-strong">
              🎮 Jogos em Destaque
            </h2>
            <p className="text-lg lg:text-2xl xl:text-3xl text-purple-200">Diversão garantida enquanto você espera!</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {featuredGames.map((game, index) => (
              <div
                key={game.id}
                className={`group relative overflow-hidden glass-effect-strong rounded-3xl lg:rounded-[2rem] border-2 border-purple-300/30 hover:border-yellow-400/60 transition-all duration-500 hover-lift cursor-pointer animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => navigate(`/games/${game.id}`)}
              >
                {/* Game Image Background */}
                <div 
                  className={`h-48 lg:h-64 xl:h-72 bg-gradient-to-br ${game.gradient} relative overflow-hidden`}
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.6)), url(${game.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 text-4xl lg:text-6xl group-hover:animate-tada">{game.emoji}</div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full border border-purple-400/50 backdrop-blur-sm">
                      <span className="text-yellow-300 font-bold text-sm lg:text-base">{game.xp}</span>
                    </div>
                  </div>
                </div>

                {/* Game Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="font-festa text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-purple-200 text-sm lg:text-base mb-6">{game.description}</p>
                  
                  <Button className="w-full festa-button text-white font-bold py-3 lg:py-4 rounded-xl lg:rounded-2xl text-sm lg:text-base">
                    🎮 Jogar Agora
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Rewards Section with Rich Visuals */}
      <div className="px-4 lg:px-8 py-16 lg:py-32 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-24">
            <h2 className="font-festa text-3xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-6 text-shadow-strong">
              🎁 Prêmios Incríveis
            </h2>
            <p className="text-lg lg:text-2xl xl:text-3xl text-purple-200">Troque seus pontos por recompensas reais!</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {featuredRewards.map((reward, index) => (
              <div
                key={reward.name}
                className={`group relative overflow-hidden glass-effect-strong rounded-3xl lg:rounded-[2rem] border-2 border-orange-300/30 hover:border-yellow-400/60 transition-all duration-500 hover-lift animate-slide-up`}
                style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
              >
                {/* Reward Image Background */}
                <div 
                  className="h-48 lg:h-64 xl:h-72 relative overflow-hidden reward-card-bg"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(245, 158, 11, 0.8), rgba(239, 68, 68, 0.6)), url(${reward.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 text-4xl lg:text-6xl group-hover:animate-bounce-gentle">{reward.emoji}</div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-orange-500/40 to-yellow-500/40 rounded-full border border-orange-400/50 backdrop-blur-sm">
                      <span className="text-yellow-300 font-bold text-sm lg:text-base">{reward.cost}</span>
                    </div>
                  </div>
                </div>

                {/* Reward Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="font-festa text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                    {reward.name}
                  </h3>
                  <p className="text-orange-200 text-sm lg:text-base mb-6">{reward.description}</p>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 lg:py-4 rounded-xl lg:rounded-2xl text-sm lg:text-base transition-all duration-300 hover:scale-105">
                    🎁 Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action with Background Image */}
      <div 
        className="px-4 lg:px-8 py-16 lg:py-24 text-center relative"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(236, 72, 153, 0.8)), url(https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h3 className="font-festa text-2xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 lg:mb-8 text-shadow-strong">
            Pronto para a aventura? 🚀
          </h3>
          <p className="text-base lg:text-xl xl:text-2xl text-purple-200 mb-8 lg:mb-12">
            Entre na festa e transforme sua espera em momentos inesquecíveis!
          </p>
          <Button
            onClick={() => tempNickname.trim() ? handleEnterFesta() : window.scrollTo({top: 0, behavior: 'smooth'})}
            className="festa-button text-lg lg:text-2xl xl:text-3xl py-4 lg:py-8 px-8 lg:px-16 font-festa font-bold rounded-2xl lg:rounded-3xl shadow-2xl"
          >
            {tempNickname.trim() ? '🎪 Entrar na Festa!' : '🎪 Começar Agora!'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
