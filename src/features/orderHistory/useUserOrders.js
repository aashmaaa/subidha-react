import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../services/apiUserOrder";

export function useUserOrders() {
  const {
    isLoading,
    data: orderHistory,
    error,
  } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
  });

  return { isLoading, orderHistory, error };
}
