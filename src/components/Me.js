import React from "react";
import Body from "./Body";
import ShortInfo from "./ShortInfo";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const MyAccount = () => {
  const [ID, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const [newWeight, setNewWeight] = useState("");

  useEffect(() => {
    const data = new FormData();
    data.append("jwt", Cookies.get("jwt"));
    axios.post("http://localhost:8000/auth", data, {}).then((res) => {
      if (res.status !== 200) {
        // history.push("/");
      } else {
        setID(res.data.id);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setHeight(res.data.height);
        setBirthDate(res.data.birthDate);
        setSex(res.data.sex);
        console.log(firstName)
      }
    });

    axios.get("http://localhost:8000/weight?search=" + ID, {}).then((res) => {
      if (res.status !== 200) {
        console.log("err1");
      } else {
        if (res.data.length > 0) {
          setNewWeight(res.data[res.data.length - 1].weight);
        } else {
          setNewWeight("---");
        }
      }
    });
  }, [ID]);


  return (
    <div className="container-fluid gradient-background">
      <div className="row">
        <div className="col-3">
          <div className="vh-100 position-fixed" style={{ width: "23.8%" }}>
            <ShortInfo
              id={ID}
              firstName={firstName}
              lastName={lastName}
              height={height}
            />
            <Sidebar />
          </div>
        </div>
        <div className="col-9 position-relative mt-5 text-center text-white">
          <h1>
            {firstName} {lastName}
          </h1>
          {sex == "Male" && <h2>Mężczyzna</h2>}
          {sex == "Female" && <h2>Kobietaa</h2>}
          <h2>{birthDate.slice(0, 10)}</h2>
          <h2>{height} cm</h2>
          <h2>{newWeight} kg</h2>
          <br></br>
          <div className="row mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
