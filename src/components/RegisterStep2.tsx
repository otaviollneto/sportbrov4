import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "@/schemas/registerSchema";
import { useRegisterStore } from "@/stores/useRegisterStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export const RegisterStep2 = () => {
  const { prevStep, nextStep, setData, data } = useRegisterStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: data,
  });

  const onSubmit = (data: typeof step2Schema._type) => {
    setData(data);
    nextStep();
  };

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>País*</label>
        <Input {...register("country")} placeholder="País" />
        {errors.country && (
          <p className="text-red-500">{String(errors.country.message)}</p>
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
          <p className="text-red-500">{String(errors.address.message)}</p>
        )}
      </div>
      <div>
        <label>Número*</label>
        <Input {...register("number")} placeholder="Número" type="number" />
        {errors.number && (
          <p className="text-red-500">{String(errors.number.message)}</p>
        )}
      </div>
      <div>
        <label>Bairro*</label>
        <Input {...register("neighborhood")} placeholder="Bairro" />
        {errors.neighborhood && (
          <p className="text-red-500">{String(errors.neighborhood.message)}</p>
        )}
      </div>
      <div>
        <label>Complemento</label>
        <Input {...register("complement")} placeholder="Complemento" />
      </div>
      <div>
        <label>Estado*</label>
        <Input {...register("state")} placeholder="Estado" />
        {errors.state && (
          <p className="text-red-500">{String(errors.state.message)}</p>
        )}
      </div>
      <div>
        <label>Cidade*</label>
        <Input {...register("city")} placeholder="Cidade" />
        {errors.city && (
          <p className="text-red-500">{String(errors.city.message)}</p>
        )}
      </div>
      <div className="flex justify-between">
        <Button type="button" onClick={prevStep}>
          Voltar
        </Button>
        <Button type="submit">Próximo</Button>
      </div>
    </form>
  );
};
