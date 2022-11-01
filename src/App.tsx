import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { CreateProfile, CreateStore, Settings, Products, ProductDetails } from "./pages";
import ToastNotification from "./components/ToastNotification";
import { ProvideAppContext } from "./context/AppContext";
import { RoutesEnum } from "./@types/enums";
import ColorImports from "./components/ColorImports";
import { AddProduct } from "./pages/Products/AddProduct/AddProduct";
import { EditProduct } from "./pages/Products/EditProduct/EditProduct";

const Main = () => (
  <Routes>
    <Route path={RoutesEnum.profile} element={<CreateProfile />} />
    <Route path={RoutesEnum.edit_profile} element={<CreateProfile edit />} />
    <Route path={RoutesEnum.create_store} element={<CreateStore />} />
    <Route path={RoutesEnum.settings} element={<Settings />} />
    <Route path={RoutesEnum.home} element={<Products />} />
    <Route path={RoutesEnum.product_details} element={<ProductDetails />} />
    <Route path={RoutesEnum.add_product} element={<AddProduct />} />
    <Route path={RoutesEnum.edit_product} element={<AddProduct edit />} />
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
