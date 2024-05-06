import React from "react";

const FilterPC = ({ ram, rom, cpu }) => {
  return (
    <div>
      <div className="filter-title">Chọn theo tiêu chí</div>
      <div className="filter-select">
        <select name="ram" defaultValue={ram}>
          <option value="">Dung lượng RAM</option>
          <option value="4gb">4GB</option>
          <option value="8gb">8GB</option>
          <option value="12gb">12GB</option>
          <option value="16gb">16GB</option>
          <option value="18gb">18GB</option>
          <option value="24gb">24GB</option>
          <option value="32gb">32GB</option>
          <option value="36gb">36GB</option>
          <option value="64gb">64GB</option>
        </select>

        <select name="ổ cứng" defaultValue={rom}>
          <option value="">Ổ cứng</option>
          <option value="256gb">256GB</option>
          <option value="512gb">512GB</option>
          <option value="1tb">1TB</option>
        </select>

        <select name="cpu" defaultValue={cpu}>
          <option value="">CPU</option>
          <option value="i9">Intel Core i9</option>
          <option value="i7">Intel Core i7</option>
          <option value="i5">Intel Core i5</option>
          <option value="i3">Intel Core i3</option>
          <option value="r7">AMD Ryzen 7</option>
          <option value="r5">AMD Ryzen 5</option>
          <option value="r3">AMD Ryzen 3</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPC;
