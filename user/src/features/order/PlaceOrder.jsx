import Modal from "../../ui/Modal";
import OrderForm from "./OrderForm";

function PlaceOrder() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="order-form">
          <OrderForm />
        </Modal.Open>
        <Modal.Window name="order-form">
          <OrderForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default PlaceOrder;
