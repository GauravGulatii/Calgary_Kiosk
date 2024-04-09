// Modal.js
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Modal.css";

const Modal = ({ showModal, setShowModal, message, onConfirm, countdown }) => {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(countdown);

  useEffect(() => {
    if (showModal && timer > 0) {
      const timeout = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearTimeout(timeout);
    } else if (timer === 0) {
      onConfirm();
    }
  }, [showModal, timer, onConfirm]);

  if (!showModal) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{message}</p>
        <p>Redirecting to Home Screen in {timer} seconds...</p>
        <button
          onClick={() => {
            onConfirm();
            setShowModal(false);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
