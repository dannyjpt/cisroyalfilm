import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";
import "./auth.css";
import Swal from "sweetalert2";

//const baseUrl = ;
const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.alert = this.alert.bind(this);
  }

  state = {
    form: {
      email: "",
      password: "",
    },
  };

  signIn = () => {
    window.location.href = "./register";
  };

  alert = async () => {
    await Swal.fire({
      icon: "success",
      title: "Login successful",
      showConfirmButton: false,
      timer: 2000,
    });
    window.location.href = "./";
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  iniciarSesion = async () => {
    await axios
      .get(
        `https://www.itechpro.tech/cinema/login/${this.state.form.email}/${this.state.form.password}`
      )
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response != null) {
          if (response == "no password") {
            alert("El usuario o la contraseña no son correctos");
          } else if (response == "no email") {
            alert("El usuario o la contraseña no son correctos");
          } else {
            const expirationTime = new Date();
            expirationTime.setHours(expirationTime.getHours() + 1);
            cookies.set("id", response._id, {
              path: "/",
              secure: true,
              expires: expirationTime,
            });
            cookies.set("name", response.user, {
              path: "/",
              secure: true,
              expires: expirationTime,
            });
            cookies.set("email", response.email, {
              path: "/",
              secure: true,
              expires: expirationTime,
            });
            cookies.set("category", response.category, {
              path: "/",
              secure: true,
              expires: expirationTime,
            });
            cookies.set("student", response.student, {
              path: "/",
              secure: true,
              expires: expirationTime,
            });

            this.alert();

            //cookies.get('name')
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (cookies.get("username")) {
      window.location.href = "./register";
    }
  }

  render() {
    return (
      <div className="login-form">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row col-md-6 offset-3 justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <br></br>
                <center>
                  <div className="card-header">Login</div>
                </center>
                <div className="card-body">
                  <div className="form-group row">
                    <label className="col-md-4 col-form-label text-md-right">
                      Email
                    </label>
                    <div className="col-md-7">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.handleChange}
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-4 col-form-label text-md-right">
                      Password
                    </label>
                    <div className="col-md-7">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={this.handleChange}
                        required
                      ></input>
                    </div>
                  </div>

                  <br />

                  <div className="">
                    <center>
                      <a
                        className="btn btn-primary "
                        onClick={() => this.iniciarSesion()}
                      >
                        Login
                      </a>
                      <br></br>
                      <a className="btn btn-link" onClick={() => this.signIn()}>
                        You have not an account? click here
                      </a>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
