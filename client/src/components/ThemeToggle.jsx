import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useHomeLayoutContext } from "../pages/HomeLayout";
import styled from "styled-components";

const Wrapper = styled.button`
  // place-items: center dùng cho grid | justify-content với align-items dùng cho flex
  margin-right: 2rem;
  display: grid;
  background: transparent;
  border-color: transparent;
  place-items: center;
  width: auto;
  height: auto;
  cursor: pointer;
  .toggle-icon {
    font-size: 1.15rem;
    color: var(--text-color);
  }
`;

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useHomeLayoutContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillMoonFill className="toggle-icon" />
      ) : (
        <BsFillSunFill className="toggle-icon" />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
