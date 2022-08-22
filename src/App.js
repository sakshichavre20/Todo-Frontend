import logo from "./logo.svg";
import "./App.css";
import Auth from "./Screens/Auth";
import { Route, Routes } from "react-router";
import Dashboard from "./Screens/Dashboard";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("isLoggedIn", isLoggedIn);
  return (
    <div className="App">
      <Routes>
        <Route element={isLoggedIn ? <Dashboard /> : <Auth />} path="/" exact />
        <Route element={<Dashboard />} path="/dashboard" exact />
      </Routes>
    </div>
  );
}

export default App;
