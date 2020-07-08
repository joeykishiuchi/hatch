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
  const [errors, setErrors] = useState({
    emptyPassword: false,
    emptyEmail: false,
    emptyName: false
  });
  const [invalidCred, setInvalidCred] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      const formattedUsers = res.data.map((user) => user.user);
      setUsers(formattedUsers);
    });
  }, []);

  function validate() {}

  function googleValidate() {}

  return (
    <>
      <Nav />
      <div>
        <div id="login-main">
          <Card>
            <h3>Sign-Up</h3>
            <Error valid={invalidCred} />
            <form>
            <TextField
                id="standard-basic"
                className="login-input"
                label="Name"
                value={email}
                onChange={(event) => setName(event.target.value)}
                error={errors.emptyName}
                helperText={
                  errors.emptyName ? "Name cannot be empty." : ""
                }
              />
              <TextField
                id="standard-basic"
                className="login-input"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={errors.emptyEmail}
                helperText={
                  errors.emptyEmail ? "Please enter a valid email." : ""
                }
              />
              <TextField
                id="standard-basic"
                className="login-input"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={errors.emptyPassword}
                helperText={
                  errors.emptyPassword ? "Please enter a valid password." : ""
                }
              />
              <TextField
                id="standard-basic"
                className="login-input"
                label="Confirm Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={errors.emptyPassword}
                helperText={
                  errors.emptyPassword ? "Please enter a valid password." : ""
                }
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