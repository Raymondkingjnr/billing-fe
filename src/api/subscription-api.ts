import { getSessionStorage } from "@/lib/helpers";

import { baseUrl } from "./auth-api";
import { PricingCardProps } from "@/component/price-card";

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
    throw new Error(
      result.message || `Checkout failed with status ${response.status}`,
    );
  }

  return result;
};

export const getUserSubcriptio = async (): Promise<IsubscripionRes> => {
  const token = getSessionStorage();
  if (!token) {
    throw new Error("No session token found");
  }

  const response = await fetch(`${baseUrl}/subscription/current-subscription`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = (await response.json()) as IsubscripionRes;

  if (!response.ok) {
    throw new Error(
      result.message || `Checkout failed with status ${response.status}`,
    );
  }

  return result;
};

export const cancelSub = async (): Promise<IsubscripionRes> => {
  const token = getSessionStorage();
  if (!token) {
    throw new Error("No session token found");
  }

  const response = await fetch(`${baseUrl}/subscription/cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = (await response.json()) as IsubscripionRes;

  if (!response.ok) {
    throw new Error(
      result.message || `Checkout failed with status ${response.status}`,
    );
  }

  return result;
};
