import React from "react";

var labelStyle = {
    fontSize: "24px",
    border: "1px solid",
    paddingLeft: "62px",
    paddingRight: "62px",
    paddingTop: "12px",
    paddingBottom: "12px",
    listStyleType: "none",
    borderColor: "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)",
    width: "400px",
    color: "#636b6f",
    marginBottom: "16px",
    fontWeight: "200"
};

var radioStyle = {
    marginTop: "9px"
};

const Radio = ({ label, isSelected, onRadioChange }) => (
    <li style={labelStyle}>
        <label>
            <input
                type="radio"
                name="drink"
                checked={isSelected}
                onChange={onRadioChange}
                className="form-check-input"
                value={label}
                style={radioStyle}
                required
            />
            {label}
        </label>
    </li>
);

export default Radio;
