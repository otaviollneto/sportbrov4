import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "@/schemas/registerSchema";
import { useRegisterStore } from "@/stores/useRegisterStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";

export const RegisterStep1 = () => {
  const { nextStep, setData } = useRegisterStore();
  const [cpfError, setCpfError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(step1Schema),
  });

  interface FormData {
    documentType: string;
    document: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    sex: string;
  }

  const onSubmit = (data: FormData) => {
    setData(data);
    nextStep();
  };

  const validateCpf = async (cpf: string) => {
    try {
      const response = await axios.post(
        "https://sportbro.com.br/api/valida_cpf.php",
        { cpf },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        setError("document", {
          type: "manual",
          message: response.data.message,
        });
        setCpfError(response.data.message);
      } else {
        clearErrors("document");
        setCpfError(null);
      }
    } catch (error) {
      setError("document", {
        type: "manual",
        message: "Erro ao validar CPF.",
      });
      setCpfError("Erro ao validar CPF.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col">
        <label>Tipo de Documento*</label>
        <Controller
          name="documentType"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpf">CPF</SelectItem>
                <SelectItem value="passport">Passaporte</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.documentType && (
          <p className="text-red-500">{String(errors.documentType.message)}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label>Documento*</label>
        <Input
          {...register("document")}
          placeholder="Documento"
          onBlur={(e) => validateCpf(e.target.value)}
        />
        {(errors.document || cpfError) && (
          <p className="text-red-500">
            {String(errors.document?.message) || cpfError}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label>Nome Completo*</label>
        <Input {...register("name")} placeholder="Nome Completo" />
        {errors.name && (
          <p className="text-red-500">{String(errors.name.message)}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label>E-mail*</label>
        <Input {...register("email")} placeholder="E-mail" />
        {errors.email && (
          <p className="text-red-500">{String(errors.email.message)}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label>Telefone*</label>
        <Input {...register("phone")} placeholder="Telefone" />
        {errors.phone && (
          <p className="text-red-500">{String(errors.phone.message)}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label>Data de Nascimento*</label>
        <Input
          type="date"
          {...register("birthDate")}
          max={new Date().toISOString().split("T")[0]}
        />
        {errors.birthDate && (
          <p className="text-red-500">{String(errors.birthDate.message)}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label>Sexo*</label>
        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Feminino">Feminino</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.sex && (
          <p className="text-red-500">{String(errors.sex.message)}</p>
        )}
      </div>
      <Button type="submit">Próximo</Button>
    </form>
  );
};
