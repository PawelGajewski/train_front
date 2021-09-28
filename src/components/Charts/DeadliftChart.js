import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";

const ChartView = ({ id, width, height }) => {
  const [weight, setWeight] = useState([]);
  const [modal, setModal] = useState("");
  const [newWeight, setNewWeigth] = useState("");

  const openModal = () => {
    setModal("False");
  };

  const closeModal = () => {
    setModal("");
  };

  const addDeadlift = async () => {
    const data = new FormData();
    data.append("ownerID", localStorage.getItem("ID"));
    data.append("weight", newWeight);
    axios.post("http://localhost:8000/deadlift", data, {}).then((res) => {});
  };

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/deadlift?search=" + localStorage.getItem("ID")
      )
      .then((res) => {
        setWeight(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var labels = weight.map((x) => x.date.slice(0, 10));
  var length = weight.map((x) => x.weight);

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Dodaj rekord
      </button>
      <Modal open={modal} show="True" onClose={closeModal}>
        <form>
          <p></p>
          <h3>Podaj wynik martwego ciągu</h3>
          <input
            type="text"
            className="form-control"
            placeholder="wynik (w cm)"
            name="weight"
            value={newWeight}
            onChange={(e) => setNewWeigth(e.target.value)}
            required
          />
          <p></p>
          <button className="btn btn-primary" onClick={addDeadlift}>
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
                label: "Wynik przysiadu (kg)",
                data: length,
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(14, 249, 2, 1)"],
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
