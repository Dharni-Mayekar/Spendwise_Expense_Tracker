import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
    return (
        <div style={{ dispaly: "flex" }}>
            <Sidebar />

        <div style={{ flex: 1 }}>
            <Navbar />
            <Outlet />

        </div>
        </div>
    );
}

export default MainLayout;