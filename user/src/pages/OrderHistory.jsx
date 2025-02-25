import React from "react";
import { useUserOrders } from "../features/orderHistory/useUserOrders";
import OrdersRow from "../features/orderHistory/OrderRow";

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useUserOrders();

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        orderssss
        <OrdersRow />
        {/* {orders.map((order) => (
          <li key={order._id}>{order.serviceName}</li>
        ))} */}
      </ul>
    </div>
  );
}
