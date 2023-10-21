import FlexBetween from "../../components/FlexBetween";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LaptopChromebookOutlinedIcon from "@mui/icons-material/LaptopChromebookOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import PersonalVideoOutlinedIcon from "@mui/icons-material/PersonalVideoOutlined";

import WidgetWrapper from "../../components/WidgetWrapper";

const MenuItem = styled(Box)({
  display: "flex",
  gap: "2px",
  margin: "3px",
  minWidth: "12rem"
});

const MenuWidget = () => {
  return (
    
      <WidgetWrapper height="20rem">
        <MenuItem>
          <SmartphoneOutlinedIcon />
          <Typography>Điện thoại, Tablet</Typography>
          <KeyboardArrowRightOutlinedIcon sx={{ marginLeft: "auto" }} />
        </MenuItem>
        <MenuItem>
          <LaptopChromebookOutlinedIcon />
          <Typography>Laptop</Typography>
          <KeyboardArrowRightOutlinedIcon sx={{ marginLeft: "auto" }} />
        </MenuItem>
        <MenuItem>
          <HeadphonesOutlinedIcon />
          <Typography>Tai nghe</Typography>
          <KeyboardArrowRightOutlinedIcon sx={{ marginLeft: "auto" }} />
        </MenuItem>
        <MenuItem>
          <PersonalVideoOutlinedIcon />
          <Typography>Tivi</Typography>
          <KeyboardArrowRightOutlinedIcon sx={{ marginLeft: "auto" }} />
        </MenuItem>
        <MenuItem>
          <PersonalVideoOutlinedIcon />
          <Typography>PC</Typography>
          <KeyboardArrowRightOutlinedIcon sx={{ marginLeft: "auto" }} />
        </MenuItem>
      </WidgetWrapper>
  );
};

export default MenuWidget;
