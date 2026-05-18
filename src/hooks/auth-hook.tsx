import { getUserData, login, signUp } from "@/api/auth-api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (result) => {
      toast.success("Login successful");
      queryClient.setQueryData(["current-user"], result.data.user);
      void queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Login failed");
    },
  });
};

export const useSignupUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => signUp(name, email, password),
    onSuccess: (_, variables) => {
      toast.success("Account created successfully");
      void queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Sign up failed");
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    enabled: true,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
