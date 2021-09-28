import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const Body = ({ id, sex, birthDate, height, activity, goal }) => {
  const [weight, setWeight] = useState("");
  const [chest, setChest] = useState("");
  const [arm, setArm] = useState("");

  var year = new Date();
  if (weight > 0) {
    var bmi = weight / ((height / 100) * (height / 100));
  } else {
    var bmi = 0;
  }

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/weight?search=" + localStorage.getItem("ID"),
        {}
      )
      .then((res) => {
        if (res.status !== 200) {
          console.log("err1");
        } else {
          if (res.data.length > 0) {
            setWeight(res.data[res.data.length - 1].weight);
          } else {
            setWeight("---");
          }
        }
      });
  }, [weight]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/chest?search=" + localStorage.getItem("ID"))
      .then((res) => {
        setChest(res.data[res.data.length - 1].length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/biceps?search=" + localStorage.getItem("ID"))
      .then((res) => {
        setArm(res.data[res.data.length - 1].length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="">
      <div className="row text-center">
        <div className="col text-center text-white border me-5">
          {sex === "Male" && (
            <h2 className="text-white">
              Mężczyzna, {year.getFullYear() - birthDate.slice(0, 4)} lat(a)
            </h2>
          )}
          {sex === "Female" && (
            <h2 className="text-white">
              Kobieta, {year.getFullYear() - birthDate.slice(0, 4)} lat(a)
            </h2>
          )}
          <h3 className="">Wzrost {height} cm</h3>
          <h3 className="text-white">Aktualna waga: {weight} kg</h3>
          <h3>Obw. klatki piers. {chest} cm</h3>
          <h3>Biceps {arm} cm</h3>
        </div>
        <div className="col border me-5 text-white">
          <h2>Forma</h2>
          <br></br>
          <h5 className="text-white">BMI: {bmi.toFixed(2)}</h5>
          {goal === 0 && <p>"Chcesz schudnąć"</p>}
          {goal === 1 && <p>"Chcesz schudnąć"</p>}
          {goal === 2 && <p>"Chcesz schudnąć"</p>}
        </div>
      </div>
    </div>
  );
};

export default Body;
