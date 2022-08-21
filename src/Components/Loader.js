import React, { useState, useEffect } from "react";
import { RiseLoader } from "react-spinners";

function Loader(props) {
  const [loading, setLoading] = useState(props.loading || false);
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <img
        src={
          "https://i.pinimg.com/736x/e1/4b/70/e14b7097d76237a8f5aba0dc66d01e1b.jpg"
        }
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          objectFit: "cover",
          zIndex: -10,
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <RiseLoader
        color={"wheat"}
        loading={loading}
        //  cssOverride={override}
        size={10}
        style={{ alignSelf: "center" }}
      />
    </div>
  );
}

export default Loader;
