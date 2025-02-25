import axios from "axios";

const API_URL = "http://localhost:4040/api";

// Get all cabins
export async function getUserOrders() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get(`${API_URL}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data.docs);
    return response.data.data.docs;
  } catch (error) {
    console.error(
      "Error fetching user orders:",
      error?.response?.data || error
    );
    throw new Error("Orders could not be loaded");
  }
}
