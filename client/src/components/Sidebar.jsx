import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "../styles/sidebar.css";
import {
    FaHome, FaWallet, FaChartPie, FaMoneyBillWave, 
    FaFileAlt, FaUser
} from "react-icons/fa";



function Sidebar() {
    
const navigate = useNavigate();
const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

};

    return (
        <div className="sidebar">
            <h2>SpendWise</h2>

            <NavLink to="/"> <FaHome /> Dashboard</NavLink>
            <br/>
            <NavLink to="/expenses">Expenses</NavLink>
            <br/>
            <NavLink to="/analytics">Analytics</NavLink>
            <br/>
            <NavLink to="/budget">Budget</NavLink>
            <br/>
            <NavLink to="/reports">Reports</NavLink>
            <br/>
            <NavLink to="/profile">Profile</NavLink>  
            <div className="logout">
                <button
                onClick={handleLogout}
                className="logout-btn"
                >🚪 Logout</button>
            </div>
        </div>
    );
}

export default Sidebar;