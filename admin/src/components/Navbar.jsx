import LogoutContainer from "./LogoutContainer";
import styled from "styled-components";
import { useDashboardContext } from "../pages/DashboardLayout";

const Wrapper = styled.nav`
  width: 100%;
  height: 60px;
  background: #212529;
  padding: 0 1rem;
  color: red;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ccc;
  display: flex;

  .nav-center {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-align: center;
  }
  .logout {
    height: 100%;
    display: grid;
    place-items: center;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    display: grid;
    place-items: center;
    cursor: pointer;
  }
`;

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        {/* <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FormatAlignLeftOutlinedIcon />
        </button> */}
        <div className="logout">
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
