import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import DecorativeBanner from "@/components/DecorativeBanner";
import SiteHeader from "@/components/SiteHeader";
import Carousel from "@/components/Carousel";
import CurvedSection from "@/components/CurvedSection";




const featuredRewards = [
  {
    name: "Canjica Doce",
    emoji: "🥛",
    cost: "50 XP",
    description: "Deliciosa e quentinha para aquecer o coração",
    image: "https://www.lecreuset.com.br/dw/image/v2/BDRT_PRD/on/demandware.static/-/Sites-le-creuset-br-master/default/dw46131ac0/images/canjica_com_doce_de_leite_receita_le_creuset.png?sw=650&sh=650&sm=fit",
  },
  {
    name: "Pamonha Tradicional",
    emoji: "🌽",
    cost: "75 XP",
    description: "O sabor autêntico da festa junina",
    image: "https://www.saborbrasil.it/wp-content/uploads/2021/06/Pamonha-1024x768.jpg",
  },
  {
    name: "Chapéu de Palha",
    emoji: "👒",
    cost: "120 XP",
    description: "Complete seu visual caipira com estilo",
    image: "https://cdn.awsli.com.br/600x700/1356/1356487/produto/100720274/0c466e71d4.jpg",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { nickname, avatar, setUserProfile } = useGame();
  const [tempNickname, setTempNickname] = useState(nickname || "");
  const [tempAvatar, setTempAvatar] = useState(avatar || "🌽");
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnterFesta = () => {
    if (tempNickname.trim()) {
      setUserProfile(tempNickname.trim(), tempAvatar);
      navigate("/games");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5e9d3] text-festa-text overflow-hidden relative">
    {/* Decorative top banner */}
      <DecorativeBanner />
      
      {/* Main content area */}
      <div className="container mx-auto px-4 py-8">
        {/* Site header with title and icons */}
        <SiteHeader />
        
        {/* Main carousel section */}
        <div className="mb-16">
          <Carousel />
        </div>
      </div>
      
      {/* Curved bottom section */}
      <CurvedSection />

      {/* Featured Games Section */}
      

      {/* Featured Rewards Section */}
      <section className="py-12 lg:py-16 xl:py-20 px-4 lg:px-8 xl:px-12 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 lg:mb-12 xl:mb-16">
            <h2 className="font-festa text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-festa-text mb-3 lg:mb-4">
              Prêmios Incríveis
            </h2>
            <p className="text-base lg:text-lg xl:text-xl text-festa-text-light max-w-2xl mx-auto font-poppins">
              Troque seus pontos por recompensas reais da festa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
            {featuredRewards.map((reward, index) => (
              <div
                key={reward.name}
                className={`group glass-effect-strong rounded-xl lg:rounded-2xl border border-festa-border/30 overflow-hidden hover-lift animate-slide-up`}
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <div
                  className="h-40 lg:h-48 xl:h-56 relative overflow-hidden bg-festa-surface"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05)), url(${reward.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-3 lg:top-4 right-3 lg:right-4 text-2xl lg:text-3xl xl:text-4xl group-hover:scale-110 transition-transform">
                    {reward.emoji}
                  </div>
                  <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4">
                    <span className="inline-flex items-center px-2 lg:px-3 py-1 bg-festa-warning/90 text-festa-surface-dark text-xs lg:text-sm font-semibold rounded-full">
                      {reward.cost}
                    </span>
                  </div>
                </div>

                <div className="p-4 lg:p-5 xl:p-6">
                  <h3 className="font-festa text-lg lg:text-xl xl:text-2xl font-bold text-festa-text mb-2 group-hover:text-festa-accent transition-colors">
                    {reward.name}
                  </h3>
                  <p className="text-festa-text-light text-sm lg:text-base leading-relaxed font-poppins">
                    {reward.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 lg:py-16 xl:py-20 px-4 lg:px-8 xl:px-12 bg-[#c1440e] backdrop-blur-sm text-center relative">
        <div className="container mx-auto max-w-4xl">
          <h3 className="font-festa text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-festa-text mb-3 lg:mb-4">
            Pronto para a aventura?
          </h3>
          <p className="text-base lg:text-lg xl:text-xl text-festa-text-light mb-6 lg:mb-8 max-w-2xl mx-auto">
            Entre na festa e transforme sua espera em momentos inesquecíveis de
            diversão e descoberta.
          </p>
          <Button
            onClick={handleEnterFesta}
            className="festa-button text-white font-festa font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl text-base lg:text-lg shadow-lg"
          >
             Entrar na Festa!
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
