
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';

const avatars = ['🌽', '🎪', '🎭', '🔥', '🎵', '⭐', '🎯', '🏆'];

const Index = () => {
  const navigate = useNavigate();
  const { nickname, avatar, setUserProfile } = useGame();
  const [tempNickname, setTempNickname] = useState(nickname || '');
  const [tempAvatar, setTempAvatar] = useState(avatar || '🌽');

  const handleEnterFesta = () => {
    if (tempNickname.trim()) {
      setUserProfile(tempNickname.trim(), tempAvatar);
      navigate('/lobby');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-bounce delay-100">🎪</div>
        <div className="absolute top-20 right-20 text-4xl animate-bounce delay-300">🌽</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-500">🔥</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-bounce delay-700">🎭</div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-yellow-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Fila Junina</h1>
          <p className="text-lg text-gray-700 mb-4">🎉 Transforme sua espera em diversão! 🎉</p>
          <div className="text-6xl mb-4 animate-pulse">🎪</div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seu apelido na festa:
            </label>
            <Input
              type="text"
              placeholder="Digite seu apelido..."
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
              className="text-center text-lg border-2 border-orange-300 focus:border-orange-500"
              maxLength={15}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Escolha seu avatar:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {avatars.map((emojiAvatar) => (
                <button
                  key={emojiAvatar}
                  onClick={() => setTempAvatar(emojiAvatar)}
                  className={`text-3xl p-3 rounded-xl border-2 transition-all hover:scale-110 ${
                    tempAvatar === emojiAvatar
                      ? 'border-orange-500 bg-orange-100 scale-110'
                      : 'border-gray-300 hover:border-orange-300'
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
            className="w-full text-xl py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-2xl shadow-lg transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            🎪 Entrar na Festa! 🎪
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Jogue, ganhe pontos e troque por prêmios reais!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
