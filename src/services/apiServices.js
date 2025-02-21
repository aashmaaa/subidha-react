import axios from "axios";

const API_URL = "http://localhost:4040/api/service"; // Adjust according to your backend route

// Get all cabins
export async function getServices() {
  try {
    const response = await axios.get(`${API_URL}/servicename`);
    console.log(response.data);
    return response.data; // Return cabins data
  } catch (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
}

// // Delete a cabin
// export async function deleteCabin(id) {
//   try {
//     const response = await axios.delete(`${API_URL}/cabins/${id}`);
//     return response.data; // Return deleted cabin data
//   } catch (error) {
//     console.log(error);
//     throw new Error("Cabin could not be deleted");
//   }
// }

// // Create or Edit a cabin
// export async function createEditCabin(newCabin, id) {
//   try {
//     const response = await axios.post(`${API_URL}/cabins`, { newCabin, id });
//     return response.data; // Return created or updated cabin data
//   } catch (error) {
//     console.log(error);
//     throw new Error("Cabin could not be created or updated");
//   }
// }
