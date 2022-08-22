import React from "react";
import { useWindowDimensions } from "../Constants/Constants";

function AuthWrapper(props) {
  const { width, height } = useWindowDimensions();
  return (
    <div
      style={{
        flexDirection: "column",
        backgroundColor: "#0005",
        backdropFilter: "blur(5px)",
        height: "400px",
        display: "flex",
        width: width < 385 ? "100vw" : "50vw",
        borderRadius: 16,
        padding: 30,
        alignItems: "flex-start",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

export default AuthWrapper;
