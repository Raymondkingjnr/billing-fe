import {clearSessionStorage, getSessionStorage, setLoggedInUser, setSessionStorage} from "@/lib/helpers";

export const baseUrl = 'https://billing-api-2voh.onrender.com/api/v1'

export interface AuthUser{
    _id: string;
    fullName: string;
    email: string;
    "role": string,
    isVerified?: boolean;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: AuthUser;
    };
}


export interface SignUpParams {
    fullName: string;
    email: string;
    password: string;
}

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
    setLoggedInUser(result.data.user)
    return result;
};


export const signUp = async (FullName: string, email: string, password: string):Promise<AuthResponse> => {
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
    setLoggedInUser(result.data.user)
    return result;
};