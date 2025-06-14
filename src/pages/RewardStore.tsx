import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PointsDisplay from "@/components/PointsDisplay";
import { useUserData } from "@/hooks/useUserData";
import { userDataService } from "@/services/api";

const rewards = [
  {
    id: 1,
    name: "Milho Cozido",
    description: "Delícia tradicional servida na palha! Um clássico do arraiá!",
    cost: 200,
    emoji: "🌽",
    category: "Comidas",
    type: "BRONZE",
  },
  {
    id: 2,
    name: "Boca do Palhaço",
    description:
      "Brinquedo clássico do arraiá: acerte a bola na boca do palhaço!",
    cost: 200,
    emoji: "🤡",
    category: "Brinquedos",
    type: "BRONZE",
  },
  {
    id: 3,
    name: "Maçã do Amor",
    description: "Docinho caramelizado que não pode faltar na festa!",
    cost: 200,
    emoji: "🍎",
    category: "Comidas",
    type: "BRONZE",
  },
  {
    id: 4,
    name: "Pescaria",
    description:
      "Brincadeira tradicional com prêmios simbólicos, diversão garantida!",
    cost: 600,
    emoji: "🎣",
    category: "Brinquedos",
    type: "SILVER",
  },
  {
    id: 5,
    name: "Correio Elegante",
    description:
      "Envie uma mensagem divertida ou romântica para alguém especial!",
    cost: 600,
    emoji: "💌",
    category: "Interações",
    type: "SILVER",
  },
  {
    id: 6,
    name: "Barraca do Tiro ao Alvo",
    description:
      "Mostre sua pontaria nessa barraca cheia de desafios e prêmios!",
    cost: 600,
    emoji: "🎯",
    category: "Brinquedos",
    type: "SILVER",
  },
  {
    id: 7,
    name: "Show de Forró",
    description: "Acesso ao show ao vivo com banda de forró arretada!",
    cost: 1000,
    emoji: "🎤",
    category: "Atrações",
    type: "GOLD",
  },
  {
    id: 8,
    name: "Quadrilha Tradicional",
    description: "Participe da quadrilha com figurino típico e muita animação!",
    cost: 1000,
    emoji: "🕺💃",
    category: "Atrações",
    type: "GOLD",
  },
  {
    id: 9,
    name: "Canjica",
    description:
      "Doce cremoso de milho com coco, um dos favoritos da festa junina!",
    cost: 200,
    emoji: "🥣",
    category: "Comidas",
    type: "BRONZE",
  },
];

const RewardStore = () => {
  const { data: userData } = useUserData();
  const navigate = useNavigate();

  const [isLoadingId, setIsLoadingId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([]);

  const categories = [
    "Todos",
    "Visual",
    "Comunicação",
    "Comidas",
    "Áudio",
    "Descontos",
    "VIP",
    "Brindes",
  ];

  const filteredRewards =
    selectedCategory === "Todos"
      ? rewards
      : rewards.filter((reward) => reward.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "comum":
        return "border-gray-400/50 bg-gray-400/10";
      case "raro":
        return "border-blue-400/50 bg-blue-400/10";
      case "epico":
        return "border-purple-400/50 bg-purple-400/10";
      default:
        return "border-gray-400/50 bg-gray-400/10";
    }
  };

  const handleRedeem = async (reward: (typeof rewards)[0]) => {
    if (userData.coins < reward.cost) {
      alert("Você não tem moedas suficientes para resgatar este item.");
      return;
    }

    setIsLoadingId(reward.id);

    try {
      await userDataService.generateVoucher(
        userData.cpf,
        userData.email,
        reward.type.toUpperCase()
      );
      setRedeemedRewards((prev) => [...prev, reward.id]);
      alert("Voucher gerado com sucesso. O código foi enviado ao seu e-mail!");
    } catch (err) {
      console.error("Erro ao gerar voucher:", err);
      if (err?.response?.status === 429) {
        alert("Você já resgatou um voucher hoje. Tente novamente em 24h.");
      } else {
        alert(
          "Ocorreu um erro ao gerar o voucher. Tente novamente mais tarde."
        );
      }
    } finally {
      setIsLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-500 to-red-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <PointsDisplay />

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-400/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-500 bg-clip-text text-transparent mb-2">
              ⭐ Loja de Prêmios 🎁
            </h2>
            <p className="text-purple-200 font-poppins">
              Troque seus pontos por prêmios reais!
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-[#5e1c00]">
              Categorias
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-orange-700 text-white"
                      : "bg-white/10 text-[#5e1c00] hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredRewards.map((reward) => (
              <div
                key={reward.id}
                className={`rounded-xl border-2 transition-all hover:scale-105 ${
                  redeemedRewards.includes(reward.id)
                    ? "bg-green-400/20 border-green-400/50"
                    : userData?.coins >= reward.cost
                    ? getRarityColor(reward.type)
                    : "bg-gray-600/20 border-gray-600/50"
                }`}
              >
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{reward.emoji}</div>
                    <h3 className="font-bold text-white text-lg mb-2">
                      {reward.name}
                    </h3>
                    <p className="text-sm text-purple-200 mb-3">
                      {reward.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-orange-800">
                        {reward.cost} Moedas
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          reward.type === "comum"
                            ? "bg-gray-500/30 text-gray-300"
                            : reward.type === "raro"
                            ? "bg-blue-500/30 text-blue-300"
                            : "bg-purple-400/30 text-purple-200"
                        }`}
                      >
                        {reward.type}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    {redeemedRewards.includes(reward.id) ? (
                      <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
                        ✅ Resgatado
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleRedeem(reward)}
                        disabled={
                          userData?.coins < reward.cost ||
                          isLoadingId === reward.id
                        }
                        className={`w-full font-bold ${
                          userData?.coins >= reward.cost
                            ? "bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-700 hover:to-emerald-500 text-white"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {isLoadingId === reward.id
                          ? "Gerando..."
                          : userData?.coins >= reward.cost
                          ? "Resgatar"
                          : "XP Insuficiente"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/games")}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-red-600 hover:from-red-500 hover:to-yellow-400 text-white font-bold py-3 rounded-xl"
            >
              🎮 Voltar aos Jogos
            </Button>
            <Button
              onClick={() => navigate("/leaderboard")}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-red-600 hover:from-red-500 hover:to-yellow-400 text-white font-bold py-3 rounded-xl"
            >
              🏆 Ver Ranking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardStore;
