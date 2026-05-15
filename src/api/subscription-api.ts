import { getSessionStorage } from "@/lib/helpers";

import { baseUrl } from "./auth-api";

export interface CheckoutRes {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}

export const getCheckoutUrl = async (planId: string): Promise<CheckoutRes> => {
  const token = getSessionStorage();
  if (!token) {
    throw new Error("No session token found");
  }
  const response = await fetch(`${baseUrl}/subscription/checkout/${planId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = (await response.json()) as CheckoutRes;

  if (!response.ok) {
    throw new Error(result.message || `Checkout failed with status ${response.status}`);
  }

  return result;
};
