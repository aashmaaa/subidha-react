import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewOrder } from "../../services/apiUserOrder";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const { mutate: createOrder, isLoading: isCreating } = useMutation({
    mutationFn: createNewOrder,
    onSuccess: (data) => {
      toast.success("New order successfully placed");
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: (err) => {
      console.error("Error creating order:", err);
      if (err.response) {
        console.error("Response from backend:", err.response.data);
        toast.error(
          `Error: ${err.response.data.message || "Order could not be created"}`
        );
      } else {
        toast.error(err.message || "Something went wrong");
      }
    },
  });
  return { isCreating, createOrder };
}
