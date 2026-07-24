import {useNavigate } from "react-router-dom";
import "../styles/common.css";
import "../styles/profile.css";

function Profile() {
    const navigate = useNavigate();

const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");

    };

return (
<div className="profile-container">
<h2 className="page-title">My Profile</h2>
<div className="profile-section">
<h3 className="profile-label">
          Name
      </h3>
<p className="profile-name">
        {user?.name}
      </p>
    </div>

<div className="profile-section">
<h3 className="profile-label">
          Email
      </h3>
<p className="profile-email">
        {user?.email}
      </p>
    </div>

<button
  className="logout-btn"
  onClick={handleLogout}
>
      Logout
    </button>
  </div>
);
}

export default Profile;