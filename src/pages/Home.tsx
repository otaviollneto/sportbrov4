import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Services } from "@/components/Services";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Services />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Home;
