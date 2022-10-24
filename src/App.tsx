import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import CreateProfile from './pages/CreateProfile';
import Settings from './pages/Settings';
import ToastNotification from './components/ToastNotification';
import {ProvideAppContext} from './context/AppContext';
import {RoutesEnum} from './@types/enums';
import ColorImports from './components/ColorImports';

const Main = () => (
  <Routes>
    <Route path={RoutesEnum.profile} element={<CreateProfile />} />
    <Route path={RoutesEnum.edit_profile} element={<CreateProfile edit />} />
    <Route path={RoutesEnum.settings} element={<Settings />} />
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
