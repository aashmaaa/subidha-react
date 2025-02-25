import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import BookingForm from "./BookingForm";
import BookingRow from "./BookingRow";

function BookingTable() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="order-form">
          <Button variant="primary">Book Now</Button>
        </Modal.Open>
        <Modal.Window name="order-form">
          <BookingForm />
        </Modal.Window>
      </Modal>
      <BookingRow />
    </div>
  );
}

export default BookingTable;
