import React from "react";

const Errors = props => {
  return (
    <div className="invalid-feedback" style={{ display: "block" }}>
      {props.name}
    </div>
  );
};

export default Errors;
