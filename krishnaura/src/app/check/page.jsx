"use client"
import usePreviewImg from "@/hooks/usePreviewImage.js";
import { useRef, useState } from "react";

const maxChar = 500;

function CreatePost() {
  const stock = 10
  const [postText, setPostText] = useState("");
  const [remainingCharacter, setRemainingCharacter] = useState(maxChar);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const imageRef = useRef(null);

  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > maxChar) {
      const truncatedText = inputText.slice(0, maxChar);
      setPostText(truncatedText);
    } else {
      setPostText(inputText);
      setRemainingCharacter(maxChar - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    try {
      const res = await fetch("/api/product/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imgUrl, stock }),
      });
      if (!res.ok) {
        throw new Error("Failed to add product");
      }
      const data = await res.json();

      console.log(data)
    } catch (error) {
      console.log(error.message);
    }
    setPostText("");
    setImgUrl("");
  };

  return (
    <>
    hello
      <button onClick={handleCreatePost}>POST</button>
      <div>
        <textarea
          placeholder="Write something here..."
          onChange={handleTextChange}
          value={postText}
          className="border rounded-md outline-none h-[8rem]"
        />
        <div>
          {remainingCharacter}/{maxChar}
        </div>
        <input type="file" hidden ref={imageRef} onChange={handleImageChange} />
        <button onClick={() => imageRef.current.click()}>Choose Image</button>
        <div>Limit 4.5mb due to vercel</div>
      </div>
      {imgUrl && imgUrl.map((url, index) => ( 
        <div key={index}>
          <img src={url} alt={`Selected image ${index + 1}`} /> 
          <button onClick={() => { 
            const newUrls = [...imgUrl];
            newUrls.splice(index, 1);
            setImgUrl(newUrls);
          }}>Remove Image</button>
        </div>
      ))}
    </>
  );
}

export default CreatePost;