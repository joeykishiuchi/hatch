import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import Error from "./Error";
import Card from "@material-ui/core/Card";
import Cookies from "js-cookie";
import HatchIcon from "./images/hatch-main-logo.png";
import Nav from "./Nav";

export default function Signup() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false
  })
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      const formattedUsers = res.data.map((user) => user.user);
      setUsers(formattedUsers);
    });
  }, []);

  function validate() {
    if (!name || !email || !password) {
      setError({
        name: !name,
        email: !email,
        password: !password
      })
      setErrorMessage("All fields must be specified.");
    } else {
      const userExists = users.filter(user => user.email === email.toLowerCase())
      if (userExists.length > 0) {
        setError({
          ...error, email: false
        })
        setErrorMessage("The email you entered is already used. Please choose a different email or login with the exiting account");
      } else {

      }
    }
  }

  function googleValidate() {}

  return auth ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <Nav />
      <div>
        <div id="login-main">
          <Card>
            <h3>Sign-Up</h3>
            <Error errorMessage={errorMessage}/>
            <form>
            <TextField
                id="standard-basic"
                className="login-input"
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                error={error.name}
              />
              <TextField
                id="standard-basic"
                className="login-input"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={error.email}
              />
              <TextField
                id="standard-basic"
                className="login-input"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={error.password}
              />
              <TextField
                id="standard-basic"
                className="login-input"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                error={error.password}
              />
              <Button
                className="login-submit"
                color="primary"
                variant="contained"
                onClick={() => validate()}
              >
                Submit
              </Button>
            </form>
            <span class="login-or">- OR -</span>
            <GoogleLogin
              className="google-login"
              theme="dark"
              clientId="570246861484-25ichbk39vud42a6n5innl8p99811kr9.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={googleValidate}
              onFailure={googleValidate}
              cookiePolicy={"single_host_origin"}
            />
          </Card>
        </div>
      </div>
    </>
  )
}