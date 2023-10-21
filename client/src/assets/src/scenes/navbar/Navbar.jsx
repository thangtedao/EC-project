import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, Notifications, Menu, Close } from "@mui/icons-material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor="gold" gap="2rem">
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => {
            navigate("/home");
          }}
          sx={{
            "&:hover": {
              color: "red",
              cursor: "pointer",
            },
          }}
        >
          Navbar
        </Typography>
      </FlexBetween>
      <FlexBetween
        borderRadius="9px"
        backgroundColor="grey"
        padding="0.1rem 1.5rem"
        gap="3rem"
      >
        <InputBase placeholder="Search" />
        <IconButton>
          <Search />
        </IconButton>
      </FlexBetween>
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <FlexBetween flexDirection="column">
            <Notifications sx={{ fontSize: "30px" }} />
            <Typography>Thông báo</Typography>
          </FlexBetween>
          <FlexBetween flexDirection="column">
            <ShoppingBagOutlinedIcon sx={{ fontSize: "30px" }} />
            <Typography>Giỏ hàng</Typography>
          </FlexBetween>
          <FlexBetween flexDirection="column">
            <AccountCircleOutlinedIcon sx={{ fontSize: "30px" }} />
            <Typography>Người dùng</Typography>
          </FlexBetween>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="300px"
          minWidth="200px"
          position="fixed"
        >
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <AccountCircleOutlinedIcon />
            <Notifications />
            <ShoppingBagOutlinedIcon />
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
