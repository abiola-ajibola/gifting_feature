import axios, { AxiosError } from "axios";

const baseURL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/api";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Do something before the request is sent
    // For example, you can add an authorization token
    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (typeof document !== "undefined") {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (e) => {
    const error = e as AxiosError;
    throw new Response("Failed to fetch data", {
      status: error.response?.status || 500,
    });
  }
);

export { apiClient };
