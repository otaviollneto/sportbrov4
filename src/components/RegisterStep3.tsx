import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema } from "@/schemas/registerSchema";
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

export const RegisterStep3 = () => {
  const { prevStep, nextStep, setData, data } = useRegisterStore();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: data,
  });

  const isPDC = watch("isPDC");

  const onSubmit = (data: typeof step3Schema._type) => {
    setData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Se é PDC*</label>
        <Controller
          name="isPDC"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
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
          <p className="text-red-500">{String(errors.isPDC.message)}</p>
        )}
      </div>
      {isPDC === "yes" && (
        <div>
          <label>Nome PDC</label>
          <Input {...register("pdcName")} placeholder="Nome PDC" />
        </div>
      )}
      <div>
        <label>Nome da Equipe</label>
        <Input {...register("teamName")} placeholder="Nome da Equipe" />
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
      <div className="flex justify-between">
        <Button type="button" onClick={prevStep}>
          Voltar
        </Button>
        <Button type="submit">Próximo</Button>
      </div>
    </form>
  );
};
