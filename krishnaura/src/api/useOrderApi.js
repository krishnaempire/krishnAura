import { useToast } from "@/components/ui/use-toast";

const useOrderApi = () => {
    const { toast } = useToast()

    const addOrder = async (orderData) => {
        try {
            const response = await fetch("/api/order/add-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });
    
            if (!response.ok) {
                toast({
                    description: "Failed to add order"
                })
            }

        } catch (error) {
            console.error("Error adding order:", error);
            toast({
                description: error.message
            })
        }
    };
    
    const getUserOrder = async (id) => {
        try {
            const response = await fetch(`/api/order/get-user-order/${id}`, { cache: 'no-store' })

            if (!response.ok) {
                toast({
                    description: "Failed to get orders"
                })
            }
            const data = await response.json()
            return data

        } catch (error) {
            console.error("Error getting orders:", error);
            toast({
                description: error.message
            })
        }
    };
    
    const getOrder = async (orderId) => {
        try {
            const response = await fetch(`/api/order/get-order/${orderId}`, { cache: 'no-store' })

            if (!response.ok) {
                toast({
                    description: "Failed to get orders"
                })
            }
            const data = await response.json()
            return data

        } catch (error) {
            console.error("Error getting orders:", error);
            toast({
                description: error.message
            })
        }
    };
    
    const updateOrder = async (orderId) => {
        try {
            const response = await fetch(`/api/order/update-order/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                toast({
                    description: "Failed to update order"
                })
            }
            const data = await response.json()
            return data

        } catch (error) {
            console.error("Error updating order:", error);
            toast({
                description: error.message
            })
        }
    };

    const getAllOrder = async () => {
        try {
            const response = await fetch(`/api/order/get-all-order`, {next: {revalidate: 0}})

            if (!response.ok) {
                toast({
                    description: "Failed to get order"
                })
            }
            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error getting order:", error);
            toast({
                description: error.message
            })
        }
    };
    
    return {
        addOrder,
        getUserOrder,
        updateOrder,
        getAllOrder,
        getOrder
    }
}

export default useOrderApi