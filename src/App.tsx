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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<Home />} />
      <Route path="/politica-privacidade" element={<Politica />} />
      <Route path="/termos-de-compra" element={<Termos />} />
      <Route path="/sobre-nos" element={<Sobre />} />
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="eventos" handle={{ title: "Eventos" }}>
          <Route index element={<Eventos />} />
          <Route
            path=":slug"
            handle={{ title: "Detalhes do Evento" }}
            element={<EventoDetalhado />}
          />
        </Route>
        <Route path="resultados" handle={{ title: "Resultados" }}>
          <Route index element={<Resultados />} />
          <Route
            path=":slug"
            handle={{ title: "Detalhes do Evento" }}
            element={<ResultadoDetalhado />}
          />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
