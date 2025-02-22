// // import { useForm } from "react-hook-form";

// // function OrderForm() {
// //   const navigate = useNavigate();

// //   const handleClick = () => {
// //     navigate(`/orderDetails`);
// //   };
// //   return <button onClick={handleClick}>PlaceOrder</button>;
// // }

// import styled from "styled-components";
// import { useState } from "react";
// import { useServices } from "../services/useServices";
// import useGeolocation from "../../hooks/useGeolocation";

// import Spinner from "../../ui/Spinner";

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

// function OrderForm({ service, onCloseModal }) {
//   const { services, isLoading } = useServices();

//   const serv = services?.data || [];
//   const [currentLocation, setCurrentLocation] = useState("");
//   const { location, error } = useGeolocation();

//   const handlePlaceOrder = () => {
//     console.log(`Placing order for ${serv.name} at ${location}`);
//     onCloseModal(); // Close modal after order
//   };

//   if (isLoading) return <Spinner />;

//   return (
//     <ModalContent>
//       <h2>Order {serv.name}</h2>
//       <label>Location:</label>
//       <Input
//         type="text"
//         placeholder="Enter your location"
//         value={location}
//         onChange={(e) => setCurrentLocation(e.target.value)}
//       />
//       <ButtonContainer>
//         <Button variant="confirm" onClick={handlePlaceOrder}>
//           Place Order
//         </Button>
//         <Button onClick={onCloseModal:close}>Cancel</Button>
//       </ButtonContainer>
//     </ModalContent>
//   );
// }

// export default OrderForm;
import styled from "styled-components";
import { useState } from "react";
import { useServices } from "../services/useServices";
import useGeolocation from "../../hooks/useGeolocation";

import Spinner from "../../ui/Spinner";

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

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  ${(props) =>
    props.variant === "confirm"
      ? "background: #4caf50; color: white;"
      : "background: #d9534f; color: white;"}

  &:hover {
    opacity: 0.8;
  }
`;

function OrderForm({ service, onCloseModal }) {
  const { services, isLoading } = useServices();

  const serv = services?.data || [];
  const [currentLocation, setCurrentLocation] = useState("");
  const { location, error } = useGeolocation();

  const handlePlaceOrder = () => {
    console.log(`Placing order for ${serv.name} at ${location}`);
    onCloseModal(); // Close modal after order
  };

  if (isLoading) return <Spinner />;

  return (
    <ModalContent>
      <h2>Order {serv.name}</h2>
      <label>Location:</label>
      <Input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setCurrentLocation(e.target.value)}
      />
      <ButtonContainer>
        <Button variant="confirm" onClick={handlePlaceOrder}>
          Place Order
        </Button>
        <Button onClick={onCloseModal}>Cancel</Button>
      </ButtonContainer>
    </ModalContent>
  );
}

export default OrderForm;
