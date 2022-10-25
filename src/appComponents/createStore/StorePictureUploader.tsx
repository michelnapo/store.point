import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const StorePictureUploader = ({ id, storePicture, setStorePicture } : { id: string, storePicture: Blob | null, setStorePicture: Dispatch<SetStateAction<Blob | null>>}) => {
  const handleFileInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setStorePicture(evt.target.files ? evt.target.files[0] : null);
  };

  if (!storePicture) {
    return (
      <div className="h-56 w-56 p-8 rounded-full border-2 bg-gray-100 border-gray-300 flex flex-col items-center justify-center relative overflow-hidden">
        <ImageOutlinedIcon
          sx={{ height: 42, width: 42 }}
          className="text-gray-500"
        />
        <p className="text-gray-500 mt-1">Click to Upload</p>
        <input
          type="file"
          id={id}
          accept="image/*"
          title="Upload a file"
          className="absolute w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
        />
      </div>
    );
  } else {
    return (
      <img
        src={URL.createObjectURL(storePicture)}
        className="w-56 h-56 rounded-full border-2 border-gray-200 object-cover"
        alt="profile"
      />
    );
  }
};

export default StorePictureUploader;
