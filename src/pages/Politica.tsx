import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./Home.css";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";

function Politica() {
  return (
    <>
      <Navbar />
      <PrivacyPolicy />
      <About />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Politica;
