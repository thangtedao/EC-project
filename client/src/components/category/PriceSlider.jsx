import React from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#e40404",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 25,
    width: 25,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span>$</span>
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const PriceSlider = ({ name, defaultValue, onChange }) => {
  return (
    <AirbnbSlider
      name={name}
      slots={{ thumb: AirbnbThumbComponent }}
      getAriaLabel={(index) =>
        index === 0 ? "Minimum price" : "Maximum price"
      }
      max={500000}
      step={10000}
      valueLabelDisplay="auto"
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default PriceSlider;
