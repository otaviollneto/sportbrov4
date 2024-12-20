import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const PrivacyPolicy = () => {
  return (
    <section className="container mx-auto py-12">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold text-primary">
            Política de Privacidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-muted-foreground">
          <p>
            O <strong>SPORTBRO</strong> se preocupa muito com a sua privacidade
            pois queremos que você tenha apenas experiências positivas ao
            acessar nossa plataforma (
            <a
              href="https://www.sportbro.com.br"
              className="text-primary underline"
            >
              www.sportbro.com.br
            </a>
            ). Para garantir sua tranquilidade, estabelecemos uma política de
            privacidade que esclarece como utilizamos os dados que você nos
            fornece e ressaltamos o nosso compromisso de respeito à{" "}
            <strong>Lei Geral de Proteção de Dados (Lei 13.709/2018)</strong>.
          </p>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              1. Cadastro e Informações Fornecidas por Você
            </h2>
            <p>
              Ao se cadastrar no <strong>SPORTBRO</strong>, você terá que
              preencher um cadastro contendo informações pessoais necessárias
              para identificação e efetuar a cobrança de inscrições futuras.
            </p>
            <p className="mt-2">
              As informações necessárias são:{" "}
              <strong>
                nome, e-mail, CPF, data de nascimento, gênero, cidade, estado
              </strong>{" "}
              e <strong>telefone</strong>.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              2. Informações Coletadas Automaticamente
            </h2>
            <p>
              Coletamos automaticamente informações sobre você quando acessa
              nossos serviços, como endereço IP, tipo de navegador, cookies, web
              beacons e outras tecnologias de rastreamento.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              3. Como Usamos Suas Informações
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Gerenciar a sua inscrição para determinado evento.</li>
              <li>Responder às suas solicitações e fornecer atendimento.</li>
              <li>Enviar avisos técnicos e atualizações.</li>
              <li>Melhorar os produtos e serviços do SPORTBRO.</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              4. Segurança das Informações
            </h2>
            <p>
              Adotamos medidas de segurança para garantir a proteção dos seus
              dados. As informações são transmitidas por conexão{" "}
              <strong>SSL (Secure Socket Layer)</strong>.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              5. Contato
            </h2>
            <p>Se tiver dúvidas ou preocupações, entre em contato conosco:</p>
            <ul className="mt-2 space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:contato@sportbro.com.br"
                  className="text-primary underline"
                >
                  contato@sportbro.com.br
                </a>
              </li>
              <li>
                <strong>Endereço:</strong> Rua Vital de Negreiros, 610 -
                Fabrício - Uberaba/MG.
              </li>
              <li>
                <strong>CNPJ:</strong> 12.345.678/0001-99
              </li>
            </ul>
          </div>

          <Separator />

          <p className="text-center text-sm text-muted-foreground">
            <em>Uberaba, 25 de março de 2019</em>
          </p>
          <p className="text-center font-bold text-primary">SPORTBRO LTDA</p>
        </CardContent>
      </Card>
    </section>
  );
};
