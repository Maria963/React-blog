import React from "react";

const Select = props => {
  return (
    <div className="form-group">
      <label>{props.name}</label>
      <select
        className="form-control"
        name={props.id}
        onChange={props.changeFunction}
      >
        <option value="">{props.default}</option>
        {props.optionList}
      </select>
    </div>
  );
};

export default Select;
