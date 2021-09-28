import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const response = await fetch("http://127.0.0.1:8000/login", requestOptions);
    const data = await response.json();
    if (response.status !== 200) {
      alert("Błąd podczas logowania");
    } else {
      Cookies.set("jwt", data.jwt);
      history.push("/account");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <legend className="text-center">Logowanie</legend>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Login"
            name="username"
            value={username}
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
            Zaloguj się
          </button>
        </div>
        <p></p>
      </form>
    </div>
  );
}
