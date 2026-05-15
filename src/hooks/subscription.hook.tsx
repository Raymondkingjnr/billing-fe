import { useMutation } from "@tanstack/react-query";
import { getCheckoutUrl } from "@/api/subscription-api";
import toast from "react-hot-toast";

export const useCheckoutUrl = () => {
  return useMutation({
    mutationFn: (planId: string) => {
      if (!planId) {
        throw new Error("Plan ID is required");
      }

      return getCheckoutUrl(planId);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to start checkout");
    },
  });
};
