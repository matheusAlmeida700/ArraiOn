import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUserData";
import { Trophy, Medal, Award, Crown, Star, TrendingUp } from "lucide-react";

const Leaderboard = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando ranking...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Erro ao carregar o ranking</p>
          <Button onClick={() => navigate("/games")}>Voltar ao Lobby</Button>
        </div>
      </div>
    );
  }

  // Sort users by points (coins) and add position
  const sortedUsers = (users || [])
    .filter(user => user.coins !== undefined)
    .sort((a, b) => (b.coins || 0) - (a.coins || 0))
    .slice(0, 10)
    .map((user, index) => ({
      ...user,
      position: index + 1,
      points: user.coins || 0
    }));

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankBadgeVariant = (position: number) => {
    switch (position) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  const getRankGradient = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
      case 3:
        return "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200";
      default:
        return "bg-white border-border";
    }
  };

  const topThree = sortedUsers.slice(0, 3);
  const otherUsers = sortedUsers.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgb(59 130 246) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgb(147 51 234) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Ranking da Festa
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja quem está mandando bem na fila! Complete os jogos para subir no ranking.
          </p>
        </div>

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <Card className="mb-8 overflow-hidden border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                Top 3 Jogadores
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 2nd Place */}
                {topThree[1] && (
                  <div className="order-1 md:order-1">
                    <div className={`p-6 rounded-xl border-2 ${getRankGradient(2)} transition-all hover:shadow-md`}>
                      <div className="text-center">
                        <div className="mb-4 flex justify-center">
                          {getRankIcon(2)}
                        </div>
                        <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-gray-300">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[1].username}`} />
                          <AvatarFallback className="text-lg font-bold">
                            {topThree[1].username?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg mb-2 text-foreground">
                          {topThree[1].username}
                        </h3>
                        <Badge variant={getRankBadgeVariant(2)} className="mb-2">
                          2º Lugar
                        </Badge>
                        <p className="text-2xl font-bold text-gray-600">
                          {topThree[1].points} pts
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1st Place - Larger */}
                {topThree[0] && (
                  <div className="order-2 md:order-2">
                    <div className={`p-8 rounded-xl border-2 ${getRankGradient(1)} transition-all hover:shadow-lg transform md:scale-105`}>
                      <div className="text-center">
                        <div className="mb-4 flex justify-center">
                          {getRankIcon(1)}
                        </div>
                        <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-yellow-300">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[0].username}`} />
                          <AvatarFallback className="text-xl font-bold">
                            {topThree[0].username?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-xl mb-2 text-foreground">
                          {topThree[0].username}
                        </h3>
                        <Badge variant={getRankBadgeVariant(1)} className="mb-3">
                          🏆 Campeão
                        </Badge>
                        <p className="text-3xl font-bold text-yellow-600">
                          {topThree[0].points} pts
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <div className="order-3 md:order-3">
                    <div className={`p-6 rounded-xl border-2 ${getRankGradient(3)} transition-all hover:shadow-md`}>
                      <div className="text-center">
                        <div className="mb-4 flex justify-center">
                          {getRankIcon(3)}
                        </div>
                        <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-orange-300">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[2].username}`} />
                          <AvatarFallback className="text-lg font-bold">
                            {topThree[2].username?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg mb-2 text-foreground">
                          {topThree[2].username}
                        </h3>
                        <Badge variant={getRankBadgeVariant(3)} className="mb-2">
                          3º Lugar
                        </Badge>
                        <p className="text-2xl font-bold text-orange-600">
                          {topThree[2].points} pts
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Rankings */}
        {otherUsers.length > 0 && (
          <Card className="mb-8 overflow-hidden border shadow-lg">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-center">Outros Participantes</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {otherUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-6 transition-all hover:bg-muted/20 ${getRankGradient(user.position)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          {getRankIcon(user.position)}
                          <Badge variant="outline" className="min-w-[60px] justify-center">
                            {user.position}º
                          </Badge>
                        </div>
                        <Avatar className="w-12 h-12 border-2 border-border">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                          <AvatarFallback className="font-bold">
                            {user.username?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {user.username}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Participante
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          {user.points}
                        </p>
                        <p className="text-sm text-muted-foreground">pontos</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {(!users || users.length === 0) && (
          <Card className="text-center py-12">
            <CardContent>
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum jogador encontrado</h3>
              <p className="text-muted-foreground mb-6">
                Seja o primeiro a jogar e aparecer no ranking!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/games")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            size="lg"
          >
            🎮 Voltar aos Jogos
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="px-8 py-3 text-lg"
            size="lg"
          >
            🏠 Página Inicial
          </Button>
        </div>

        {/* Stats Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-muted/50 to-muted/30 border-0">
            <CardContent className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{users?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Jogadores Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {sortedUsers.reduce((sum, user) => sum + user.points, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Pontos Distribuídos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">6</p>
                  <p className="text-sm text-muted-foreground">Jogos Disponíveis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
