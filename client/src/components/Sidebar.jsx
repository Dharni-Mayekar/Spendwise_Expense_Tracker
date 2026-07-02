import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div>
            <h2>SpendWise</h2>

            <NavLink to="/">Dashboard</NavLink>
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
        </div>
    );
}

export default Sidebar;