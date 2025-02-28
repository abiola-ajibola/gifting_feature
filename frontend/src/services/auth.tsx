import { AxiosError } from "axios";
import { apiClient } from "./config";
import { toast } from "react-toastify";
import { SignupData } from "@/app/signup/page";

const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await apiClient.post("auth/login", credentials);
    localStorage.setItem("token", response.data.token);
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    if (typeof document !== "undefined") {
      console.log("setCookie");
      document.cookie = `token=${response.data.token}; max-age=${response.data.expiresIn}`;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (typeof document !== "undefined") {
      toast.error(
        (error as AxiosError).response?.status === 401
          ? "Username or password incorrect"
          : "Login request failed. Please try again."
      );
    }
  }
};
const signup = async (credentials: SignupData) => {
  try {
    const response = await apiClient.post("auth/signup", credentials);
    localStorage.setItem("token", response.data.token);
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    if (typeof document !== "undefined") {
      console.log("setCookie");
      document.cookie = `token=${response.data.token}; max-age=${response.data.expiresIn}`;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (typeof document !== "undefined") {
      toast.error(
        (error as AxiosError).response?.status === 401
          ? "Username or password incorrect"
          : "Login request failed. Please try again."
      );
    }
  }
};

const me = async () => {
  try {
    const response = await apiClient.get("auth/me");
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("token", response.data.token);
    }
    if (typeof document !== "undefined") {
      console.log("setCookie");
      document.cookie = `token=${response.data.token}; max-age=${response.data.expiresIn}`;
    }
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error(error);
    // toast.error("Failed to fetch user data");
    throw error;
  }
};

export const auth = { me, login, signup };
