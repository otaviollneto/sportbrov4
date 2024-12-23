import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Services } from "@/components/Services";
import "./Home.css";
import { ForgotPassword } from "@/components/ForgotPassword";

function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <ForgotPassword />
      <About />
      <Services />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default ForgotPasswordPage;
