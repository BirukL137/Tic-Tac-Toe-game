import Button from "../../common/Button";
import "./modal.css";

const ConfirmQuitModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="end__round__modal" role="dialog" aria-modal="true">
      <div className="modal__content pad">
        <h2>Restart Game?</h2>
        <div className="modal__buttons">
          <Button variant="selected" onClick={onCancel}>
            No, Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Yes, Restart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmQuitModal;
