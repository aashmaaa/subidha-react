import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBooking";

export function useBooking() {
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getBooking,
  });

  console.log(booking);

  return { isLoading, booking, error };
}
