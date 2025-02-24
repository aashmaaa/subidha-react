import React from "react";
import { useUserOrders } from "../features/orderHistory/useUserOrders"; // Adjust path as needed
import Table from "../ui/Table"; // Your existing table component

const OrdersTable = () => {
  const { orders, isLoading, error } = useUserOrders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }

  if (!orders || orders.length === 0) {
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
        data={orders}
        render={(order) => (
          <Table.Row key={order._id}>
            <div>{order._id}</div>
            <div>{order.status}</div>
            <div>{order.serviceName}</div>
            <div>{order.user.name}</div>
          </Table.Row>
        )}
      />
    </Table>
  );
};

export default OrdersTable;
