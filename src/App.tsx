import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Eventos from "./pages/Eventos";
import Home from "./pages/Home";
import EventoDetalhado from "./pages/EventoDetalhado";
import Resultados from "./pages/Resultados";
import ResultadoDetalhado from "./pages/ResultadoDetalhado";
import Politica from "./pages/Politica";
import Termos from "./pages/Termos";
import Sobre from "./pages/Sobre";
import LoginPage from "./pages/Login";
import ForgotPasswordPage from "./pages/ForgotPassword";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPassword";
import MyDataPage from "./pages/MyData";
import MyEventsPage from "./pages/MyEvents";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/esqueci-minha-senha" element={<ForgotPasswordPage />} />
      <Route path="/reset-senha" element={<ResetPasswordPage />} />
      <Route path="/cadastrar" element={<RegisterPage />} />
      <Route path="/meus-dados" element={<MyDataPage />} />
      <Route path="/meus-eventos" element={<MyEventsPage />} />
      <Route path="/politica-privacidade" element={<Politica />} />
      <Route path="/termos-de-compra" element={<Termos />} />
      <Route path="/sobre-nos" element={<Sobre />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/evento/:slug" element={<EventoDetalhado />} />
      <Route path="/resultados" element={<Resultados />} />
      <Route path="/resultado/:slug" element={<ResultadoDetalhado />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
