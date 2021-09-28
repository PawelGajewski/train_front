import React from "react";
import ShortInfo from "./ShortInfo";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import ChartView from "./ChartView";
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
  const [newWeight, setNewWeight] = useState("");

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
  }, [id]);

  return (
    <div className="container-fluid gradient-background">
      <div className="row">
        <div className="col-3">
          <div className="vh-100 position-fixed" style={{ width: "23.8%" }}>
            <ShortInfo
              id={id}
              firstName={firstName}
              lastName={lastName}
              height={height}
            />
            <Sidebar />
          </div>
        </div>
        <div className="col-9 position-relative mt-1 text-center">
          <h2 className="text-white">Wykres wag</h2>
          <ChartView id={id} />
          <br></br>
          <div className="row mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Weights;
