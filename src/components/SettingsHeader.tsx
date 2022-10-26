import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../@types/enums";
import { useAppContext } from "../context/AppContext";

const SettingsHeader = () => {
  const { isOwner, theme } = useAppContext();

  const navigate = useNavigate();

  return (
    <header className={`py-3 sticky top-0 bg-${theme[0]} shadow-lg z-10`}>
      <div
        className='mx-auto flex items-center justify-between'
        style={{ maxWidth: "1000px" }}
      >
        <div
          className='cursor-pointer'
          onClick={() => navigate(RoutesEnum.home)}
        >
          {/* Logo will go here */}
          <span className='text-4xl font-bold'>Point Store</span>
        </div>
      </div>
    </header>
  );
};

export default SettingsHeader;
