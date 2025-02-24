import React from "react";
import { useBooking } from "../bookings/useBooking"; // Adjust path as needed
import Table from "../../ui/Table"; // Your existing table component

const BookingRow = () => {
  const { booking, isLoading, error } = useBooking();
  console.log(booking);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading bookings: {error.message}</div>;
  }

  if (!booking || booking.length === 0) {
    return <div>No orders available.</div>;
  }

  return (
    <Table columns="repeat(4, 1fr)">
      <Table.Header>
        <div>ID</div>
        <div>Status</div>
        <div>Service Name</div>
        <div>User Name</div>
      </Table.Header>
      <Table.Body
        data={booking}
        render={(bookings) => (
          <Table.Row key={bookings._id}>
            <div>{bookings._id}</div>
            <div>{bookings.status}</div>
            <div>{bookings.serviceName}</div>
            <div>{bookings.user.name}</div>
          </Table.Row>
        )}
      />
    </Table>
  );
  //   (
  //     <Table columns="repeat(4, 1fr)">
  //       <Table.Header>
  //         <div>ID</div>
  //         <div>Status</div>
  //         <div>Service Name</div>
  //         <div>User Name</div>
  //       </Table.Header>
  //       <Table.Body
  //         data={orders}
  //         render={(order) => (
  //           <Table.Row key={order._id}>
  //             <div>{order._id}</div>
  //             <div>{order.status}</div>
  //             <div>{order.serviceName}</div>
  //             <div>{order.user.name}</div>
  //           </Table.Row>
  //         )}
  //       />
  //     </Table>
  //   );
};

export default BookingRow;
