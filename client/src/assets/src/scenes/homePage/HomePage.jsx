import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar/Navbar";
import MenuWidget from "../widgets/MenuWidget";
import SlideShow from "../widgets/SlideShow";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 580px)");

  return (
    <Box display="flex" flexDirection="column" backgroundColor="black">
      <Box width="100%" flex="1"><Navbar /></Box>
      
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        margin="0.75rem"
      >
        {isNonMobileScreens && <MenuWidget />}

        <SlideShow />
        {useMediaQuery("(min-width: 1000px)") && (
          <WidgetWrapper
            height="20rem"
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <Box
              width="15rem"
              height="6rem"
              backgroundColor="red"
              borderRadius="20px"
            ></Box>
            <Box
              width="15rem"
              height="6rem"
              backgroundColor="red"
              borderRadius="20px"
            ></Box>
            <Box
              width="15rem"
              height="6rem"
              backgroundColor="red"
              borderRadius="20px"
            ></Box>
          </WidgetWrapper>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        margin="0.75rem"
      >
        {isNonMobileScreens && <MenuWidget />}

        <SlideShow />
        {useMediaQuery("(min-width: 1000px)") && (
          <WidgetWrapper
            height="20rem"
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <Box
              width="15rem"
              height="6rem"
              backgroundColor="red"
              borderRadius="20px"
            ></Box>
            <Box
              width="15rem"
              height="6rem"
              backgroundColor="red"
              borderRadius="20px"
            ></Box>
            <Box
              width="15rem"
              height="6rem"
              backgroundColor="red"
              borderRadius="20px"
            ></Box>
          </WidgetWrapper>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        margin="0.75rem"
      >
        {isNonMobileScreens && <MenuWidget />}

        <SlideShow />
        {useMediaQuery("(min-width: 1000px)") && (
          <WidgetWrapper
            height="20rem"
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <Box
              width="15rem"
              height="6rem"
              backgroundColor="red"
              borderRadius="20px"
            ></Box>
            <Box
              width="15rem"
              height="6rem"
              backgroundColor="red"
              borderRadius="20px"
            ></Box>
            <Box
              width="15rem"
              height="6rem"
              backgroundColor="red"
              borderRadius="20px"
            ></Box>
          </WidgetWrapper>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
