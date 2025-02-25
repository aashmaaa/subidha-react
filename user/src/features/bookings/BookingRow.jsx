import React from "react";
import { useBooking } from "./useBooking"; // Adjust path as needed
import Table from "../../ui/Table"; // Your existing table component
import Spinner from "../../ui/Spinner";

const BookingRow = () => {
  const { booking, isLoading, error } = useBooking();
  // console.log(booking);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading bookings: {error.message}</div>;
  }

  if (!booking || booking.length === 0) {
    return <div>No orders available.</div>;
  }

  return (
    <Table columns="repeat(6, 1fr)">
      <Table.Header>
        <div>Service Name</div>
        <div>Status</div>
        <div>Service Provider Org</div>
        <div>Service Provider Name</div>
        <div>Location</div>
        <div>Service Price</div>
      </Table.Header>
      <Table.Body
        data={booking}
        render={(bookings) => (
          <Table.Row key={bookings._id}>
            <div>{bookings.servicename?.name}</div>
            <div>{bookings.bookingstatus}</div>
            <div>{bookings.org?.nameOrg ?? "N/A"}</div>
            <div>{bookings.service?.serviceprovidername ?? "N/A"}</div>
            <div>{bookings.location}</div>
            <div>{bookings.service?.price}</div>
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
