import axios from "axios";

const API_URL = "http://localhost:4040/api";

// Get all cabins
export async function getServiceDetails() {
  try {
    const response = await axios.get(`${API_URL}/service/details`);
    // const serviceDetails = response.data.docs;
    // console.log(response.data.data.docs);
    return response.data.data.docs;
  } catch (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
}
