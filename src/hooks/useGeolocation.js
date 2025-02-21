import { useState, useEffect } from "react";
import { getAddress } from "../services/apiGeocoding";

const useGeolocation = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const addressData = await getAddress({ latitude, longitude });
            setLocation(addressData.locality || "Location not found");
          } catch (err) {
            setError("Unable to retrieve address.");
            console.error("Error fetching address:", err);
          }
        },
        (err) => {
          setError("Unable to retrieve location.");
          console.error("Error getting location", err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return { location, error };
};

export default useGeolocation;
