import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Base URL from environment variables
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or any other storage mechanism)
    const token = localStorage.getItem("accessToken");

    if (token) {
      // Attach token to request headers
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error status is 401 and the request is not already retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token using the refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axiosInstance.post("/auth/refreshToken", { refreshToken });

          // Extract the new access token from the response
          const accessToken = response.data.data;

          // Update the access token in localStorage
          localStorage.setItem("accessToken", accessToken);

          // Update the Authorization header and retry the original request
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout the user)
        console.error("Token refresh failed:", refreshError);

        // Clear tokens from localStorage
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");

        // Optionally, redirect the user to the login page
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
