import axios from "axios";

const API_URL = "http://localhost:4040/api/";

// Get all cabins
export async function getOrg() {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
}
