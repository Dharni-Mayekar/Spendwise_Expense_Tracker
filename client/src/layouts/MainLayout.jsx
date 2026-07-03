import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
    return (
        <div style={{ dispaly: "flex" }}>
            <Sidebar />

        <div
  style={{
    flex: 1,
    marginLeft: "240px",
    background: "#F3F4F6",
    minHeight: "100vh",
  }}
>
            <Navbar />
            <Outlet />

        </div>
        </div>
    );
}

export default MainLayout;