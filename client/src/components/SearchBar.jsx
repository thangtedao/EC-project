import { InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <InputBase className="search-input" placeholder="Tìm kiếm" />
      <div className="search-icon">
        <Search />
      </div>
    </div>
  );
};

export default SearchBar;
