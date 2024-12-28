import { useRegisterStore } from "@/stores/useRegisterStore";
import { RegisterStep1 } from "@/components/RegisterStep1";
import { RegisterStep2 } from "@/components/RegisterStep2";
import { RegisterStep3 } from "@/components/RegisterStep3";
import { RegisterStep4 } from "@/components/RegisterStep4";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Register = () => {
  const { step } = useRegisterStore();
  const getProgress = () => {
    switch (step) {
      case 1:
        return 25;
      case 2:
        return 50;
      case 3:
        return 75;
      case 4:
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-4xl shadow-lg bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-white">
            CADASTRO DO ATLETA COMPLETO
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Progress value={getProgress()} />
            <p className="text-center mt-2">Etapa {step} de 4</p>
          </div>
          {step === 1 && <RegisterStep1 />}
          {step === 2 && <RegisterStep2 />}
          {step === 3 && <RegisterStep3 />}
          {step === 4 && <RegisterStep4 />}
        </CardContent>
      </Card>
    </div>
  );
};
