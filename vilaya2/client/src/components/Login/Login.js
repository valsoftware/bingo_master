import React, { Component } from "react";
import { Redirect} from "react-router-dom";
import "./colorlib-regform-7/css/style.css";
import "./colorlib-regform-7/fonts/material-icon/css/material-design-iconic-font.min.css";
import signinImg from "./colorlib-regform-7/images/lg-img-4.png";
import signUpImg from "./colorlib-regform-7/images/lg-img-5.png";
import axios from "axios";
import Preloader from "../Preloader";
import './Login.css'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: this.props.api,
      showSignIn: true,
      showSignUp: false,
      showMainMenu: false,
      preloader: true,

      //Register
      name: "",
      email: "",
      pass: "",
      re_pass: "",
      regVerifyPassword: "",
      regIsMailExist: "",

      //login
      your_mailId: "",
      your_pass: "",
      loginResponse: "",
      loginId: "",
    };
  }

  handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  showSignIn() {
    this.setState({ showSignIn: true, showSignUp: false });
  }

  showSignUp() {
    this.setState({ showSignUp: true, showSignIn: false });
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState({ preloader: false });
    }, 1200);
  };

  loginSubmit = () => {
    if (this.state.your_mailId == false) {
      document.getElementById("your_name").className =
        "form-control border-warning";
    }
    if (this.state.your_pass == false) {
      document.getElementById("your_pass").className =
        "form-control border-warning";
    } else if (
      (this.state.your_mailId.length && this.state.your_pass.length) > 0
    ) {
      let formData = new FormData();

      formData.append("emailId", this.state.your_mailId);
      formData.append("password", this.state.your_pass);
      axios.post(this.state.api + "/login", formData).then((res) => {
        this.setState({ loginResponse: res.data });
        if (typeof res.data == "number") {
          this.setState({ showMainMenu: true });
          this.setState({ loginId: res.data });
          this.props.handleLogin(res.data);
        }
      });
    }
  };

  registerSubmit = () => {
    if (this.state.name == false) {
      document.getElementById("name").className = "form-control border-warning";
    }

    if (this.state.pass.length == false) {
      document.getElementById("pass").className = "form-control border-warning";
    }

    if (this.state.email.length == false) {
      document.getElementById("email").className =
        "form-control border-warning";
    }

    if (this.state.pass != this.state.re_pass) {
      this.setState({ regVerifyPassword: "Please check your password" });
    } else if (
      (this.state.name.length &&
        this.state.email.length &&
        this.state.pass.length) > 0
    ) {
      let formData = new FormData();
      formData.append("userName", this.state.name);
      formData.append("emailId", this.state.email);
      formData.append("password", this.state.pass);

      axios.post(this.state.api + "/register", formData).then((res) => {
        this.setState({ regIsMailExist: res.data });
      });
    }
  };

  render() {
    return (
      <div className='centered'>
        {this.state.preloader && <Preloader />}
        {this.state.showMainMenu && <Redirect to="/home" />}
        <div class="main">
          <section class="signup">
            <div class="container">
              {/*Show sign up component*/}
              {this.state.showSignUp && (
                <div class="signup-content">
                  <div class="signup-form">
                    <div
                      class="section-title justify-content-center mb-4 mb-md-8 wow fadeInUp"
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                        marginTop: 20,
                      }}
                    >
                      <span class="shape shape-left bg-info"></span>
                      <h2 class="text-danger">Sign Up</h2>
                      <span class="shape shape-right bg-info"></span>
                    </div>
                    <form class="register-form" id="register-form">
                      <div class="form-group form-group-icon">
                        <i class="zmdi zmdi-account material-icons-name"></i>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control border-success"
                          placeholder="Your Name"
                          onChange={this.handlechange.bind(this)}
                        />
                      </div>
                      <div class="form-group form-group-icon">
                        <i class="zmdi zmdi-email"></i>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control border-success"
                          placeholder="Your Email"
                          onChange={this.handlechange.bind(this)}
                        />
                      </div>
                      <div class="form-group form-group-icon">
                        <i class="zmdi zmdi-lock"></i>
                        <input
                          type="password"
                          name="pass"
                          id="pass"
                          className="form-control border-success"
                          placeholder="Password"
                          onChange={this.handlechange.bind(this)}
                        />
                      </div>
                      <div class="form-group form-group-icon">
                        <i class="zmdi zmdi-lock-outline"></i>
                        <input
                          type="password"
                          name="re_pass"
                          id="re_pass"
                          className="form-control border-success"
                          placeholder="Repeat your password"
                          onChange={this.handlechange.bind(this)}
                        />
                      </div>
                      {this.state.regVerifyPassword && (
                        <div
                          class="alert alert-primary alert-dismissible fade show"
                          role="alert"
                        >
                          {this.state.regVerifyPassword}
                        </div>
                      )}

                      {this.state.regIsMailExist && (
                        <div
                          class="alert alert-primary alert-dismissible fade show"
                          role="alert"
                        >
                          {this.state.regIsMailExist}
                        </div>
                      )}

                      <div class="form-group form-button">
                        <input
                          type="button"
                          name="signup"
                          id="signup"
                          class="form-submit"
                          value="Register"
                          onClick={this.registerSubmit}
                        />
                      </div>
                    </form>
                  </div>
                  <div class="signup-image">
                    <figure>
                      <img
                        class="section-title justify-content-center mb-4 mb-md-8 wow fadeInUp"
                        style={{
                          visibility: "visible",
                          animationName: "fadeInUp",
                        }}
                        src={signUpImg}
                        alt="sing up image"
                      />
                    </figure>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={this.showSignIn.bind(this)}
                      class="signup-image-link"
                    >
                      I am already member
                    </a>
                  </div>
                </div>
              )}
              {/*show signin component*/}
              {this.state.showSignIn && (
                <div class="signin-content">
                  <div class="signin-image">
                    <figure>
                      <img
                        class="section-title justify-content-center mb-4 mb-md-8 wow fadeInUp"
                        style={{
                          visibility: "visible",
                          animationName: "fadeInUp",
                        }}
                        src={signinImg}
                        alt="sing up image"
                      />
                    </figure>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={this.showSignUp.bind(this)}
                      class="signup-image-link"
                    >
                      Create an account
                    </a>
                  </div>

                  <div class="signin-form">
                    <div
                      class="section-title justify-content-center mb-4 mb-md-8 wow fadeInUp"
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                        marginTop: 20,
                      }}
                    >
                      <span class="shape shape-left bg-info"></span>
                      <h2 class="text-danger">Sign In</h2>
                      <span class="shape shape-right bg-info"></span>
                    </div>
                    <form class="register-form" id="login-form">
                      <div class="form-group form-group-icon">
                        <i class="zmdi zmdi-account material-icons-name"></i>
                        <input
                          type="text"
                          name="your_mailId"
                          id="your_name"
                          className="form-control border-success"
                          placeholder="Your Mail Id"
                          value={this.state.your_mailId}
                          onChange={this.handlechange.bind(this)}
                        />
                      </div>
                      <div class="form-group form-group-icon">
                        <i class="zmdi zmdi-lock"></i>
                        <input
                          type="password"
                          name="your_pass"
                          id="your_pass"
                          className="form-control border-success"
                          placeholder="Password"
                          value={this.state.your_pass}
                          onChange={this.handlechange.bind(this)}
                        />
                      </div>
                      {this.state.loginResponse && (
                        <div
                          class="alert alert-primary alert-dismissible fade show"
                          role="alert"
                        >
                          {this.state.loginResponse}
                        </div>
                      )}
                      <div class="form-group form-button">
                        <input
                          type="button"
                          name="signin"
                          id="signin"
                          class="form-submit"
                          value="Log in"
                          onClick={this.loginSubmit}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
