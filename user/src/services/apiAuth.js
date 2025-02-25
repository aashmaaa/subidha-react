// import axiosInstance from "./axiosInstance";

import axios from "axios";

const API_URL = "http://localhost:4040/api/auth";

export async function loginApi({ email, password }) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { accessToken, refreshToken } = response.data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function logout() {
  try {
    const token = localStorage.getItem("accessToken");

    await axios.post(
      `${API_URL}/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
}
