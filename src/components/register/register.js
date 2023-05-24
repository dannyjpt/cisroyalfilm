import { Component } from "react";
import { Form, useHistory } from "react-router-dom";
import axios from "axios";
import "./register.css";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
const cookies = new Cookies();

class Register extends Component {
  constructor(props) {
    super(props);
    this.alert = this.alert.bind(this);
  }

  state = {
    value: "select",
    students: [],
  };

  getStudents = async (event) => {
    const selectedValue = event.target.value;

    axios
      .get(`www.itechpro.tech/cinema/students/${selectedValue}`)
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({ students: response.data }, () => {
            console.log(this.state.students);
          });
        } else {
          alert("El usuario o la contraseña no son correctos");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  logIn = () => {
    window.location.href = "./login";
  };

  alert = async () => {
    await Swal.fire({
      icon: "success",
      title: "Successful registration",
      showConfirmButton: false,
      timer: 2000,
    });
    window.location.href = "./";
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = document.querySelector("#miFormulario");
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    console.log(formObj);

    try {
      const response = await axios.post(
        "www.itechpro.tech/cinema/register/users",
        formObj
      );
      if (response.status === 200) {
        if (response.data == "case1") {
          alert("Las contraseñas no coinciden!!");
        } else if (response.data == "case2") {
          alert("Contraseña muy corta");
        } else if (response.data == "case3") {
          alert("El email ya está registrado");
        } else if (response.data == "Usuario registrado") {
          cookies.set("name", formObj.user, { path: "/", secure: true });
          cookies.set("email", formObj.email, { path: "/", secure: true });
          cookies.set("category", formObj.category, {
            path: "/",
            secure: true,
          });
          cookies.set("student", formObj.student, { path: "/" });
          this.alert();
        }
      } else {
        alert("Error al intentar registrarse");
      }
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error al registrar el usuario");
    }
  };

  render() {
    return (
      <main className="login-form">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row col-md-6 offset-3 justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <center>
                  <div className="card-header">Register</div>
                </center>
                <div className="card-body">
                  <form id="miFormulario" onSubmit={this.handleFormSubmit}>
                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Full Name
                      </label>
                      <div className="col-md-7">
                        <input
                          type="text"
                          className="form-control"
                          name="user"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        E-Mail Address
                      </label>
                      <div className="col-md-7">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
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
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Password confirmation
                      </label>
                      <div className="col-md-7">
                        <input
                          type="password"
                          className="form-control"
                          name="password2"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Category by grade
                      </label>
                      <div className="col-md-7">
                        <select
                          className="form-control"
                          name="category"
                          onChange={this.getStudents}
                          value={this.state.value}
                        >
                          <option key="First" value="First">
                            Select a category
                          </option>
                          <option key="First" value="First">
                            First
                          </option>
                          <option key="Second" value="Second">
                            Second
                          </option>
                          <option key="Third-Fourth-1" value="Third-Fourth-1">
                            Third - Fourth Pre-A1-G1, Pre-A1-G2 && A1-G1
                          </option>
                          <option key="Third-Fourth-2" value="Third-Fourth-2">
                            Third - Fourth A1-G2, A2-B1-B2-G1 && A2-B1-B2-G2
                          </option>
                          <option key="Fifth-Sixth" value="Fifth-Sixth">
                            Fifth - Sixth
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Student
                      </label>
                      <div className="col-md-7">
                        <select className="form-control" name="student">
                          {this.state.students.map((student, index) => (
                            <option
                              key={`${student.nombre}-${index}`}
                              value={student.nombre}
                            >
                              {student.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <br></br>
                    <div className="">
                      <center>
                        <a
                          className="btn btn-primary"
                          onClick={this.handleFormSubmit}
                        >
                          Register
                        </a>
                        <br></br>
                        <a className="btn btn-link" onClick={this.logIn}>
                          You have an account? click here
                        </a>
                      </center>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Register;
