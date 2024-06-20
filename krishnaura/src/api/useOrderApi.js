import { useToast } from "@/components/ui/use-toast";

const useOrderApi = () => {
    const { toast } = useToast();


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
                    description: "Failed to add orderData"
                })
            }

        } catch (error) {
            console.error("Error adding orderData:", error);
            toast({
                description: error.message
            })
        }
    };

    const getUserOrder = async (id, page) => {
        try {
            const response = await fetch(`/api/order/get-user-order/${id}?page=${page}`);

            if (!response.ok) {
                toast({
                    description: "Failed to get orders"
                });
            }
            const data = await response.json();

            return data;

        } catch (error) {
            console.error("Error getting orders:", error);
            // toast({
            //     description: error.message
            // });
        }
    };

    const getOrder = async (orderId) => {
        try {
            const response = await fetch(`/api/order/get-order/${orderId}`, { cache: 'no-store' });

            if (!response.ok) {
                toast({
                    description: "Failed to get orders"
                });
            }
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error getting orders:", error);
            // toast({
            //     description: error.message
            // });
        }
    };

    const updateOrder = async (orderId, cancel, returned) => {
        try {
            const response = await fetch(`/api/order/update-order/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({cancel, returned})
            });

            if (!response.ok) {
                toast({
                    description: "Failed to update orderData"
                });
            }
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error updating orderData:", error);
            toast({
                description: error.message
            });
        }
    };

    const getAllOrder = async (page) => {
        try {
            const response = await fetch(`/api/order/get-all-order?page=${page}`, { next: { revalidate: 0 } });

            if (!response.ok) {
                toast({
                    description: "Failed to get orderData"
                });
            }
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error getting orderData:", error);
            toast({
                description: error.message
            });
        }
    };

    

    const addOrdertoShipway = async (orderData, products, priceList) => {
        const payload = {
            order_id: orderData.orderId,
            products: products.map((product, index) => ({
                product: product.name,
                price: String(priceList[index]),
                amount: product?.quantity || "1",
                discount: product?.discount || "0",
                tax_rate: "2",
                tax_title: "IGST"
            })),
            discount: orderData.discount || "0",
            shipping: orderData.shipping === "P" ? "20" : "80",
            order_total: String(orderData.totalPrice),
            taxes: "40",
            payment_type: orderData.paymentType,
            email: orderData.email,
            billing_address: orderData.address,
            billing_address2: orderData.address,
            billing_city: orderData.city,
            billing_state: orderData.state,
            billing_firstname: orderData.firstName,
            billing_lastname: orderData.lastName,
            billing_phone: orderData.phoneNumber,
            billing_zipcode: String(orderData.pinCode),
            shipping_address: orderData.address,
            shipping_address2: orderData.address,
            shipping_city: orderData.city,
            shipping_state: orderData.state,
            shipping_country: "India",
            shipping_firstname: orderData.firstName,
            shipping_lastname: orderData.lastName,
            shipping_phone: orderData.phoneNumber,
            shipping_zipcode: String(orderData.pinCode),
            order_weight: "200",
            box_length: "10",
            box_breadth: "10",
            box_height: "3",
            order_date: orderData.order_date
        };
    
        try {
            const response = await fetch('/api/shipway/add-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to add order: ${errorData.message}`);
            }
    
            const data = await response.json();
            console.log(data)
            return data;
    
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };
    
    const cancelOrderInShipway = async (orderId) => {

        const payload = {
            order_ids: [orderId],
        };
    
        try {
            const response = await fetch('/api/shipway/cancel-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to cancel orders: ${errorData.message}`);
            }
    
            const data = await response.json();
            return data;
    
        } catch (error) {
            console.error("Error canceling orders:", error);
        }
    };

    const returnReasonShipway = async (reason) => {
        const payload = {
            reason: reason
        };
    
        try {
            const response = await fetch('/api/shipway/create-return-order-reason', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to create return resson: ${errorData.message}`);
            }
    
            const data = await response.json();
            return data;
    
        } catch (error) {
            console.error("Error creating reson:", error);
        }
    };
    
    const createReturnOrder = async (orderData, products) => {
        const payload = {
            order_id: orderData.orderId,
            return_order_status: "R",
            products: products.map((product, index) => ({
                product: product.name,
                price: String(orderData.priceList[index]),
                amount: orderData.quantity.split(" ")[index],
                tax_rate: "2",
                product_code: product.name,
                tax_title: "IGST",
                return_reason_id: String(orderData.reasonId),
                return_products_images: product.productImages[0],
                customer_notes: orderData.reason,
                variants: orderData.color.split(" ")[index]
            })),
            refund_payment_id: orderData.returnPayment,
            discount: "0",
            shipping: "60",
            order_total: String(orderData.price),
            taxes: "40",
            payment_type: "P",
            email: orderData.email,
            billing_address: orderData.address,
            billing_address2: orderData.address,
            billing_city: orderData.city,
            billing_state: orderData.state,
            billing_firstname: orderData.firstName,
            billing_lastname: orderData.lastName,
            billing_phone: orderData.phoneNumber,
            billing_zipcode: String(orderData.pinCode),
            shipping_address: orderData.address,
            shipping_address2: orderData.address,
            shipping_city: orderData.city,
            shipping_state: orderData.state,
            shipping_country: "India",
            shipping_firstname: orderData.firstName,
            shipping_lastname: orderData.lastName,
            shipping_phone: orderData.phoneNumber,
            shipping_zipcode: String(orderData.pinCode),
            order_weight: "200",
            box_length: "10",
            box_breadth: "10",
            box_height: "3",
            order_date: orderData.order_date
        };
        console.log(payload)
        try {
            const response = await fetch('/api/shipway/create-return-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to create return order: ${errorData.message}`);
            }
    
            const data = await response.json();
            return data;
    
        } catch (error) {
            console.error("Error creating return order:", error);
        }
    };
    
    
    

    return {
        addOrder,
        createReturnOrder,
        addOrdertoShipway,
        cancelOrderInShipway,
        returnReasonShipway,
        getUserOrder,
        updateOrder,
        getAllOrder,
        getOrder
    }
}

export default useOrderApi;
