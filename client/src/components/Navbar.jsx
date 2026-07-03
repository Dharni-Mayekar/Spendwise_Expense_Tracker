import {useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

const hour = new Date().getHours();
let greeting = "";
if (hour < 12) {
    greeting = "Good Morning";
}
else if (hour <17) {
    greeting = "Good Afternoon";
}
else {
    greeting = "Good Evening";
}
function Navbar() {

return (
<div className="navbar">
    <div className="navbar-left">
        <h2> {greeting}, {user?.name} 👋</h2>
        <p>Manage your finances smarter.</p>
    </div>
    <div className="navbar-right">
      🔔
      <div className="profile">
        {user?.name?.charAt(0).toUpperCase()} 
        
        </div>  
    </div>
</div>
);
}

export default Navbar;