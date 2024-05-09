import { useToast } from "@/components/ui/use-toast";

const useCartApi = () => {
    const { toast } = useToast();
  
    const addToCart = async (Cart) => {
      try {
        const res = await fetch("/api/cart/add-cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Cart),
        });
  
        const data = await res.json();
  
        if (data.error) {
          toast({
            description: data.error,
          });
          return;
        }
  
        toast({
          description: "Added to cart successfully",
        });
      } catch (error) {
        toast({
          description: "Please try again",
        });
      }
    };
  
    const getCart = async (userId) => {
      try {
        const res = await fetch(`/api/cart/get-cart/${userId}`, { cache: "no-store" });
  
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
          description: "Please try again",
        });
      }
    };
  
    const deleteCartItem = async (cartId) => {
      try {
        const res = await fetch(`/api/cart/delete-cart/${cartId}`, {
          method: "DELETE",
        });
  
        const data = await res.json();
  
        if (data.error) {
          toast({
            description: data.error,
          });
          return;
        }
  
        toast({
          description: "Cart item deleted successfully",
        });
  
        return true; // Indicate success
      } catch (error) {
        toast({
          description: "Please try again",
        });
      }
    };

    const deleteCartItems = async (cartIds) => {
      try {
        const res = await fetch("/api/cart/delete-cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartIds }),
        });
  
        const data = await res.json();
  
        if (data.error) {
          toast({
            description: data.error,
          });
          return;
        }
  
        return true; // Indicate success
      } catch (error) {
        toast({
          description: "Please try again",
        });
      }
    };
  
    return {
      addToCart,
      getCart,
      deleteCartItem,
      deleteCartItems
    };
  };
  
  export default useCartApi;
  