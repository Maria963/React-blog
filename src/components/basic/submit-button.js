import React from "react";

const Submit = props => {
  return (
    <div className="form-group">
      <input type="submit" value={props.value} className="btn btn-primary" />
    </div>
  );
};

export default Submit;
