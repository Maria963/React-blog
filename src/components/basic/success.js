import React from "react";

const Success = props => {
  return (
    <div className="valid-feedback" style={{ display: "block" }}>
      {props.name}
    </div>
  );
};

export default Success;
