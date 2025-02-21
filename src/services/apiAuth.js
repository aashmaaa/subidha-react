// import axiosInstance from "./axiosInstance";

import axios from "axios";

// Define the base URL for the backend
const API_URL = "http://localhost:4040/api/auth"; // Adjust according to your backend route

// ✅ Login function (calls the backend API for authentication)
export async function loginApi({ email, password }) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    // Assuming the backend returns { accessToken, refreshToken }
    const { accessToken, refreshToken } = response.data.data;

    // Store tokens securely (consider HttpOnly cookies instead for security)
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data.data; // Return user data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

// ✅ Get Current User function
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("accessToken");
    // console.log(token);
    if (!token) return null;

    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data.data);
    return response.data.data; // Return user details
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// ✅ Logout function
export async function logout() {
  try {
    const token = localStorage.getItem("accessToken");

    await axios.post(
      `${API_URL}/logout`,
      {}, // No payload needed
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Remove tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
}
