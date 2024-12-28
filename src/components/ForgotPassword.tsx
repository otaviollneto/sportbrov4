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
import { CalendarIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  // Estados
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Validação e envio do formulário
  const handleResetPassword = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    // FormData para envio
    const formData = new FormData();
    formData.append("cpf", cpf);
    formData.append("birthDate", birthDate);

    try {
      const response = await axios({
        method: "POST",
        url: "https://sportbro.com.br/api/forgot_password.php",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSuccess("Verifique seu e-mail para redefinir a senha!");
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
          <p className="text-center text-sm mt-2 text-muted-foreground">
            Preencha os dados conforme o cadastro e veja se estão de acordo com
            nossa{" "}
            <Link to="/politica-privacidade" className="text-blue-500">
              Política de Privacidade
            </Link>{" "}
            e{" "}
            <Link to="/termos-de-compra" className="text-blue-500">
              Termos de Compra
            </Link>
            .
          </p>
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
              <label className="block text-sm font-medium mb-1">CPF</label>
              <Input
                placeholder="000.000.000-00"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Data de Nascimento
              </label>
              <div className="relative">
                <Input
                  placeholder="dd/mm/aaaa"
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
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
