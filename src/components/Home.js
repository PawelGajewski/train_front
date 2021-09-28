import React from "react";
import Login from "./Login";
import Register from "./Register";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      showCloseIcon: false,
      openLogin: false,
      openRegister: false,
      username: "",
      password: "",
    };
    this.onChangeModal = this.onChangeModal.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.openRegister = this.openRegister.bind(this);
  }

  componentDidMount() {
    const data = new FormData();
    data.append("jwt", Cookies.get("jwt"));
    axios.post("http://localhost:8000/auth", data, {}).then((res) => {
      if (res.status !== 200) {
        this.props.history.push("/");
      } else {
        this.props.history.push("/account");
      }
    });
  }

  onChangeModal = (e) => {
    this.setState({ openModal: !this.state.openModal });
  };

  openLogin = (e) => {
    e.preventDefault();
    this.setState({ openRegister: false });
    this.setState({ openLogin: true });
    this.setState({ openModal: !this.state.openModal });
  };

  openRegister = (e) => {
    e.preventDefault();
    this.setState({ openLogin: false });
    this.setState({ openRegister: true });
    this.setState({ openModal: !this.state.openModal });
  };

  render() {
    return (
      <div className="gradient-background">
        <div className="row mt-5">
          <div className="col-12 text-center align-middle mt-5">
            <h1 className="text-light mt-5">Trener</h1>
            <button className="btn btn-success me-1" onClick={this.openLogin}>
              Zaloguj
            </button>
            <button
              className="btn btn-warning ms-1"
              onClick={this.openRegister}
            >
              Zarejestruj się
            </button>
          </div>
        </div>
        <Modal
          open={this.state.openModal}
          show="True"
          onClose={(e) => this.onChangeModal(e)}
        >
          <br></br>
          {this.state.openLogin && <Login />}
          {this.state.openRegister && <Register />}
        </Modal>
      </div>
    );
  }
}

export default Home;
