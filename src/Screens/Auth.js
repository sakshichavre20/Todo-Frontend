import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthWrapper from "../Components/AuthWrapper";

function Auth() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const changeStatus = (status) => {
    setStatus(status);
  };
  const signUp = async () => {
    const res = await axios
      .post("http://localhost:5000/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        changeStatus("Login");
        console.log(res.data);
      });
    console.log("====", res);
    // navigate("/dashboard");
  };
  const Login = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    });
    //  console.log("====", res);
    if (res.status === 200) {
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      console.log(res.data);
      navigate("/dashboard");
    } else {
      console.log(res.data);
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
        backgroundImage:
          "url(https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb)",

        // objectFit: "fill",
      }}
    >
      {status === "Login" ? (
        <AuthWrapper>
          <h1 style={{ color: "white" }}>Login</h1>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              height: 30,
              width: "90%",
              marginBottom: 10,
              padding: 10,
              fontSize: 16,
              borderRadius: 16,
              borderColor: "transparent",
              outline: "none",
            }}
          />
          <input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              height: 30,
              width: "90%",
              marginBottom: 10,
              padding: 10,
              fontSize: 16,
              borderRadius: 16,
              borderColor: "transparent",
              outline: "none",
            }}
          />
          <button
            onClick={() => {
              // navigate("/dashboard");
              Login();
            }}
            style={{ height: 30, marginTop: 10 }}
          >
            Login
          </button>
          <div style={{ display: "flex", marginTop: 10 }}>
            <a style={{ marginRight: 10, color: "wheat" }}>
              {" "}
              Don't have an account ?
            </a>
            <button onClick={() => changeStatus("Signup")}> Signup </button>
          </div>
        </AuthWrapper>
      ) : (
        <AuthWrapper>
          <h1 style={{ color: "white" }}>Sign Up</h1>
          <input
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              height: 30,
              width: "90%",
              marginBottom: 10,
              padding: 10,
              fontSize: 16,
              borderRadius: 16,
              borderColor: "transparent",
              outline: "none",
            }}
          />
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              height: 30,
              width: "90%",
              marginBottom: 10,
              padding: 10,
              fontSize: 16,
              borderRadius: 16,
              borderColor: "transparent",
              outline: "none",
            }}
          />
          <input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              height: 30,
              width: "90%",
              marginBottom: 10,
              padding: 10,
              fontSize: 16,
              borderRadius: 16,
              borderColor: "transparent",
              outline: "none",
            }}
          />
          <button
            onClick={() => {
              signUp();
              // navigate("/dashboard")
            }}
            style={{ height: 30, marginTop: 10 }}
          >
            Signup
          </button>
          <div style={{ display: "flex", marginTop: 10 }}>
            <a style={{ marginRight: 10, color: "wheat" }}>
              {" "}
              Already have an account ?
            </a>
            <button onClick={() => changeStatus("Login")}> Login </button>
          </div>
        </AuthWrapper>
      )}
    </div>
  );
}

export default Auth;
