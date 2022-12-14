import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthWrapper from "../Components/AuthWrapper";
import API from "../axios/api";
import { useWindowDimensions } from "../Constants/Constants";
//icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Auth() {
  const { width, height } = useWindowDimensions();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const changeStatus = (status) => {
    setStatus(status);
  };
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const signUp = async () => {
    if (email === "" || password === "") {
      setError("Email or password or username cannot be empty");
    } else {
      await API.signUp({
        name: name,
        email: email,
        password: password,
      })
        .then((res) => {
          changeStatus("Login");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.title);
          setError(err.response.data.title);
        });
    }
    // navigate("/dashboard");
  };
  const Login = async () => {
    if (email === "" || password === "") {
      setError("Email or password cannot be empty");
    } else {
      await API.Login({
        email: email,
        password: password,
      })
        .then((res) => {
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("user", JSON.stringify(res?.data?.user));
          window.localStorage.setItem("isLoggedIn", true);
          console.log(res.data);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err.response.data.title);
          setError(err.response.data.title);
        });
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundImage:
        //   "url(https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb)",

        // objectFit: "cover",
      }}
    >
      <img
        //  key={bgImage}
        src={
          "https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
        }
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          objectFit: "cover",
          zIndex: -10,
        }}
      />
      {status === "Login" ? (
        <AuthWrapper
          style={{
            //  backgroundColor: "grey",
            width: width < 385 ? "100vw" : "50vw",
          }}
        >
          <h1 style={{ color: "white" }}>Login</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              height: 40,
              width: "100%",
              minWidth: 300,
              marginTop: 8,
              marginBottom: 8,
              // paddingLeft: 10,
              fontFamily: "Poppins",
              borderRadius: 10,
              outline: "none",
              border: 0,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                paddingLeft: 10,
                fontFamily: "Poppins",
                borderRadius: 10,
                outline: "none",
                border: 0,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              height: 40,
              width: "100%",
              minWidth: 300,
              marginTop: 8,
              marginBottom: 8,
              // paddingLeft: 10,
              fontFamily: "Poppins",
              borderRadius: 10,
              outline: "none",
              border: 0,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordType}
              style={{
                //  height: 40,
                //   width: "70%",
                // minWidth: 300,
                //  marginTop: 8,
                // marginBottom: 8,
                //   backgroundColor: "red",
                paddingLeft: 10,
                fontFamily: "Poppins",
                borderRadius: 10,
                outline: "none",
                border: 0,
              }}
            />
            <button
              className="btn btn-outline-primary"
              onClick={togglePassword}
              style={{
                backgroundColor: "transparent",
                outline: "none",
                border: `0px`,
              }}
            >
              {passwordType === "password" ? (
                <VisibilityIcon style={{ color: "black" }} />
              ) : (
                <VisibilityOffIcon style={{ color: "black" }} />
              )}
            </button>
          </div>
          {error.length > 0 && (
            <a
              style={{
                color: "#f57",
                fontWeight: "bold",
                fontSize: 14,
                marginTop: 5,
                alignSelf: "center",
              }}
            >
              {error}
            </a>
          )}
          <button
            onClick={() => {
              // navigate("/dashboard");
              Login();
            }}
            style={{
              //  height: 30,
              marginTop: 10,
              borderRadius: 5,
              backgroundColor: "wheat",
              padding: 10,
              width: 90,
              alignSelf: "center",
            }}
          >
            <a style={{ color: "black" }}>Login</a>
          </button>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <a style={{ marginRight: 10, color: "white" }}>
              {" "}
              Don't have an account ?
            </a>
            {/* <button
              onClick={() => changeStatus("Signup")}
              style={{
                backgroundColor: "wheat",
                borderRadius: 6,
                height: 30,
                width: 60,
              }}
            > */}
            <a
              style={{ color: "wheat", cursor: "pointer" }}
              onClick={() => changeStatus("Signup")}
            >
              {" "}
              Signup{" "}
            </a>
            {/* </button> */}
          </div>
        </AuthWrapper>
      ) : (
        <AuthWrapper style={{ width: width < 385 ? "100vw" : "50vw" }}>
          <h1 style={{ color: "white" }}>Sign Up</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              height: 40,
              width: "100%",
              minWidth: 300,
              marginTop: 8,
              marginBottom: 8,
              // paddingLeft: 10,
              fontFamily: "Poppins",
              borderRadius: 10,
              outline: "none",
              border: 0,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                paddingLeft: 10,
                fontFamily: "Poppins",
                borderRadius: 10,
                outline: "none",
                border: 0,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              height: 40,
              width: "100%",
              minWidth: 300,
              marginTop: 8,
              marginBottom: 8,
              // paddingLeft: 10,
              fontFamily: "Poppins",
              borderRadius: 10,
              outline: "none",
              border: 0,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                paddingLeft: 10,
                fontFamily: "Poppins",
                borderRadius: 10,
                outline: "none",
                border: 0,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              height: 40,
              width: "100%",
              minWidth: 300,
              marginTop: 8,
              marginBottom: 8,
              // paddingLeft: 10,
              fontFamily: "Poppins",
              borderRadius: 10,
              outline: "none",
              border: 0,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordType}
              style={{
                //  height: 40,
                //   width: "70%",
                // minWidth: 300,
                //  marginTop: 8,
                // marginBottom: 8,
                //   backgroundColor: "red",
                paddingLeft: 10,
                fontFamily: "Poppins",
                borderRadius: 10,
                outline: "none",
                border: 0,
              }}
            />
            <button
              className="btn btn-outline-primary"
              onClick={togglePassword}
              style={{
                backgroundColor: "transparent",
                outline: "none",
                border: `0px`,
              }}
            >
              {passwordType === "password" ? (
                <VisibilityIcon style={{ color: "black" }} />
              ) : (
                <VisibilityOffIcon style={{ color: "black" }} />
              )}
            </button>
          </div>
          {error.length > 0 && (
            <a
              style={{
                color: "#f57",
                fontWeight: "bold",
                fontSize: 14,
                marginTop: 5,
                alignSelf: "center",
              }}
            >
              {error}
            </a>
          )}
          <button
            onClick={() => {
              signUp();
              // navigate("/dashboard")
            }}
            style={{
              marginTop: 10,
              borderRadius: 5,
              backgroundColor: "wheat",
              padding: 10,
              width: 90,
              alignSelf: "center",
            }}
          >
            Signup
          </button>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <a style={{ marginRight: 10, color: "white" }}>
              {" "}
              Already have an account ?
            </a>
            <a
              style={{ color: "wheat", cursor: "pointer" }}
              onClick={() => changeStatus("Login")}
            >
              Login{" "}
            </a>
          </div>
        </AuthWrapper>
      )}
    </div>
  );
}

export default Auth;
