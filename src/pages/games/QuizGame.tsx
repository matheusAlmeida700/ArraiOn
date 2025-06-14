import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { userDataService } from "@/services/api";

const questions = [
  {
    question: "Qual é o mês tradicional das Festas Juninas?",
    options: ["Maio", "Junho", "Julho", "Agosto"],
    correct: 1,
  },
  {
    question: "Qual santo é homenageado no dia 24 de junho?",
    options: ["Santo Antônio", "São João", "São Pedro", "São Paulo"],
    correct: 1,
  },
  {
    question: "Qual dança é típica das Festas Juninas?",
    options: ["Samba", "Forró", "Valsa", "Tango"],
    correct: 1,
  },
  {
    question: "Qual comida NÃO é típica das Festas Juninas?",
    options: ["Pamonha", "Quentão", "Sushi", "Canjica"],
    correct: 2,
  },
  {
    question: "As fogueiras juninas representam:",
    options: [
      "Purificação",
      "Aquecimento",
      "Iluminação",
      "Todas as anteriores",
    ],
    correct: 3,
  },
];

const QuizGame = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const { addPoints, incrementStreak, resetStreak } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1);
    }
  }, [timeLeft, showResult, gameEnded]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
      incrementStreak();
    } else {
      resetStreak();
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(15);
      } else {
        setGameEnded(true);
        const finalPoints = score + (isCorrect ? 1 : 0);
        const earnedPoints = finalPoints * 6;
        addPoints(earnedPoints);
        if (user) {
          userDataService.updateCoins(user.id, earnedPoints);
        }
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(15);
    setGameEnded(false);
  };

  if (gameEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-4 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-lg border-2 border-yellow-300 text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            Quiz Finalizado!
          </h2>
          <p className="text-lg mb-4">
            Você acertou {score} de {questions.length} perguntas!
          </p>
          <p className="text-xl font-bold text-green-600 mb-6">
            +{score * 6} pontos ganhos! 🎉
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
              Pergunta {currentQuestion + 1} de {questions.length}
            </div>
            <div
              className={`text-lg font-bold ${
                timeLeft <= 5 ? "text-red-500" : "text-green-500"
              }`}
            >
              ⏰ {timeLeft}s
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h3>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  showResult
                    ? index === questions[currentQuestion].correct
                      ? "bg-green-100 border-green-500 text-green-800"
                      : selectedAnswer === index
                      ? "bg-red-100 border-red-500 text-red-800"
                      : "bg-gray-100 border-gray-300 text-gray-600"
                    : "bg-yellow-50 border-orange-300 hover:border-orange-500 hover:bg-orange-50 hover:scale-105"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-4 text-center">
              {selectedAnswer === questions[currentQuestion].correct ? (
                <div className="text-green-600 font-bold">
                  ✅ Correto! +6 pontos
                </div>
              ) : (
                <div className="text-red-600 font-bold">
                  ❌ Resposta incorreta!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
