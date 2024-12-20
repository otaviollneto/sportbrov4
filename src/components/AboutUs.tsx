import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AboutUs = () => {
  return (
    <section className="container mx-auto py-12">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold text-primary">
            Sobre Nós
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-muted-foreground">
          <p className="text-center text-lg">
            <strong>SPORTBRO</strong> vem da palavra em inglês{" "}
            <strong>"brothers"</strong> (irmãos), onde os irmãos{" "}
            <strong>Roberto Leite</strong> e <strong>Otávio Lamartine</strong>{" "}
            se juntaram em 2017 para oferecer o melhor serviço de atendimento a
            eventos esportivos.
          </p>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary mb-4 text-center">
              O que Oferecemos
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Inscreva-se em eventos esportivos com facilidade.</li>
              <li>Pague com cartão de crédito, débito ou Pix.</li>
              <li>Crie seu evento com segurança e resultados garantidos.</li>
              <li>Fotos profissionais para maior divulgação em um só lugar.</li>
              <li>Acompanhe seus resultados diretamente em seu perfil.</li>
            </ul>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="https://via.placeholder.com/150"
                  alt="Roberto Leite"
                />
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-primary">Roberto Leite</h3>
              <p className="text-center">
                Profissional de Educação Física com pós-graduação em treinamento
                personalizado e nutrição esportiva. Atualmente cursando MBA em
                gestão esportiva.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="https://via.placeholder.com/150"
                  alt="Otávio Lamartine"
                />
                <AvatarFallback>OL</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-primary">
                Otávio Lamartine
              </h3>
              <p className="text-center">
                Com mais de 10 anos no mercado de tecnologia, desenvolvendo
                soluções para startups, indústrias e empresas de serviço.
                Especialista em desenvolvimento e implementação de novas
                tecnologias para gestão de softwares e aplicativos móveis.
              </p>
            </div>
          </div>

          <Separator />

          <p className="text-center text-lg font-semibold text-primary">
            Juntando o melhor do Esporte e Tecnologia para Eventos.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
