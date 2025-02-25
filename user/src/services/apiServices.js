import axios from "axios";

const API_URL = "http://localhost:4040/api/service";

// Get all cabins
export async function getServices() {
  try {
    const response = await axios.get(`${API_URL}/servicename`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
}
