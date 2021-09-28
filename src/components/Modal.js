import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block modal" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal
