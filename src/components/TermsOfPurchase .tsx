import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const TermsOfPurchase = () => {
  return (
    <section className="container mx-auto py-12">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold text-primary">
            Termos de Compra
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-muted-foreground">
          <p>
            A <strong>SPORTBRO</strong> atua como{" "}
            <strong>INTERMEDIADORA</strong> na venda de tickets para eventos. Ao
            utilizar nossos serviços, você declara estar ciente e aceitar as
            seguintes cláusulas e condições:
          </p>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              1. Responsabilidade pelo Conteúdo dos Eventos
            </h2>
            <p>
              Todo o conteúdo publicado (textos, fotos, vídeos) é de
              responsabilidade integral do <strong>ORGANIZADOR</strong> do
              evento. A <strong>SPORTBRO</strong> não exerce controle ou
              supervisão prévia sobre essas informações.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              2. Responsabilidade pelo Evento
            </h2>
            <p>
              O <strong>ORGANIZADOR</strong> é responsável pelo planejamento,
              organização e execução do evento, incluindo programação, local,
              datas, valores e qualquer alteração na programação ou
              cancelamento.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              3. Informações Declaradas
            </h2>
            <p>
              Você declara que todas as informações fornecidas durante o
              cadastro e compra de ingressos são verdadeiras e estão de acordo
              com as leis vigentes.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              4. Inscrição para Terceiros
            </h2>
            <p>
              Se você realizar uma inscrição em nome de terceiros, declara que
              possui autorização para fornecer os dados e que os terceiros estão
              aptos a participar do evento.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              5. Uso de Imagem
            </h2>
            <p>
              Você autoriza o uso da sua imagem e dos terceiros inscritos para
              fins de divulgação do evento pelo ORGANIZADOR, SPORTBRO e
              patrocinadores.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              6. Confirmação de Pagamento
            </h2>
            <p>
              O ingresso só é garantido após a confirmação do pagamento integral
              via boleto ou cartão de crédito.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              7. Pagamentos Divergentes
            </h2>
            <p>
              Pagamentos com valores divergentes não garantem a inscrição ou
              retirada de kits do evento.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              8. Retirada de Kits
            </h2>
            <p>
              Kits devem ser retirados nas datas e horários definidos pelo
              ORGANIZADOR. A não retirada resultará na perda do direito ao kit.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              9. Estorno por Arrependimento
            </h2>
            <p>
              O estorno pode ser solicitado em até 7 dias após a compra, desde
              que seja feito com antecedência de pelo menos 72 horas do início
              do evento. Solicitações devem ser feitas pelo e-mail{" "}
              <a
                href="mailto:contato@sportbro.com.br"
                className="text-primary underline"
              >
                contato@sportbro.com.br
              </a>{" "}
              ou pelo WhatsApp <strong>(34) 9 9185-6555</strong>.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              10. Isenção de Responsabilidade
            </h2>
            <p>
              A <strong>SPORTBRO</strong> não se responsabiliza por ocorrências
              relacionadas ao evento. Reclamações devem ser feitas diretamente
              ao ORGANIZADOR.
            </p>
          </div>

          <Separator />

          <p className="text-center text-sm text-muted-foreground">
            <em>Uberaba, 25 de março de 2019</em>
          </p>
          <p className="text-center font-bold text-primary">
            SPORTBRO LTDA
            <br />
            <strong>CNPJ:</strong> 12.345.678/0001-99
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
