import React from "react";

const FilterLaptop = (props) => {
  const { ram, rom, chip } = props;

  return (
    <div>
      <div className="filter-title">Chọn theo tiêu chí</div>
      <div className="filter-select">
        <select name="ram" defaultValue={ram}>
          <option value="">Dung lượng Ram</option>
          <option value="4gb">4GB</option>
          <option value="8gb">8GB</option>
          <option value="12gb">12GB</option>
          <option value="16gb">16GB</option>
        </select>

        <select name="bộ nhớ" defaultValue={rom}>
          <option value="">Bộ nhớ trong</option>
          <option value="64gb">64GB</option>
          <option value="128gb">128GB</option>
          <option value="256gb">256GB</option>
          <option value="512gb">512GB</option>
          <option value="1tb">1TB</option>
        </select>

        <select name="chip" defaultValue={chip}>
          <option value="">Chipset</option>
          <option value="snapdragon">Snapdragon</option>
          <option value="apple">Apple</option>
          <option value="mediatek dimensity">Mediatek Dimensity</option>
          <option value="mediatek helio">Mediatek Helio</option>
        </select>
      </div>
    </div>
  );
};

export default FilterLaptop;
