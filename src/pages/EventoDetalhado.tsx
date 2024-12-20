import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Services } from "@/components/Services";
import { Navbar } from "@/components/Navbar";
import "./Home.css";
import { EventDetail } from "@/components/EventDetail";

function EventoDetalhado() {
  return (
    <>
      <Navbar />
      <EventDetail />
      <About />
      <Services />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default EventoDetalhado;
