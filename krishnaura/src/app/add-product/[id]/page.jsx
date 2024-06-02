"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Radio, RadioGroup, ScrollShadow, Textarea } from '@nextui-org/react';
import usePreviewImg from '@/hooks/usePreviewImage';
import useProductApi from '@/api/useProductApi';
import { useToast } from '@/components/ui/use-toast';
import { MdDeleteOutline } from "react-icons/md";
import Image from 'next/image';

const AddProduct = () => {
  const { toast } = useToast()
  const { addProduct } = useProductApi()
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const [productValue, setProductValue] = useState({
    name: "",
    type: "",
    stock: "",
    description: "",
    about: "",
    size: [],
    color: []
  });

  const [newSize, setNewSize] = useState({ name: "", available: true, price: "", offPercentage: "", offPrice: "" });
  const [newColor, setNewColor] = useState({ name: "", available: true });

  const imageRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'size') {
      setNewSize(prevSize => ({
        ...prevSize,
        name: value
      }));
    } else if (name === 'color') {
      setNewColor(prevColor => ({
        ...prevColor,
        name: value
      }));
    } else {
      setProductValue(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleAddSize = () => {
    if (newSize.name.trim() !== "" && newSize.price.trim() !== "") {
      setProductValue((prevState) => ({
        ...prevState,
        size: [...prevState.size, newSize],
      }));
      setNewSize({ name: "", available: true, price: "", offPercentage: "", offPrice: "" });
    } else {
      toast({
        description: "Both size name and price are required",
      });
    }
  };



  const handleAddColor = () => {
    if (newColor.name.trim() !== "") {
      setProductValue(prevState => ({
        ...prevState,
        color: [...prevState.color, newColor]
      }));
      setNewColor({ name: "", available: true });
    }
  };

  const removeSize = (index) => {
    setProductValue(prevState => ({
      ...prevState,
      size: prevState.size.filter((_, i) => i !== index)
    }));
  };

  const removeColor = (index) => {
    setProductValue(prevState => ({
      ...prevState,
      color: prevState.color.filter((_, i) => i !== index)
    }));
  };
  useEffect(() => {
    if (newSize.price && newSize.offPrice) {
      const difference = newSize.price - newSize.offPrice;
      const percentageDecrease = (difference / newSize.price) * 100;
      setNewSize(prevSize => ({
        ...prevSize,
        offPercentage: Math.floor(percentageDecrease)
      }));
    }
  }, [newSize.price, newSize.offPrice]);

  const handleSumbit = async () => {

    if (!productValue.name || !productValue.type || !productValue.stock || productValue.color.length === 0 || productValue.size.length === 0) {
      toast({
        description: "All fields are required"
      })
      return
    }
    try {
      await addProduct(productValue, imgUrl)
      setProductValue({
        name: "",
        type: "",
        stock: "",
        description: "",
        off: "",
        size: [],
        color: [],
      });
      setImgUrl("");

    } catch (error) {

    }
  }

  return (
    <>
      <div className='w-[70%] m-auto flex-col md:flex justify-evenly mt-[8rem] mb-[10rem] '>
        <div className='flex flex-col gap-3 mr-2'>
          <div>
            <Button onClick={() => imageRef.current.click()} variant={"bordered"}>Add Image</Button>
            <input type="file" hidden ref={imageRef} onChange={handleImageChange} />
          </div>
          <div className='flex flex-wrap justify-evenly border-1 w-[20rem] h-[47rem] p-[1rem] rounded-lg '>
            {imgUrl && imgUrl.map((url, index) => (
              <div key={index} className='w-[15rem] h-[11.5rem] overflow-hidden'>
                <Image width={1000} height={1000} src={url} alt={`Selected image ${index + 1}`} className='rounded-sm object-cover h-[10rem]' />
                <button
                  className="text-black"
                  onClick={() => {
                    const newUrls = [...imgUrl];
                    newUrls.splice(index, 1);
                    setImgUrl(newUrls);
                  }}><MdDeleteOutline /></button>
              </div>
            ))}
          </div>

          <Button variant={"ghost"} onClick={handleSumbit} className='hidden lg:flex'>Add Product</Button>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='w-[20rem] flex flex-col gap-3'>

            <Input
              type='text'
              variant={"bordered"}
              name='name'
              placeholder='Product Name'
              value={productValue.name}
              onChange={handleInputChange}
            />
            <RadioGroup
              label="Select Product Type"
              value={productValue.type}
              onValueChange={(value) => setProductValue(prevState => ({
                ...prevState,
                type: value
              }))}
            >
              <Radio value="Dress">Dress</Radio>
              <Radio value="Jewellery">Jewellery</Radio>
            </RadioGroup>
            <Input
              type='text'
              variant={"bordered"}
              name='stock'
              placeholder='Stock'
              value={productValue.stock}
              onChange={handleInputChange}
            />
            <Textarea className='w-full rounded-[.7rem] mt-[1rem]'
              placeholder='write about product...'
              name='description'
              variant={"bordered"}
              maxRows={5}
              onChange={handleInputChange}
              value={productValue.description}
            />
            <Textarea className='w-full rounded-[.7rem] mt-[1rem]'
              placeholder='write specs of product...'
              name='about'
              variant={"bordered"}
              maxRows={5}
              onChange={handleInputChange}
              value={productValue.about}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <div className="lg:flex flex-wrap items-center">
                <input
                  type="text"
                  name="sizeName"
                  value={newSize.name}
                  onChange={(e) => setNewSize((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Add size"
                  className="py-[.8rem] px-[1rem] w-[20rem] rounded-[1rem] outline-none border-2 border-gray-200"
                />
                <input
                  type="text"
                  name="sizePrice"
                  value={newSize.price}
                  onChange={(e) => setNewSize((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="Price for size"
                  className="py-[.8rem] px-[1rem] w-[20rem] rounded-[1rem] outline-none border-2 border-gray-200"
                />
              </div>
              <div className="lg:flex flex-wrap items-center gap-2">

                <input
                  type="text"
                  name="sizePrice"
                  value={newSize.offPrice}
                  onChange={(e) => setNewSize((prev) => ({ ...prev, offPrice: e.target.value }))}
                  placeholder="OffPrice for size"
                  className="py-[.8rem] px-[1rem] w-[20rem] rounded-[1rem] outline-none border-2 border-gray-200"
                />
                <input
                  type="text"
                  disabled={true}
                  name="sizePrice"
                  value={newSize.offPercentage}
                  // onChange={(e) => setNewSize((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="Discount"
                  className="py-[.8rem] px-[1rem] w-[20rem] rounded-[1rem] outline-none border-2 border-gray-200"
                />
                <Button variant="bordered" onClick={handleAddSize}>
                  Add
                </Button>
              </div>

            </div>
            <ScrollShadow className='w-full h-[6rem] border-2 border-gray-200 rounded-[.7rem] mt-[1rem]'>
              <div className='flex gap-2 w-full flex-wrap'>
                {productValue?.size?.map((item, index) => (
                  <div key={index} className='flex gap-2 mt-2 bg-gray-300/50 rounded-[1rem] py-[.2em] px-[.5rem]'>
                    <div className='border-1 border-gray-300 text-black text-center py-[.2rem] px-[1rem] rounded-[1rem]'>
                      <p className='text-center w-full h-full'>{item.name} | {item.price} | {item.offPercentage} | {item.offPrice}</p>
                    </div>
                    <button className='bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent' onClick={() => removeSize(index)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </ScrollShadow>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <div className='flex items-center gap-1'>
                <input
                  type='text'
                  name="color"
                  value={newColor.name}
                  onChange={handleInputChange}
                  placeholder='add color'
                  className='py-[.8rem] px-[1rem] w-[20rem] rounded-[1rem] outline-none border-2 border-gray-200'
                />
                <Button variant={"bordered"} className='font-medium py-[1.5rem] outline-none' onClick={handleAddColor}>
                  Add
                </Button>
              </div>
            </div>
            <ScrollShadow className='w-full h-[6rem] border-2 border-gray-200 rounded-[.7rem] mt-[1rem]'>
              <div className='flex gap-2 w-full flex-wrap'>
                {productValue.color?.map((item, index) => (
                  <div key={index} className='flex gap-2 mt-2 bg-gray-300/50 rounded-[1rem] py-[.2em] px-[.5rem]'>
                    <div className='border-1 border-gray-300 text-black text-center py-[.2rem] px-[1rem] rounded-[1rem]'>
                      <p className='text-center w-full h-full'>{item.name}</p>
                    </div>
                    <button className='bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent' onClick={() => removeColor(index)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </ScrollShadow>
          </div>
          <Button variant={"ghost"} onClick={handleSumbit} className='lg:hidden'>Add Product</Button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
