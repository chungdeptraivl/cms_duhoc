import { auth } from "@/config/apiConfig";
import axios from "axios";

export interface ApiResponse {
  result: {
    accessToken: string;
    refreshToken: string;
    fullName: string;
    expiration: string;
    roles: string[];
  };
  errorMessages: string[];
  isOK: boolean;
  statusCode: number;
}

export const login = async (
  username: string,
  password: string
): Promise<ApiResponse | null> => {
  try {
    const response = await auth.post<ApiResponse>("/auth/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};
