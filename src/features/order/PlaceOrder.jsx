import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ServiceGrid from "../services/ServiceGrid";
import OrderForm from "./OrderForm";

function PlaceOrder() {
  return (
    <div>
      <ServiceGrid />
      <Modal>
        <Modal.Open opens="order-form">
          <Button>Place Order</Button>
        </Modal.Open>
        <Modal.Window name="order-form">
          <OrderForm />
        </Modal.Window>
        <OrderForm />
      </Modal>
    </div>
  );
}
export default PlaceOrder;
