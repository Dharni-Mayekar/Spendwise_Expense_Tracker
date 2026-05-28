import {useNavigate } from "react-router-dom";

function Navbar() {
const navigate = useNavigate();
const handleLogout = () => {
localStorage.removeItem("token");
navigate("/");
};

return (
<div style={{ display: "flex", justifyContent: "space-between", padding: "20px", background: "#222", color: "white", }} >

<h2>SpendWise</h2>

<button onClick={handleLogout}>Logout</button>
</div>
);
}

export default Navbar;