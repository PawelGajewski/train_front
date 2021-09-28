import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ShortInfo = ({ id, firstName, lastName, height }) => {
  const [modal, setModal] = useState("");
  const [newHeight, setNewHeight] = useState("");

  const openModal = () => {
    setModal("False");
  };

  const closeModal = () => {
    setModal("");
  };

  const changeHeight = async () => {
    const data = new FormData();
    data.append("height", newHeight);
    axios
      .patch(
        "http://localhost:8000/user/" + sessionStorage.getItem("ID"),
        data,
        {}
      )
      .then((res) => {});
  };

  return (
    <div className="text-center text-white">
      <h2>
        {firstName} {lastName}
      </h2>
      <h3>{height} cm</h3>
      <button className="btn btn-primary" onClick={openModal}>
        Zmień
      </button>
      <hr />
      <Modal open={modal} show="True" onClose={closeModal}>
        <form>
          <p></p>
          <h3>Podaj swój wzrost:</h3>
          <input
            type="text"
            className="form-control"
            placeholder="wzrost (w cm)"
            name="height"
            value={newHeight}
            onChange={(e) => setNewHeight(e.target.value)}
            required
          />
          <p></p>
          <button className="btn btn-primary" onClick={changeHeight}>
            Zapisz
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ShortInfo;
