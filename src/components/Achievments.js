import React from "react";
import ShortInfo from "./ShortInfo";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import BenchPressChart from "./Charts/BenchPressChart";
import SquatChart from "./Charts/SquatChart";
import DeadliftChart from "./Charts/DeadliftChart";
import "bootstrap/dist/css/bootstrap.min.css";

const Weights = () => {
  const [id, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const history = useHistory();
  const [weights, setWeights] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  var xd = "Paweł";
  var labels = [];
  var kg = [];
  var data = [];

  useEffect(() => {
    const data = new FormData();
    data.append("jwt", Cookies.get("jwt"));
    axios.post("http://localhost:8000/auth", data, {}).then((res) => {
      if (res.status !== 200) {
        history.push("/");
      } else {
        setID(res.data.id);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setHeight(res.data.height);
        setBirthDate(res.data.birthDate);
        setSex(res.data.sex);
      }
    });
  }, []);

  return (
    <div className="container-fluid gradient-background_slider">
      <div className="row">
        <div className="col-3">
          <div className="vh-100 position-fixed" style={{ width: "23.8%" }}>
            <ShortInfo
              id={sessionStorage.getItem("ID")}
              firstName={firstName}
              lastName={lastName}
              height={height}
            />
            <Sidebar />
          </div>
        </div>
        <div className="col-8 position-relative mt-1 text-center">
          <div className="row mt-5">
            <div className="col ms-5 text-white">
              <h2>Wyciskanie na ławce</h2>
              <BenchPressChart width={600} height={300} />
            </div>
            <div className="col ms-5 mt-5 text-white">
              <h2>Przysiad</h2>
              <SquatChart width={600} height={300} />
            </div>
            <div className="col ms-5 mt-5 text-white">
              <h2>Martwy ciąg</h2>
              <DeadliftChart width={600} height={300} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weights;
