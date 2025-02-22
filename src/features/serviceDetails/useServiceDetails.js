import { useQuery } from "@tanstack/react-query";
import { getServiceDetails } from "../../services/apiServiceDetails";

export function useServiceDetails() {
  const {
    isLoading,
    data: serviceDetails,
    error,
  } = useQuery({
    queryKey: ["serviceDetails"],
    queryFn: getServiceDetails,
  });

  return { isLoading, serviceDetails, error };
}
