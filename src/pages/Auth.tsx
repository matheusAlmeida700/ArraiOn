import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    cpf: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/games" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (activeTab === "login") {
        await login(formData.email, formData.password);
        navigate("/games");
      } else {
        if (!formData.username || formData.username.trim() === "") {
          throw new Error("Nome é obrigatório");
        }
        await signup(
          formData.username,
          formData.email,
          formData.cpf,
          formData.password
        );
        toast({
          title: "Conta criada",
          description: "Sua conta foi criada com sucesso!",
        });
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao entrar. Por favor, tente novamente.";
      setError(errorMessage);
      toast({
        title: "Erro ao entrar",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    setError(null);
    setFormData({
      username: "",
      email: "",
      cpf: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-[url(/xadrezinho.jpg)] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 opacity-20 animate-float w-32"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/3 right-20 text-5xl opacity-15 animate-bounce-gentle"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-20 text-4xl opacity-25 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 text-5xl opacity-20 animate-bounce-gentle"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-festa-text hover:text-festa-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </div>

      <div className="relative z-10 container bg-[#ffcf23] rounded-xl border-4 border-amber-900 mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <img
            src="/Festa_Junina-removebg-preview.png"
            alt="Ícone da festa"
            className="mx-auto w-24 h-24 mb-4"
          />
          <div className="text-6xl mb-4 animate-bounce-gentle"></div>
          <h1 className="font-festa text-3xl font-bold text-[#5e1c00] mb-2">
            Bem-vindo à Festa!
          </h1>
          <p className="text-[#5e1c00] font-poppins">
            Seu lugar na quadrilha tá reservado: faça login e entre na dança!
          </p>
        </div>

        <Card className="glass-effect-ultra border-festa-border/50 shadow-2xl">
          <CardContent>
            <Tabs
              defaultValue="login"
              value={activeTab}
              onValueChange={(val) => switchTab(val as "login" | "register")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-festa-surface/50">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                >
                  Cadastrar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#5e1c00]">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festa-text-muted w-4 h-4" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 bg-festa-surface/30 border-festa-border focus:border-festa-accent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#5e1c00]">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festa-text-muted w-4 h-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10 bg-festa-surface/30 border-festa-border focus:border-festa-accent"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full festa-button text-white font-poppins font-bold py-3 mt-6"
                  >
                    {isLoading ? "Entrando..." : "Entrar no ArraiáOn"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-festa-text">
                      Nome
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festa-text-muted w-4 h-4" />
                      <Input
                        type="text"
                        name="username"
                        placeholder="Seu nome"
                        value={formData.username}
                        onChange={handleChange}
                        className="pl-10 bg-festa-surface/30 border-festa-border focus:border-festa-accent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-festa-text">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festa-text-muted w-4 h-4" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 bg-festa-surface/30 border-festa-border focus:border-festa-accent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cpf" className="text-md font-medium">
                      CPF
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="cpf"
                        name="cpf"
                        type="cpf"
                        required
                        value={formData.cpf}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-festa-text">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festa-text-muted w-4 h-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 bg-festa-surface/30 border-festa-border focus:border-festa-accent"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full festa-button text-white font-semibold py-3 mt-6"
                  >
                    {isLoading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
