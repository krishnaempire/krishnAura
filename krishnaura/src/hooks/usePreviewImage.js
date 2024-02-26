"use client"
import { useState } from "react";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState([]);
  console.log(imgUrl.length)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; // No file selected

    if (!file.type.startsWith("image/")) {
      console.log("Invalid file type", "Please select an image file", "error");
      setImgUrl([null]);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgUrl([...imgUrl, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;