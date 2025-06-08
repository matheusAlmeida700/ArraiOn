
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/games');
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/games');
    }, 1500);
  };

  return (
    <div className="min-h-screen festa-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 text-6xl opacity-20 animate-float"
          style={{ animationDelay: '0s' }}
        >
          🎪
        </div>
        <div 
          className="absolute top-1/3 right-20 text-5xl opacity-15 animate-bounce-gentle"
          style={{ animationDelay: '1s' }}
        >
          🌽
        </div>
        <div 
          className="absolute bottom-1/4 left-20 text-4xl opacity-25 animate-float"
          style={{ animationDelay: '2s' }}
        >
          🔥
        </div>
        <div 
          className="absolute bottom-20 right-10 text-5xl opacity-20 animate-bounce-gentle"
          style={{ animationDelay: '3s' }}
        >
          🎭
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-festa-text hover:text-festa-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-gentle">🎉</div>
          <h1 className="font-festa text-3xl font-bold text-festa-text mb-2">
            Bem-vindo à Festa!
          </h1>
          <p className="text-festa-text-light">
            Entre ou crie sua conta para começar a diversão
          </p>
        </div>

        <Card className="glass-effect-ultra border-festa-border/50 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="font-festa text-2xl text-festa-text">
              Acesso à Plataforma
            </CardTitle>
            <CardDescription className="text-festa-text-muted">
              Escolha como deseja continuar
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-festa-surface/50">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-festa-accent data-[state=active]:text-white"
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="data-[state=active]:bg-festa-accent data-[state=active]:text-white"
                >
                  Cadastrar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-festa-text">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festa-text-muted w-4 h-4" />
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="pl-10 bg-festa-surface/30 border-festa-border focus:border-festa-accent"
                        required
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
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
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
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full festa-button text-white font-semibold py-3 mt-6"
                  >
                    {isLoading ? 'Entrando...' : '🎪 Entrar na Festa'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-festa-text">
                      Nome
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festa-text-muted w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Seu nome"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
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
                        placeholder="seu@email.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        className="pl-10 bg-festa-surface/30 border-festa-border focus:border-festa-accent"
                        required
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
                        placeholder="••••••••"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        className="pl-10 bg-festa-surface/30 border-festa-border focus:border-festa-accent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-festa-text">
                      Confirmar Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festa-text-muted w-4 h-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
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
                    {isLoading ? 'Criando conta...' : '🎪 Criar Conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-festa-text-muted">
            Ao continuar, você concorda com nossos{' '}
            <span className="text-festa-accent cursor-pointer hover:underline">
              Termos de Uso
            </span>{' '}
            e{' '}
            <span className="text-festa-accent cursor-pointer hover:underline">
              Política de Privacidade
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
