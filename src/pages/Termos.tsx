import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./Home.css";
import { TermsOfPurchase } from "@/components/TermsOfPurchase ";

function Termos() {
  return (
    <>
      <Navbar />
      <TermsOfPurchase />
      <About />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Termos;
