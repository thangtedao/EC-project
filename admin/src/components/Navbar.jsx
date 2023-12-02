import { FaAlignLeft } from "react-icons/fa";
import styled from "styled-components";
import { useDashboardContext } from "../pages/DashboardLayout";

const Wrapper = styled.nav`
  width: 100%;
  height: 60px;
  display: flex;
  background: gray;
  padding: 0 1rem;
  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
      </div>
    </Wrapper>
  );
};
export default Navbar;
