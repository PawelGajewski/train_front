import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [startDate, setStartDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [sex, setSex] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        sex: sex,
        birthDate: birthDate,
        username: userName,
        password: password,
      }),
    };

    const response = await fetch(
      "http://127.0.0.1:8000/register",
      requestOptions
    );
    const data = await response.json();
    if (response.status !== 200) {
      alert("Błąd podczas logowania");
    } else {
      alert("Zarejestrowano")
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <legend className="text-center">Rejestracja</legend>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Imię"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nazwisko"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <p className="text-center">Płeć</p>
          <input
            type="radio"
            value="Female"
            name="sex"
            required
            className="me-1"
            onChange={(e) => setSex(e.target.value)}
          />{" "}
          Kobieta
          <input
            type="radio"
            value="Male"
            name="sex"
            required
            className="ms-1"
            onChange={(e) => setSex(e.target.value)}
          />{" "}
          Mężczyzna
        </div>
        <div className="mb-3">
          <p className="text-center">Data urodzenia</p>
          <DatePicker
          selected={birthDate}
          onChange={(birthDate) => setBirthDate(birthDate)}
          dateFormat="yyyy-mm-dd"
        />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Login"
            name="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Hasło"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Zarejestruj się
          </button>
        </div>
        <p></p>
      </form>
    </div>
  );
}
