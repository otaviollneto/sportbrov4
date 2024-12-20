import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Services } from "@/components/Services";
import { Navbar } from "@/components/Navbar";
import { ResultDetail } from "@/components/ResultDetail";
import "./Home.css";

function ResultadoDetalhado() {
  return (
    <>
      <Navbar />
      <ResultDetail />
      <About />
      <Services />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default ResultadoDetalhado;
