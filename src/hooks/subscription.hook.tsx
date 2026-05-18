import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelSub,
  getCheckoutUrl,
  getUserSubcriptio,
} from "@/api/subscription-api";
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
      toast.error(
        error instanceof Error ? error.message : "Unable to start checkout",
      );
    },
  });
};

export const useGetUserSub = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: getUserSubcriptio,
  });
};

export const useCancelSub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelSub,
    onSuccess: (result) => {
      toast.success(result.message);
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Unable to start checkout",
      );
    },
  });
};
