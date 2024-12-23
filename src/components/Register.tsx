import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// **Esquema de validação com Zod**
const registerSchema = z
  .object({
    // Dados Pessoais
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato: dd/mm/aaaa"),
    sex: z.enum(["male", "female"]),
    phone: z
      .string()
      .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato: (00) 00000-0000"),
    disability: z.string().optional(),

    // Documento
    documentType: z.enum(["cpf", "passport"]),
    document: z.string().min(1, "Documento obrigatório"),

    // Endereço
    cep: z.string().min(8, "CEP inválido"),
    address: z.string().min(3, "Endereço obrigatório"),
    number: z.string().min(1, "Número obrigatório"),
    complement: z.string().optional(),
    state: z.string().min(1, "Estado obrigatório"),
    city: z.string().min(1, "Cidade obrigatória"),
    country: z.string().min(1, "País obrigatório"),

    // Informações adicionais
    team: z.string().optional(),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem coincidir",
    path: ["confirmPassword"],
  });

// **Tipos validados pelo Zod**
type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // **Estados para dados dinâmicos**
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [_cities, setCities] = useState<string[]>([]);

  console.log(states);

  // **Busca estados e cidades (Brasil)**
  const country = watch("country", "Brasil");
  const state = watch("state");

  useEffect(() => {
    if (country === "Brasil") {
      axios
        .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => {
          const stateList = res.data.map((uf: any) => uf.sigla);
          setStates(stateList);
        });
    } else {
      setStates([]);
      setCities([]);
    }
  }, [country]);

  useEffect(() => {
    if (state && country === "Brasil") {
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
        )
        .then((res) => {
          const cityList = res.data.map((city: any) => city.nome);
          setCities(cityList);
        });
    } else {
      setCities([]);
    }
  }, [state, country]);

  // **Busca por CEP**
  const handleCepSearch = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        const data = response.data;

        if (!data.erro) {
          setValue("address", data.logradouro);
          setValue("state", data.uf);
          setValue("city", data.localidade);
        } else {
          setError("CEP não encontrado.");
        }
      } catch {
        setError("Erro ao buscar CEP.");
      }
    }
  };

  // **Submit**
  const onSubmit = async (data: RegisterFormData) => {
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post(
        "https://sportbro.com.br/api/register.php",
        data
      );

      if (response.data.success) {
        setSuccess("Cadastro realizado com sucesso!");
      } else {
        setError(response.data.message || "Erro ao realizar cadastro!");
      }
    } catch (err) {
      setError("Erro ao processar o cadastro.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-4xl shadow-lg bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-white">
            CADASTRO COMPLETO
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="mb-4">
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Nome Completo" {...register("name")} />
            <Input placeholder="E-mail" {...register("email")} />
            <Input
              placeholder="Data de Nascimento"
              {...register("birthDate")}
            />
            <Select {...register("sex")}>
              <SelectTrigger>
                <SelectValue placeholder="Sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="CEP"
              {...register("cep")}
              onBlur={(e) => handleCepSearch(e.target.value)}
            />
            <Select {...register("state")}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {states?.map((uf) => (
                  <SelectItem key={uf} value="male">
                    {uf}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Número" {...register("number")} />
            <Button type="submit" disabled={isSubmitting}>
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
