import { useToast } from "@/components/ui/use-toast";
import { isValidObjectId } from "mongoose";

const useProductApi = () => {
    const { toast } = useToast()

    const addProduct = async (productValue, imgUrl) => {

        const productData = {
            ...productValue,
            imgUrl
        }
        try {
            const res = await fetch("/api/product/add-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            })

            const data = await res.json()
            if (data.error) {
                toast({
                    description: data.error
                })
                return
            }

            toast({
                description: "added successfully"
            })
        } catch (error) {
            toast({
                description: "Please try again"
            })
        }
    }

    const getProductById = async (id) => {
        try {
            const res = await fetch(`/api/product/get-product/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const data = await res.json();
    
            if (data.error) {
                toast({
                    description: data.error
                });
                return;
            }
    
            return data;
        } catch (error) {
            toast({
                description: error.message
            });
        }
    };
    
    const getAllProduct = async (page) => {
        try {
            const res = await fetch(`/api/product/get-product?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const data = await res.json();
            
            if (data.error) {
                toast({
                    description: data.error
                });
                return;
            }
            console.log(data)
            return data;
        } catch (error) {
            toast({
                description: error.message
            });
        }
    };


    const getPaginatedProducts = async (page = 1, limit = 10) => {
        try {
            const res = await fetch(`/api/product/get-product/page?page=${page}&limit=${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (data.error) {
                toast({
                    description: data.error,
                });
                return;
            }

            return data;
        } catch (error) {
            toast({
                description: error.message,
            });
        }
    };

    return {
        addProduct,
        getProductById,
        getAllProduct,
        getPaginatedProducts,
    };
};

export default useProductApi;
