import { useToast } from "@/components/ui/use-toast";

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
                description: error.message
            })
        }
    }

    const getProduct = async (id) => {
        try {
            let res

            if (id) {
                res = await fetch(`/api/product/get-product/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

            } else {
                res = await fetch("/api/product/get-product", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }

            const data = await res.json()

            if (data.error) {
                toast({
                    description: data.error
                })
                return
            }

            return data

        } catch (error) {
            toast({
                description: error.message
            })
        }
    }

    
    return {
        addProduct,
        getProduct,
    };
};

export default useProductApi;
