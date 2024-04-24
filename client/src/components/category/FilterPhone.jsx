import React from "react";

const FilterLaptop = (props) => {
  const { ram, rom, chip } = props;

  return (
    <div className="filter-sort-list-filter">
      <select name="ram" defaultValue={ram}>
        <option value="">Ram</option>
        <option value="4gb">4GB</option>
        <option value="8gb">8GB</option>
        <option value="12gb">12GB</option>
        <option value="16gb">16GB</option>
      </select>

      <select name="rom" defaultValue={rom}>
        <option value="">Rom</option>
        <option value="256gb">256GB</option>
        <option value="512gb">512GB</option>
      </select>

      <select name="chip" defaultValue={chip}>
        <option value="">Chip</option>
        <option value="snapdragon">Snapdragon</option>
        <option value="mediatek dimensity">Mediatek Dimensity</option>
        <option value="mediatek helio">Mediatek Helio</option>
      </select>
    </div>
  );
};

export default FilterLaptop;
