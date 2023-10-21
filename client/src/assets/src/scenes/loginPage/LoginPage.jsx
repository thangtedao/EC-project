import styled from "styled-components";
import { Box, useMediaQuery, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar";


const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Wrapper = styled.div`
  background: blue;
  .content {
    font-size: 1.5rem;
    color: pink;
  }
`;

const LoginPage = () => {
  return (
    <Box backgroundColor="black" width="100%" height="100%">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="10em"
        backgroundColor="red"
        fontSize="1em"
      >
        <Typography>NavBaradsaasdsadsaNavBaradsaasdsadsaNavBaradsaasdsadsaNavBaradsaasdsadsa</Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
