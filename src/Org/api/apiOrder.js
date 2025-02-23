import axios from "axios";

const API_URL = "http://localhost:4040/api";

export async function getOrgOrders(token, status = "Accepted") {
  try {
    const response = await axios.get(`${API_URL}/order?status=${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching organization orders:",
      error?.response?.data || error
    );
    throw new Error("Orders could not be loaded");
  }
}
