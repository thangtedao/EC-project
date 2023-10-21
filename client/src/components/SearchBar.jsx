import { IconButton, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <InputBase placeholder="Tìm kiếm" />
      <IconButton>
        <Search />
      </IconButton>
    </div>
  );
};

export default SearchBar;
