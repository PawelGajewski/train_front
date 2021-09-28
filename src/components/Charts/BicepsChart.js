import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";

const ChartView = ({ id, width, height }) => {
  const [lengths, setLengths] = useState([]);
  const [modal, setModal] = useState("");
  const [newLength, setNewLength] = useState("");

  const openModal = () => {
    setModal("False");
  };

  const closeModal = () => {
    setModal("");
  };

  const addChest = async () => {
    const data = new FormData();
    data.append("ownerID", localStorage.getItem("ID"));
    data.append("length", newLength);
    axios.post("http://localhost:8000/biceps", data, {}).then((res) => {});
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/biceps?search=" + localStorage.getItem("ID"))
      .then((res) => {
        setLengths(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var labels = lengths.map((x) => x.date.slice(0, 10));
  var length = lengths.map((x) => x.length);

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Dodaj obwód
      </button>
      <Modal open={modal} show="True" onClose={closeModal}>
        <form>
          <p></p>
          <h3>Podaj obwód ramienia:</h3>
          <input
            type="text"
            className="form-control"
            placeholder="obwód (w cm)"
            name="weight"
            value={newLength}
            onChange={(e) => setNewLength(e.target.value)}
            required
          />
          <p></p>
          <button className="btn btn-primary" onClick={addChest}>
            Zapisz
          </button>
        </form>
      </Modal>
      <div>
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "Obwód ramienia (cm)",
                data: length,
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(17, 19, 242, 1)"],
                borderWidth: 2,
              },
            ],
          }}
          height={height}
          width={width}
          options={{
            elements: {
              line: {
                tension: 0.3,
              },
            },
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartView;
