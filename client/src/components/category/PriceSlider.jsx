import React from "react";
import AirbnbSlider from "./AirbnbSlider";
import PriceDisplay from "./PriceDisplay";

const PriceSlider = ({ name, defaultValue, onChange }) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Đảm bảo truyền đúng số lượng tham số cho hàm onChange
    onChange(event, newValue);
  };

  return (
    <div>
      <div style={{ width: "50%" }}>
        <AirbnbSlider
          name={name}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </div>
      <div style={{ width: "50%" }}>
        <PriceDisplay value={value} />
      </div>
    </div>
  );
};

export default PriceSlider;
