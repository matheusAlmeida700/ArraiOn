import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PointsDisplay from "@/components/PointsDisplay";
import { useGame } from "@/contexts/GameContext";
import { useUserData } from "@/hooks/useUserData";
import { userDataService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const rewards = [
  {
    id: 1,
    name: "Canjica Doce",
    description: "Uma deliciosa porção de canjica quentinha",
    cost: 200,
    emoji: "🥛",
    category: "Comidas",
    type: "BRONZE",
  },
  {
    id: 2,
    name: "Pamonha",
    description: "Pamonha tradicional feita na hora",
    cost: 200,
    emoji: "🌽",
    category: "Comidas",
    type: "BRONZE",
  },
  {
    id: 3,
    name: "Quentão",
    description: "Bebida quentinha para aquecer o coração",
    cost: 200,
    emoji: "🍵",
    category: "Bebidas",
    type: "BRONZE",
  },
  {
    id: 4,
    name: "Refrigerante",
    description: "Refrigerante gelado",
    cost: 200,
    emoji: "🥤",
    category: "Bebidas",
    type: "BRONZE",
  },
  {
    id: 5,
    name: "Chapéu de Palha",
    description: "Chapéu temático da festa",
    cost: 600,
    emoji: "👒",
    category: "Souvenirs",
    type: "SILVER",
  },
  {
    id: 6,
    name: "Bandeirinha",
    description: "Kit com 10 bandeirinhas coloridas",
    cost: 600,
    emoji: "🎪",
    category: "Souvenirs",
    type: "SILVER",
  },
  {
    id: 7,
    name: "Desconto 10%",
    description: "10% de desconto na próxima compra",
    cost: 1000,
    emoji: "💰",
    category: "Descontos",
    type: "GOLD",
  },
  {
    id: 8,
    name: "Desconto 20%",
    description: "20% de desconto na próxima compra",
    cost: 1000,
    emoji: "💎",
    category: "Descontos",
    type: "GOLD",
  },
];

const RewardStore = () => {
  const { user } = useAuth();
  console.log(user);

  const { data: userData } = useUserData();
  const navigate = useNavigate();
  const { addPoints } = useGame();

  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([]);

  const categories = ["Todos", "Comidas", "Bebidas", "Souvenirs", "Descontos"];

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
    console.log("Sending:", {
      cpf: user.cpf,
      email: user.email,
      type: reward.type,
    });
    if (userData.coins < reward.cost) return;

    try {
      await userDataService.generateVoucher(
        user.cpf,
        user.email,
        reward.type.toUpperCase()
      );
      setRedeemedRewards((prev) => [...prev, reward.id]);
      alert(`Voucher gerado com sucesso para ${reward.type}!`);
    } catch (err) {
      alert("Erro ao gerar voucher. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <PointsDisplay />

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-400/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
              🎁 Loja de Prêmios 🎁
            </h2>
            <p className="text-purple-200">
              Troque seus pontos por prêmios reais!
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-purple-200">
              Categorias
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-yellow-600 text-white"
                      : "bg-white/10 text-yellow-300 hover:bg-white/20"
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
                      <span className="text-lg font-bold text-yellow-400">
                        {reward.cost} Moedas
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          reward.type === "comum"
                            ? "bg-gray-500/30 text-gray-300"
                            : reward.type === "raro"
                            ? "bg-blue-500/30 text-blue-300"
                            : "bg-purple-500/30 text-purple-300"
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
                        disabled={userData?.coins < reward.cost}
                        className={`w-full font-bold ${
                          userData?.coins >= reward.cost
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {userData?.coins >= reward.cost
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
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl"
            >
              🎮 Voltar aos Jogos
            </Button>
            <Button
              onClick={() => navigate("/leaderboard")}
              className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 rounded-xl"
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
