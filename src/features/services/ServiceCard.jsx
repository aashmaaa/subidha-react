import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi2";

import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ServiceDetails from "./ServiceDetails";
import PlaceOrder from "../order/PlaceOrder";
import { useState } from "react";

const StyledServiceCard = styled.div`
  width: 250px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: var(--color-grey-700);
  font-size: 16px;
  font-weight: 400;
  margin: 10px;
  background: var(--color-grey-400);
  cursor: pointer;
`;

function ServiceCard({ service }) {
  const { _id: serviceId, name, servicecode } = service;
  const [serviceProvided, setServiceProvided] = useState(null);

  // You might want to pass the service name or details directly
  const handleServiceClick = () => setServiceProvided(name);

  return (
    <StyledServiceCard key={serviceId} onClick={handleServiceClick}>
      <Modal>
        {/* Modal Context is now provided locally here */}
        <Menus.Menu>
          <Menus.Toggle id={serviceId} />

          <Menus.List id={serviceId}>
            <Modal.Open opens="view-details">
              <Menus.Button icon={<HiPencil />}>View Details</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="place-order">
              <Menus.Button icon={<HiTrash />}>Place Order</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <h3>{name}</h3>
        <p>Code: {servicecode}</p>

        {/* Ensure Modal.Window is conditionally rendered */}
        <Modal.Window name="view-details">
          <ServiceDetails serviceName={name} />
        </Modal.Window>

        <Modal.Window name="place-order">
          <PlaceOrder serviceName={name} />
        </Modal.Window>
      </Modal>
    </StyledServiceCard>
  );
}

export default ServiceCard;
