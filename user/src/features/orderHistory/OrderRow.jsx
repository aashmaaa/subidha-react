import React from "react";
import { useUserOrders } from "./useUserOrders"; // Adjust path as needed
import Table from "../../ui/Table"; // Your existing table component
import Spinner from "../../ui/Spinner";

const OrdersTable = () => {
  const { orders, isLoading, error } = useUserOrders();
  // console.log(orders);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }

  if (!orders || orders.length === 0) {
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
        data={orders}
        render={(order) => (
          <Table.Row key={order._id}>
            <div>{order.servicenames?.name}</div>
            <div>{order.status}</div>
            <div>{order.org?.nameOrg ?? "N/A"}</div>
            <div>{order.service?.serviceprovidername ?? "N/A"}</div>
            <div>{order.location}</div>
            <div>{order.price}</div>
            {/* <div>{order.user.name}</div> */}
          </Table.Row>
        )}
      />
    </Table>
  );
};

export default OrdersTable;
