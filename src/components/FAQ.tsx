import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Como faço para me inscrever em um evento?",
    answer:
      "Para se inscrever, acesse a página de Eventos, selecione o evento desejado e clique em Inscrever-se. Preencha o formulário com seus dados pessoais, escolha a categoria e finalize o pagamento. Após a confirmação do pagamento, você receberá um e-mail com os detalhes da sua inscrição.",
    value: "item-1",
  },
  {
    question: "Quais documentos são necessários para me inscrever?",
    answer:
      "É necessário informar o número do CPF ou, no caso de estrangeiros, o passaporte. Esses documentos serão utilizados para validar sua identidade durante o evento.",
    value: "item-2",
  },
  {
    question: "Como faço para alterar os dados da minha inscrição?",
    answer:
      "Para alterar seus dados, acesse sua conta no site e vá até a seção Meus Dados ou Minhas Inscrições. Caso tenha dificuldades, entre em contato pelo e-mail de suporte informado no site.",
    value: "item-3",
  },
  {
    question: "O que acontece se eu esquecer minha senha?",
    answer:
      "Caso esqueça sua senha, clique na opção Esqueci minha senha na página de login. Digite o seu e-mail cadastrado e siga as instruções enviadas para criar uma nova senha.",
    value: "item-4",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "O pagamento pode ser realizado por cartão de crédito, boleto bancário ou Pix. Após a confirmação do pagamento, sua inscrição será validada e você receberá um e-mail de confirmação.",
    value: "item-5",
  },
  {
    question: "É possível cancelar minha inscrição?",
    answer:
      "Sim, o cancelamento pode ser solicitado até 7 dias após a inscrição, desde que seja feito com pelo menos 15 dias de antecedência ao evento. Entre em contato com o suporte para mais informações.",
    value: "item-6",
  },
  {
    question: "Posso transferir minha inscrição para outra pessoa?",
    answer:
      "Sim, as transferências podem ser solicitadas até 10 dias antes do evento. É necessário enviar os dados do novo participante pelo e-mail de suporte do site.",
    value: "item-7",
  },
  {
    question: "Como funciona a retirada do kit do atleta?",
    answer:
      "A retirada do kit é feita presencialmente nos dias e horários informados na página do evento. É necessário apresentar um documento com foto e o comprovante de inscrição.",
    value: "item-8",
  },
  {
    question: "Sou portador de necessidades especiais. Posso participar?",
    answer:
      "Sim! Nossos eventos são inclusivos. No momento da inscrição, selecione a opção 'Sou portador de necessidades especiais' e informe o tipo de necessidade no campo indicado. Caso precise de suporte adicional, entre em contato com a organização do evento.",
    value: "item-9",
  },
  {
    question: "Posso levar acompanhantes no evento?",
    answer:
      "Sim, acompanhantes são permitidos, mas não podem participar das competições. Algumas áreas podem ser restritas apenas para os inscritos no evento.",
    value: "item-10",
  },
  {
    question: "Como saber se minha inscrição foi confirmada?",
    answer:
      "Após concluir o pagamento, você receberá um e-mail de confirmação com todos os detalhes do evento. Caso não receba, verifique sua caixa de spam ou entre em contato com o suporte.",
    value: "item-11",
  },
  {
    question: "Como acompanho os resultados do evento?",
    answer:
      "Os resultados serão disponibilizados na seção 'Resultados' do site após o término do evento. Você também receberá uma notificação por e-mail informando quando os resultados estiverem disponíveis.",
    value: "item-12",
  },
  {
    question: "Existe alguma faixa etária para participar?",
    answer:
      "Sim, a idade mínima varia de acordo com a categoria e modalidade do evento. Consulte os detalhes na página do evento escolhido. Menores de idade devem estar acompanhados dos responsáveis legais.",
    value: "item-13",
  },
  {
    question: "Preciso de um atestado médico para participar?",
    answer:
      "Dependendo da modalidade do evento, um atestado médico pode ser solicitado no momento da retirada do kit. Verifique as exigências específicas na descrição do evento.",
    value: "item-14",
  },
  {
    question: "Como entro em contato com a organização do evento?",
    answer:
      "Você pode entrar em contato pelo e-mail de suporte informado no rodapé do site ou acessar a seção 'Contato' para mais informações.",
    value: "item-15",
  },
  {
    question: "Haverá premiação para os vencedores?",
    answer:
      "Sim, os vencedores serão premiados de acordo com as regras específicas de cada evento. Consulte a página do evento para mais detalhes sobre premiações e categorias.",
    value: "item-16",
  },
  {
    question: "É possível recuperar o valor pago em caso de desistência?",
    answer:
      "Sim, desde que o pedido seja feito no prazo de 7 dias após a compra e com pelo menos 15 dias de antecedência ao evento. Consulte nossa política de reembolso para mais detalhes.",
    value: "item-17",
  },
  {
    question: "Os kits são entregues no dia do evento?",
    answer:
      "Não. A retirada do kit deve ser feita antecipadamente, conforme informado na página do evento. Não serão entregues kits no dia do evento.",
    value: "item-18",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Perguntas{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Frequentes
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Ainda tem dúvidas?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contate-nos
        </a>
      </h3>
    </section>
  );
};
