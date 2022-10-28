import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { CreateProfile, CreateStore, Settings, Products } from "./pages";
import ToastNotification from "./components/ToastNotification";
import { ProvideAppContext } from "./context/AppContext";
import { RoutesEnum } from "./@types/enums";
import ColorImports from "./components/ColorImports";

const Main = () => (
  <Routes>
    <Route path={RoutesEnum.profile} element={<CreateProfile />} />
    <Route path={RoutesEnum.edit_profile} element={<CreateProfile edit />} />
    <Route path={RoutesEnum.create_store} element={<CreateStore />} />
    <Route path={RoutesEnum.settings} element={<Settings />} />
    <Route path={RoutesEnum.home} element={<Products />} />
  </Routes>
);

const App = () => (
  <Router>
    <ProvideAppContext>
      <ToastNotification />
      <Main />
      <ColorImports />
    </ProvideAppContext>
  </Router>
);

export default App;
