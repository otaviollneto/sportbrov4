import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Services } from "@/components/Services";
import "./Home.css";
import { EventsList } from "@/components/UserEvents";

function MyEventsPage() {
  return (
    <>
      <Navbar />
      <EventsList />
      <About />
      <Services />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default MyEventsPage;
