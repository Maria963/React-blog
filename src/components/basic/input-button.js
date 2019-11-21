import React from "react";

const Input = props => {
  return (
    <div className="form-group">
      <label>{props.name}</label>
      {props.name == "Logo:" && props.logoname !== "" ? (
        <img style={{ width: "50px" }} src={props.logoname} alt="img" />
      ) : (
        ""
      )}
      <input
        type={props.type}
        className="form-control"
        value={props.value}
        onChange={props.changeFunction}
      />
    </div>
  );
};

export default Input;
