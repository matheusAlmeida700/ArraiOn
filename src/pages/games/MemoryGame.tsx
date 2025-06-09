import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { userDataService } from "@/services/api";

const symbols = ["🌽", "🎪", "🔥", "🎭", "🎵", "⭐", "🎯", "🏆"];

const MemoryGame = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addPoints, incrementStreak, resetStreak } = useGame();
  const [cards, setCards] = useState<
    Array<{
      id: number;
      symbol: string;
      isFlipped: boolean;
      isMatched: boolean;
    }>
  >([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameEnded) {
      endGame();
    }
  }, [timeLeft, gameEnded]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find((card) => card.id === first);
      const secondCard = cards.find((card) => card.id === second);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatches((prev) => prev + 1);
          setFlippedCards([]);
          incrementStreak();
        }, 1000);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          resetStreak();
        }, 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matches === symbols.length && !gameEnded) {
      endGame();
    }
  }, [matches]);

  const initializeGame = () => {
    const duplicatedSymbols = [...symbols, ...symbols];
    const shuffled = duplicatedSymbols
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
  };

  const endGame = () => {
    setGameEnded(true);
    const completed = matches === symbols.length;
    const basePoints = completed ? 25 : Math.max(5, matches * 2);
    const timeBonus = completed ? Math.max(0, timeLeft) : 0;
    const totalPoints = basePoints + timeBonus;
    addPoints(totalPoints);
    if (user) {
      userDataService.updateCoins(user.id, totalPoints);
    }
  };

  const flipCard = (id: number) => {
    if (flippedCards.length === 2 || gameEnded) return;

    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards((prev) => [...prev, id]);
  };

  const resetGame = () => {
    setMatches(0);
    setMoves(0);
    setGameEnded(false);
    setTimeLeft(60);
    setFlippedCards([]);
    initializeGame();
  };

  if (gameEnded) {
    const completed = matches === symbols.length;
    const basePoints = completed ? 25 : Math.max(5, matches * 2);
    const timeBonus = completed ? Math.max(0, timeLeft) : 0;
    const totalPoints = basePoints + timeBonus;

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-lg border-2 border-yellow-300 text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            {completed ? "Parabéns!" : "Tempo Esgotado!"}
          </h2>
          <p className="text-lg mb-2">
            Você encontrou {matches} de {symbols.length} pares!
          </p>
          <p className="text-lg mb-2">Jogadas: {moves}</p>
          {completed && (
            <p className="text-lg mb-2">Tempo restante: {timeLeft}s</p>
          )}
          <p className="text-xl font-bold text-green-600 mb-6">
            +{totalPoints} pontos ganhos! 🎉
          </p>

          <div className="space-y-3">
            <Button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl"
            >
              🔄 Jogar Novamente
            </Button>
            <Button
              onClick={() => navigate("/games")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl"
            >
              🎪 Voltar ao Lobby
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-yellow-300">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              Pares: {matches}/{symbols.length} | Jogadas: {moves}
            </div>
            <div
              className={`text-lg font-bold ${
                timeLeft <= 10 ? "text-red-500" : "text-green-500"
              }`}
            >
              ⏰ {timeLeft}s
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🧠</div>
            <h3 className="text-lg font-bold text-gray-800">
              Jogo da Memória Junino
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => flipCard(card.id)}
                className={`aspect-square rounded-xl border-2 text-2xl font-bold transition-all transform ${
                  card.isFlipped || card.isMatched
                    ? card.isMatched
                      ? "bg-green-100 border-green-500 scale-95"
                      : "bg-yellow-100 border-orange-500"
                    : "bg-gradient-to-br from-orange-200 to-yellow-200 border-orange-300 hover:scale-105 hover:shadow-lg"
                }`}
                disabled={
                  card.isFlipped || card.isMatched || flippedCards.length === 2
                }
              >
                {card.isFlipped || card.isMatched ? card.symbol : "❓"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
