// import styled from "styled-components";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// import useGeolocation from "../../hooks/useGeolocation";

// import { useServices } from "../services/useServices";
// import { useCreateOrder } from "./useCreateOrder";

// import Spinner from "../../ui/Spinner";
// import Button from "../../ui/Button";

// const ModalContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// `;

// const Input = styled.input`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// // const Button = styled.button`
// //   padding: 10px 15px;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   font-weight: bold;
// //   ${(props) =>
// //     props.variant === "confirm"
// //       ? "background: #4caf50; color: white;"
// //       : "background: #d9534f; color: white;"}

// //   &:hover {
// //     opacity: 0.8;
// //   }
// // `;

// function OrderForm({ service, onCloseModal }) {
//   const { isLoading } = useServices();
//   const { _id: serviceId, name } = service;
//   // console.log(service);
//   console.log(service);

//   const { isCreating, createOrder } = useCreateOrder();
//   const { register, handleSubmit, reset } = useForm();
//   const [coords, setCoords] = useState([0, 0]);

//   const [currentLocation, setCurrentLocation] = useState("");
//   const { location, error } = useGeolocation();
//   const isFetchingLoading = !location && !error;

//   const onSubmit = (data) => {
//     createOrder({
//       serviceId: service._id,
//       userId: "60f1b0b3b3f3b40015f1f2b4",
//       location: data.location || location,
//       coordinates: coords,
//     });
//     reset();
//   };
//   if (isLoading) return <Spinner />;

//   return (
//     <ModalContent>
//       <h2>Order {name}</h2>
//       <label>Enter your Location:</label>
//       <Input
//         type="text"
//         placeholder={
//           isFetchingLoading ? "Fetching location..." : "Enter your location"
//         }
//         value={location}
//         onChange={(e) => setCurrentLocation(e.target.value)}
//       />
//       <ButtonContainer>
//         <Button
//           variant="confirm"
//           onClick={() => onSubmit({ location: currentLocation || location })}
//         >
//           Place Order
//         </Button>
//         <Button
//           variation="secondary"
//           type="reset"
//           disabled={isCreating}
//           onClick={() => onCloseModal?.()}
//         >
//           Cancel
//         </Button>
//       </ButtonContainer>
//     </ModalContent>
//   );
// }

// export default OrderForm;

import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";

import useGeolocation from "../../hooks/useGeolocation";
import { useServices } from "../services/useServices";
import { useCreateOrder } from "./useCreateOrder";

import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useUser } from "../authentication/useUser";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useEffect } from "react";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function OrderForm({ service, onCloseModal }) {
  const { isLoading } = useServices();
  const { _id: serviceId, name } = service;
  const { user } = useUser();
  // console.log(user);
  console.log(service);

  const { isCreating, createOrder } = useCreateOrder();
  const { register, handleSubmit, reset, formState } = useForm();
  const [currentLocation, setCurrentLocation] = useState("");
  const [coords, setCoords] = useState([0, 0]);

  const { errors } = formState;

  // Use geolocation hook
  const { location, error } = useGeolocation();
  const isFetchingLoading = !location && !error;

  useEffect(() => {
    if (location && location.coords) {
      setCoords([location.coords.latitude, location.coords.longitude]);
    }
  }, [location]);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("SUbmittingdata : ", data);
    console.log("Coordinates:", coords);
    const newOrder = {
      user: user._id,
      serviceName: service._id,
      longLat: {
        type: "Point",
        coordinates: coords.length ? coords : [0, 0],
      },
      location: data.location || location,
      // longlat: coords.length ? coords : [0, 0],
    };
    console.log("New Order : ", newOrder);
    createOrder(newOrder);
    reset();
  };

  if (isLoading) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <h2>Order {name}</h2>
      <label>Enter your Location:</label>
      <FormRow label="Enter Location" error={errors?.location?.message}>
        <Input
          type="text"
          placeholder={
            isFetchingLoading ? "Fetching location..." : "Enter your location"
          }
          value={currentLocation || location || ""}
          onChange={(e) => setCurrentLocation(e.target.value)}
          {...register("location", { required: "Location is required" })}
        />
      </FormRow>

      {error && (
        <p style={{ color: "red" }}>Error fetching location: {error.message}</p>
      )}

      <ButtonContainer>
        <Button variant="confirm" type="submit" disabled={isCreating}>
          {isCreating ? "Placing Order..." : "Place Order"}
        </Button>

        <Button
          variant="secondary"
          type="button"
          onClick={() => onCloseModal?.()}
          disabled={isCreating}
        >
          Cancel
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export default OrderForm;
