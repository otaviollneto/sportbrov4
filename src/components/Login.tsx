import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Login = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("cadastro@sportbro.com.br");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://sportbro.com.br/api/auth.php",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        login(response.data.user);
      } else {
        setError("Credenciais inválidas!");
      }
    } catch (err) {
      setError("Erro ao realizar login!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-center text-3xl font-bold">Login</h2>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={loading} onClick={handleLogin} className="w-full">
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </div>
  );
};
