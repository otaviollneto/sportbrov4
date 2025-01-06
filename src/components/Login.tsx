import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate, Link } from "react-router-dom"; // Navegação
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export const Login = () => {
  const { login, token } = useAuthStore();
  const navigate = useNavigate();

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("senha", password);

    try {
      const response = await axios({
        method: "POST",
        url: "https://sportbro.com.br/api/auth.php",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        login(response.data.user);
        navigate("/");
      } else {
        setError("Credenciais inválidas!");
      }
    } catch (err) {
      console.log(err);
      setError("Erro ao realizar login!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Acesso do atleta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Input
            placeholder="CPF ou Passaporte"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <Link to="/esqueci-minha-senha" className="hover:underline">
              Esqueceu sua senha?
            </Link>
            <Link to="/cadastrar" className="hover:underline">
              Novo por aqui? Cadastrar
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button disabled={loading} onClick={handleLogin} className="w-full">
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Entrar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
