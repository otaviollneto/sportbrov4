import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Services } from "@/components/Services";
import { Navbar } from "@/components/Navbar";
import "./Home.css";

function Resultados() {
  return (
    <>
      <Navbar />
      <Features status={3} />
      <About />
      <Services />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Resultados;
