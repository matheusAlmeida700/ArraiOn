
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import PointsDisplay from '@/components/PointsDisplay';

const rewards = [
  {
    id: 1,
    name: 'Canjica Doce',
    description: 'Uma deliciosa porção de canjica quentinha',
    cost: 50,
    emoji: '🥛',
    category: 'Comidas'
  },
  {
    id: 2,
    name: 'Pamonha',
    description: 'Pamonha tradicional feita na hora',
    cost: 75,
    emoji: '🌽',
    category: 'Comidas'
  },
  {
    id: 3,
    name: 'Quentão',
    description: 'Bebida quentinha para aquecer o coração',
    cost: 40,
    emoji: '🍵',
    category: 'Bebidas'
  },
  {
    id: 4,
    name: 'Refrigerante',
    description: 'Refrigerante gelado',
    cost: 30,
    emoji: '🥤',
    category: 'Bebidas'
  },
  {
    id: 5,
    name: 'Chapéu de Palha',
    description: 'Chapéu temático da festa',
    cost: 120,
    emoji: '👒',
    category: 'Souvenirs'
  },
  {
    id: 6,
    name: 'Bandeirinha',
    description: 'Kit com 10 bandeirinhas coloridas',
    cost: 80,
    emoji: '🎪',
    category: 'Souvenirs'
  },
  {
    id: 7,
    name: 'Desconto 10%',
    description: '10% de desconto na próxima compra',
    cost: 100,
    emoji: '💰',
    category: 'Descontos'
  },
  {
    id: 8,
    name: 'Desconto 20%',
    description: '20% de desconto na próxima compra',
    cost: 200,
    emoji: '💎',
    category: 'Descontos'
  }
];

const RewardStore = () => {
  const navigate = useNavigate();
  const { points, addPoints } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([]);

  const categories = ['Todos', 'Comidas', 'Bebidas', 'Souvenirs', 'Descontos'];

  const filteredRewards = selectedCategory === 'Todos' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (points >= reward.cost) {
      addPoints(-reward.cost);
      setRedeemedRewards(prev => [...prev, reward.id]);
      
      // Show success animation/feedback here
      console.log(`Redeemed: ${reward.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4">
      <div className="max-w-md mx-auto">
        <PointsDisplay />
        
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-yellow-300">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-orange-600 mb-2">🎁 Loja de Prêmios 🎁</h2>
            <p className="text-sm text-gray-600">Troque seus pontos por prêmios reais!</p>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Rewards Grid */}
          <div className="space-y-4 mb-6">
            {filteredRewards.map((reward) => (
              <div
                key={reward.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  redeemedRewards.includes(reward.id)
                    ? 'bg-green-100 border-green-300'
                    : points >= reward.cost
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-300'
                    : 'bg-gray-100 border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{reward.emoji}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{reward.name}</h3>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                      <p className="text-sm font-medium text-orange-600">{reward.cost} pontos</p>
                    </div>
                  </div>
                  
                  <div>
                    {redeemedRewards.includes(reward.id) ? (
                      <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-bold">
                        ✅ Resgatado
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleRedeem(reward)}
                        disabled={points < reward.cost}
                        className={`px-4 py-2 rounded-lg font-bold text-sm ${
                          points >= reward.cost
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {points >= reward.cost ? 'Resgatar' : 'Insuficiente'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => navigate('/lobby')}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl"
          >
            🎪 Voltar ao Lobby
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RewardStore;
