import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewBooking } from "../../services/apiBooking";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: newBooking, isLoading: isCreating } = useMutation({
    mutationFn: createNewBooking,
    onSuccess: () => {
      toast.success("New Booking successfully created");
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, newBooking };
}
