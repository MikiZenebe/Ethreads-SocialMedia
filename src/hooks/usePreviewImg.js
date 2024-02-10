import { useState } from "react";
import toast from "react-hot-toast";

export default function usePreviewImg() {
  const [imgUrl, setImgUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file");
      setImgUrl(null);
    }
  };

  return { handleImageChange, imgUrl, setImgUrl };
}
