import { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useAppContext } from "../../context/AppContext";

const StorePictureUploader = ({ id, storePicture, setStorePicture } : { id: string, storePicture: Blob | null, setStorePicture: Dispatch<SetStateAction<Blob | null>>}) => {
  const { theme } = useAppContext();

  const handleFileInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setStorePicture(evt.target.files ? evt.target.files[0] : null);
  };

  return (
    <Fragment>
      {!storePicture ? (
        <div className='h-56 w-56 p-8 rounded-full border-2 bg-gray-100 border-gray-300 flex flex-col items-center justify-center relative overflow-hidden'>
          <ImageOutlinedIcon
            sx={{ height: 42, width: 42 }}
            className='text-gray-500'
          />
          <p className='text-gray-500 mt-1'>Click to Upload</p>
          <input
            type='file'
            accept='image/*'
            title='Upload a file'
            className='absolute w-full h-full opacity-0 cursor-pointer'
            onChange={handleFileInput}
          />
        </div>
      ) : (
        <img
          src={URL.createObjectURL(storePicture)}
          className='w-56 h-56 rounded-full border-2 border-gray-200 object-cover'
          alt='profile'
        />
      )}
      {storePicture ? (
        <p
          className={`relative text-sm mt-4 transition-all text-${theme[2]} text-opacity-50 hover:text-opacity-100`}
        >
          <span className='absolute left-1/2 -translate-x-1/2 cursor-pointer underline'>
                  Change
          </span>
          <input
            type='file'
            title='Upload a file'
            className='absolute w-20 h-6 opacity-0 left-1/2 -translate-x-1/2 cursor-pointer'
            onChange={handleFileInput}
          />
        </p>
      ) : null}
    </Fragment>
  );
};

export default StorePictureUploader;
