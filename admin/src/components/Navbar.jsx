import { FaAlignLeft } from "react-icons/fa";
import styled from "styled-components";
import { useDashboardContext } from "../pages/DashboardLayout";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";

const Wrapper = styled.nav`
  width: 100%;
  height: 60px;
  display: flex;
  background: white;
  padding: 0 1rem;
  color: #212529;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ccc;

  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FormatAlignLeftOutlinedIcon />
        </button>
      </div>
    </Wrapper>
  );
};
export default Navbar;
