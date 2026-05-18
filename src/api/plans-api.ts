import { PricingCardProps } from "@/component/price-card";
import { baseUrl } from "@/api/auth-api";

export interface plansResponse {
  success: boolean;
  data: { plans: IPlan[] };
  message?: string;
}

export const plansApi = async (): Promise<plansResponse> => {
  const response = await fetch(`${baseUrl}/plans`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }

  return response.json();
};
