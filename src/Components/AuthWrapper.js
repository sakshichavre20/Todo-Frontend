import React from "react";

function AuthWrapper(props) {
  return (
    <div
      style={{
        flexDirection: "column",
        backgroundColor: "#0005",
        backdropFilter: "blur(5px)",
        height: "400px",
        display: "flex",
        width: "50vw",
        borderRadius: 16,
        padding: 30,
        alignItems: "flex-start",
      }}
    >
      {props.children}
    </div>
  );
}

export default AuthWrapper;
