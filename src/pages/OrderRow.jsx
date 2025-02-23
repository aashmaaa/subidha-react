import styled from "styled-components";
import { format } from "date-fns";
import { HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Table from "../ui/Table";
import Modal from "../ui/Modal";
import Menus from "../ui/Menus";
import { useUserOrders } from "../features/orderHistory/useUserOrders";
// import ConfirmDelete from "../../ui/ConfirmDelete";

const OrgName = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function OrderRow({}) {
  const navigate = useNavigate();
  const order = useUserOrders();
  console.log(order);

  return (
    <Table.Row>
      <OrgName>{order.org.nameOrg}</OrgName>

      <Stacked>
        <span>{order.user.name}</span>
        <span>{order.user.email}</span>
      </Stacked>

      <Stacked>
        <span>{order.servicenames.name}</span>
        <span>Rs. {order.price}</span>
      </Stacked>

      <Stacked>
        <span>{format(new Date(order.createdAt), "MMM dd yyyy")}</span>
        <span>{order.status}</span>
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={order._id} />
          <Menus.List id={order._id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/orders/${order._id}`)}
            >
              See details
            </Menus.Button>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete Order</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          {/* <ConfirmDelete
            resourceName="order"
            onConfirm={() => console.log("Delete order", order._id)}
          /> */}
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

// export default function OrdersTable({ orders }) {
//   return (
//     <Table>
//       <Table.Header>
//         <tr>
//           <th>Organization</th>
//           <th>User</th>
//           <th>Service</th>
//           <th>Order Date</th>
//           <th>Actions</th>
//         </tr>
//       </Table.Header>
//       <Table.Body>
//         {/* {orders.map((order) => (
//           <OrderRow key={order._id} order={order} />
//         ))} */}
//       </Table.Body>
//     </Table>
//   );
// }
