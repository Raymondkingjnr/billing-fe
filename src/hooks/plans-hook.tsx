import { useQuery } from "@tanstack/react-query";
import { plansApi } from "@/api/plans-api";

export const usePlans = () => {
    return useQuery({
        queryKey: ["plans"],
        queryFn: plansApi,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
    });
};