import styled from "styled-components";
import { useState } from "react";
import { useServices } from "../services/useServices";
import useGeolocation from "../../hooks/useGeolocation";

import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

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

// const Button = styled.button`
//   padding: 10px 15px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-weight: bold;
//   ${(props) =>
//     props.variant === "confirm"
//       ? "background: #4caf50; color: white;"
//       : "background: #d9534f; color: white;"}

//   &:hover {
//     opacity: 0.8;
//   }
// `;

function OrderForm({ service, onCloseModal }) {
  const { isLoading } = useServices();
  const { _id: serviceId, name } = service;
  // console.log(service);
  console.log(service);
  const [currentLocation, setCurrentLocation] = useState("");
  const { location, error } = useGeolocation();
  const isFetchingLoading = !location && !error;

  const handlePlaceOrder = () => {
    console.log(`Placing order for ${name} at ${location}`);
    onCloseModal();
  };

  if (isLoading) return <Spinner />;

  return (
    <ModalContent>
      <h2>Order {name}</h2>
      <label>Enter your Location:</label>
      <Input
        type="text"
        placeholder={
          isFetchingLoading ? "Fetching location..." : "Enter your location"
        }
        value={location}
        onChange={(e) => setCurrentLocation(e.target.value)}
      />
      <ButtonContainer>
        <Button variant="confirm" onClick={handlePlaceOrder}>
          Place Order
        </Button>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
      </ButtonContainer>
    </ModalContent>
  );
}

export default OrderForm;
{
  /* <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button> */
}
