import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <LogoIcon />
            Sport BRO
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Siga-nos</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://www.instagram.com/sport.bro/"
              className="opacity-60 hover:opacity-100"
              target="_blank"
            >
              Instagram
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="https://www.facebook.com/sport.broeventos/"
              className="opacity-60 hover:opacity-100"
              target="_blank"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Acessos</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Atleta
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Organizador
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Administrativo
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Sobre nós</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="/sobre-nos"
              className="opacity-60 hover:opacity-100"
            >
              Sobre a BRO
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="/politica-privacidade"
              className="opacity-60 hover:opacity-100"
            >
              Política de privacidade
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="/termos-de-compra"
              className="opacity-60 hover:opacity-100"
            >
              Termos de Compra
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Contato</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Perguntas frequentes
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Suporte
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Orçamento
            </a>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 todos os direitos reservados a Sport BRO - Eventos
          Esportivos
        </h3>
      </section>
    </footer>
  );
};
