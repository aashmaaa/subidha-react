import styled from "styled-components";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { HiArrowRightCircle } from "react-icons/hi2";

import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ServiceDetails from "./ServiceDetails";
import PlaceOrder from "../order/PlaceOrder";
import { useState } from "react";
import OrderForm from "../order/OrderForm";

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
  cursor: pointer;
  background: #f9f9f9;

  &:hover {
    background: #e6e6e6;
`;

function ServiceCard({ service }) {
  // console.log(service);

  const { _id: serviceId, name, servicecode } = service;
  const [serviceProvided, setServiceProvided] = useState(null);

  //to pass the service name or details directly
  const handleServiceClick = () => setServiceProvided(name);

  return (
    <StyledServiceCard key={serviceId} onClick={handleServiceClick}>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={serviceId} />

          <Menus.List id={serviceId}>
            <Modal.Open opens="view-details">
              <Menus.Button icon={<HiArrowsPointingOut />}>
                View Details
              </Menus.Button>
            </Modal.Open>

            <Modal.Open opens="place-order">
              <Menus.Button icon={<HiArrowRightCircle />}>
                Place Order
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <h3>{name}</h3>
        <p>Code: {servicecode}</p>

        <Modal.Window name="view-details">
          <ServiceDetails service={service} />
          {/* service={service} onCloseModal={(close) => close()}  */}
        </Modal.Window>

        <Modal.Window name="place-order">
          <OrderForm service={service} onCloseModal={(close) => close()} />
        </Modal.Window>
      </Modal>
    </StyledServiceCard>
  );
}

export default ServiceCard;
