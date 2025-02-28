import axios from "axios";

const API_URL = "http://localhost:4040/api";

// Get all cabins
export async function getBooking() {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/booking`,
      // { withCredentials: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data.data.docs);
    return response.data.data.docs;
  } catch (error) {
    console.error(
      "Error fetching user orders:",
      error?.response?.data || error
    );
    throw new Error("Bookings could not be loaded");
  }
}

export async function createNewBooking(newBooking) {
  try {
    const response = await axios.post(`${API_URL}/booking`, newBooking, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error);
    throw new Error(
      error.response?.data?.error || "Booking could not be created"
    );
  }
}

const token = localStorage.getItem("accessToken");
console.log(token);
if (token) {
  axios
    .post(`${API_URL}/booking`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
} else {
  console.log("Token is missing");
}
