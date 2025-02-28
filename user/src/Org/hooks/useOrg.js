import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useOrgUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["org"],
    queryFn: getCurrentUser,
  });
  console.log(user);
  console.log(isLoading);
  return { isLoading, user, isAuthenticated: user?.role === "organization" };
}
