import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { userDataService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const ReactionGame = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const { addPoints, incrementStreak, resetStreak } = useGame();
  const [gameState, setGameState] = useState<
    "waiting" | "ready" | "go" | "clicked" | "ended"
  >("waiting");
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [currentReactionTime, setCurrentReactionTime] = useState<number | null>(
    null
  );
  const [startTime, setStartTime] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (round <= totalRounds) {
      startRound();
    } else {
      endGame();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [round]);

  const startRound = () => {
    setGameState("waiting");
    setCurrentReactionTime(null);

    const delay = Math.random() * 3000 + 2000;

    timeoutRef.current = setTimeout(() => {
      setGameState("go");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === "waiting" || gameState === "ready") {
      setGameState("clicked");
      setCurrentReactionTime(-1);
      resetStreak();

      setTimeout(() => {
        setRound((prev) => prev + 1);
      }, 2000);
    } else if (gameState === "go") {
      const reactionTime = Date.now() - (startTime || 0);
      setCurrentReactionTime(reactionTime);
      setReactionTimes((prev) => [...prev, reactionTime]);
      setGameState("clicked");
      incrementStreak();

      setTimeout(() => {
        setRound((prev) => prev + 1);
      }, 2000);
    }
  };

  const endGame = () => {
    setGameState("ended");
    const validTimes = reactionTimes.filter((time) => time > 0);
    const averageTime =
      validTimes.length > 0
        ? validTimes.reduce((a, b) => a + b, 0) / validTimes.length
        : 0;

    let points = 0;
    if (averageTime > 0) {
      if (averageTime < 300) points = 40;
      else if (averageTime < 500) points = 30;
      else if (averageTime < 700) points = 20;
      else if (averageTime < 1000) points = 15;
      else points = 10;

      points += validTimes.length * 2;
    }

    addPoints(points);
    if (user) {
      userDataService.updateCoins(user.id, points);
    }
  };

  const resetGame = () => {
    setGameState("waiting");
    setRound(1);
    setReactionTimes([]);
    setCurrentReactionTime(null);
    setStartTime(null);
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case "waiting":
        return "from-red-400 to-red-600";
      case "go":
        return "from-green-400 to-green-600";
      case "clicked":
        return currentReactionTime === -1
          ? "from-gray-400 to-gray-600"
          : "from-blue-400 to-blue-600";
      default:
        return "from-orange-400 to-red-500";
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case "waiting":
        return "Aguarde o foguete aparecer...";
      case "go":
        return "CLIQUE AGORA! 🎆";
      case "clicked":
        return currentReactionTime === -1
          ? "Muito cedo! Aguarde o sinal!"
          : `Ótimo! ${currentReactionTime}ms`;
      default:
        return "Reflexo do Fogueteiro";
    }
  };

  if (gameState === "ended") {
    const validTimes = reactionTimes.filter((time) => time > 0);
    const averageTime =
      validTimes.length > 0
        ? validTimes.reduce((a, b) => a + b, 0) / validTimes.length
        : 0;
    const points =
      averageTime > 0
        ? Math.max(
            10,
            Math.floor((1000 / averageTime) * 10) + validTimes.length * 2
          )
        : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-lg border-2 border-yellow-300 text-center">
          <div className="text-6xl mb-4">🎆</div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            Teste Finalizado!
          </h2>
          <p className="text-lg mb-2">
            Reflexos válidos: {validTimes.length}/{totalRounds}
          </p>
          {averageTime > 0 && (
            <p className="text-lg mb-2">
              Tempo médio: {Math.round(averageTime)}ms
            </p>
          )}
          <p className="text-xl font-bold text-green-600 mb-6">
            +{points} pontos ganhos! 🎉
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
    <div
      className={`min-h-screen bg-gradient-to-br ${getBackgroundColor()} p-4 flex flex-col`}
    >
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-yellow-300 mb-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              Rodada {round}/{totalRounds}
            </span>
            <span>Reflexos: {reactionTimes.filter((t) => t > 0).length}</span>
          </div>
        </div>

        <div
          className="flex-1 flex flex-col items-center justify-center cursor-pointer"
          onClick={handleClick}
        >
          <div className="text-center text-white">
            <div className="text-8xl mb-8">
              {gameState === "go"
                ? "🎆"
                : gameState === "clicked" && currentReactionTime !== -1
                ? "✨"
                : "⏳"}
            </div>
            <h2 className="text-2xl font-bold mb-4">{getMessage()}</h2>

            {gameState === "waiting" && (
              <p className="text-lg opacity-80">
                Clique quando ver o foguete! 🎆
              </p>
            )}

            {gameState === "clicked" &&
              currentReactionTime !== null &&
              currentReactionTime > 0 && (
                <div className="text-lg">
                  <p>Tempo de reação: {currentReactionTime}ms</p>
                  <p className="mt-2">
                    {currentReactionTime < 300
                      ? "🔥 Incrível!"
                      : currentReactionTime < 500
                      ? "⚡ Muito bom!"
                      : currentReactionTime < 700
                      ? "👍 Bom!"
                      : "🐌 Pode melhorar!"}
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionGame;
