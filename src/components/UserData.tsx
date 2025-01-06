import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateUserSchema } from "@/schemas/updateUserSchema";
import { ApiResponse, UserData } from "@/types";

export const UserUpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuthStore();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError: setFormError,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {},
  });

  const handleCepSearch = async (cep: string) => {
    const cleanedCep = cep.replace(/\D/g, "");

    if (cleanedCep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        const data = response.data;
        if (!data.erro) {
          setValue("address", data.logradouro);
          setValue("neighborhood", data.bairro);
          setValue("state", data.uf);
          setValue("city", data.localidade);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (token === null) return;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://sportbro.com.br/api/user_data.php",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          const userData = response.data.data;

          Object.entries(userData).forEach(([key, value]) => {
            console.log(key, value);
            setValue(key as keyof UserData, value as string | boolean);
          });
        } else {
          setError(response.data.message || "Erro ao carregar dados.");
        }
      } catch (error) {
        setError("Erro ao buscar dados do usuário.");
      }
    };

    fetchUserData();
  }, [setValue, token]);

  const onSubmit = async (data: UserData) => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        "https://sportbro.com.br/api/user_update.php",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSuccess("Dados atualizados com sucesso!");
      } else {
        setError(response.data.message || "Erro ao atualizar dados.");
        if (response.data.errors) {
          Object.entries(response.data.errors).forEach(([field, message]) => {
            setFormError(field as keyof UserData, {
              type: "manual",
              message: message as string,
            });
          });
        }
      }
    } catch (error) {
      setError(
        "Erro ao atualizar: " +
          (axios.isAxiosError(error) ? error.message : "Erro desconhecido")
      );
    } finally {
      setLoading(false);
    }
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
        setCpfError(response.data.message);
      } else {
        setCpfError(null);
      }
    } catch (error) {
      setCpfError("Erro ao validar CPF.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-4xl shadow-lg bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-white">
            DADOS ATLETA COMPLETO
          </CardTitle>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dados-pessoais">
            <TabsList>
              <TabsTrigger value="dados-pessoais">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="endereco">Endereço</TabsTrigger>
              <TabsTrigger value="complementares">Complementares</TabsTrigger>
            </TabsList>

            <TabsContent value="dados-pessoais">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label>Tipo de Documento*</label>
                  <Controller
                    name="documentType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={String(field.value)}
                      >
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
                    <p className="text-red-500">
                      {String(errors.documentType.message)}
                    </p>
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
                    <p className="text-red-500">
                      {String(errors.name.message)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>E-mail*</label>
                  <Input {...register("email")} placeholder="E-mail" />
                  {errors.email && (
                    <p className="text-red-500">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Telefone*</label>
                  <Input {...register("phone")} placeholder="Telefone" />
                  {errors.phone && (
                    <p className="text-red-500">
                      {String(errors.phone.message)}
                    </p>
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
                    <p className="text-red-500">
                      {String(errors.birthDate.message)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Sexo*</label>
                  <Controller
                    name="sex"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={String(field.value)}
                      >
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
              </div>
            </TabsContent>

            <TabsContent value="endereco">
              <div className="space-y-4">
                <div>
                  <label>País*</label>
                  <Input {...register("country")} placeholder="País" />
                  {errors.country && (
                    <p className="text-red-500">
                      {String(errors.country.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label>CEP*</label>
                  <Input
                    {...register("cep")}
                    placeholder="CEP"
                    onBlur={(e) => handleCepSearch(e.target.value)}
                  />
                  {errors.cep && (
                    <p className="text-red-500">{String(errors.cep.message)}</p>
                  )}
                </div>
                <div>
                  <label>Endereço*</label>
                  <Input {...register("address")} placeholder="Endereço" />
                  {errors.address && (
                    <p className="text-red-500">
                      {String(errors.address.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label>Número*</label>
                  <Input
                    {...register("number")}
                    placeholder="Número"
                    type="number"
                  />
                  {errors.number && (
                    <p className="text-red-500">
                      {String(errors.number.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label>Bairro*</label>
                  <Input {...register("neighborhood")} placeholder="Bairro" />
                  {errors.neighborhood && (
                    <p className="text-red-500">
                      {String(errors.neighborhood.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label>Complemento</label>
                  <Input
                    {...register("complement")}
                    placeholder="Complemento"
                  />
                </div>
                <div>
                  <label>Estado*</label>
                  <Input {...register("state")} placeholder="Estado" />
                  {errors.state && (
                    <p className="text-red-500">
                      {String(errors.state.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label>Cidade*</label>
                  <Input {...register("city")} placeholder="Cidade" />
                  {errors.city && (
                    <p className="text-red-500">
                      {String(errors.city.message)}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="complementares">
              <div className="space-y-4">
                <div>
                  <label>Se é PDC*</label>
                  <Controller
                    name="isPDC"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={String(field.value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sim">Sim</SelectItem>
                          <SelectItem value="Nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.isPDC && (
                    <p className="text-red-500">
                      {String(errors.isPDC.message)}
                    </p>
                  )}
                </div>
                {control._formValues.isPDC === "Sim" && (
                  <div>
                    <label>Nome PDC</label>
                    <Input {...register("pdcName")} placeholder="Nome PDC" />
                  </div>
                )}
                <div>
                  <label>Nome da Equipe</label>
                  <Input
                    {...register("teamName")}
                    placeholder="Nome da Equipe"
                  />
                </div>
                <div>
                  <label>Contato de Emergência - Nome*</label>
                  <Input
                    {...register("emergencyContactName")}
                    placeholder="Nome do Contato de Emergência"
                  />
                  {errors.emergencyContactName && (
                    <p className="text-red-500">
                      {String(errors.emergencyContactName.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label>Contato de Emergência - Telefone*</label>
                  <Input
                    {...register("emergencyContactPhone")}
                    placeholder="Telefone do Contato de Emergência"
                  />
                  {errors.emergencyContactPhone && (
                    <p className="text-red-500">
                      {String(errors.emergencyContactPhone.message)}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-between mt-6">
            <Button
              type="submit"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
            >
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
