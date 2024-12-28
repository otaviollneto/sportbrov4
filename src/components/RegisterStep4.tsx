import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema } from "@/schemas/registerSchema";
import { useRegisterStore } from "@/stores/useRegisterStore";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterStep4 = () => {
  const { prevStep, setData, data } = useRegisterStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step4Schema),
    defaultValues: data,
  });

  const onSubmit = async (dataForm: any) => {
    setData(dataForm);
    const finalData = { ...data, ...dataForm };

    try {
      const response = await axios.post(
        "https://sportbro.com.br/api/register.php",
        finalData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSuccess("Registro realizado com sucesso!");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redireciona para a página de login após 2 segundos
      } else {
        setError(response.data.message || "Erro ao registrar.");
      }
    } catch (error) {
      setError("Erro ao registrar: " + (error as any).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div>
        <label>Senha*</label>
        <Input {...register("password")} placeholder="Senha" type="password" />
        {errors.password && (
          <p className="text-red-500">{String(errors.password.message)}</p>
        )}
      </div>
      <div>
        <label>Repete Senha*</label>
        <Input
          {...register("confirmPassword")}
          placeholder="Repete Senha"
          type="password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">
            {String(errors.confirmPassword.message)}
          </p>
        )}
      </div>
      <div className="flex justify-between">
        <Button type="button" onClick={prevStep}>
          Voltar
        </Button>
        <Button type="submit">Finalizar</Button>
      </div>
    </form>
  );
};
