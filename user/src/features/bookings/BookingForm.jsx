// import styled from "styled-components";
// import { useState } from "react";
// import useGeolocation from "../../hooks/useGeolocation";
// import { useBooking } from "../bookings/useBooking";

// import Spinner from "../../ui/Spinner";
// import Button from "../../ui/Button";

// const ModalContent = styled.div`
//   //   display: flex;
//   //   flex-direction: column;
//   //   gap: 15px;
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
// function OrderForm({ service, onCloseModal }) {
//   const { isLoading, booking } = useBooking();

//   // console.log(service);
//   console.log(booking);
//   const [currentLocation, setCurrentLocation] = useState("");
//   const { location, error } = useGeolocation();
//   const isFetchingLoading = !location && !error;

//   const handlePlaceOrder = () => {
//     // console.log(`Placing order for ${name} at ${location}`);
//     onCloseModal();
//   };

//   if (isLoading) return <Spinner />;

//   return (
//     <ModalContent>
//       <h2>Book this service?</h2>
//       {/*  */}
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
//         <Button variant="confirm" onClick={handlePlaceOrder}>
//           Place Order
//         </Button>
//         <Button
//           variation="secondary"
//           type="reset"
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
import { useForm, Controller } from "react-hook-form";
import useGeolocation from "../../hooks/useGeolocation";
import { useBooking } from "../bookings/useBooking";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiCalendarDays } from "react-icons/hi2";

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
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const CalendarIcon = styled(HiCalendarDays)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: gray;
`;

function OrderForm({ service, onCloseModal }) {
  const { isLoading, booking } = useBooking();
  const { location, error } = useGeolocation();
  const isFetchingLoading = !location && !error;

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      location: location || "",
      date: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Booking Data:", data);
    onCloseModal();
  };

  if (isLoading) return <Spinner />;

  return (
    <ModalContent>
      <h2>Book this service?</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Location Input */}
        <label>Service Name</label>
        <Input
          type="text"
          placeholder="Choose a service name"
          {...register("location")}
        />
        <label>Enter your location</label>
        <Input
          type="text"
          placeholder={
            isFetchingLoading ? "Fetching location..." : "Enter your location"
          }
          {...register("location")}
        />

        {/* Date Picker Input */}
        <label>Select a Date:</label>
        <InputWrapper>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Enter a date"
                // customInput={<Input />}
              />
            )}
          />
        </InputWrapper>

        {/* Buttons */}
        <ButtonContainer>
          <Button variant="confirm" type="submit">
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
      </form>
    </ModalContent>
  );
}

export default OrderForm;
