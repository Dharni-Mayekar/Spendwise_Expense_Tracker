import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
    return (
        <div
  style={{
    display: "flex",
    minHeight: "100vh",
  }}
>
            <Sidebar />

<div
  style={{
    flex: 1,
    marginLeft: "240px",
background: "var(--bg)",
    minHeight: "100vh",
    padding: "30px",
    boxSizing: "border-box",
  }}
>
            <Navbar />
            <div
  style={{
    maxWidth: "1350px",
    margin: "20px auto",
  }}
>
  <Outlet />
</div>

        </div>
        </div>
    );
}

export default MainLayout;