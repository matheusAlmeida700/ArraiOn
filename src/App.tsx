
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GameLobby from "./pages/GameLobby";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lobby" element={<GameLobby />} />
            <Route path="/rewards" element={<RewardStore />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/games/quiz" element={<QuizGame />} />
            <Route path="/games/memory" element={<MemoryGame />} />
            <Route path="/games/reaction" element={<ReactionGame />} />
            <Route path="/games/pin-the-tail" element={<PinTheGame />} />
            <Route path="/games/rhythm" element={<RhythmGame />} />
            <Route path="/games/number" element={<NumberGame />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
