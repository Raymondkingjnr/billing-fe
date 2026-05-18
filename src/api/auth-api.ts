import {
  clearSessionStorage,
  getSessionStorage,
  setLoggedInUser,
  setSessionStorage,
} from "@/lib/helpers";

// export const baseUrl = "https://billing-api-2voh.onrender.com/api/v1";
export const baseUrl = "http://localhost:5500/api/v1";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = (await response.json()) as AuthResponse;

  if (!response.ok || !result.success || !result.data?.token) {
    throw new Error(result.message || "Login failed");
  }

  setSessionStorage(result.data.token);
  setLoggedInUser(result.data.user);
  return result;
};

export const signUp = async (
  FullName: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ FullName, email, password }),
  });

  const result = (await response.json()) as AuthResponse;

  if (!response.ok || !result.success || !result.data?.token) {
    throw new Error(result.message || "Sign up failed");
  }

  setSessionStorage(result.data.token);
  setLoggedInUser(result.data.user);
  return result;
};

export const getUserData = async (): Promise<MeRes> => {
  const token = getSessionStorage();
  if (!token) {
    throw new Error("No session token found");
  }
  const res = await fetch(`${baseUrl}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = (await res.json()) as MeRes;
  if (!res.ok) {
    throw new Error(`Checkout failed with status ${res.status}`);
  }
  return result;
};
