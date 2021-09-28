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
  const [id, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");
  const history = useHistory();
  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState("");

  useEffect(() => {
    const data = new FormData();
    data.append("jwt", Cookies.get("jwt"));
    axios.post("http://localhost:8000/auth", data, {}).then((res) => {
      if (res.status !== 200) {
        // history.push("/");
      } else {
        setID(res.data.id);
        localStorage.setItem("ID", res.data.id);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setHeight(res.data.height);
        setBirthDate(res.data.birthDate);
        setSex(res.data.sex);
        setActivity(res.data.activity);
        setGoal(res.data.goal);
      }
    });
  }, []);

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
        <div className="col-9 position-relative mt-1">
          <div className="row mt-5">
            <div className="col ms-5">
              <Body
                id={id}
                firstName={firstName}
                lastName={lastName}
                height={height}
                weight={weight}
                sex={sex}
                birthDate={birthDate}
                activity={activity}
                goal={goal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
