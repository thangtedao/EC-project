import React from "react";

const FilterScreen = (props) => {
  const { ram, rom, cpu, chip } = props;

  return (
    <div>
      <div className="filter-title">Chọn theo tiêu chí</div>
      <div className="filter-select">
        <select name="tần số" defaultValue={ram}>
          <option value="">Tần số quét</option>
          <option value="60">60Hz</option>
          <option value="75">75Hz</option>
          <option value="100">100Hz</option>
          <option value="120">120Hz</option>
          <option value="144">144Hz</option>
          <option value="165">165Hz</option>
          <option value="180">180Hz</option>
        </select>

        <select name="kích thước" defaultValue={rom}>
          <option value="">Kích thước màn hình</option>
          <option value="16">16 inches</option>
          <option value="22">22 inches</option>
          <option value="24">24 inches</option>
          <option value="25">25 inches</option>
          <option value="27">27 inches</option>
          <option value="29">29 inches</option>
          <option value="34">34 inches</option>
        </select>

        <select name="tấm nền" defaultValue={cpu}>
          <option value="">Tấm nền</option>
          <option value="ips">IPS</option>
          <option value="va">VA</option>
        </select>

        <select name="phân giải" defaultValue={chip}>
          <option value="">Độ phân giải</option>
          <option value="1920 x 1080">Full HD</option>
          <option value="2560 x 1">2K</option>
          <option value="3440 x 1">4K</option>
        </select>
      </div>
    </div>
  );
};

export default FilterScreen;
