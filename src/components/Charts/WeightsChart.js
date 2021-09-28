import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";

const ChartView = ({ id, width, height }) => {
  const [weights, setWeights] = useState([]);
  const [modal, setModal] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const openModal = () => {
    setModal("False");
  };

  const closeModal = () => {
    setModal("");
  };

  const addWeight = async () => {
    const data = new FormData();
    data.append("ownerID", localStorage.getItem("ID"));
    data.append("weight", newWeight);
    axios.post("http://localhost:8000/weight", data, {}).then((res) => {});
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/weight?search=" + localStorage.getItem("ID"))
      .then((res) => {
        setWeights(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var labels = weights.map((x) => x.date.slice(0, 10));
  var kg = weights.map((x) => x.weight);

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Dodaj wagę
      </button>
      <Modal open={modal} show="True" onClose={closeModal}>
        <form>
          <p></p>
          <h3>Podaj wagę:</h3>
          <input
            type="text"
            className="form-control"
            placeholder="waga (w kg)"
            name="weight"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            required
          />
          <p></p>
          <button className="btn btn-primary" onClick={addWeight}>
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
                label: "Waga (kg)",
                data: kg,
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                pointBorderWidth: 8,
                borderColor: ["rgba(255, 99, 132, 1)"],
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
