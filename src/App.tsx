import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import GamesCatalog from "./pages/GamesCatalog";
import GameDetails from "./pages/GameDetails";
import RewardStore from "./pages/RewardStore";
import Leaderboard from "./pages/Leaderboard";
import QuizGame from "./pages/games/QuizGame";
import MemoryGame from "./pages/games/MemoryGame";
import ReactionGame from "./pages/games/ReactionGame";
import PinTheGame from "./pages/games/PinTheGame";
import RhythmGame from "./pages/games/RhythmGame";
import NumberGame from "./pages/games/NumberGame";
import NotFound from "./pages/NotFound";
import { GameProvider } from "./contexts/GameContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <GameProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/games" element={<GamesCatalog />} />
              <Route path="/games/:gameId" element={<GameDetails />} />
              <Route path="/rewards" element={<RewardStore />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/play/quiz" element={<QuizGame />} />
              <Route path="/play/memory" element={<MemoryGame />} />
              <Route path="/play/reaction" element={<ReactionGame />} />
              <Route path="/play/pin-the-tail" element={<PinTheGame />} />
              <Route path="/play/rhythm" element={<RhythmGame />} />
              <Route path="/play/number" element={<NumberGame />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
