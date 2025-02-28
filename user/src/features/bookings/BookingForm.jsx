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
import Form from "../../ui/Form";
import { useCreateBooking } from "./useCreateBooking";
import FormRow from "../../ui/FormRow";
import { useUser } from "../authentication/useUser";
import { useEffect } from "react";
import { formatISO } from "date-fns";

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
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  const { register, handleSubmit, reset, getValues, formState, control } =
    useForm({
      defaultValues: {
        location: location || "",
        date: null,
      },
    });
  const { errors } = formState;

  const { newBooking, isCreating } = useCreateBooking();

  function onSubmit(data) {
    const formattedDate = formatISO(new Date(data.bookingDate));
    const createBooking = {
      // user: user._id,
      service: service._id,
      bookingdate: formattedDate,
      bookingtime: null,
      location: data.location,
      totalprice: 250,
    };

    newBooking(createBooking, {
      onSuccess: (data) => {
        reset();
        onCloseModal?.();
      },
    });

    console.log("New Booking Data:", createBooking);
  }

  function onError(errors) {
    //---------------------
    console.log(errors);
  }

  if (isLoading) return <Spinner />;

  return (
    <ModalContent>
      <h2>Book this service?</h2>

      {/* Form */}
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* Location Input */}
        {/* <FormRow label="Service Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="serviceName"
            disabled={isCreating}
            placeholder="Choose a service name"
            {...register("serviceName")}
          />
        </FormRow> */}

        <FormRow label="Location" error={errors?.name?.message}>
          <Input
            type="text"
            id="location"
            disabled={isCreating}
            placeholder={
              isFetchingLoading ? "Fetching location..." : "Enter your location"
            }
            {...register("location")}
          />
        </FormRow>

        {/* Date Input */}
        <FormRow label="Select a Date" error={errors?.date?.message}>
          <InputWrapper>
            <Controller
              name="bookingDate"
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
        </FormRow>

        <FormRow label="Select Time" error={errors?.time?.message}>
          <InputWrapper>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <input
                  type="time"
                  {...field}
                  value={field.value || currentTime}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </InputWrapper>
        </FormRow>

        {/* Buttons */}
        <ButtonContainer>
          <Button variant="confirm" type="submit">
            Confirm Booking
          </Button>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
        </ButtonContainer>
      </Form>
    </ModalContent>
  );
}

export default OrderForm;
