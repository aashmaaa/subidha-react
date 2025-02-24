import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../services/apiUserOrder";

export function useUserOrders() {
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
  });

  console.log(orders);

  return { isLoading, orders, error };
}
