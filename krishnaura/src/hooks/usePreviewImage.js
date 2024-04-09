"use client"
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const usePreviewImg = () => {
  const { toast } = useToast()
  const [imgUrl, setImgUrl] = useState([]);
  
  

  const handleImageChange = (e) => {
    if (imgUrl?.length === 4) {
      toast({
        description: "Only 4 images allowed"
      })
      return 
      
    }
    const file = e.target.files[0];
    if (!file) return; 

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