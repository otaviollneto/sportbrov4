import { useState } from "react";
import axios from "axios";
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
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
  // Estados
  const [senha, setSenha] = useState("");
  const [resenha, setResenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // Validação e envio do formulário
  const handleResetPassword = async () => {
    if (senha !== resenha) {
      setError("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    // FormData para envio
    const formData = new FormData();
    formData.append("password", senha);
    formData.append("token", token || "");

    try {
      const response = await axios({
        method: "POST",
        url: "https://sportbro.com.br/api/reset_password.php",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSuccess("Senha redefinida com sucesso!");
      } else {
        setError(response.data.message || "Erro ao redefinir senha!");
      }
    } catch (err) {
      setError("Erro ao processar solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            REDEFINIÇÃO DE <span className="text-yellow-500">SENHA</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default">
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Campos de formulário */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nova Senha
              </label>
              <div className="relative">
                <Input
                  placeholder="Digite sua nova senha"
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirme a Nova Senha
              </label>
              <div className="relative">
                <Input
                  placeholder="Confirme sua nova senha"
                  type={showPassword ? "text" : "password"}
                  value={resenha}
                  onChange={(e) => setResenha(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Botão de redefinir */}
        <CardFooter className="flex flex-col space-y-4">
          <Button
            disabled={loading}
            onClick={handleResetPassword}
            className="w-full bg-yellow-500 hover:bg-yellow-600"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "REDEFINIR"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
