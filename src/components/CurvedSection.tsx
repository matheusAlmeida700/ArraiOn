
import React from 'react';

const CurvedSection = () => {
  const featuredGames = [
  {
    id: "quiz",
    name: "Quiz Junino",
    emoji: "🎓",
    xp: "10-30 XP",
    description: "Teste seus conhecimentos sobre festa junina",
    image: "/quiz.png",
  },
  {
    id: "memory",
    name: "Jogo da Memória",
    emoji: "🧠",
    xp: "15-25 XP",
    description: "Encontre os pares das tradições juninas",
    image: "/amnesia.png",
  },
  {
    id: "reaction",
    name: "Reflexo do Fogueteiro",
    emoji: "🎆",
    xp: "20-40 XP",
    description: "Teste sua velocidade e precisão",
    image: "/thinking.png",
  },
];
  return (
    <div className="relative mt-16">
      {/* Curved top using SVG for perfect curve */}
      <div className="relative">
        <svg 
          viewBox="0 0 1200 100" 
          className="w-full h-20 fill-[#F4A300]"
          preserveAspectRatio="none"
        >
          <path d="M0,100 C600,0 600,0 1200,100 L1200,100 L0,100 Z" />
        </svg>
      </div>
      
      {/* Main content section */}
      <div className="bg-[#F4A300]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-junina-brown mb-8 flex items-center justify-center">
            Enquanto a fila anda, a diversão não para!
          </h2>
          
          <div className="bg-orange-py-16 px-8 bg-opacity-20 rounded-lg p-8 mb-8">
            <p className="text-xl text-junina-brown leading-relaxed font-poppins">
              Ô trem bão, sô! Bem-vindo ao ArraiáON, a plataforma que transforma a sua 
              espera numa festança! Enquanto tu tá na fila, se divirta com nossos joguinhos 
              arretados, acumule XP e garanta seu voucher pra aproveitar ainda mais o arraiá. 
              Bata o chapéu e vem brincar com a gente! Simbora aproveitar, sô!
            </p>
          </div>
          
          <button className="bg-amber-900 text-white px-12 py-4 rounded-lg text-xl font-bold btn-junina transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
            BORA MEU FI!
          </button>
        </div>
      <section className="py-12 lg:py-16 xl:py-20 px-4 lg:px-8 xl:px-12 bg-[#F4A300] backdrop-blur-sm relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 lg:mb-12 xl:mb-16">
            <h2 className="font-festa text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-festa-text mb-3 lg:mb-4">
              Jogos em Destaque
            </h2>
            <p className="text-base lg:text-lg xl:text-xl text-black max-w-2xl mx-auto font-poppins">
              Diversão garantida enquanto você espera na fila
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
            {featuredGames.map((game, index) => (
              <div
                key={game.id}
                className={`group glass-effect-strong rounded-xl lg:rounded-2xl border border-festa-border/30 overflow-hidden hover-lift animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="h-40 lg:h-48 xl:h-56 relative overflow-hidden bg-festa-surface"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05)), url(${game.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-3 lg:top-4 right-3 lg:right-4 text-2xl lg:text-3xl xl:text-4xl group-hover:scale-110 transition-transform">
                    {game.emoji}
                  </div>
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4">
                    <span className="inline-flex items-center px-2 lg:px-3 py-1 bg-festa-accent/90 text-festa-surface-dark text-xs lg:text-sm font-semibold rounded-full">
                      {game.xp}
                    </span>
                  </div>
                </div>

                <div className="p-4 lg:p-5 xl:p-6">
                  <h3 className="font-festa text-lg lg:text-xl xl:text-2xl font-bold text-festa-text mb-2 group-hover:text-festa-accent transition-colors">
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
      </div>
    </div>
  );
};

export default CurvedSection;
