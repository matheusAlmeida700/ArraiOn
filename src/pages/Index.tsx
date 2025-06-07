
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
    description: 'Teste seus conhecimentos sobre festa junina',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400',
  },
  { 
    id: 'memory', 
    name: 'Jogo da Memória', 
    emoji: '🧠', 
    xp: '15-25 XP', 
    description: 'Encontre os pares das tradições juninas',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400',
  },
  { 
    id: 'reaction', 
    name: 'Reflexo do Fogueteiro', 
    emoji: '🎆', 
    xp: '20-40 XP', 
    description: 'Teste sua velocidade e precisão',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400',
  },
];

const featuredRewards = [
  { 
    name: 'Canjica Doce', 
    emoji: '🥛', 
    cost: '50 XP', 
    description: 'Deliciosa e quentinha para aquecer o coração',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300'
  },
  { 
    name: 'Pamonha Tradicional', 
    emoji: '🌽', 
    cost: '75 XP', 
    description: 'O sabor autêntico da festa junina',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300'
  },
  { 
    name: 'Chapéu de Palha', 
    emoji: '👒', 
    cost: '120 XP', 
    description: 'Complete seu visual caipira com estilo',
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
    <div className="min-h-screen festa-bg text-festa-text overflow-hidden relative">
      {/* Subtle Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div 
          className="absolute top-20 left-10 lg:top-32 lg:left-20 text-4xl lg:text-6xl opacity-40 animate-float"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          🎪
        </div>
        <div 
          className="absolute top-1/3 right-10 lg:right-20 text-3xl lg:text-5xl opacity-30 animate-bounce-gentle"
          style={{ transform: `translateY(${scrollY * 0.08}px)`, animationDelay: '1s' }}
        >
          🌽
        </div>
        <div 
          className="absolute bottom-1/3 left-10 lg:left-20 text-3xl lg:text-5xl opacity-35 animate-float"
          style={{ transform: `translateY(${scrollY * 0.03}px)`, animationDelay: '2s' }}
        >
          🔥
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-banner min-h-screen flex items-center justify-center px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className={`space-y-8 lg:space-y-12 transition-all duration-1000 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-festa-accent/10 border border-festa-accent/20 rounded-full backdrop-blur-sm">
                  <span className="text-festa-accent font-medium text-sm lg:text-base">🎉 Festa Junina 2024</span>
                </div>
                
                <h1 className="font-festa text-4xl lg:text-6xl xl:text-7xl font-bold text-festa-text leading-tight">
                  Transforme sua espera em{' '}
                  <span className="bg-gradient-to-r from-festa-accent to-festa-secondary bg-clip-text text-transparent">
                    diversão
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-festa-text-light leading-relaxed max-w-2xl">
                  Jogue, ganhe pontos e troque por prêmios reais enquanto aproveita a festa junina. 
                  Uma experiência única que torna cada momento especial.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => tempNickname.trim() ? handleEnterFesta() : window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
                  className="festa-button text-white font-festa font-semibold py-4 px-8 rounded-xl text-lg shadow-lg"
                >
                  {tempNickname.trim() ? '🎪 Entrar na Festa!' : '🎪 Começar Agora!'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/games')}
                  className="border-festa-border bg-festa-surface/50 hover:bg-festa-surface text-festa-text font-medium py-4 px-8 rounded-xl text-lg backdrop-blur-sm"
                >
                  Ver Jogos
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {avatars.slice(0, 4).map((emoji, index) => (
                    <div
                      key={emoji}
                      className="w-10 h-10 bg-festa-surface border-2 border-festa-border rounded-full flex items-center justify-center text-lg"
                      style={{ zIndex: 4 - index }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-festa-text-muted">
                  <span className="font-semibold text-festa-text">500+</span> jogadores ativos
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}>
              <div className="glass-effect-ultra rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-festa-border/30 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="text-5xl lg:text-6xl mb-4 animate-bounce-gentle">🎪</div>
                  <h2 className="font-festa text-2xl lg:text-3xl font-bold text-festa-text mb-2">
                    Entre na Festa!
                  </h2>
                  <p className="text-festa-text-light">
                    Crie seu perfil e comece a diversão
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-festa-text">
                      Seu apelido na festa
                    </label>
                    <Input
                      type="text"
                      placeholder="Digite seu apelido..."
                      value={tempNickname}
                      onChange={(e) => setTempNickname(e.target.value)}
                      className="text-center text-lg border-festa-border/50 bg-festa-surface/30 backdrop-blur-sm text-festa-text placeholder-festa-text-muted focus:border-festa-accent focus:ring-festa-accent/20 rounded-xl h-12"
                      maxLength={15}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-festa-text">
                      Escolha seu avatar
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {avatars.map((emojiAvatar) => (
                        <button
                          key={emojiAvatar}
                          onClick={() => setTempAvatar(emojiAvatar)}
                          className={`text-2xl lg:text-3xl p-3 lg:p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                            tempAvatar === emojiAvatar
                              ? 'border-festa-accent bg-festa-accent/10 scale-105'
                              : 'border-festa-border/30 hover:border-festa-accent/50 bg-festa-surface/20'
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
                    className="w-full festa-button text-white font-festa font-semibold py-4 rounded-xl text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🎪 Começar a Festa!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
          <div className="text-festa-text-muted text-center">
            <div className="text-2xl mb-1">↓</div>
            <p className="text-sm">Explore mais</p>
          </div>
        </div>
      </div>

      {/* Featured Games Section */}
      <section className="py-16 lg:py-24 px-4 lg:px-8 bg-festa-surface/30 backdrop-blur-sm relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-festa text-3xl lg:text-5xl font-bold text-festa-text mb-4">
              Jogos em Destaque
            </h2>
            <p className="text-lg lg:text-xl text-festa-text-light max-w-2xl mx-auto">
              Diversão garantida enquanto você espera na fila
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredGames.map((game, index) => (
              <div
                key={game.id}
                className={`group glass-effect-strong rounded-2xl border border-festa-border/30 overflow-hidden hover-lift cursor-pointer animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/games/${game.id}`)}
              >
                <div 
                  className="h-48 lg:h-56 relative overflow-hidden bg-festa-surface"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(${game.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute top-4 right-4 text-3xl lg:text-4xl group-hover:scale-110 transition-transform">
                    {game.emoji}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 bg-festa-accent/90 text-festa-surface-dark text-sm font-semibold rounded-full">
                      {game.xp}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-festa text-xl lg:text-2xl font-bold text-festa-text mb-2 group-hover:text-festa-accent transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-festa-text-light text-sm lg:text-base leading-relaxed">
                    {game.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rewards Section */}
      <section className="py-16 lg:py-24 px-4 lg:px-8 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-festa text-3xl lg:text-5xl font-bold text-festa-text mb-4">
              Prêmios Incríveis
            </h2>
            <p className="text-lg lg:text-xl text-festa-text-light max-w-2xl mx-auto">
              Troque seus pontos por recompensas reais da festa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredRewards.map((reward, index) => (
              <div
                key={reward.name}
                className={`group glass-effect-strong rounded-2xl border border-festa-border/30 overflow-hidden hover-lift animate-slide-up`}
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <div 
                  className="h-48 lg:h-56 relative overflow-hidden bg-festa-surface"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(${reward.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute top-4 right-4 text-3xl lg:text-4xl group-hover:scale-110 transition-transform">
                    {reward.emoji}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 bg-festa-warning/90 text-festa-surface-dark text-sm font-semibold rounded-full">
                      {reward.cost}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-festa text-xl lg:text-2xl font-bold text-festa-text mb-2 group-hover:text-festa-accent transition-colors">
                    {reward.name}
                  </h3>
                  <p className="text-festa-text-light text-sm lg:text-base leading-relaxed">
                    {reward.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-20 px-4 lg:px-8 bg-festa-surface-dark/50 backdrop-blur-sm text-center relative">
        <div className="container mx-auto max-w-4xl">
          <h3 className="font-festa text-2xl lg:text-4xl font-bold text-festa-text mb-4">
            Pronto para a aventura?
          </h3>
          <p className="text-lg lg:text-xl text-festa-text-light mb-8 max-w-2xl mx-auto">
            Entre na festa e transforme sua espera em momentos inesquecíveis de diversão e descoberta.
          </p>
          <Button
            onClick={() => tempNickname.trim() ? handleEnterFesta() : window.scrollTo({top: 0, behavior: 'smooth'})}
            className="festa-button text-white font-festa font-semibold py-4 px-8 rounded-xl text-lg shadow-lg"
          >
            {tempNickname.trim() ? '🎪 Entrar na Festa!' : '🎪 Começar Agora!'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
