import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./Home.css";
import { AboutUs } from "@/components/AboutUs";

function Sobre() {
  return (
    <>
      <Navbar />
      <AboutUs />
      <About />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Sobre;
