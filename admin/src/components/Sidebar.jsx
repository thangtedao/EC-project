import { useDashboardLayoutContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { showSidebar } = useDashboardLayoutContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLink></NavLink>
        </div>
      </div>
    </Wrapper>
  );
};
export default Sidebar;
